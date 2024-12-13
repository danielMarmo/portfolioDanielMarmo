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
            throw new Error("Error al cargar el archivo JSON");
        }
        return response.json();
    })
    .then(data => {
        const jsonContent = data.record;
        datos = jsonContent.record;
        editarPerfil(datos);
    })
    .catch(error => {
        console.error("Hubo un problema:", error);
    });

function editarPerfil(datos) {
    document.getElementById('nombre').value = datos.nombre;
    document.getElementById('puesto').value = datos.puesto;
    document.getElementById('estado').value = datos.estado;
    document.getElementById('ubicacion').value = datos.ubicacion;
    document.getElementById('fotoPerfil').value = datos.fotoPerfil;
    document.getElementById('linkedin').value = datos.redesSociales.linkedin;
    document.getElementById('github').value = datos.redesSociales.github;
    document.getElementById('gmail').value = datos.redesSociales.gmail;
    document.getElementById('x').value = datos.redesSociales.x;

    const tecnologiasList = document.getElementById('tecnologias');
    tecnologiasList.innerHTML = '';
    datos.tecnologias.forEach(tec => {
        const li = document.createElement('li');
        li.textContent = tec;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.style.marginLeft = "10px"
        deleteButton.style.padding = "5px 10px"
        deleteButton.onclick = () => eliminarTecnologia(tec);
        li.appendChild(deleteButton);
        tecnologiasList.appendChild(li);
    });

    const skillsList = document.getElementById('skills');
    skillsList.innerHTML = '';
    datos.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.style.marginLeft = "10px"
        deleteButton.style.padding = "5px 10px"
        deleteButton.onclick = () => eliminarHabilidad(skill);
        li.appendChild(deleteButton);
        skillsList.appendChild(li);
    });
}

function agregarTecnologia() {
    const nuevaTecnologia = document.getElementById('nuevaTecnologia').value.trim();
    if (nuevaTecnologia) {
        datos.tecnologias.push(nuevaTecnologia);
        document.getElementById('nuevaTecnologia').value = '';
        editarPerfil(datos);
    } else {
        alert('Por favor, ingresa una tecnología válida.');
    }
}
window.agregarTecnologia = agregarTecnologia;

function agregarHabilidad() {
    const nuevaHabilidad = document.getElementById('nuevaHabilidad').value.trim();
    if (nuevaHabilidad) {
        datos.skills.push(nuevaHabilidad);
        document.getElementById('nuevaHabilidad').value = '';
        editarPerfil(datos);
    } else {
        alert('Por favor, ingresa una habilidad válida.');
    }
}
window.agregarHabilidad = agregarHabilidad;

function eliminarTecnologia(tecnologia) {
    const index = datos.tecnologias.indexOf(tecnologia);
    if (index !== -1) {
        datos.tecnologias.splice(index, 1);
        editarPerfil(datos);
    }
}

function eliminarHabilidad(habilidad) {
    const index = datos.skills.indexOf(habilidad);
    if (index !== -1) {
        datos.skills.splice(index, 1);
        editarPerfil(datos);
    }
}

document.getElementById('formularioPerfil').addEventListener('submit', guardarDatos);

function guardarDatos(event) {
    event.preventDefault();

    datos = {
        nombre: document.getElementById('nombre').value,
        puesto: document.getElementById('puesto').value,
        estado: document.getElementById('estado').value,
        ubicacion: document.getElementById('ubicacion').value,
        fotoPerfil: document.getElementById('fotoPerfil').value,
        redesSociales: {
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            gmail: document.getElementById('gmail').value,
            x: document.getElementById('x').value,
        },
        tecnologias: [...datos.tecnologias],
        skills: [...datos.skills],
    };

    fetch(urlDatos, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKeyDatos,
        },
        body: JSON.stringify({ record: datos }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar los datos en el JSON');
            }
            return response.json();
        })
        .then(updatedData => {
            console.log('Datos actualizados:', updatedData);
        })
        .catch(error => {
            console.error('Hubo un problema al guardar los datos:', error);
        });
}
