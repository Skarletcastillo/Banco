const MAX_INTENTOS = 3;


class Custumer {

    constructor(name, lastname, address, IDnumber) {
        this.name = name
        this.lastname = lastname
        this.address = address
        this.IDnumber = IDnumber
        this.intentos = 0;
        this.initEventListeners();
    }

    iniciarSesion() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Obtener los datos almacenados
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        if (email === storedEmail && password === storedPassword) {
            alert('Inicio de sesión exitoso');
            window.location.href = '/FROTNED/HTML/tipoCuenta.html';
        } else {
            this.intentos++;
            alert(`Email o contraseña incorrectos. Intento ${this.intentos} de ${MAX_INTENTOS}`);
            if (this.intentos >= MAX_INTENTOS) {
                alert('Has excedido el número máximo de intentos.');
                // Bloquear el botón de inicio de sesión
                document.querySelector('.boton2').disabled = true;
            }
        }
    }

    registrarse() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Guardar los datos en el almacenamiento local
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        alert(`Usuario registrado con Email: ${email}`);
    }

    initEventListeners() {
        const registroBtn = document.getElementById('registro');
        if (registroBtn) {
            registroBtn.addEventListener('click', () => this.registrarse());
        }
    }
}

// const togglePassword = document.getElementById('togglePassword');
// togglePassword.addEventListener('click', function () {
//     const passwordInput = document.getElementById('password');
//     const type = passwordInput.type === 'password' ? 'text' : 'password';
//     passwordInput.type = type;
//     this.classList.toggle('fa-eye-slash');
// });



// Instanciando la clase Autenticacion y asignándola al contexto global
window.Custumer = new Custumer();

