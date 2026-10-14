import Image from "next/image";
import { cn } from "cn";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/nitrofire-computing-logo.webp"
      alt="Nitrofire Computing logo"
      width={1107}
      height={849}
      priority={priority}
      className={cn(className)}
    />
  );
}
