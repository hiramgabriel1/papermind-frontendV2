"use client"

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function NavLink({
  children,
  href,
}: Readonly<{
  children: React.ReactNode;
  href: string;
}>){

  const path = usePathname();

  return(
    <Link
      href={href}
      className={clsx(
        `text-lg font-semibold flex gap-2 items-center rounded-lg transition-all px-2.5 py-2 text-gray-500`,
        {
          "bg-neutral-200 text-neutral-950": path === href,
        }
      )}  
    >
      {children}
    </Link>
  )
}