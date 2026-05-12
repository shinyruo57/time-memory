export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-4 space-y-3">
      <div className="shimmer-bg rounded-lg w-full h-40" />
      <div className="space-y-2">
        <div className="shimmer-bg rounded h-5 w-3/4" />
        <div className="shimmer-bg rounded h-3 w-full" />
        <div className="shimmer-bg rounded h-3 w-2/3" />
      </div>
      <div className="flex gap-2">
        <div className="shimmer-bg rounded-full h-6 w-12" />
        <div className="shimmer-bg rounded-full h-6 w-16" />
      </div>
    </div>
  )
}
