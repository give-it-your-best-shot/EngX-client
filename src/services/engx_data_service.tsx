import { Chapter } from "../types/chapter.type";

export default class EngXDataService {
    private static instance: EngXDataService
    public static getInstance(): EngXDataService {
        if(this.instance == null)
            this.instance = new EngXDataService()
        return this.instance
    }

    private hostURL = import.meta.env.VITE_BACKEND_URL;

    private constructor() {}

    public async getAllChapters(): Promise<Chapter[]> {
        return fetch(`${this.hostURL}/chapters`)
            .then(res => res.json())
            .then(data => data.data)
    }

    public async getChapterById(id: number): Promise<Chapter> {
        return fetch(`${this.hostURL}/chapters/${id}`)
            .then(res => res.json())
            .then(data => data.data)
    }
}