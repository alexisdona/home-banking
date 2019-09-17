//Declaración de variables
var nombreUsuario = "Alexis Do Nascimento";
var saldoCuenta = 20000;
var limiteExtraccion = 5000;
var montoExtraccion;
var montoDeposito;
var SUMA = 1;
var RESTA = -1;
var luz = 210;
var agua = 350;
var internet = 570;
var telefono = 425;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    limiteExtraccionAnterior = limiteExtraccion;
    limiteExtraccion = parseInt(prompt("Ingrese el nuevo límite de extracción"));
    alert(limiteExtraccion);
    if (limiteExtraccion != NaN) {
        alert("Haz modificado el límite de extracción.\n Tu límite anterior era de: $" + limiteExtraccionAnterior + "\n" + "Tu nuevo límite es de: $" + limiteExtraccion);
        actualizarLimiteEnPantalla();
    } else {
        alert("le diste cancelar");
    }
}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    montoExtraccion = parseInt(prompt("Ingrese el monto que quiere extraer"));
    if (superaLimiteExtraccion(montoExtraccion)) {
        alert("ERROR: El monto a extraer supera el límite de extracción de " + limiteExtraccion);
    } else if (superaSaldoEnCuenta(montoExtraccion)) {
        alert("ERROR: El monto a extraer supera el saldo de la cuenta:  " + saldoCuenta);
    } else if (validarMontoConBilletes(montoExtraccion)) {
        alert("Este cajero entrega sólo billetes de $100. Ingrese un monto válido");
    } else {
        modificarSaldo(montoExtraccion, RESTA);
        alert("Haz retirado: $" + montoExtraccion + "\n" + "Tu saldo anterior era: $" + saldoAnterior + "\n" + "Tu nuevo saldo es: $" + saldoCuenta)
    }
}



function superaLimiteExtraccion(monto) {
    return monto > limiteExtraccion;
}

function superaSaldoEnCuenta(monto) {
    return monto > saldoCuenta;
}

function depositarDinero() {
    montoDeposito = parseInt(prompt("Ingrese el monto a depositar"));
    var saldoAnterior = saldoCuenta;
    modificarSaldo(montoDeposito, SUMA);
    alert("Haz depositado: $" + montoDeposito + "\n" + "Tu saldo anterior era: $" + saldoAnterior + "\nTu nuevo saldo es: $" + saldoCuenta);
}

function validarMontoConBilletes(monto) {
    return (!esMultiploDeCien(monto));
}

function esMultiploDeCien(valor) {
    return valor % 100 == 0;
}

function pagarServicio() {
    var servicio;
    var montoServicio;
    var saldoAnterior = saldoCuenta;
    var nombreServicio;
    servicio = parseInt(prompt("Ingrese el servicio que quiere pagar: \n1- Agua \n2- Luz\n3- Intenet\n4- Telefono "));

    switch (servicio) {
        case parseInt(1):
            montoServicio = agua;
            nombreServicio = "Agua";
            break;
        case parseInt(2):
            montoServicio = luz;
            nombreServicio = "Luz";
            break;
        case parseInt(3):
            montoServicio = internet;
            nombreServicio = "Internet";
            break;
        case parseInt(4):
            montoServicio = telefono;
            nombreServicio = "Telefono";
            break;
        default:
            alert("ERROR: Ingrese un código de servicio válido.");
            break;
    }
    if (superaSaldoEnCuenta(montoServicio)) {
        alert("ERROR: El monto del servicio de " + nombreServicio + " de $" + montoServicio + " supera el saldo de la cuenta: " + saldoCuenta);
    } else {
        modificarSaldo(montoServicio, RESTA);
        alert("Haz pagado el servicio de " + nombreServicio + "\nTu saldo anterior era: $" + saldoAnterior + "\nDinero descontado: $" + montoServicio + "\nNuevo saldo: $" + saldoCuenta);
    }


}


function transferirDinero() {

}

function iniciarSesion() {

}

function modificarSaldo(monto, coeficiente) {
    saldoCuenta += (parseInt(monto) * parseInt(coeficiente));
    actualizarSaldoEnPantalla();

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}