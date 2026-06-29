import { generateOgImageForSite } from "@/utils/generateOgImages";

export async function GET() {
  const image = await generateOgImageForSite();

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
