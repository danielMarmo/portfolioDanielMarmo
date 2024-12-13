let trabajos = [];
let trabajoEditando = null;
const formularioTrabajos = document.getElementById('formularioTrabajos');

/******************************************************************************/
// Contactar con el json que tengo hosteado en jsonbin

const binId = "675b13efad19ca34f8da0da6";
const apiKey = "$2a$10$1tb.LqxA5Bznk0fa5HaBye14/OgHPZzvJjKgjohMVU0Rea1MdJvQq";
const url = `https://api.jsonbin.io/v3/b/${binId}`;

fetch(url, {
    headers: {
        "X-Master-Key": apiKey,
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        const jsonContent = data.record;
        trabajos = jsonContent.trabajos;
        procesarTrabajos(trabajos);
    })
    .catch(error => {
        console.error('Hubo un problema:', error);
    });


/******************************************************************************/
// Procesar los Trabajos que estan en el json 

function procesarTrabajos(trabajos) {
    let plantillaTrabajo = document.getElementById("plantillaTrabajo");
    let contenedor = document.querySelector(".trabajo");

    contenedor.innerHTML = "";

    trabajos.forEach((trabajo, index) => {
        let tarjeta = plantillaTrabajo.cloneNode(true);
        tarjeta.classList.remove("d-none");
        tarjeta.classList.add("trabajo-card");
        contenedor.appendChild(tarjeta);

        let nombre = tarjeta.querySelector("#nombreTrabajo");
        nombre.textContent = trabajo.nombre;

        let fecha = tarjeta.querySelector("#fechaTrabajo");
        fecha.classList.add("text-secondary");
        fecha.textContent = `${formatearFecha(trabajo.fechaInicio)} - ${formatearFecha(trabajo.fechaFin)}`;

        let descripcion = tarjeta.querySelector("#descripcionTrabajo");
        descripcion.textContent = trabajo.descripcion;

        agregarEventosEliminar(index);
        agregarEventosEditar(index, trabajo);
    });
}

function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

/******************************************************************************/
// Añadir un nuevo trabajo al JSON

formularioTrabajos.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreTrabajo').value;
    const fechaInicio = document.getElementById('fechaInicioTrabajo').value;
    const fechaFin = document.getElementById('fechaFinTrabajo').value;
    const descripcion = document.getElementById('descripcionTrabajo').value;

    if (trabajoEditando !== null) {
        trabajos[trabajoEditando] = {
            nombre,
            fechaInicio,
            fechaFin,
            descripcion,
        };
        trabajoEditando = null;
    } else {
        const nuevoTrabajo = {
            nombre,
            fechaInicio,
            fechaFin,
            descripcion,
        };
        trabajos.push(nuevoTrabajo);
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey,
        },
        body: JSON.stringify({ trabajos }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar los datos en JSONBin');
            }
            return response.json();
        })
        .then(() => {
            formularioTrabajos.reset();
            procesarTrabajos(trabajos);
        })
        .catch(error => console.error('Hubo un problema:', error));
});

/******************************************************************************/
// Eliminar un trabajo del JSON
function agregarEventosEliminar() {
    document.querySelectorAll('.delete-trabajo').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            trabajos.splice(index, 1);

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey,
                },
                body: JSON.stringify({ trabajos }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al actualizar los datos en JSONBin');
                    }
                    return response.json();
                })
                .then(() => {
                    procesarTrabajos(trabajos);
                })
                .catch(error => console.error('Hubo un problema:', error));
        });
    });
}

/******************************************************************************/
// Editar un trabajo del JSON

function agregarEventosEditar(index, trabajo) {
    document.querySelectorAll('.edit-trabajo').forEach((btn, i) => {
        if (i === index) {
            btn.addEventListener('click', () => {
                trabajoEditando = index;

                document.getElementById('nombreTrabajo').value = trabajo.nombre;
                document.getElementById('descripcionTrabajo').value = trabajo.descripcion;
                document.getElementById('fechaInicioTrabajo').value = trabajo.fechaInicio;
                document.getElementById('fechaFinTrabajo').value = trabajo.fechaFin;
            });
        }
    });
}

/******************************************************************************/