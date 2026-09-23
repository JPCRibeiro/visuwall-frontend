export default function UserDropdownSkeleton() {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-7 h-7 rounded-full bg-zinc-700 animate-pulse mr-1" />
      <div className="w-20 h-4 rounded bg-zinc-700 animate-pulse" />
    </div>
  );
}