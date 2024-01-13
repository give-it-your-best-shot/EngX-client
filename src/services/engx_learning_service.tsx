import AzureOpenAIService from "./azure_openai_service";

export enum Language {
  ENGLISH = "english",
  VIETNAMESE = "vietnamese",
  JAPANESE = "japanese",
}

export enum Age {
  KID = "kid",
  STUDENT = "student",
  EXPERT = "expert",
}
export interface Quiz {
  paragraph: string,
  questions: Array<Question>
}

export interface Question {
  answers: Array<string>,
  correct_answer: number
}

export default class EngXLearningService {
  private static instance: EngXLearningService;
  public static getInstance(): EngXLearningService {
    if (this.instance == null) this.instance = new EngXLearningService();
    return this.instance;
  }

  private gpt_service: AzureOpenAIService;
  private age_mapper = {
    english: {
      kid: "kid",
      student: "student",
      expert: "expert",
    },
    vietnamese: {
      kid: "trẻ con",
      student: "học sinh",
      expert: "chuyên gia",
    },
    japanese: {
      kid: "子供",
      student: "学生",
      expert: "専門家",
    },
  };
  private question_mapper = {
    english: {
      pronunciation: "Explain for me as a {0} briefly, what is the pronunciation of '{1}' in English?",
      definition: "Explain for me as a {0}, what is the definition of '{1}'?",
      example: "At {0} level, please give me some examples using the word {1}.",
    },
    vietnamese: {
      pronunciation: "Giải thích cho tôi ở mức độ {0} một cách ngắn gọn, phát âm của từ '{1}' trong tiếng Anh là gì?",
      definition: "Giải thích cho tôi ở mức độ {0}, định nghĩa của từ '{1}' trong tiếng Anh là gì?",
      example: "Ở mức độ {0}, cho tôi một vài câu ví dụ tiếng Anh sử dụng từ {1} kèm theo dịch qua tiếng Việt.",
    },
    japanese: {
      pronunciation: "{0} として、簡単に説明してください、「{1}」は英語で何と発音するのか説明してください。",
      definition: "{0} として、説明してください、「{1}」の定義は何ですか?",
      example: "{0} レベルで、「{1}」という単語の使用例をいくつか教えてください。後で日本語に翻訳してください。",
    },
  };

  public language: Language = Language.ENGLISH;
  public age: Age = Age.KID;

  private constructor(gpt_service: AzureOpenAIService = AzureOpenAIService.getInstance()) {
    this.gpt_service = gpt_service;
  }

  public clearHistory() {
    this.gpt_service.clearHistory();
  }

  public getWordPronunciation(word: string) {
    const pronunciation = this.question_mapper[this.language].pronunciation
      .replace("{0}", this.age_mapper[this.language][this.age])
      .replace("{1}", word);
    return this.gpt_service.prompt(pronunciation).then(messages => messages?.shift());
  }

  public getWordDefinition(word: string) {
    const definition = this.question_mapper[this.language].definition
      .replace("{0}", this.age_mapper[this.language][this.age])
      .replace("{1}", word);
    return this.gpt_service.prompt(definition).then(messages => messages?.shift());
  }

  public getWordExample(word: string) {
    const example = this.question_mapper[this.language].example
      .replace("{0}", this.age_mapper[this.language][this.age])
      .replace("{1}", word);
    return this.gpt_service.prompt(example).then(messages => messages?.shift());
  }

  private async getIncorrectAnswers(blank_id: number, word: string, num_of_incorrect = 3) {
    const prompt = `Please also give ${num_of_incorrect} incorrect answers, for the blank number ${blank_id}, which should be fill with ${word}. Reponse in json {incorrect_answers:}`;
    return await this.gpt_service.prompt(prompt).then(messages => messages![0].content)
  }

  private randRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  public async getGameOfWords(words: Array<string>, num_sentence = 3, min_num_words = 50, max_num_words = 100) {
    const prompt = `Please generate a fill in the blanks quiz pragraph contains total of ${num_sentence} sentences. The paragraph must includes all of the following words: ${words.join(", ")}, which should be filled in the blanks. The blank should be replaced with the words mentioned, and highlight them with {}, and not with ___. The paragraph should use only the volcabulary for ${this.age} to understand. The paragraph must be between ${min_num_words} to ${max_num_words} words. The grammars must be correct. Response only the paragraph`;
    var paragraph = (await this.gpt_service.prompt(prompt))![0].content
    var corrects = paragraph.matchAll(/{([A-Z|a-z]+)}/g)

    var res = {
      "paragraph": paragraph,
      "questions": Array<Question>()
    }

    for(var correct of corrects) {
      var incorrects: Array<string> = JSON.parse(await this.getIncorrectAnswers(correct.index!, correct[1])).incorrect_answers
      var correct_index = this.randRange(0, incorrects.length)

      var answers = [
        ...incorrects.slice(0, correct_index),
        correct[1],
        ...incorrects.slice(correct_index)
      ]

      res.questions.push({
        "answers": answers,
        "correct_answer": correct_index
      })
    }
    return res
  }
}
