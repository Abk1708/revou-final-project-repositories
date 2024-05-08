import { Link } from 'react-router-dom';

// BreadcrumbItem component
interface BreadcrumbItemProps {
  to?: string;
  label: string;
}

function BreadcrumbItem({ to, label }: BreadcrumbItemProps) {
  if (to) {
    return (
      <li className="flex items-center">
        <Link to={to} className="text-gray-400 hover:text-gray-600">
          {label}
        </Link>
        <svg
          className="h-5 w-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </li>
    );
  } else {
    return (
      <li className="flex items-center ml-4">
        <span className="text-white">{label}</span>
      </li>
    );
  }
}

// Breadcrumb component
interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm font-medium mb-8" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <BreadcrumbItem key={index} {...item} />
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
