const h={CSS:"./assets/css.svg",HTML:"./assets/html.svg",JavaScript:"./assets/js.svg",SASS:"./assets/sass.svg",Vite:"./assets/vite.svg"};let p=[];const j="675b13cead19ca34f8da0d99",q="$2a$10$1tb.LqxA5Bznk0fa5HaBye14/OgHPZzvJjKgjohMVU0Rea1MdJvQq",C=`https://api.jsonbin.io/v3/b/${j}`;fetch(C,{headers:{"X-Master-Key":q}}).then(e=>{if(!e.ok)throw new Error("Error al cargar el archivo JSON");return e.json()}).then(e=>{p=e.record.record,v(p)}).catch(e=>{console.error("Hubo un problema:",e)});function v(e){let n=document.querySelector("#nombre");n.textContent=e.nombre;let a=document.querySelector("#puesto");a.textContent=e.puesto;let o=document.querySelector("#estado");o.textContent=e.estado;let c=document.querySelector("#ubicacion");c.textContent=e.ubicacion,document.querySelector("#fotoPerfil").setAttribute("src",e.fotoPerfil),document.querySelector("#linkedin").setAttribute("href",e.redesSociales.linkedin),document.querySelector("#github").setAttribute("href",e.redesSociales.github),document.querySelector("#gmail").setAttribute("href",e.redesSociales.gmail),document.querySelector("#x").setAttribute("href",e.redesSociales.x);let m=document.querySelector("#listadoSkills");m.innerHTML="",e.skills.forEach(l=>{let t=document.createElement("li");t.textContent=l,m.appendChild(t)});let i=document.querySelector("#listadotecnologiasFavoritas");i.innerHTML="",e.tecnologias.forEach(l=>{let t=document.createElement("li"),s=document.createElement("img");h[l]?(s.src=h[l],s.alt=l,s.title=l,s.style.width="24px",s.style.height="24px"):s.alt="Icono no disponible",t.appendChild(s),i.appendChild(t)})}let y=[];const x="675b13fde41b4d34e46452f3",E="$2a$10$1tb.LqxA5Bznk0fa5HaBye14/OgHPZzvJjKgjohMVU0Rea1MdJvQq",P=`https://api.jsonbin.io/v3/b/${x}`;fetch(P,{headers:{"X-Master-Key":E}}).then(e=>{if(!e.ok)throw new Error("Error al cargar el archivo JSON");return e.json()}).then(e=>{y=e.record.proyectos,H(y)}).catch(e=>{console.error("Hubo un problema:",e)});function H(e){let n=document.getElementById("plantillaProyecto"),a=document.querySelector(".projects");a.innerHTML="",e.forEach((o,c)=>{let r=n.cloneNode(!0);r.classList.remove("d-none"),r.classList.add("project-card"),a.appendChild(r);let d=r.querySelector("#nombreProyecto");d.textContent=o.nombre;let u=r.querySelector("#descripcionProyecto");u.textContent=o.descripcion;let b=r.querySelector("#listadoTecnologiasProyecto");b.innerHTML="",o.tecnologias.forEach(i=>{let l=document.createElement("li"),t=document.createElement("img");h[i]?(t.src=h[i],t.alt=i,t.title=i,t.style.width="24px",t.style.height="24px"):t.alt="Icono no disponible",l.appendChild(t),b.appendChild(l)}),r.querySelector("#githubProyecto").setAttribute("href",o.github),r.querySelector("#demoProyecto").setAttribute("href",o.demo)})}let f=[];const L="675b13efad19ca34f8da0da6",M="$2a$10$1tb.LqxA5Bznk0fa5HaBye14/OgHPZzvJjKgjohMVU0Rea1MdJvQq",T=`https://api.jsonbin.io/v3/b/${L}`;fetch(T,{headers:{"X-Master-Key":M}}).then(e=>{if(!e.ok)throw new Error("Error al cargar el archivo JSON");return e.json()}).then(e=>{f=e.record.trabajos,$(f)}).catch(e=>{console.error("Hubo un problema:",e)});function S(e){const n={year:"numeric",month:"long"};return new Date(e).toLocaleDateString("es-ES",n)}function $(e){let n=document.getElementById("plantillaTrabajo"),a=document.querySelector(".trabajo");a.innerHTML="",e.forEach(o=>{let c=n.cloneNode(!0);c.classList.remove("d-none"),c.classList.add("trabajo-card"),a.appendChild(c);let r=c.querySelector("#nombreTrabajo");r.textContent=o.nombre;let d=c.querySelector("#fechaTrabajo");d.classList.add("text-secondary"),d.textContent=`${S(o.fechaInicio)} - ${S(o.fechaFin)}`;let u=c.querySelector("#descripcionTrabajo");u.textContent=o.descripcion})}
