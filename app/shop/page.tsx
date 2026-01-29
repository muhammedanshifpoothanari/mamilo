'use client'

import { useState, useEffect, useMemo } from 'react'
import { products } from "@/lib/data"
import { useRouter, useSearchParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { MobileProductCard } from '@/components/mobile-product-card'
import { ProductSkeleton } from '@/components/product-skeleton'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Filter, X, ChevronDown } from 'lucide-react'

/* ... imports ... */
import { useLanguage } from '@/context/language-context'

// Use static data from lib/data
const allProducts = products;

const ITEMS_PER_PAGE = 8

export default function ShopPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()

  const currentPage = Number(searchParams.get('page')) || 1
  const sortBy = searchParams.get('sort') || 'featured'

  // Only show loading if actually needed (example: future real data fetch).
  // For now with mock data, we default to false to instant load.
  // const [isLoading, setIsLoading] = useState(false) but let's keep it usable to "simulate" if we wanted, but default to false.

  // Actually, let's just make it fast/instant as requested.
  // We can remove the effect entirely.

  const occasions = ['Birthday', 'Wedding', 'Party', 'Holiday']
  const colors = ['Pink', 'White', 'Ivory', 'Blue', 'Purple', 'Red']
  const sizes = ['6M', '12M', '18M', '2T', '3T', '4T', '5T', '6T']

  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions(prev =>
      prev.includes(occasion)
        ? prev.filter(o => o !== occasion)
        : [...prev, occasion]
    )
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/shop?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', value)
    params.set('page', '1') // Reset to page 1 on sort
    router.push(`/shop?${params.toString()}`)
  }

  // Slice products for current page
  // Fix for ReferenceErrors - mapping infinite scroll concepts to  // Sorting State
  const [sortOption, setSortOption] = useState("featured")

  // Filter State
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
    handlePageChange(1)
  }

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
    handlePageChange(1)
  }

  const handleClearFilters = () => {
    setPriceRange([0, 200])
    setSelectedOccasions([])
    setSelectedColors([])
    setSelectedSizes([])
    handlePageChange(1)
  }

  // Filter Products
  const filteredProducts = products.filter(product => {
    // 1. Occasion Filter
    if (selectedOccasions.length > 0 && !selectedOccasions.includes(product.occasion)) {
      return false
    }

    // 2. Price Filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // 3. Color Filter
    if (selectedColors.length > 0) {
      const hasColor = product.colors.some((c: any) =>
        typeof c === 'string'
          ? selectedColors.includes(c)
          : selectedColors.includes(c.name)
      )
      if (!hasColor) return false
    }

    // 4. Size Filter
    if (selectedSizes.length > 0) {
      const hasSize = product.sizes.some(s => selectedSizes.includes(s))
      if (!hasSize) return false
    }

    return true
  }).sort((a, b) => {
    // Sorting Logic
    if (sortOption === "price-asc") return a.price - b.price
    if (sortOption === "price-desc") return b.price - a.price
    if (sortOption === "newest") return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1
    if (sortOption === "featured") return (a.isBestseller === b.isBestseller) ? 0 : a.isBestseller ? -1 : 1
    return 0
  })

  // Pagination Logic
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCategoryChange = (category: string) => {
    // Map "All" to clearing filters, specific categories to single selection
    if (category === "All") {
      handleClearFilters()
    } else {
      // Assuming categories map to occasions for now
      if (occasions.includes(category)) {
        setSelectedOccasions([category])
      }
    }
    handlePageChange(1)
  }

  // Aliases for compatibility
  const visibleProducts = currentProducts
  const isLoadingMore = false
  const hasMore = currentPage < totalPages
  const loadMore = () => handlePageChange(currentPage + 1)


  return (
    <div className="min-h-screen pt-14 lg:pt-0">
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <MobileNavigation />

      {/* Mobile Sticky Header */}
      <div className="lg:hidden sticky top-14 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-serif font-bold">Shop</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-2 active:scale-95 transition-transform"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="h-4 w-4 mr-1.5" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
          {['All', 'Birthday', 'Wedding', 'Holiday', 'Party'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleCategoryChange(filter)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border border-transparent active:scale-95 transition-transform ${(filter === 'All' && selectedOccasions.length === 0) || selectedOccasions.includes(filter)
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 hover:bg-secondary'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Hero/Header - Desktop Only */}
      <section className="bg-secondary/30 py-16 md:py-20 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-balance">
              {t('shop.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              {t('shop.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-serif font-semibold text-lg mb-4">{t('shop.filters')}</h3>
              </div>

              {/* Occasion Filter */}
              <div>
                <h4 className="font-medium mb-3">{t('shop.occasion')}</h4>
                <div className="space-y-2">
                  {occasions.map((occasion) => (
                    <div key={occasion} className="flex items-center space-x-2">
                      <Checkbox
                        id={`occasion-${occasion}`}
                        checked={selectedOccasions.includes(occasion)}
                        onCheckedChange={() => toggleOccasion(occasion)}
                      />
                      <Label
                        htmlFor={`occasion-${occasion}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {occasion}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium mb-3">{t('shop.priceRange')}</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={200}
                  step={10}
                  className="mb-2"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h4 className="font-medium mb-3">{t('shop.color')}</h4>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => toggleColor(color)}
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="font-medium mb-3">{t('shop.size')}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSize(size)}
                      className={`h-10 bg-transparent active:scale-95 transition-transform ${selectedSizes.includes(size)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        : ""
                        }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent active:scale-95 transition-transform"
                onClick={handleClearFilters}
              >
                {t('shop.clearFilters')}
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground hidden lg:block">
                  {t('shop.showingResults')} {currentProducts.length}
                </p>
                <p className="text-sm text-muted-foreground lg:hidden">
                  {allProducts.length} Results
                </p>
              </div>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px] h-10 active:scale-95 transition-transform">
                  <SelectValue placeholder={t('shop.sort')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filters Modal */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 bg-background lg:hidden flex flex-col animate-in slide-in-from-bottom duration-300">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h3 className="font-serif font-bold text-lg">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="active:scale-95 transition-transform"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Reuse filters... simplified for brevity, in real app extract to component */}
                  {/* Occasion Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Occasion</h4>
                    <div className="space-y-2">
                      {occasions.map((occasion) => (
                        <div key={occasion} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-occasion-${occasion}`}
                            checked={selectedOccasions.includes(occasion)}
                            onCheckedChange={() => toggleOccasion(occasion)}
                          />
                          <Label
                            htmlFor={`mobile-occasion-${occasion}`}
                            className="text-sm font-normal"
                          >
                            {occasion}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={200}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t bg-background">
                  <Button
                    className="w-full active:scale-95 transition-transform"
                    size="lg"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Show Results
                  </Button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-12">
              {visibleProducts.map((product, i) => (
                <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="lg:hidden">
                    <MobileProductCard {...product} />
                  </div>
                  <div className="hidden lg:block">
                    <ProductCard {...product} />
                  </div>
                </div>
              ))}

              {/* Loader for Infinite Scroll */}
              {isLoadingMore && (
                Array.from({ length: 4 }).map((_, i) => (
                  <ProductSkeleton key={`skeleton-${i}`} />
                ))
              )}
            </div>

            {/* Load More Trigger */}
            {hasMore && !isLoadingMore && (
              <div className="flex justify-center mt-8 pb-12">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 active:scale-95 transition-transform"
                >
                  {t('shop.loadMore')}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {!hasMore && filteredProducts.length > 0 && (
              <div className="text-center text-muted-foreground pb-12">
                {t('shop.viewedAll')}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-lg font-serif">{t('shop.noResults')}</h3>
                <p className="text-muted-foreground">{t('shop.tryAdjusting')}</p>
                <Button
                  variant="link"
                  onClick={handleClearFilters}
                >
                  {t('shop.clearFilters')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
    </div>
  )
}
