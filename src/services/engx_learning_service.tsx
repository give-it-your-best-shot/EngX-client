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

  public getGameOfWords(words: Array<string>, num_sentence = 3) {
    const prompt = `Please generate a fill in the blank quiz pragraph contains total of ${num_sentence} sentences. The paragraph must includes all of the following words: ${words.join(", ")}.`;
    console.log(prompt);
  }
}
