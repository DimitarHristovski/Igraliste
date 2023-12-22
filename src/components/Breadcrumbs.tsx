import Link from "next/link";
import React from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumbs">
      <ol className="d-flex mx-4 p-2 my-auto ">
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && " > "}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
