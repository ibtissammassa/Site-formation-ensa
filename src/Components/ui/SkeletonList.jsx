import { Skeleton } from "@/Components/ui/extension/skeleton"

export function SkeletonList() {
    return (
        <div className="flex flex-col space-y-3 w-full h-full">
            <div className="border-b py-4 flex flex-col gap-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="border-b py-4 flex flex-col gap-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="border-b py-4 flex flex-col gap-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="border-b py-4 flex flex-col gap-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}