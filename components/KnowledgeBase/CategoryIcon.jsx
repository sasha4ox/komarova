export default function CategoryIcon({ name }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "anxiety":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8 13.5c1.2 1.4 2.6 2 4 2s2.8-.6 4-2" />
          <path d="M9 10h.01M15 10h.01" />
        </svg>
      );
    case "panic-attacks":
      return (
        <svg {...props}>
          <path d="M13 3 6.5 13h5L10 21l7.5-11h-5L13 3z" />
        </svg>
      );
    case "therapy":
      return (
        <svg {...props}>
          <path d="M7 15.5 4.5 18V8.5A3.5 3.5 0 0 1 8 5h3.5" />
          <path d="M17 8.5 19.5 6v9.5A3.5 3.5 0 0 1 16 19h-3.5" />
          <rect x="7.5" y="8" width="9" height="8" rx="2.5" />
        </svg>
      );
    case "myths":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.6 9.4a2.5 2.5 0 1 1 3.7 2.2c-.8.4-1.3 1-1.3 1.9" />
          <path d="M12 16.7h.01" />
        </svg>
      );
    case "depression":
      return (
        <svg {...props}>
          <path d="M7 10.5a5 5 0 1 1 9.5 2.1A3.7 3.7 0 1 1 17 18.5H8.2A3.2 3.2 0 1 1 7 10.5z" />
          <path d="M9.5 20.5 10.5 22M12.5 20.5 13.2 22M15.5 20.5 16.2 22" />
        </svg>
      );
    case "relationships":
      return (
        <svg {...props}>
          <circle cx="9" cy="12" r="4.2" />
          <circle cx="15" cy="12" r="4.2" />
        </svg>
      );
    case "self-esteem":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M6.5 19c.8-3.2 2.8-4.8 5.5-4.8s4.7 1.6 5.5 4.8" />
        </svg>
      );
    case "burnout":
      return (
        <svg {...props}>
          <path d="M12 3.5c2 3 1.2 4.8 1.2 4.8S16 7.4 16 10.8a4 4 0 1 1-8 0c0-2.4 2-5.2 4-7.3z" />
        </svg>
      );
    case "divorce":
      return (
        <svg {...props}>
          <path d="M8 5v14M16 5v14" />
          <path d="M8 9h3.2L8 14.5h3.2M16 9h-3.2L16 14.5h-3.2" />
        </svg>
      );
    case "codependency":
      return (
        <svg {...props}>
          <circle cx="8.5" cy="12" r="3.3" />
          <circle cx="15.5" cy="12" r="3.3" />
          <path d="M11.2 12h1.6" />
        </svg>
      );
    case "loneliness":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M6.5 19c.8-3.2 2.8-4.8 5.5-4.8s4.7 1.6 5.5 4.8" />
          <path d="M18.5 7.5c1.6 1 2.2 2.6 2.2 4.2M5.5 7.5C3.9 8.5 3.3 10.1 3.3 11.7" />
        </svg>
      );
    case "family-conflicts":
      return (
        <svg {...props}>
          <circle cx="12" cy="7" r="2.4" />
          <circle cx="7" cy="16.5" r="2.3" />
          <circle cx="17" cy="16.5" r="2.3" />
          <path d="M10.4 8.8 8.4 14.2M13.6 8.8l2 5.4" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
  }
}

export function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5z" />
      <path d="M5 5.5v16" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
