export interface SDOptions {
    width: number,
    height: number,
    steps: number
}

export interface SDResponse {
    images: Array<string>,
    parameters: any,
}

export default class SDService {
    private static instance: SDService;
    public static getInstance(): SDService {
        if (this.instance == null) this.instance = new SDService();
        return this.instance;
    }

    private url = import.meta.env.VITE_SD_URL
    
    public async txt2img(prompt: string, options: SDOptions = {
        width: 640,
        height: 320,
        steps: 20
    }): Promise<SDResponse> {
        return fetch(`${this.url}/sdapi/v1/txt2img`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                negative_prompt: "easynegative, bad image, bad quality, nsfw, not detailed",
                width: options.width,
                height: options.height
            })
        })
        .then(res => res.json())
    }
}