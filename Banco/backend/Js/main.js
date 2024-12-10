import cuenta from "./ClsCuenta.Js";


// Función para manejar el formulario sirve oara que el boton tipo submit no refresque la ventana 
document.getElementById('balanceForm').addEventListener('submit', function (event) {

    event.preventDefault();

    // obtener valores del Form
    const numberAccount = document.getElementById('numberAccount').value;
    const balance = parseInt(document.getElementById('balance').value);
    const custumerID = parseFloat(document.getElementById('custumerID').value);

    // Crear objeto Factura
    const cuentaClass = new cuenta(numberAccount, balance, custumerID );
    
    // Imprimir Facuta
    document.getElementById('resultado').innerHTML = cuentaClass.checkBalance();


});