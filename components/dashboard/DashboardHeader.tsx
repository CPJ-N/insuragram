"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { HomeIcon } from "lucide-react";

export function DashboardHeader() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <HomeIcon className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {paths.slice(1).map((path, index) => {
              const href = `/dashboard/${paths.slice(1, index + 2).join('/')}`;
              const isLast = index === paths.length - 2;

              return (
                <BreadcrumbItem key={path}>
                  {isLast ? (
                    <BreadcrumbPage>
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink href={href}>
                        {path.charAt(0).toUpperCase() + path.slice(1)}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
} 