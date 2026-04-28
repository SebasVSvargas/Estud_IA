"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">

            {/* LOGO */}
            <Link href="/" className="font-bold text-lg tracking-tight">
            NextLMS
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition">
                Features
            </Link>
            <Link href="#pricing" className="hover:text-foreground transition">
                Pricing
            </Link>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/signin">Sign in</Link>
            </Button>

            <Button asChild>
                <Link href="/signup">Get Started</Link>
            </Button>
            </div>
        </div>
        </header>
    )
}