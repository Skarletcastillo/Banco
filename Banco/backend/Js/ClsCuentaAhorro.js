
import Cuenta from "./ClsCuenta.js";
class accountSavings extends Cuenta { // Extiende la clase Cuenta
    
    constructor(saldoAhorros, saldoCorriente) {

        // Llamada al constructor de la clase padre
        super (saldoAhorros, saldoCorriente)
        this.movement = []; // Lista para almacenar los movimientos
    }

    // Métodos
    // Consultar movimientos
    agregarMovimiento(tipo, balance) {
        const movement = {
            tipo: tipo,
            balance: balance,
            fecha: new Date()
        };
        this.movement.push(movement); // Push ayuda a agregar info a una lista en JSON
    }
}

window.accountSavings = new accountSavings();



