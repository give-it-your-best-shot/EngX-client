export interface SDOptions {
  width: number;
  height: number;
  steps: number;
}

export interface SDResponse {
  images: Array<string>;
  parameters: any;
}

export default class SDService {
  private static instance: SDService;
  public static getInstance(): SDService {
    if (this.instance == null) this.instance = new SDService();
    return this.instance;
  }

  private url = import.meta.env.VITE_SD_URL;

  public async txt2img(
    prompt: string,
    options: SDOptions = {
      width: 640,
      height: 320,
      steps: 10,
    },
  ): Promise<SDResponse> {
    return fetch(`${this.url}/sdapi/v1/txt2img`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          prompt +
          ", anime, ultra quality, detailed image, hires, good colors, good lighting, good color accent",
        negative_prompt:
          "easynegative, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature",
        width: options.width,
        height: options.height,
        steps: options.steps,
        enable_hr: true,
        hr_upscaler: "Latent (antialiased)",
        hr_scale: 2,
        hr_sampler_name: "Euler",
        hr_second_pass_steps: 5,
        denoising_strength: 0.7,
      }),
    })
      .then((res) => res.json())
      .catch((reason) => {
        return {
          images: [],
        };
      });
  }
}
