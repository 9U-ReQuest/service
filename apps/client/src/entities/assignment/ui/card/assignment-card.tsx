import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import type { AssignmentCardType } from "../../types/assignment.type";

export default function AssignmentCard({ card }: { card: AssignmentCardType }) {
  return (
    <Card className="group justify-center relative overflow-hidden shadow-none border-none">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={card.company.logo}
            alt={`${card.company.name} logo`}
            width={295}
            height={197}
            className="object-cover rounded-3xl border"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8"
            aria-label={card.isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Star className={card.isBookmarked ? "fill-primary" : "fill-none"} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 py-4">
        <div className="space-y-2 font-medium">
          <div className="text-sm font-medium">
            {card.company.category} / {card.company.name}
          </div>
          <h3 className="text-lg line-clamp-1">{card.title}</h3>
          <div className="text-base">{card.date}</div>
        </div>
      </CardContent>
    </Card>
  );
}
