import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const convertBreadcrumb = (string) => {
  return decodeURI(string).toLowerCase();
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path.toLowerCase(),
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className="breadcrumb flex flex-row">
        <li>
          <Link href="/">
            <a className="capitalize ml-1">Hem</a>
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <div key={i} className="flex flex-row">
              <span className="mx-3">/</span>
              <li>
                <Link href={breadcrumb.href}>
                  <a className="capitalize">
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                  </a>
                </Link>
              </li>
            </div>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
