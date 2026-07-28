export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-12 w-full animate-pulse rounded-2xl bg-[#ffe9e9]" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-24 animate-pulse rounded-2xl bg-[#ffe9e9]" />
        <div className="h-24 animate-pulse rounded-2xl bg-[#ffe9e9]" />
      </div>
      <div className="h-48 animate-pulse rounded-2xl bg-[#fff8f7]" />
    </div>
  )
}
