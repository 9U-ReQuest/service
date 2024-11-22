import path from "node:path";
import * as fs from "node:fs";
import {fileURLToPath} from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


type FileTree = {
    path: string; // 파일의 전체 경로
    name: string; // 파일 이름
    isDirectory: boolean; // 디렉터리 여부
    children?: FileTree[]; // 디렉터리인 경우 자식 노드
};


export class ReviewService {
    // AI 리뷰 생성 메서드
    async generateReview({ assignmentId }: { assignmentId: string }): Promise<string> {
        // 예: 외부 AI API 호출
        console.log(`Generating review for assignmentId: ${assignmentId}`);

        // TODO: 실제로는 assignmentId 기반으로 불러와야함
        const projectDirectory = path.join(process.cwd(), 'src/project');
        const fileTree = await this.getProjectFileTree(projectDirectory);
        const extractFileTree = this.extractFilePaths(fileTree);
        console.log(JSON.stringify(extractFileTree, null, 2));
        // 파일

        return `This is an AI-generated review for assignment ${assignmentId}`;
    }

    async getProjectFileTree(directory: string): Promise<FileTree[]> {
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

    extractFilePaths = (fileTree: FileTree[]): string[] => {
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
}
