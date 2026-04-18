import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
            <Link href="/">Mi App</Link>
            </h1>
            <ul className="flex gap-6">
            <li>
                <Link href="/" className="hover:text-blue-200">
                Inicio
                </Link>
            </li>
            <li>
                <Link href="/productos/" className="hover:text-blue-200">
                Productos
                </Link>
            </li>
            <li>
                <Link href="/servicios/1" className="hover:text-blue-200">
                Servicios
                </Link>
            </li>
            </ul>
        </div>
        </nav>
    )
}