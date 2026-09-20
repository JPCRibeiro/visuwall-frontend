export function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/10 ${className}`} />;
}