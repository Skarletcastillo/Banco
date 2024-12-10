class Cuenta {
    constructor(saldoAhorros, saldoCorriente) {
        this.saldoAhorros = saldoAhorros || 0;
        this.saldoCorriente = saldoCorriente || 0;
        this.sobregiro = parseInt(localStorage.getItem('overdraft')) || 0;

    }

    //cambiarle el nombre a la funcion 
    MostrarSaldo() {
        if (document.getElementById('saldo-ahorro') && this.saldoAhorros) {
            document.getElementById('saldo-ahorro').innerText = parseFloat(localStorage.getItem('saldoAhorros')) || 0;
        }

        if (document.getElementById('saldo-corriente') && this.saldoCorriente) {
            document.getElementById('saldo-corriente').innerText = parseFloat(localStorage.getItem('saldoCorriente')) || 0;
        }
    }
    //pendiente por rreglar

    registrarMovimiento(tipo, monto, cuenta) {
        const movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
        movimientos.push({ tipo, monto, cuenta, fecha: new Date().toLocaleString() });
        localStorage.setItem('movimientos', JSON.stringify(movimientos));
        console.log(`Movimiento registrado: ${tipo} de $${monto} en ${cuenta}`);
    }


    retirar(monto_ahorro, monto_corriente) {
        if (!isNaN(monto_ahorro) && monto_ahorro > 0) {
            if (monto_ahorro <= this.saldoAhorros) {
                this.saldoAhorros -= monto_ahorro;
                localStorage.setItem('saldoAhorros', this.saldoAhorros);
                this.MostrarSaldo();
                this.registrarMovimiento("Retiro", monto_ahorro, "cuenta de ahorros");
                alert("Retiro de cuenta de ahorros exitoso");
            } else {
                alert("Saldo insuficiente en la cuenta de ahorros");
            }
        } else if (!isNaN(monto_corriente) && monto_corriente > 0) {
            if (monto_corriente <= this.saldoCorriente) {
                this.saldoCorriente -= monto_corriente;
                localStorage.setItem('saldoCorriente', this.saldoCorriente);
                this.MostrarSaldo();
                this.registrarMovimiento("Retiro", monto_corriente, "cuenta corriente");
                alert("Retiro de cuenta corriente exitoso");

            } else if ((this.saldoCorriente >= 0 && monto_corriente <= this.saldoCorriente + this.sobregiro) || (this.saldoCorriente <= 0 && monto_corriente <= this.sobregiro)) {
                
                if (confirm('Fondos insuficientes. ¿Desea utilizar el sobregiro de 500.000?')) {
                    //que pasaria si tengo 100 pesos en la cuenta, quiero retirar 200, entonces al saldo de mi cuenta solo
                    //presta 100 y al saldo de sobregiro tambien solo 100
                    if (this.saldoCorriente >= 0) {
                        let dinero = monto_corriente - this.saldoCorriente
                        this.sobregiro -= dinero;
                    }else{
                        this.sobregiro -= monto_corriente;
                    }
                    this.saldoCorriente -= monto_corriente;

                    localStorage.setItem('overdraft', this.sobregiro);
                    localStorage.setItem('saldoCorriente', this.saldoCorriente);
                    this.MostrarSaldo();
                    this.registrarMovimiento("Retiro con Sobregiro", monto_corriente, "cuenta corriente");
                    alert("Retiro con sobregiro exitoso");
                } else {
                    alert('Transferencia cancelada por el usuario.');
                }
            } else {
                alert('Fondos insuficientes para completar la transferencia.');
            }
        } else {
            alert("Por favor, ingrese un monto válido");
        }
    }



    //cambiar el id de monto como parametro a: monto-ahorro y monto corriente 

    consignar(monto_ahorro, monto_corriente) {
        if (!isNaN(monto_ahorro) && monto_ahorro > 0) {
            this.saldoAhorros += monto_ahorro;
            localStorage.setItem('saldoAhorros', parseFloat(this.saldoAhorros));
            this.MostrarSaldo();
            this.registrarMovimiento("Consignación", monto_ahorro, "cuenta de ahorros");
            alert("Consignación en cuenta de ahorros exitosa")

        } else if (!isNaN(monto_corriente) && monto_corriente > 0) {
            let saldoPendiente = localStorage.getItem('overdraft');
            if(saldoPendiente < 500000 && (parseFloat(saldoPendiente) + parseFloat(monto_corriente)) <= 500000){
                localStorage.setItem('overdraft', parseFloat(saldoPendiente) + parseFloat(monto_corriente));

                this.saldoCorriente += parseFloat(monto_corriente);
                localStorage.setItem('saldoCorriente', parseFloat(this.saldoCorriente));
            }else if(saldoPendiente < 500000 && (parseFloat(saldoPendiente) + parseFloat(monto_corriente)) > 500000){
                const saldoRestante = (parseFloat(saldoPendiente) + parseFloat(monto_corriente)) - 500000
                localStorage.setItem('overdraft', parseFloat(saldoPendiente) + (parseFloat(monto_corriente) - parseFloat(saldoRestante)));

                this.saldoCorriente += parseFloat(monto_corriente);
                localStorage.setItem('saldoCorriente', parseFloat(this.saldoCorriente));
            }else{
                this.saldoCorriente += parseFloat(monto_corriente);
                localStorage.setItem('saldoCorriente', parseFloat(this.saldoCorriente));
            }

            this.MostrarSaldo();
            this.registrarMovimiento("Consignación", monto_corriente, "cuenta corriente");
            alert("Consignación en cuenta corriente exitosa");

        } else {
            alert("Por favor, ingrese un monto válido");
        }
    }


    //mirar como cambio esto
    //   
    mostrarMovimientos() {
        const tablaCuerpo = document.getElementById('tabla-cuerpo');
        tablaCuerpo.innerHTML = '';
        const movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
        movimientos.forEach(mov => {
            const fila = document.createElement('tr');
            fila.innerHTML = `<td>${mov.fecha}</td><td>${mov.tipo}</td><td>${mov.monto}</td><td>${mov.cuenta}</td>`;
            tablaCuerpo.appendChild(fila);
        });
        this.MostrarSaldo();
    }


}

