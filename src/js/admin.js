document.getElementById('editToggle').addEventListener('click', function (event) {
    event.preventDefault();

    Swal.fire({
        title: 'Identifícate',
        html: `
            <input type="text" id="username" class="swal2-input" placeholder="Usuario">
            <input type="password" id="password" class="swal2-input" placeholder="Contraseña">
        `,
        confirmButtonText: 'Iniciar sesión',
        customClass: {
            popup: 'custom-modal',
            confirmButton: 'login-btn'
        },
        focusConfirm: false,
        preConfirm: () => {
            const username = Swal.getPopup().querySelector('#username').value;
            const password = Swal.getPopup().querySelector('#password').value;
            if (!username || !password) {
                Swal.showValidationMessage('Por favor, ingresa usuario y contraseña');
            }
            return { username, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { username, password } = result.value;
            if (username === 'admin' && password === 'admin') { 
                window.location.href = 'indexAdmin.html'; 
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'Por favor, intenta de nuevo.'
                });
            }
        }
    });
});
