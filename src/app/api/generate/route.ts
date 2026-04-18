import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, settings, apiKey } = body;

    // Validate prompt
    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt cannot be empty" },
        { status: 400 }
      );
    }

    // Determine demo vs real mode
    const isRealKey = apiKey && apiKey.length > 10;

    if (isRealKey) {
      // Real mode: use z-ai-web-dev-sdk
      try {
        const ZAI = await import("z-ai-web-dev-sdk");
        const zai = await ZAI.default.create();
        const sizeMap: Record<string, string> = {
          "1:1": "1024x1024",
          "16:9": "1344x768",
          "9:16": "768x1344",
          "4:3": "1152x864",
          "3:4": "864x1152",
          "3:2": "1152x768",
          "2:3": "768x1152",
        };
        const size = sizeMap[settings?.aspectRatio || "1:1"] || "1024x1024";
        const response = await zai.images.generations.create({
          prompt: prompt.trim(),
          size: size as "1024x1024" | "768x1344" | "864x1152" | "1344x768" | "1152x864" | "1152x768" | "768x1152",
        });
        const imageUrl = response.data?.[0]?.url || response.data?.[0]?.b64_json;
        return NextResponse.json({ url: imageUrl });
      } catch (sdkError: unknown) {
        const msg = sdkError instanceof Error ? sdkError.message : "SDK error";
        return NextResponse.json({ error: msg }, { status: 500 });
      }
    } else {
      // Demo mode: return random picsum.photos image
      const delay = 1500 + Math.random() * 2000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      const seed = Math.random().toString(36).substring(2, 10);
      const width = 1024;
      const height = 1024;
      const url = `https://picsum.photos/seed/${seed}/${width}/${height}`;
      return NextResponse.json({ url });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
