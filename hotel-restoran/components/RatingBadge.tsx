export function RatingBadge({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="#111827" aria-hidden="true">
        <path d="M6 0l1.8 3.7 4.2.6-3 2.9.7 4.1L6 9.4 2.3 11.3l.7-4.1-3-2.9 4.2-.6L6 0z" />
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}
