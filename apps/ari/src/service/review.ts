export class ReviewService {
    // AI 리뷰 생성 메서드
    async generateReview({ assignmentId }: { assignmentId: string }): Promise<string> {
        // 예: 외부 AI API 호출
        console.log(`Generating review for assignmentId: ${assignmentId}`);

        return `This is an AI-generated review for assignment ${assignmentId}`;
    }
}
