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
var cuentaAmiga1 = parseInt(1234567);
var cuentaAmiga2 = parseInt(7654321);
var codigoVerificacion = "aefnio123";
var saldoDeBloqueo = 0;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    limiteExtraccionAnterior = limiteExtraccion;
    limiteExtraccionNuevo = parseInt(prompt("Ingrese el nuevo límite de extracción"));
    if (!isNaN(limiteExtraccionNuevo)) {
        limiteExtraccion = limiteExtraccionNuevo;
        alert("Has modificado el límite de extracción.\n Tu límite anterior era de: $" + limiteExtraccionAnterior + "\n" + "Tu nuevo límite es de: $" + limiteExtraccion);
        actualizarLimiteEnPantalla();
    } else {
        alert("ERROR: Debe ingresar un valor válido!");
    }
}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    montoExtraccion = parseInt(prompt("Ingrese el monto que quiere extraer"));
    if (!isNaN(montoExtraccion)) {
        if (superaLimiteExtraccion(montoExtraccion)) {
            alert("ERROR: El monto a extraer supera el límite de extracción de " + limiteExtraccion);
        } else if (superaSaldoEnCuenta(montoExtraccion)) {
            alert("ERROR: El monto a extraer supera el saldo de la cuenta:  " + saldoCuenta);
        } else if (validarMontoConBilletes(montoExtraccion)) {
            alert("Este cajero entrega sólo billetes de $100. Ingrese un monto válido");
        } else {
            modificarSaldo(montoExtraccion, RESTA);
            alert("Has retirado: $" + montoExtraccion + "\n" + "Tu saldo anterior era: $" + saldoAnterior + "\n" + "Tu nuevo saldo es: $" + saldoCuenta)
        }
    } else {
        alert("ERROR: Debe ingresar un valor válido!");
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
    if (!isNaN(montoDeposito)) {
        modificarSaldo(montoDeposito, SUMA);
        alert("Has depositado: $" + montoDeposito + "\n" + "Tu saldo anterior era: $" + saldoAnterior + "\nTu nuevo saldo es: $" + saldoCuenta);
    } else {
        alert("ERROR: Debe ingresar un valor válido.");
    }
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
    var error = 0;
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
            error += 1;
            break;
    }
    if (error == 0) {
        if (superaSaldoEnCuenta(montoServicio)) {
            alert("ERROR: El monto del servicio de " + nombreServicio + " de $" + montoServicio + " supera el saldo de la cuenta: " + saldoCuenta);
        } else {
            modificarSaldo(montoServicio, RESTA);
            alert("Has pagado el servicio de " + nombreServicio + "\nTu saldo anterior era: $" + saldoAnterior + "\nDinero descontado: $" + montoServicio + "\nNuevo saldo: $" + saldoCuenta);
            actualizarSaldoEnPantalla();
        }
    }


}


function transferirDinero() {
    var montoTransferencia = parseInt(prompt("Ingrese el monto que desea transferir"));
    if (!isNaN(montoTransferencia)) {
        if (superaSaldoEnCuenta(montoTransferencia)) {
            alert("ERROR: El monto a transferir supera el saldo de la cuenta: " + saldoCuenta);
        } else {
            var cuentaAmiga = parseInt(prompt("Ingrese la cuenta amiga a la que le quiere transferir"));
            if ((cuentaAmiga == cuentaAmiga1) || (cuentaAmiga == cuentaAmiga2)) {
                alert("Se han transferido: $" + montoTransferencia + "\nCuenta destino: " + cuentaAmiga);
                modificarSaldo(montoTransferencia, RESTA);
                actualizarSaldoEnPantalla();
            } else {
                alert("ERROR: La cuenta ingresada no pertenece a ninguna cuenta amiga");
            }
        }
    } else {
        alert("ERROR: Debe ingresar un valor válido!");
    }


}

function iniciarSesion() {
    var codigoVerificacionAux = prompt("Bienvenido al HomeBanking. Ingrese su código de verificaion");
    if (codigoVerificacionAux == codigoVerificacion) {
        alert("Bienvenido " + nombreUsuario + " ya podés comenzar a realizar operaciones");
    } else {
        alert("El código ingresado es incorrecto. Bloquearemos el acceso a tu saldo por seguridad.")
        saldoCuenta = saldoDeBloqueo;
        actualizarSaldoEnPantalla();
    }

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