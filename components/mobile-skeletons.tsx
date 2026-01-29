
import { Skeleton } from "@/components/ui/skeleton"

export function MobileHeroSkeleton() {
    return (
        <div className="relative w-full aspect-[4/5] bg-muted">
            <Skeleton className="h-full w-full" />
        </div>
    )
}

export function MobileStoriesSkeleton() {
    return (
        <div className="w-full overflow-x-auto no-scrollbar py-4 pl-4 bg-background">
            <div className="flex gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[72px]">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export function MobileProductRailSkeleton() {
    return (
        <div className="py-6 space-y-4">
            <div className="flex items-center justify-between px-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-16" />
            </div>
            <div className="w-full overflow-x-auto no-scrollbar pl-4 pb-4">
                <div className="flex gap-4 w-max pr-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-[160px] flex-shrink-0">
                            <div className="aspect-[3/4] bg-muted rounded-2xl mb-3">
                                <Skeleton className="h-full w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function MobileShopGridSkeleton() {
    return (
        <div className="px-4 py-8">
            <Skeleton className="h-7 w-40 mb-4" />
            <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] bg-muted rounded-2xl">
                        <Skeleton className="h-full w-full" />
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center pb-8">
                <Skeleton className="h-10 w-full rounded-full" />
            </div>
        </div>
    )
}
