'use client'

import Link from 'next/link'
import Image from 'next/image'

const stories = [
    { name: 'New In', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&q=80', isLive: true },
    { name: 'Best Sellers', image: '/pink1.webp', isLive: false },
    { name: 'Sale', image: '/white.webp', isLive: false },
    { name: 'Dresses', image: '/red.webp', isLive: false },
    { name: 'Shoes', image: '/white2.webp', isLive: false },
    { name: 'Accessories', image: '/pink3.webp', isLive: false },
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
