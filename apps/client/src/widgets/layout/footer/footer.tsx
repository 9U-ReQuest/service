import logo from "@/assets/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center bg-[#F6F6F6] p-8">
      <div className="container flex h-16 items-center gap-20">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="R_Quest Logo" width={120} height={40} />
        </Link>
        <nav className="md:flex gap-8">
          <Link
            href="/about"
            className="text-[#767676] text-xl font-medium hover:text-primary transition-colors"
          >
            ReQuest 소개
          </Link>
          <Link
            href="/membership"
            className="text-[#767676] text-xl font-medium hover:text-primary transition-colors"
          >
            멤버십 소개
          </Link>
          <Link
            href="/terms"
            className="text-[#767676] text-xl font-medium hover:text-primary transition-colors"
          >
            사용자 이용 약관
          </Link>
          <Link
            href="/privacy"
            className="text-[#767676] text-xl font-medium hover:text-primary transition-colors"
          >
            개인정보 처리 방침
          </Link>
          <Link
            href="/faq"
            className="text-[#767676] text-xl font-medium hover:text-primary transition-colors"
          >
            자주 묻는 질문/QA
          </Link>
          <Link
            href="/contact"
            className="text-[#767676] text-xl font-medium hover:text-primary transition-colors"
          >
            문의하기
          </Link>
        </nav>
      </div>
    </footer>
  );
}
