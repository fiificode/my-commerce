import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: any;
  icon?: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "row-span-1 cursor-pointer relative rounded-xl group/bento transition duration-200 shadow-input dark:shadow-none  overflow-hidden dark:bg-black dark:border-white/[0.2] bg-black/75 border border-gray-300 justify-between flex flex-col space-y-4",
        className
      )}
    >
      <Image
        src={header}
        alt="Cover Image"
        width={600}
        height={600}
        className="w-full h-full object-center object-cover  mix-blend-overlay"
      />
      <div className="absolute px-4 pb-4 bottom-0 left-0 group-hover/bento:translate-x-2 transition duration-200 text-white ">
        {icon}
        <div className=" font-headers text-3xl text-left text-white dark:text-white mb-2 mt-2">
          {title}
        </div>
        <div className="font-text font-normal text-white text-xs dark:text-white">
          {description}
        </div>
      </div>
    </Link>
  );
};
