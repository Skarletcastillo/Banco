import Cuenta from './ClsCuenta.js';

class currentAccount extends Cuenta {
    constructor(numberAccount, balance, custumerID) {

        // overdraft = Sobregiro
        // Balance = saldo

        super(numberAccount, balance, custumerID)
        this.overdraft = 500000  // Sobregiro es de 500.000
    }

    // Metodos

   
    // Realizar retirar
    makeTransfer(monto_corriente) {
       if (monto_corriente > this.balance && monto_corriente <= this.balance + this.overdraft) {
            // Preguntar al usuario si desea usar el sobregiro
            if (confirm('Fondos insuficientes. ¿Desea utilizar el sobregiro de 500.000?')) {
                this.balance -= monto_corriente;
                registrarMovimiento("Transferencia con Sobregiro", monto_corriente, "cuenta corriente");
                console.log(`Transferencia exitosa con sobregiro. Nuevo saldo: $${this.balance}`);
            } else {
                console.log('Transferencia cancelada por el usuario.');
            }
        } else {
            console.log('Fondos insuficientes para completar la transferencia.');
        }
    }

    
}




// DOM


window.currentAccount = new currentAccount()

