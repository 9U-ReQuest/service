import path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import Parser from "tree-sitter";
import JavaScript from "tree-sitter-javascript";
import LLMService from "./llmService.js";
import {promptFactory} from "./promptFactory.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type FileTree = {
    path: string; // 파일의 전체 경로
    name: string; // 파일 이름
    isDirectory: boolean; // 디렉터리 여부
    children?: FileTree[]; // 디렉터리인 경우 자식 노드
};

const requirements = 
`
# 과제 요구사항

다음 과제 요구사항에 맞춰 코드를 구현해합니다.

RAG를 활용하여 LLM 시맨틱 검색 기능을 구현합니다.

## RAG
- RAG 시스템을 구축합니다.
- retrive는 vector 를 통한 검색을 사용합니다.
- PDF 및 외부 파일도 읽을 수 있어야합니다

## Chat
- LLM에게 제시하는 대화는 멀티턴을 구현할 수 있어야합니다.
- LLM이 이전 대화를 기억할 수 있도록 구현하세요

## Convention
- 타입스크립트를 사용합니다.
- MVC 패턴을 사용합니다.
`

export class ReviewService {
    // AI 리뷰 생성 메서드 (public)
    public async generateReview({ assignmentId }: { assignmentId: string }): Promise<string> {
        console.log(`Generating review for assignmentId: ${assignmentId}`);

        // TODO: 실제로는 assignmentId 기반으로 불러와야 함
        const projectDirectory = path.join(process.cwd(), 'src/project');
        const fileTree = await this.getProjectFileTree(projectDirectory);
        const extractFileTree = this.extractFilePaths(fileTree);
        console.log(JSON.stringify(extractFileTree, null, 2));

        const filePath = extractFileTree[5]!;
        const codeFile = fs.readFileSync(filePath, "utf-8");

        const fileTreeStr = extractFileTree.join("\n");

        const llmService = new LLMService();
        const args = { filePath, codeFile, requirements, fileTreeStr};
        const prompt = promptFactory("accuracy", [args])
        console.log(JSON.stringify(prompt));

        await llmService.query(prompt)

        return `This is an AI-generated review for assignment ${assignmentId}`;
    }

    // 파일 트리 생성 메서드 (private)
    private async getProjectFileTree(directory: string): Promise<FileTree[]> {
        const result: FileTree[] = [];
        const items = fs.readdirSync(directory);

        for (const item of items) {
            const itemPath = path.join(directory, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory()) {
                result.push({
                    path: itemPath,
                    name: item,
                    isDirectory: true,
                    children: await this.getProjectFileTree(itemPath),
                });
            } else {
                result.push({
                    path: itemPath,
                    name: item,
                    isDirectory: false,
                });
            }
        }

        return result;
    }

    // 파일 경로 추출 메서드 (private)
    private extractFilePaths(fileTree: FileTree[]): string[] {
        const filePaths: string[] = [];

        for (const node of fileTree) {
            if (node.isDirectory && node.children) {
                filePaths.push(...this.extractFilePaths(node.children));
            } else if (!node.isDirectory) {
                filePaths.push(node.path);
            }
        }

        return filePaths;
    }

    // 파일을 AST로 변환하는 메서드 (private)
    private async parseFileToAst(filePath: string): Promise<any> {
        const ext = path.extname(filePath).slice(1);
        const parsers: { [key: string]: Parser } = {
            js: new Parser(),
            ts: new Parser(),
        };

        parsers.js?.setLanguage(JavaScript);
        parsers.ts?.setLanguage(JavaScript);

        const parser = parsers[ext];
        if (!parser) {
            console.warn(`Unsupported file type: ${filePath}`);
            return null;
        }

        // 파일 내용 읽기
        const content = fs.readFileSync(filePath, "utf-8");
        const ast = parser.parse(content); // AST 생성
        return ast.rootNode; // 루트 노드 반환
    }
}
