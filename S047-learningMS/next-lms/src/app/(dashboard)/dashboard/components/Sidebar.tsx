import Link from "next/link"
import { LayoutDashboard, BookOpen, Users, Settings } from "lucide-react"

export function Sidebar() {
    return (
        <aside className="w-64 border-r bg-background hidden md:flex flex-col">

        {/* LOGO */}
        <div className="h-16 flex items-center px-6 font-bold text-lg">
            NextLMS Admin
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 space-y-1">

            <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
            >
            <LayoutDashboard size={18} />
            Overview
            </Link>

            <Link
            href="/dashboard/courses"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
            >
            <BookOpen size={18} />
            Courses
            </Link>

            <Link
            href="/dashboard/students"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
            >
            <Users size={18} />
            Students
            </Link>

            <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
            >
            <Settings size={18} />
            Settings
            </Link>

        </nav>

        </aside>
    )
}