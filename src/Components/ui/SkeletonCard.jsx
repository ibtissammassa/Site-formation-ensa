import { Skeleton } from "@/Components/ui/extension/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 w-[90%] h-26">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2 w-full">
                <Skeleton className="h-4 " />
                <Skeleton className="h-4 " />
            </div>
        </div>
    )
}
