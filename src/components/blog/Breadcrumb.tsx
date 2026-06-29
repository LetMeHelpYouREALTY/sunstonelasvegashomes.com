"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const currentUrlPath = pathname.replace(/\/+$/, "");
  const breadcrumbList = currentUrlPath.split("/").filter(Boolean);

  if (breadcrumbList[0] === "posts") {
    breadcrumbList.splice(0, 2, `Posts (page ${breadcrumbList[1] || 1})`);
  }

  if (
    breadcrumbList[0] === "tags" &&
    breadcrumbList[2] &&
    !Number.isNaN(Number(breadcrumbList[2]))
  ) {
    const pageLabel =
      Number(breadcrumbList[2]) === 1
        ? ""
        : `(page ${breadcrumbList[2]})`;
    breadcrumbList.splice(1, 3, `${breadcrumbList[1]} ${pageLabel}`.trim());
  }

  return (
    <nav className="mx-auto mt-8 mb-1 w-full max-w-3xl px-4" aria-label="breadcrumb">
      <ul className="font-light [&>li]:inline [&>li:not(:last-child)>a]:hover:opacity-100">
        <li>
          <Link href="/" className="opacity-80">
            Home
          </Link>
          <span aria-hidden="true" className="opacity-80">
            &raquo;
          </span>
        </li>
        {breadcrumbList.map((breadcrumb, index) =>
          index + 1 === breadcrumbList.length ? (
            <li key={breadcrumb}>
              <span
                className={`capitalize opacity-75 ${index > 0 ? "lowercase" : ""}`}
                aria-current="page"
              >
                {decodeURIComponent(breadcrumb)}
              </span>
            </li>
          ) : (
            <li key={breadcrumb}>
              <Link href={`/${breadcrumb}/`} className="capitalize opacity-70">
                {breadcrumb}
              </Link>
              <span aria-hidden="true">&raquo;</span>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
