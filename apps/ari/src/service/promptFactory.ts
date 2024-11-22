type ArgsType = { [key: string]: string };

export const promptFactory = (type: string, args: ArgsType[]): string => {
    const prompts: { [key: string]: string } = {
       
"accuracy": `
You are a programming project evaluator.
You need to evaluate code based on the following criteria:

Accuracy: 
1. Does the implementation adhere to the requirements?
2. If additional functionality beyond the requirements is implemented, does it avoid conflicting with the defined requirements?
3. 요구사항에 없는 내용인 경우, 프로젝트에 있는 게 좋은 코드라면 좋은 평가를 남겨주세요

You must evaluate the code quite critically to help the developer grow through your feedback.

There is no need to divide the feedback strictly by criteria.
It is recommended to evaluate broadly on a function-level basis.

현재 평가하는 파일은 일부분이고, 추가적인 구현사항이 다른 파일에 있을 수 있다는 점을 확인하세요
추가적으로 알고싶은 함수가있다면 응답에 남겨주세요.

Please respond in the format:
{"review": "string", "func": "name", flag: "boolean"}

응답을 반환할때, 간략하게 2줄정도로 응답합니다. 평가기준을 언급해서는 안 됩니다.
부정적인 피드백인 경우, 사용자에게 질문을 하며 끝내야합니다.
Provide feedback in Korean.

# requirements
{:requirements}

# filePath
{:filePath}

# codeFile
{:codeFile}

# review`,
        
"logic": `
You are a programming project evaluator.
You need to evaluate code based on the following criteria:

Logic: 
1. Are the necessary technologies used to meet the requirements?
2. Is the logic appropriately implemented to fulfill the requirements?

You must evaluate the code quite critically to help the developer grow through your feedback.

There is no need to divide the feedback strictly by criteria.
It is recommended to evaluate broadly on a function-level basis.

Please respond in the format:
{"review": "string"}

Provide feedback in Korean.

# requirements
{: requirements}

# filePath
{:filePath}

# codeFile
{:codeFile}

# review`,
        
        
"efficiency": `
You are a programming project evaluator.
You need to evaluate code based on the following criteria:

Efficiency: 
1. Is the code structure correctly modularized?
2. Is the project structured appropriately?
3. Are TypeScript's specialized types used effectively?
4. Is there any redundant code?
5. Are types properly defined?

You must evaluate the code quite critically to help the developer grow through your feedback.

There is no need to divide the feedback strictly by criteria.
It is recommended to evaluate broadly on a function-level basis.

Please respond in the format:
{"review": "string"}

Provide feedback in Korean.

# fileTree
{:fileTree}

# filePath
{:filePath}

# codeFile
{:codeFile}

# review`,
        
        
"consistency": `
You are a programming project evaluator.
You need to evaluate code based on the following criteria:

Consistency: 
1. Does the code follow established conventions?
2. Does it align with the principles of TypeScript?

You must evaluate the code quite critically to help the developer grow through your feedback.

There is no need to divide the feedback strictly by criteria.
It is recommended to evaluate broadly on a function-level basis.

Please respond in the format:
{"review": "string"}

Provide feedback in Korean.

# filePath
{:filePath}

# codeFile
{:codeFile}

# review`
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
};
