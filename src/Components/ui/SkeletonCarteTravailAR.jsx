import { Skeleton } from "@/Components/ui/extension/skeleton"

export function SkeletonCarteTravailAR() {
    return (
        <div className="flex flex-col space-y-3 w-full ">
            <div className="space-y-2 w-full">
                <Skeleton className="h-4 mb-5 w-[200px]" />
                <Skeleton className="h-4 w-w-full" />
                <Skeleton className="h-4 w-[350px]" />
                <Skeleton className="h-4 w-[250px]" />
            </div>
        </div>
    )
}