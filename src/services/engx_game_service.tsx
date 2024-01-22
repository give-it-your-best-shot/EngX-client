import AzureOpenAIService from "./azure_openai_service";
import SDService from "./stable_diffusion_service";

export interface Quiz {
  _original_paragraph: string;
  paragraph: string[];
  questions: Array<Question>;
  image: string | undefined;
  theme: Theme;
}

export interface Question {
  answers: Array<string>;
  correct_answer: number;
  _correct_answer_str: string;
  _blank_index: number | undefined;
  _blank_length: number | undefined;
}

const NUM_THEME = 4;

export enum Theme {
  NORMAL = "normal",
  FANTASY = "fantasy",
  FUTURE = "future",
  CARTOON = "cartoon",
}

const themes = [Theme.NORMAL, Theme.FANTASY, Theme.FUTURE, Theme.CARTOON];

interface GameOption {
  num_sentence: number;
  min_num_words: number;
  max_num_words: number;
  theme?: Theme;
}

export default class EngXGameService {
  private static instance: EngXGameService;
  public static getInstance(): EngXGameService {
    if (this.instance == null) this.instance = new EngXGameService();
    return this.instance;
  }
  gpt_service: AzureOpenAIService;
  sd_service: SDService;

  private constructor(
    gpt_service: AzureOpenAIService = AzureOpenAIService.getInstance(),
    sd_service: SDService = SDService.getInstance(),
  ) {
    this.gpt_service = gpt_service;
    this.sd_service = sd_service;
  }

  private async getIncorrectAnswers(
    blank_id: number,
    word: string,
    num_of_incorrect = 3,
  ) {
    const prompt = `Please also give ${num_of_incorrect} incorrect answers, for the blank number ${blank_id}, which should be fill with ${word}. Reponse in json {incorrect_answers:}`;
    return this.gpt_service
      .prompt(prompt)
      .then((messages) => messages![0].content);
  }

  private randRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async getImagePromptFromParagraph(paragraph: string) {
    const prompt = `Give me Stable Diffusion prompts for getting game background with the context of this paragraph: ${paragraph}. Please add some positives prompts to make the image better, using simple color scheme.`;
    const sd_prompt = await this.gpt_service
      .prompt(prompt)
      .then((messages) => messages![0].content);
    console.log(sd_prompt);
    return sd_prompt;
  }

  public async getGameOfWords(
    words: Array<string>,
    options: GameOption = {
      num_sentence: 3,
      min_num_words: 50,
      max_num_words: 100,
    },
  ) {
    if (!options.theme) {
      options.theme = themes[this.randRange(0, NUM_THEME - 1)];
    }

    const prompt = `Please generate a fill in the blanks quiz pragraph contains total of ${options.num_sentence} sentences in IELTS format. The paragraph includes some of the following words: ${words.join(", ")}, which should be filled in the blanks. The blank should be replaced with the words mentioned, and highlight them with {}, and not with ___. The paragraph should use only the volcabulary for IELTS learner to understand. The theme is ${options.theme}. The paragraph must be between ${options.min_num_words} to ${options.max_num_words} words. The grammars must be correct. Response only the paragraph`;
    const paragraph = (await this.gpt_service.prompt(prompt))![0].content;
    const corrects = paragraph.matchAll(/{[^}]+}/g);

    const sd_prompt = await this.getImagePromptFromParagraph(paragraph);
    console.log(sd_prompt);
    const sd_res = await this.sd_service.txt2img(sd_prompt);

    const res = {
      _original_paragraph: paragraph,
      paragraph: paragraph.split(/{[^}]+}/g),
      questions: Array<Question>(),
      image: sd_res.images.shift(),
      theme: options.theme,
    };

    const promises: Promise<Array<any>>[] = [];

    for (const correct of corrects) {
      promises.push(
        this.getIncorrectAnswers(
          correct.index!,
          correct[0].slice(1, correct[0].length - 1),
        ).then((res) => [JSON.parse(res).incorrect_answers, correct]),
      );
    }

    const results = await Promise.all(promises);
    for (const _answers of results) {
      const correct = _answers[1];
      const incorrects = _answers[0];
      const correct_index = this.randRange(0, incorrects.length);

      const answers = [
        ...incorrects.slice(0, correct_index),
        correct[0].slice(1, correct[0].length - 1),
        ...incorrects.slice(correct_index),
      ];

      res.questions.push({
        answers: answers,
        correct_answer: correct_index,
        _correct_answer_str: correct[0].slice(1, correct[0].length - 1),
        _blank_index: correct.index,
        _blank_length: correct[0].length,
      });
    }

    return res;
  }
}