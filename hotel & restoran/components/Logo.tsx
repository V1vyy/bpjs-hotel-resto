export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 4C11 4 4 11 4 20c8-2 14-8 16-16Z" fill="#4CAF50" />
      <path d="M20 4c9 0 16 7 16 16-8-2-14-8-16-16Z" fill="#B7D94C" />
      <path d="M4 20c0 9 7 16 16 16-2-8-8-14-16-16Z" fill="#1E88C7" />
    </svg>
  );
}
