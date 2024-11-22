type ArgsType = { [key: string]: string };

export const promptFactory =(type: string, args: ArgsType[]): string => {
    const prompts: { [key: string]: string } = {
        "default":
`
prompt 입니다
arg는 {:arg} 입니다.
name은 {:name}입니다.
`
    };

    const template = prompts[type];

    if (!template) {
        throw new Error(`프롬프트 타입 "${type}"을(를) 찾을 수 없습니다.`);
    }

    const argsObject = Object.assign({}, ...args);

    const prompt = template.replace(/\{:\s*(\w+)\s*\}/g, (match, p1) => {
        return argsObject[p1] || match;
    });

    return prompt;
}