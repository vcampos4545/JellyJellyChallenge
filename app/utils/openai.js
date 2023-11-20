import OpenAI from 'openai'


// const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});
export default openai;