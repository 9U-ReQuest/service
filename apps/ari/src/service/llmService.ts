import OpenAI from "openai";

class LLMService {
    private client: OpenAI;
    constructor() {
        this.client = new OpenAI({apiKey: process.env["OPEN_AI_SECRET"]})
    }

    async query (query: string) {
        const stream = this.client.beta.chat.completions.stream({
            model: 'gpt-4o',
            messages: [{role: 'user', content: query}],
            stream: true,
        });

        stream.on('content', (delta: any, snapshot: any) => {
            process.stdout.write(delta);
        });

        // for await (const chunk of stream) {
        //     process.stdout.write(chunk.choices[0]?.delta?.content || '');
        // }

        const chatCompletion = await stream.finalChatCompletion();
        // console.log(chatCompletion); // {id: "…", choices: […], …}
    }
}

export default LLMService;