// fin de clase


document.addEventListener('DOMContentLoaded', () => {
    // Aquí puedes obtener los valores iniciales de otra fuente, por ejemplo, desde localStorage o entradas de usuario
    let saldoAhorrosInicial = parseFloat(localStorage.getItem('saldoAhorros')) || 0;
    let saldoCorrienteInicial = parseFloat(localStorage.getItem('saldoCorriente')) || 0;

    //instancia de la clase 
    const cuenta = new Cuenta(saldoAhorrosInicial, saldoCorrienteInicial);

    //funcion que para cuando se le de clcik se retire 
    const btnRetirar = document.getElementById("btn-retirar");
    if (btnRetirar) {
        btnRetirar.addEventListener("click", () => {
            let monto_ahorro = 0;
            let monto_corriente = 0;

            if (document.querySelector('#monto_ahorro')) {
                monto_ahorro = parseFloat(document.getElementById("monto_ahorro").value);
            }

            if (document.querySelector('#monto_corriente')) {
                monto_corriente = parseFloat(document.getElementById("monto_corriente").value);
            }

            cuenta.retirar(monto_ahorro, monto_corriente);
        });
    }


    //funcion que para cuando se le de clcik se consigne 
    const btnConsignar = document.getElementById("btn-consignar");
    if (btnConsignar) {
        btnConsignar.addEventListener("click", () => {
            let monto_ahorro = 0;
            let monto_corriente = 0;

            if (document.querySelector('#monto_ahorro')) {
                monto_ahorro = parseFloat(document.getElementById("monto_ahorro").value);
            }

            if (document.querySelector('#monto_corriente')) {
                monto_corriente = parseFloat(document.getElementById("monto_corriente").value);
            }

            cuenta.consignar(monto_ahorro, monto_corriente);
        });
    }

    if (document.getElementById("tabla-cuerpo")) {
        cuenta.mostrarMovimientos();
    }
});

// Verificar si un ítem con la clave 'miItem' existe en localStorage
if (localStorage.getItem('saldoAhorros') !== null && document.querySelector('#saldo-ahorro')) {
    const ahorros = document.querySelector('#saldo-ahorro').innerHTML = JSON.parse(localStorage.getItem('saldoAhorros'));
}
if (localStorage.getItem('saldoCorriente') !== null && document.querySelector('#saldo-corriente')) {
    const corriente = document.querySelector('#saldo-corriente').innerHTML = JSON.parse(localStorage.getItem('saldoCorriente'));
}

//Para llenar el atributo "overdraft" del localStorage primero se debe de validar si el atributo es nulo,
// si no es nulo significa que ya se le han realizado movimientos (puede tener un rango entre 0 a 500,000)

//Set es enviar 
if (localStorage.getItem('overdraft') == null) {
    localStorage.setItem('overdraft', 500000)
}

window.Cuenta = new Cuenta();

export default Cuenta