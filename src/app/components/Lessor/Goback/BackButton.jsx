export default function BackButton() {
  return (
    <a href="#" className="inline-flex items-center space-x-2">
      <svg
        className="h-5 w-5 text-muted-foreground"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <span className="text-sm font-medium">Back</span>
    </a>
  );
}
