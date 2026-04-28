import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex flex-col">

      {/* HERO */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          NextLMS
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Plataforma moderna para crear, gestionar y escalar cursos online sin complicaciones.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">Empezar Gratis</Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/signin">Iniciar Sesión</Link>
          </Button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6 bg-muted/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          <Card>
            <CardHeader>
              <CardTitle>Gestión de Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              Crea cursos estructurados con módulos, lecciones y recursos multimedia.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analítica en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              Visualiza el progreso de estudiantes y métricas clave de aprendizaje.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Escalable</CardTitle>
            </CardHeader>
            <CardContent>
              Diseñado para crecer contigo, desde pocos usuarios hasta miles.
            </CardContent>
          </Card>

        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Planes</h2>
          <p className="text-muted-foreground mt-2">
            Elige el plan que mejor se adapte a tu operación
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          {/* BASIC */}
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-bold">$0</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>Hasta 50 estudiantes</li>
                <li>5 cursos</li>
                <li>Soporte básico</li>
              </ul>

              <Button className="w-full" asChild>
                <Link href="/signup">Comenzar</Link>
              </Button>
            </CardContent>
          </Card>

          {/* PRO */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-bold">$29/mo</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>Usuarios ilimitados</li>
                <li>Cursos ilimitados</li>
                <li>Analítica avanzada</li>
              </ul>

              <Button className="w-full" asChild>
                <Link href="/signup">Elegir Plan</Link>
              </Button>
            </CardContent>
          </Card>

          {/* ENTERPRISE */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-bold">Custom</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>Integraciones</li>
                <li>Soporte dedicado</li>
                <li>Infraestructura dedicada</li>
              </ul>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">Contactar</Link>
              </Button>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 text-center bg-muted/40">
        <h2 className="text-3xl font-bold">
          Empieza a escalar tu plataforma educativa hoy
        </h2>

        <div className="mt-6">
          <Button size="lg" asChild>
            <Link href="/signup">Crear Cuenta</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}