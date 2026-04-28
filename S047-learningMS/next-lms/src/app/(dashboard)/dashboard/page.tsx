import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
    return (
        <div className="space-y-6">

        {/* HEADER */}
        <div>
            <h1 className="text-3xl font-bold">
            Dashboard
            </h1>
            <p className="text-muted-foreground">
            Resumen general de NextLMS
            </p>
        </div>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-3">

            <Card>
            <CardHeader>
                <CardTitle>Estudiantes</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                1,240
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Cursos</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                32
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Progreso</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                78%
            </CardContent>
            </Card>

        </div>

        {/* CHART PLACEHOLDER */}
        <Card>
            <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            Aquí puedes conectar Recharts o Grafana luego
            </CardContent>
        </Card>

        </div>
    )
}