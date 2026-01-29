'use client'

import Link from 'next/link'
import Image from 'next/image'

const stories = [
    { name: 'New In', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&q=80', isLive: true },
    { name: 'Best Sellers', image: 'https://images.unsplash.com/photo-1524416268818-0845245e3e12?w=200&q=80', isLive: false },
    { name: 'Sale', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&q=80', isLive: false },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=200&q=80', isLive: false },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=200&q=80', isLive: false },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=200&q=80', isLive: false },
]

export function MobileStories() {
    return (
        <div className="w-full overflow-x-auto no-scrollbar py-4 pl-4 bg-background">
            <div className="flex gap-4">
                {stories.map((story, i) => (
                    <Link key={i} href="/shop" className="flex flex-col items-center gap-2 min-w-[72px]">
                        <div className={`p-[2px] rounded-full ${story.isLive ? 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600' : 'bg-muted border border-border'}`}>
                            <div className="p-[2px] bg-background rounded-full">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <Image
                                        src={story.image}
                                        alt={story.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="text-xs font-medium text-center truncate w-full">{story.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
