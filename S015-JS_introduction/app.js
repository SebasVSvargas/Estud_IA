
// let nombre = "Sebastian"
// let edad = 29
// let ciudad = "Medellín"

// let info = [nombre, edad, ciudad]

// for (const element of info) 
// {    
//     console.log(element)
// }

// if(edad >= 18){
//     console.log("La persona puede tomar licor")
// }else{
//     console.log("Lo siento, prohibido el expendio de bebidas alcoholicas a menores de edad")
// }

// info.forEach(currentItem => {
//     console.log(currentItem)
// });


class Membership{
    static BASIC = "Basic";
    static PREMIUM = "Premium"
    static VIP = "VIP"
}

// let userName = prompt('Ingrese su nombre: ');
// let age = prompt('ingrese su edad: ')
// let membership = prompt('Seleccione una membresía (1: Basic, 2: Premium, 3: VIP): ');

let userName = "Sebastian VS";
let age = 18
let membership = Membership.VIP;

// switch (membership) {
//     case '1':
//         membership = Membership.BASIC
//         break
//     case '2':
//         membership = Membership.PREMIUM
//         break
//     case '3':
//         membership = Membership.VIP
//         break
//     default:
//         membership = 'Inválido'
//         console.log('Opción no válida')
// }

if (age < 18) {
    console.log("NO PUEDE ACCEDER AL SISTEMA, pidale permiso a un adulto responsable.");
} else {
    switch (membership) {
        case Membership.BASIC:
            console.log("Acceso Limitado");
            break;
        case Membership.PREMIUM:
            console.log("Acceso Completo");
            break;
        case Membership.VIP:
            console.log("Acceso Completo + Soporte prioritario");
            break;
        default:
            console.log("No tiene membresia, SEGURIDAD!");
    }
}


function VerificarAcceso(userName, age, membership) {
    if (isNaN(age) || age < 0) {
        console.log(`${userName}, Edad inválida.`);
        return;
    }
    if (age < 18) {
        console.log(`${userName}, NO PUEDE ACCEDER AL SISTEMA, pidale permiso a un adulto responsable.`);
    } else {
        switch (membership) {
            case Membership.BASIC:
                console.log(`${userName}, Acceso Limitado`);
                break;
            case Membership.PREMIUM:
                console.log(`${userName}, Acceso Completo`);
                break;
            case Membership.VIP:
                console.log(`${userName}, Acceso Completo + Soporte prioritario`);
                break;
            default:
                console.log(`${userName}, No tiene membresía válida, SEGURIDAD!`);
        }
    }
}

// Llamadas de prueba con datos hardcodeados
VerificarAcceso("Sebastian VS", 18, Membership.VIP);
VerificarAcceso("Ana", 16, Membership.BASIC);
VerificarAcceso("Carlos", 25, Membership.PREMIUM);
VerificarAcceso("Luis", 30, "Inválido");