import AzureOpenAIService from "./azure_openai_service";

export default class EngXLearningService {
    private static instance: EngXLearningService;
    public static getInstance(): EngXLearningService {
        if(this.instance == null)
            this.instance = new EngXLearningService()
        return this.instance
    }

    private gpt_service: AzureOpenAIService

    private constructor(gpt_service: AzureOpenAIService = AzureOpenAIService.getInstance()) {
        this.gpt_service = gpt_service
    }

    public getWordPronunciation(word: string) {
        return this.gpt_service.prompt(`What is the pronunciation of '${word}'? Explain in Vietnamese`)
            .then(messages => messages?.shift())
    }

    public getWordDefinition(word: string) {
        return this.gpt_service.prompt(`What is the definition of '${word}'? Explain in Vietnamese`)
            .then(messages => messages?.shift())
    }
}