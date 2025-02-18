// src/api/replicate.ts
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImages(prompt: string) {
  try {
    const output = await replicate.run(
      "dock1100/flux-cute-3d:abaf53bc90452c82e8c91ab7da5367aa01270cac56f36860360842ce49622a9f",
      {
        input: {
          model: "schnell",
          prompt: `cute-3d, ${prompt}`,
          go_fast: true,
          lora_scale: 1,
          megapixels: "1",
          num_outputs: 4,
          aspect_ratio: "1:1",
          output_format: "jpg",
          guidance_scale: 3.5,
          output_quality: 100,
          prompt_strength: 0.8,
          extra_lora_scale: 1,
          num_inference_steps: 4
        }
      }
    );
    console.log("Raw Replicate API Output:", output); // Log the raw output
    return output; // Return the raw output (temporarily)
  } catch (error) {
    console.error("Error generating images:", error);
    throw error;
  }
}