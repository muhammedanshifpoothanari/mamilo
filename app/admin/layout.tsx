'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Users, Settings, Package, LogOut, Mail, AlertCircle, Ticket, Menu, Eye, Heart } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/leads", icon: Eye, label: "Leads" },
    { href: "/admin/carts", icon: ShoppingBag, label: "Carts" },
    { href: "/admin/wishlists", icon: Heart, label: "Wishlists" },
    { href: "/admin/coupons", icon: Ticket, label: "Coupons" },
    { href: "/admin/customers", icon: Users, label: "Customers" },
    { href: "/admin/emails", icon: Mail, label: "Emails" },
    { href: "/admin/subscribers", icon: Users, label: "Subscribers" },
    { href: "/admin/errors", icon: AlertCircle, label: "Error Logs", className: "text-red-600/80 hover:bg-red-50 dark:hover:bg-red-900/10" },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-zinc-950">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:block flex-shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800">
                    <Link href="/" className="text-xl font-serif font-bold">
                        Mamilo Admin
                    </Link>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${item.className || (isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800")
                                    }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        )
                    })}
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-zinc-800">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                            <LogOut size={18} />
                            Exit to Shop
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <div className="md:hidden h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center px-4 justify-between flex-shrink-0">
                    <Link href="/admin" className="text-lg font-serif font-bold">
                        Mamilo Admin
                    </Link>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800">
                                <span className="text-xl font-serif font-bold">Menu</span>
                            </div>
                            <nav className="p-4 space-y-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${item.className || (isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800")
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {item.label}
                                        </Link>
                                    )
                                })}
                                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-zinc-800">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                    >
                                        <LogOut size={18} />
                                        Exit to Shop
                                    </Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
