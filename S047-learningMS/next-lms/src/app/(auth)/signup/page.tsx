"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SignUpForm } from "../components/signup-form"

export default function SignUpPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* LEFT - FORM */}
        <div className="flex items-center justify-center px-6">
            <Card className="w-full max-w-md border-none shadow-none">

            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                Crear cuenta
                </CardTitle>
                <CardDescription>
                Empieza a usar NextLMS gratis
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

                {/* <div className="space-y-2">
                <Input placeholder="Nombre completo" />
                <Input placeholder="Correo electrónico" type="email" />
                <Input placeholder="Contraseña" type="password" />
                </div>

                <Button className="w-full">
                Crear cuenta
                </Button> */}
                <SignUpForm />

                {/* SOCIAL LOGIN */}
                <div className="space-y-2 pt-2">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                    Continuar con Google
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                >
                    Continuar con GitHub
                </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground pt-2">
                ¿Ya tienes cuenta?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                    Inicia sesión
                </Link>
                </div>

            </CardContent>
            </Card>
        </div>

        {/* RIGHT - VISUAL */}
        <div className="hidden md:flex items-center justify-center bg-black text-white relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />

            <div className="relative text-center px-10">
            <h2 className="text-3xl font-bold">
                Educación digital moderna
            </h2>
            <p className="text-white/60 mt-4">
                Crea cursos, gestiona estudiantes y escala tu conocimiento.
            </p>
            </div>

        </div>

        </div>
    )
}