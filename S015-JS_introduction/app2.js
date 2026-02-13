class Membership{
    static BASIC = "Basic";
    static PREMIUM = "Premium"
    static VIP = "VIP"
}

const readline = require('readline'); //llamado Modulo de Node

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    let userName = await askQuestion('Ingrese su nombre: ');
    let age = await askQuestion('Ingrese su edad: ');
    let membershipInput = await askQuestion('Seleccione una membresía (1: Basic, 2: Premium, 3: VIP): ');

    let membership;
    switch (membershipInput) {
        case '1':
            membership = Membership.BASIC;
            break;
        case '2':
            membership = Membership.PREMIUM;
            break;
        case '3':
            membership = Membership.VIP;
            break;
        default:
            membership = 'Inválido';
            console.log('Opción no válida');
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
    rl.close();
}

main();