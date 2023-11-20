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

// import { OpenAIStream, StreamingTextResponse } from 'ai';

// import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge"

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration)

// export async function POST(req) {
//     const { prompt } = await req.json();

//     const dalleResp = await openai.createImage({
//         model: "dall-e-3",
//         prompt: prompt,
//         n: 1,
//         size: "1024x1024",
//     });

//     if (dalleResp.status !== 200) {
//         throw new Error(`Request failed with status ${response.status}`);
//     }
    
//     // Convert the response into a friendly text-stream
//     const stream = OpenAIStream(dalleResp);
//     // Respond with the stream
//     return new StreamingTextResponse(stream);
// }