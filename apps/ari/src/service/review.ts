import path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import Parser from "tree-sitter";
import JavaScript from "tree-sitter-javascript";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type FileTree = {
    path: string; // 파일의 전체 경로
    name: string; // 파일 이름
    isDirectory: boolean; // 디렉터리 여부
    children?: FileTree[]; // 디렉터리인 경우 자식 노드
};

export class ReviewService {
    // AI 리뷰 생성 메서드 (public)
    public async generateReview({ assignmentId }: { assignmentId: string }): Promise<string> {
        console.log(`Generating review for assignmentId: ${assignmentId}`);

        // TODO: 실제로는 assignmentId 기반으로 불러와야 함
        const projectDirectory = path.join(process.cwd(), 'src/project');
        const fileTree = await this.getProjectFileTree(projectDirectory);
        const extractFileTree = this.extractFilePaths(fileTree);
        console.log(JSON.stringify(extractFileTree, null, 2));

        // AST로 분해
        const asts: { [filePath: string]: any } = {};
        for (const filePath of extractFileTree) {
            const ast = await this.parseFileToAst(filePath);
            if (ast) {
                asts[filePath] = ast.toString(); // AST를 문자열 형태로 저장 (디버깅용)
            }
        }
        console.log(asts);

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
