// SingleChatService.ts
import fs from "fs";
import LLMFactory, { LLMType } from "./LLM/llm-factory.ts";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

class SingleChatService {
  private LLM = LLMFactory.createLLM(LLMType.OPENAI);
  private promptTemplate = new PromptTemplate({
    template: `
      당신은 코드를 분석하고 평가하는 AI 코드 리뷰어입니다. 당신의 임무는 주어진 코드와 평가 기준을 바탕으로 코드를 평가하고 질문하는 것입니다.
      대상자의 성장을 위하여 최대한 비판적인 시선에서 평가하는 것이 중요합니다.
      이전 평가의 사용자 응답에 대하여 추가적으로 리뷰를 해야합니다.

      아래의 코드는 ./pagination.ts 파일에서 가져온 것입니다:

      #Code:
      {code}

      아래는 평가 기준입니다:
      1. 코드의 가독성과 유지보수성
      2. ts의 철학에 일치하는지에 대하여
      3. 일관된 네이밍 컨벤션 사용여부
      4. 타입 구조 활용 능력
      5. 코드 개선 가능성

      주어진 코드에 대해 평가하고, 코드에 구성에 대하여 의문점이나 의구심이 있는 포인트를 제시 및 질문하세요.
      
      # 이전 평가
      {p}
      
      # 사용자 응답
      pageSize 등과 같은 validation은 controller 단에서 처리하는 것이 올바른 구조라 생각하였습니다.
      이에 따라 db 및 서비스 레이어에서는 추가적인 검증 처리를 하지 않았습니다.

      #Evaluation:
    `,
    inputVariables: ["code", "p"],
  });
  private outputParser = new StringOutputParser();

  async askQuery(filePath: string): Promise<string> {
    const code = fs.readFileSync(filePath, "utf-8");

    const chatChain = RunnableSequence.from([
      new RunnablePassthrough(),
      this.promptTemplate,
      this.LLM,
      this.outputParser,
    ]);

    const p = `
### 코드 평가

**코드 개선 가능성**
   - \\\`createPaginationStages\\\` 함수에서 \\\`sort\\\` 매개변수의 타입이 문자열 리터럴로 제한되어 있어 좋습니다. 그러나 \\\`page\\\`와 \\\`pageSize\\\`의 유효성 검사를 추가하면 더 안전한 코드를 만들 수 있습니다. 예를 들어, \\\`page\\\`가 1보다 작거나 \\\`pageSize\\\`가 0보다 큰지 확인하는 로직을 추가하는 것이 좋습니다.

`;

    const result = await chatChain.invoke({
      code,
      p,
    });

    return result;
  }
}

// Example usage
(async () => {
  const chatService = new SingleChatService();
  const filePath = "./pagination.ts";

  try {
    const response = await chatService.askQuery(filePath);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error during query:", error);
  }
})();
