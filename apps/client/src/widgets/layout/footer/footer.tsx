import logo from "@/assets/icons/logo.svg";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function Footer() {
  const menus = [
    {
      title: "ReQuest 소개",
      link: "/about",
    },
    {
      title: "멤버십 소개",
      link: "/membership",
    },
    {
      title: "사용자 이용 약관",
      link: "/terms",
    },
    {
      title: "개인정보 처리 방침",
      link: "/privacy",
    },
    {
      title: "자주 묻는 질문/QA",
      link: "/faq",
    },
    {
      title: "문의하기",
      link: "/contact",
    },
  ];
  return (
    <Flex as="footer" className="w-full justify-center bg-[#F6F6F6] p-8">
      <Flex className="max-w-[1375px] w-full h-16 gap-16 justify-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="R_Quest Logo" width={117} height={36} />
        </Link>
        <Flex alignItems="center" gap="4">
          {menus.map((menu, index) => (
            <Fragment
              key={`${menu}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
            >
              <Link href={menu.link}>
                <Typography
                  as="p"
                  size="sm"
                  weight="medium"
                  className="text-[#858899] hover:text-primary"
                >
                  {menu.title}
                </Typography>
              </Link>
              {index === menus.length - 1 ? null : (
                <Typography as="p" size="sm" weight="medium" className="text-[#858899]">
                  /
                </Typography>
              )}
            </Fragment>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
