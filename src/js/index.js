const iconotecnologia = {
    "CSS": "./assets/css.svg",
    "HTML": "./assets/html.svg",
    "JavaScript": "./assets/js.svg",
    "SASS": "./assets/sass.svg",
    "Vite": "./assets/vite.svg",
};

let datos = [];

const binIdDatos = "675b13cead19ca34f8da0d99";
const apiKeyDatos = "$2a$10$1tb.LqxA5Bznk0fa5HaBye14/OgHPZzvJjKgjohMVU0Rea1MdJvQq";
const urlDatos = `https://api.jsonbin.io/v3/b/${binIdDatos}`;

fetch(urlDatos, {
    headers: {
        "X-Master-Key": apiKeyDatos,
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
        datos = jsonContent.record;
        procesarDatos(datos);
    })
    .catch(error => {
        console.error('Hubo un problema:', error);
    });

/******************************************************************************/
// Procesar los Datos que estan en el json 

function procesarDatos(datos) {
    let nombre = document.querySelector("#nombre");
    nombre.textContent = datos.nombre;

    let puesto = document.querySelector("#puesto");
    puesto.textContent = datos.puesto;

    let estado = document.querySelector("#estado");
    estado.textContent = datos.estado;

    let ubicacion = document.querySelector("#ubicacion");
    ubicacion.textContent = datos.ubicacion;

    let fotoPerfil = document.querySelector("#fotoPerfil");
    fotoPerfil.setAttribute("src", datos.fotoPerfil);

    let linkedin = document.querySelector("#linkedin");
    linkedin.setAttribute("href", datos.redesSociales.linkedin);

    let github = document.querySelector("#github");
    github.setAttribute("href", datos.redesSociales.github);

    let envelope = document.querySelector("#gmail");
    envelope.setAttribute("href", datos.redesSociales.gmail);

    let twitter = document.querySelector("#x");
    twitter.setAttribute("href", datos.redesSociales.x);
    
    let listadoSkills = document.querySelector("#listadoSkills");
    listadoSkills.innerHTML = "";

    datos.skills.forEach(skill => {
        let li = document.createElement("li");
        li.textContent = skill;

        listadoSkills.appendChild(li);
    });

    let listadotecnologiasFavoritas = document.querySelector("#listadotecnologiasFavoritas");
    listadotecnologiasFavoritas.innerHTML = "";

    datos.tecnologias.forEach(tecnologia => {
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
        listadotecnologiasFavoritas.appendChild(li);
    });
}

let proyectos = [];

/******************************************************************************/
// Contactar con el json que tengo hosteado en jsonbin

const binIdProjects = "675b13fde41b4d34e46452f3";
const apiKeyProjects = "$2a$10$1tb.LqxA5Bznk0fa5HaBye14/OgHPZzvJjKgjohMVU0Rea1MdJvQq";
const urlProjects = `https://api.jsonbin.io/v3/b/${binIdProjects}`;

fetch(urlProjects, {
    headers: {
        "X-Master-Key": apiKeyProjects,
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
    });
}


let trabajos = [];

const binIdCareer = "675b13efad19ca34f8da0da6";
const apiKeyCareer = "$2a$10$1tb.LqxA5Bznk0fa5HaBye14/OgHPZzvJjKgjohMVU0Rea1MdJvQq";
const urlCareer = `https://api.jsonbin.io/v3/b/${binIdCareer}`;

fetch(urlCareer, {
    headers: {
        "X-Master-Key": apiKeyCareer,
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


function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function procesarTrabajos(trabajos) {
    let plantillaTrabajo = document.getElementById("plantillaTrabajo");
    let contenedor = document.querySelector(".trabajo");

    contenedor.innerHTML = "";

    trabajos.forEach(trabajo => {
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
    });
}
