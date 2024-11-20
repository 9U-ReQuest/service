import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ROUTES } from "@/shared/constant/url";
import { Button } from "@/shared/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface JobListing {
  id: string;
  company: {
    name: string;
    category: string;
    logo: string;
  };
  title: string;
  date: string;
  isBookmarked?: boolean;
}

function JobListingCard({ listing }: { listing: JobListing }) {
  return (
    <Card className="group justify-center relative overflow-hidden shadow-none border-none">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={listing.company.logo}
            alt={`${listing.company.name} logo`}
            width={295}
            height={197}
            className="object-cover rounded-3xl border"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-10 top-2 h-8 w-8"
            aria-label={listing.isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Star className={listing.isBookmarked ? "fill-primary" : "fill-none"} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 py-4">
        <div className="space-y-2 font-medium">
          <div className="text-sm font-medium">
            {listing.company.category} / {listing.company.name}
          </div>
          <h3 className="text-lg line-clamp-1">{listing.title}</h3>
          <div className="text-base">{listing.date}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function JobListingsHeader({ total }: { total: number }) {
  return (
    <div className="flex items-center justify-between mb-16 text-xl">
      <h2 className="font-semibold">
        전체 과제 <span className="text-[#8A1B22] font-bold">({total})</span>
      </h2>
      <Link href={ROUTES.BUSINESS_ASSIGNMENT} className="text-[#393939]">
        전체 기업과제 확인하기 &gt;
      </Link>
    </div>
  );
}

function JobListingsGrid({ listings }: { listings: JobListing[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {listings.map((listing) => (
        <JobListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

const mockListings: JobListing[] = [
  {
    id: "1",
    company: {
      name: "AI",
      category: "SAMSUNG",
      logo: "/placeholder.svg",
    },
    title: "모두를 위한 AI 서비스 개발",
    date: "2024/10/16",
    isBookmarked: true,
  },
  {
    id: "2",
    company: {
      name: "모빌리티",
      category: "현대자동차",
      logo: "/placeholder.svg",
    },
    title: "2023 1분기 현대 오토에버 과제전형",
    date: "2024/01/25",
  },
  // Add more mock listings as needed
];

export default function AllAssignment() {
  return (
    <section className="container py-8">
      <JobListingsHeader total={100} />
      <JobListingsGrid listings={mockListings} />
    </section>
  );
}
