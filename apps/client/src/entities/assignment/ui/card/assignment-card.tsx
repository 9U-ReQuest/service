"use client";

import defaultImage from "@/assets/images/lotte.png";
import { type Company, companyImages } from "@/shared/constant/company";
import { combinePrompt } from "@/shared/lib/utils";
// 추후 데이터 반영해서 상수 업데이트 해놓기
// import { companyInfoMap } from "@/shared/constant/company";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import Typography from "@/shared/ui/common/typography/typography";
import type { Assignment } from "@request/specs";
import Image from "next/image";
import Link from "next/link";

interface AssignmentCardProps {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  // const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { name, lastUpdated, prompt, id } = assignment;

  // const toggleBookmark = () => {
  //   setIsBookmarked((prev) => !prev);
  // };

  return (
    <Link href={`/assignment/business/${id}`}>
      <Card className="group justify-center relative overflow-hidden shadow-none border-none">
        <CardHeader className="p-0">
          <div className="w-full relative overflow-hidden aspect-[3/2]">
            <Image
              src={companyImages[combinePrompt(prompt.companies) as Company] || defaultImage}
              alt={`${combinePrompt(prompt.companies) || "기본"} 로고`}
              fill
              className="object-cover rounded-3xl border"
            />
            {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8"
            aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
            onClick={toggleBookmark}
          >
            <Star className={isBookmarked ? "fill-primary" : "fill-none"} />
          </Button> */}
          </div>
        </CardHeader>
        <CardContent className="px-0 py-4">
          <div className="space-y-2">
            <div className="space-y-1">
              <Typography as="p" size="sm" weight="medium">
                {combinePrompt(prompt.fields)} / {combinePrompt(prompt.companies)}
              </Typography>
              <Typography as="h3" size="xl" weight="bold" lineClamp="1">
                {name}
              </Typography>
            </div>
            <Typography as="p" size="xs" weight="medium">
              {new Date(lastUpdated).toLocaleDateString()}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
