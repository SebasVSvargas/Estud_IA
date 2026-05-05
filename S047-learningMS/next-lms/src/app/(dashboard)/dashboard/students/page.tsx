import { Suspense } from "react"
import StudentsTable from "./components/StudentsTable"

export default function StudentsPage() {
    return (
        <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-muted-foreground">
            Estudiantes filtrados por tenant.
            </p>
        </div>

        <Suspense fallback={<div>Cargando estudiantes...</div>}>
            <StudentsTable />
        </Suspense>
        </div>
    )
}