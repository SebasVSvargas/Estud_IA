import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getStudents } from "@/lib/data/students"
import { getTenantId } from "@/lib/getTenant"

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
})

export default async function StudentsTable() {
    const tenantId = await getTenantId()
    const { tenant, students } = await getStudents(tenantId)

    return (
        <Card>
        <CardHeader>
            <CardTitle>Estudiantes por tenant</CardTitle>
            <CardDescription>
            Usuarios con rol estudiante del tenant {tenant.name} ({tenant.slug})
            </CardDescription>
        </CardHeader>

        <CardContent>
            <div className="mb-4 flex items-center justify-between border rounded-md px-4 py-3">
            <div>
                <p className="font-medium">Tenant actual</p>
                <p className="text-sm text-muted-foreground">{tenant.name}</p>
            </div>

            <Badge variant="outline">{students.length} estudiantes</Badge>
            </div>

            <div className="space-y-4">
            {students.length === 0 && (
                <p className="text-muted-foreground">
                Este tenant no tiene estudiantes registrados todavía.
                </p>
            )}

            {students.map((student) => (
                <div
                    key={student.id}
                    className="flex flex-col gap-4 border rounded-md p-4 md:flex-row md:items-center md:justify-between"
                    >
                    <div className="space-y-2">
                        <div>
                        <h3 className="font-semibold">
                            {student.name || "Sin nombre"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {student.email || "Sin correo"}
                        </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                        <Badge variant={student.isActive ? "default" : "secondary"}>
                            {student.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                        <Badge variant={student.emailVerified ? "outline" : "secondary"}>
                            {student.emailVerified ? "Email verificado" : "Pendiente de verificación"}
                        </Badge>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground md:text-right">
                        <p>{student._count.enrollments} inscripciones</p>
                        <p>Registro: {dateFormatter.format(student.createdAt)}</p>
                    </div>
                </div>
            ))}
            </div>
        </CardContent>
        </Card>
    )
}