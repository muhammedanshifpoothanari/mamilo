'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
        title: 'Spring Collection',
        subtitle: 'New Arrivals',
        cta: 'Shop Now'
    },
    {
        image: '/white.webp',
        title: 'Christening',
        subtitle: 'Pure & Blessed',
        cta: 'Explore'
    },
    {
        image: '/red.webp',
        title: 'Holiday Season',
        subtitle: 'Festive Magic',
        cta: 'View Offers'
    }
]

export function MobileHeroSlider() {
    const [current, setCurrent] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        if (containerRef.current) {
            const scrollLeft = containerRef.current.scrollLeft
            const width = containerRef.current.offsetWidth
            const index = Math.round(scrollLeft / width)
            setCurrent(index)
        }
    }

    return (
        <div className="relative w-full aspect-[4/5] bg-muted">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full h-full flex overflow-x-auto no-scrollbar snap-x snap-mandatory"
            >
                {slides.map((slide, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0 relative snap-center">
                        <Link href="/shop" className="block w-full h-full relative group active:scale-[0.98] transition-all">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority={i === 0}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 pb-12 text-white">
                                <span className="text-sm font-medium mb-1 opacity-90 backdrop-blur-sm bg-white/20 self-start px-2 py-0.5 rounded-full">{slide.subtitle}</span>
                                <h2 className="text-3xl font-serif font-bold mb-3">{slide.title}</h2>
                                <Button size="sm" variant="secondary" className="self-start text-xs font-semibold px-6 pointer-events-none">
                                    {slide.cta}
                                </Button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full ${current === i ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    )
}
