import { SERVER_URL } from "src/utils/const";

export enum Model {
  GPT35TURBO = "GPT35TURBO",
  GPT35TURBO16K = "GPT35TURBO16K",
  ADA = "ADA",
  GPT4 = "GPT4",
}

export interface Message {
  role: string;
  content: string;
}

export default class AzureOpenAIService {
  private static instance: AzureOpenAIService;
  public static getInstance(): AzureOpenAIService {
    if (this.instance == null) this.instance = new AzureOpenAIService();
    return this.instance;
  }

  private model: Model = Model.GPT35TURBO;
  // private endpoint: string = import.meta.env.VITE_AZURE_OPENAI_API_ENDPOINT
  // private key: string = import.meta.env.VITE_AZURE_OPENAI_API_KEY
  private hostURL = SERVER_URL;
  private assistant_desc =
    "Your name is XBot. You are a helpful assistant who assist children learning English. Always reply without intro or outro. If giving examples, use bulletpoint response like.";
  private maxHistoryLength = 16;
  private history: Array<Message> = [];

  private url() {
    // return `${this.endpoint}/openai/deployments/${this.model}/chat/completions?api-version=2023-05-15`
    return `${this.hostURL}/ai`;
  }

  private default_header() {
    return {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json;charset=UTF-8",
      // "api-key": this.key
    };
  }

  private constructor() {}

  public clearHistory() {
    this.history = [];
  }

  public setModel(model: Model): void {
    this.model = model;
  }

  public setMaxHistoryLength(length: number) {
    this.maxHistoryLength = length;
  }

  public async prompt(content: string): Promise<Message[] | undefined> {
    this.history.push({
      role: "user",
      content: content,
    });
    return fetch(this.url(), {
      method: "POST",
      headers: this.default_header(),
      body: JSON.stringify({
        model: this.model.toString(),
        messages: [
          {
            role: "system",
            content: this.assistant_desc,
          },
          ...this.history,
          {
            role: "user",
            content: content,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => data.choices.map((e: { message: string }) => e.message))
      .then((messages) => {
        this.history = this.history.concat(messages);
        while (this.history.length > this.maxHistoryLength)
          this.history.shift();
        return messages;
      });
  }
}
