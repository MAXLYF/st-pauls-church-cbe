import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container-site pt-6 pb-2"
    >
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-500 transition hover:text-[#b18a3d]"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate-500 transition hover:text-[#b18a3d]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#10233f]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
