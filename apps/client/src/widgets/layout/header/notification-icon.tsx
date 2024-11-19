import notification from "@/assets/icons/notification.svg";
import Image from "next/image";

export default function NotificationIcon({
  count = 0,
}: {
  count?: number;
}) {
  const displayCount = count > 9 ? "9+" : count.toString();

  return (
    <div className="relative inline-flex">
      <Image src={notification} alt="Notification" width={24} height={24} className="h-6 w-6" />
      {count > 0 && (
        <div className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
          {displayCount}
        </div>
      )}
    </div>
  );
}
