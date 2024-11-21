import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as SharedPagination,
} from "@/shared/ui/pagination";

interface PaginationProps {
  className: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <SharedPagination className={className}>
      <PaginationContent className="gap-4">
        <PaginationItem>
          <PaginationPrevious isActive={currentPage === 1} onClick={onPrevious} />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <PaginationItem key={index + 1}>
            <PaginationLink
              onClick={() => onPageChange(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext isActive={currentPage === totalPages} onClick={onNext} />
        </PaginationItem>
      </PaginationContent>
    </SharedPagination>
  );
}
