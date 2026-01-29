import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeleton() {
    return (
        <Card className="overflow-hidden border-0 shadow-sm">
            <CardContent className="p-0">
                <div className="aspect-[3/4] overflow-hidden relative bg-muted">
                    <Skeleton className="h-full w-full" />
                </div>
                <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-3/4 rounded-full" />
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-4 w-8 rounded-full" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
