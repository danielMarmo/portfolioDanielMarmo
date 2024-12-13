const iconotecnologia = {
    "CSS": "./assets/css.svg",
    "HTML": "./assets/html.svg",
    "JavaScript": "./assets/js.svg",
    "SASS": "./assets/sass.svg",
    "Vite": "./assets/vite.svg",
};

let proyectos = [];
let proyectoEditando = null;
const formularioProyectos = document.getElementById('formularioProyectos');

/******************************************************************************/
// Contactar con el json que tengo hosteado en jsonbin

const binId = "675b13fde41b4d34e46452f3";
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
        proyectos = jsonContent.proyectos;
        procesarProyectos(proyectos);
    })
    .catch(error => {
        console.error('Hubo un problema:', error);
    });

/******************************************************************************/
// Procesar los Proyectos que estan en el json 

function procesarProyectos(proyectos) {
    let plantillaProyecto = document.getElementById("plantillaProyecto");
    let contenedor = document.querySelector(".projects");

    contenedor.innerHTML = "";

    proyectos.forEach((proyecto, index) => {
        let tarjeta = plantillaProyecto.cloneNode(true);
        tarjeta.classList.remove("d-none");
        tarjeta.classList.add("project-card");
        contenedor.appendChild(tarjeta);

        let nombre = tarjeta.querySelector("#nombreProyecto");
        nombre.textContent = proyecto.nombre;

        let descripcion = tarjeta.querySelector("#descripcionProyecto");
        descripcion.textContent = proyecto.descripcion;

        let listadoTecnologiasProyecto = tarjeta.querySelector("#listadoTecnologiasProyecto");
        listadoTecnologiasProyecto.innerHTML = "";

        proyecto.tecnologias.forEach(tecnologia => {
            let li = document.createElement("li");
            let img = document.createElement("img");

            if (iconotecnologia[tecnologia]) {
                img.src = iconotecnologia[tecnologia];
                img.alt = tecnologia;
                img.title = tecnologia;
                img.style.width = "24px";
                img.style.height = "24px";
            } else {
                img.alt = "Icono no disponible";
            }

            li.appendChild(img);
            listadoTecnologiasProyecto.appendChild(li);
        });

        let github = tarjeta.querySelector("#githubProyecto");
        github.setAttribute("href", proyecto.github);

        let demo = tarjeta.querySelector("#demoProyecto");
        demo.setAttribute("href", proyecto.demo);

        agregarEventosEliminar();
        agregarEventosEditar(index, proyecto);
    });
}

/******************************************************************************/
// Añadir un nuevo proyecto al json

function obtenerTecnologiasSeleccionadas() {
    const tecnologias = [];
    if (document.getElementById('tecnologiaCSS').checked) tecnologias.push("CSS");
    if (document.getElementById('tecnologiaHTML').checked) tecnologias.push("HTML");
    if (document.getElementById('tecnologiaJS').checked) tecnologias.push("JavaScript");
    if (document.getElementById('tecnologiaSASS').checked) tecnologias.push("SASS");
    if (document.getElementById('tecnologiaVite').checked) tecnologias.push("Vite");
    return tecnologias;
}

formularioProyectos.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const tecnologias = obtenerTecnologiasSeleccionadas();
    const repoURL = document.getElementById('repoURL').value;
    const demoURL = document.getElementById('demoURL').value;

    if (proyectoEditando !== null) {
        proyectos[proyectoEditando] = {
            nombre,
            descripcion,
            tecnologias,
            github: repoURL,
            demo: demoURL,
        };
        proyectoEditando = null;
    } else {
        const nuevoProyecto = {
            nombre,
            descripcion,
            tecnologias,
            github: repoURL,
            demo: demoURL,
        };
        proyectos.push(nuevoProyecto);
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey,
        },
        body: JSON.stringify({ proyectos }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar los datos en JSONBin');
            }
            return response.json();
        })
        .then(() => {
            formularioProyectos.reset();
            procesarProyectos(proyectos);
        })
        .catch(error => console.error('Hubo un problema:', error));
});

/******************************************************************************/
// Eliminar un proyecto al json

function agregarEventosEliminar() {
    document.querySelectorAll('.delete-project').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            proyectos.splice(index, 1);

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey,
                },
                body: JSON.stringify({ proyectos }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al actualizar los datos en JSONBin');
                    }
                    return response.json();
                })
                .then(() => {
                    procesarProyectos(proyectos);
                })
                .catch(error => console.error('Hubo un problema:', error));
        });
    });
}

/******************************************************************************/
// Editar un proyecto al json

function agregarEventosEditar(index, proyecto) {
    document.querySelectorAll('.edit-project').forEach((btn, i) => {
        if (i === index) {
            btn.addEventListener('click', () => {
                proyectoEditando = index;

                document.getElementById('nombre').value = proyecto.nombre;
                document.getElementById('descripcion').value = proyecto.descripcion;

                document.getElementById('tecnologiaCSS').checked = proyecto.tecnologias.includes("CSS");
                document.getElementById('tecnologiaHTML').checked = proyecto.tecnologias.includes("HTML");
                document.getElementById('tecnologiaJS').checked = proyecto.tecnologias.includes("JavaScript");
                document.getElementById('tecnologiaSASS').checked = proyecto.tecnologias.includes("SASS");
                document.getElementById('tecnologiaVite').checked = proyecto.tecnologias.includes("Vite");

                document.getElementById('repoURL').value = proyecto.github;
                document.getElementById('demoURL').value = proyecto.demo;
            });
        }
    });
}

/******************************************************************************/