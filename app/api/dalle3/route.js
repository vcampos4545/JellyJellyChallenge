import openai from '../../utils/openai'

export async function POST(req) {
    const { prompt } = await req.json();

    const dalleResp = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    const imageUrl = dalleResp.data[0].url;

    return new Response(JSON.stringify({imageUrl: imageUrl}));
}