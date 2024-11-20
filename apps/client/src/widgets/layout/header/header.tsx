"use client";

import logo from "@/assets/icons/logo.svg";
import mypage from "@/assets/icons/mypage.svg";
import pencil from "@/assets/icons/pencil.svg";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/shared/ui/menubar";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { HeaderContext } from "./header-context";
import NotificationIcon from "./notification-icon";

type HeaderProps = {
  children: ReactNode;
};

function Header({ children }: HeaderProps): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeaderContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
      <header className="min-w-2xl max-w-2xl w-full flex items-end border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-5">
        <div className="w-full flex py-6 items-end">{children}</div>
      </header>
    </HeaderContext.Provider>
  );
}

function Logo(): JSX.Element {
  return (
    <Link href="/" className="flex items-center space-x-2 mr-16">
      <Image src={logo} alt="Logo" width={116} height={42} />
    </Link>
  );
}

function Nav(): JSX.Element {
  const navItems = [
    { title: "AI 과제 생성", href: "/assignment" },
    { title: "과제 평가", href: "/evaluations" },
    { title: "기업과제", href: "/business-assignment" },
  ];

  return (
    <nav className="self-end space-x-10">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-base font-bold transition-colors hover:text-primary"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

function LoginAndSignup(): JSX.Element {
  return (
    <div className="flex flex-1 justify-end">
      <Link href="/login" className="font-semibold text-base">
        로그인/회원가입
      </Link>
    </div>
  );
}

interface Notification {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "AI 과제 생성이 완료 되었어요!",
    description:
      "[카카오], [프론트엔드] 를 주제로 AI과제가 생성 되었어요! 지금 바로 확인하여 과제를 수행 해보세요!",
    isRead: false,
  },
  {
    id: "2",
    title: "[ 롯데백화점_AI기반 고객 맞춤형 쇼핑 큐레이션 서비스 ] 과제평가가 완료 되었어요!",
    description: "",
    isRead: false,
  },
  {
    id: "3",
    title: "[ 삼성전자_스마트홈 IoT기기 제어 앱 개발 ]과제가 신규 신규과제로 등록 되었어요",
    description: "",
    isRead: true,
  },
  {
    id: "4",
    title: "[ 업데이트 소식 ]",
    description: "새로운 기업 과제 샘플이 등록 되었습니다.",
    isRead: true,
  },
];

function NotificationMenu(): JSX.Element {
  const [notificationState, setNotificationState] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notificationState.filter((n) => !n.isRead).length;

  const handleNotificationClick = (id: string) => {
    setNotificationState((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="relative cursor-pointer">
          <NotificationIcon count={unreadCount} />
        </MenubarTrigger>
        <MenubarContent className="max-w-[304px] w-full p-4" align="end">
          <div className="flex mb-4 text-base font-medium">
            <p className="font-extrabold">읽지 않은 알림</p>이&nbsp;
            <p className="font-extrabold text-[#8A1B22]">{unreadCount}</p>개 있어요.
          </div>
          <div>
            {notificationState.map((notification) => (
              <MenubarItem
                key={notification.id}
                className="flex items-start cursor-pointer gap-3 p-2 focus:bg-gray-100"
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div
                  className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                    notification.isRead ? "bg-gray-300" : "bg-[#8A1B22]"
                  }`}
                />
                <div className="space-y-1">
                  <div className="text-xs font-semibold line-clamp-2">{notification.title}</div>
                  {notification.description && (
                    <div className="text-caption text-[#474747] line-clamp-2">
                      {notification.description}
                    </div>
                  )}
                </div>
              </MenubarItem>
            ))}
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

interface MyPageMenuProps {
  name: string;
  githubId: string;
  profileImageUrl?: string;
}

const preventEvent = () => alert("준비중입니다.");

// menubar items
const MENUBAR_ITEMS = [
  { title: "스크랩한 과제", onClick: preventEvent },
  { title: "서비스 기본 설정", onClick: preventEvent },
  { title: "나의 대시보드", onClick: preventEvent },
  { title: "나의 포인트 현황", onClick: preventEvent },
  { title: "로그아웃", onClick: preventEvent },
];

function MyPageMenu({ name, githubId, profileImageUrl }: MyPageMenuProps): JSX.Element {
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Image src={mypage} alt="마이페이지" width={44} height={44} />
        </MenubarTrigger>
        <MenubarContent className="w-[320px] p-0" align="end">
          <div className="border-b p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="w-full flex justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <Image src={profileImageUrl || mypage} alt="Profile" width={44} height={44} />
                  <div className="text-base">{name}님, 환영합니다!</div>
                </div>
                <button type="button" className="rounded-full p-1 hover:bg-gray-100">
                  <Image src={pencil} alt="수정" width={16} height={16} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p className="text-sm">Github ID</p>
              <p className="text-xs">{githubId}</p>
            </div>
          </div>
          <div className="py-1">
            {MENUBAR_ITEMS.map((item) => (
              <MenubarItem
                key={item.title}
                onClick={item.onClick}
                className="flex cursor-pointer items-center justify-between px-4 py-2 focus:bg-gray-100"
              >
                {item.title}
              </MenubarItem>
            ))}
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

Header.Logo = Logo;
Header.Nav = Nav;
Header.LoginAndSignup = LoginAndSignup;
Header.NotificationMenu = NotificationMenu;
Header.MyPageMenu = MyPageMenu;

export { LoginAndSignup, Logo, MyPageMenu, Nav, NotificationMenu };
export default Header;
