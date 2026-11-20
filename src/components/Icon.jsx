const paths = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  heart: (
    <path d="M20.8 8.9c0 5.6-8.8 10.1-8.8 10.1S3.2 14.5 3.2 8.9A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.5Z" />
  ),
  bag: (
    <>
      <path d="M5 8.5h14l-1 11H6l-1-11Z" />
      <path d="M8.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.2 20c.7-3.2 3.1-5 6.8-5s6.1 1.8 6.8 5" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  star: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M5 7h14" />
      <path d="M10 11v5M14 11v5" />
      <path d="m7 7 .7 13h8.6L17 7M9 7l.8-3h4.4l.8 3" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  laptop: (
    <>
      <rect x="5" y="4" width="14" height="10" rx="1.5" />
      <path d="M3 18h18M8 18l1-3h6l1 3" />
    </>
  ),
  phone: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2v1ZM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2v1Z" />
    </>
  ),
  keyboard: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M6 13h12" />
    </>
  ),
  watch: (
    <>
      <path d="M9 3h6l1 4H8l1-4ZM9 21h6l1-4H8l1 4Z" />
      <rect x="6" y="7" width="12" height="10" rx="3" />
      <path d="M12 10v2l1 1" />
    </>
  ),
  mouse: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="5" />
      <path d="M12 3v6M10 7h4" />
    </>
  ),
  location: (
    <>
      <path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
};

export default function Icon({
  name,
  size = 20,
  strokeWidth = 1.8,
  className = "",
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
