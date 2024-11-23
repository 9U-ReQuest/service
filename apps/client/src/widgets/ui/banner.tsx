import { cn } from "@/shared/lib/utils";
import type { PropsWithChildren, Ref } from "react";

interface BannerProps {
  backgroundImage: string;
  ref?: Ref<HTMLDivElement>;
}

export default function Banner({
  ref,
  backgroundImage,
  children,
  className,
  ...props
}: PropsWithChildren<BannerProps & React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      ref={ref}
      className={cn(`relative h-[456px] w-full bg-cover bg-center flex flex-col ${className}`)}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      {...props}
    >
      {children}
    </div>
  );
}
