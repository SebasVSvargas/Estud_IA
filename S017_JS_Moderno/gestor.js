function registrarUsuario(nombre, rolPpal = "usuario", ...otrosRoles){
    const usuario = {
        nombre,
        rolPpal,
        otrosRoles
    };
    usuarios = [...usuarios, usuario];
    // usuarios.push(usuario);
}

function mostrarPerfil(usuario){
    const {nombre, rolPpal, otrosRoles = []} = usuario; //deconstructuring

    if (otrosRoles.length === 0) {
            return `Usuario: ${nombre}
Rol Principal: ${rolPpal}
Sin otros roles`;
    }else   
    {    return `Usuario: ${nombre}
Rol Principal: ${rolPpal}
Otros Roles: ${otrosRoles.join(", ")}`;
    }
}

let usuarios = [
    {nombre: "Sebastian Vargas",
    rolPpal: "admin",
    otrosRoles: ["editor", "moderador"]   
    },
    {nombre: "Camila",
    rolPpal: "editor",
    otrosRoles: ["moderador"]
    }
]

registrarUsuario("Daniel", "revisor", "escritor", "moderador");
registrarUsuario("Juan", undefined, "visualizador");
registrarUsuario("David", undefined);

console.log("========= USUARIOS REGISTRADOS ============");
console.log(usuarios);

console.log("\n========= MOSTRAR TEMPLATE ============");
console.log(mostrarPerfil(usuarios[usuarios.length - 1]));

console.log("\n========= CONFIGURACIÓN DE TEMA ============");


//Añadir configuración de tema claro u oscuro para el usuario.
function configurarTema(usuario, tema = "claro") {
    return {...usuario, configuracion: {Tema: tema}}
}

console.log(configurarTema(usuarios[0],));
console.log(configurarTema(usuarios[1], "oscuro"));