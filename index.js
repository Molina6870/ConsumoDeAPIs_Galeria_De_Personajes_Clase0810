
//------------------------------
//URL Base: https://thesimpsonsapi.com/api
//-------------------------------

//Ejemplo para 1 solo personaje:
//const API_URL = 'https://thesimpsonsapi.com/api/characters/1';

const URL_API = "https://thesimpsonsapi.com/api/characters";

const btnCargar = document.getElementById("btnCargar");
const galeria = document.getElementById("galeria");
const mensajeError = document.getElementById("mensajeError");

btnCargar.addEventListener("click", cargarPersonajes);

async function obtenerPersonajes() {
  const respuesta = await fetch(URL_API);
  if (!respuesta.ok) throw new Error("Error al obtener personajes");

  // Obtenemos el JSON completo
  const data = await respuesta.json();

  // Retornamos solo el array de personajes
  return data.results || data;
}

async function cargarPersonajes() {
  try {
    mensajeError.classList.add("oculto");
    galeria.innerHTML = "<p>Cargando personajes...</p>";

    const personajes = await obtenerPersonajes();

    // Verificamos que sea un array
    if (!Array.isArray(personajes)) throw new Error("Formato inesperado de datos");

    // Tomamos 6 personajes aleatorios
    const seleccion = personajes.sort(() => 0.5 - Math.random()).slice(0, 6);

    galeria.innerHTML = "";

    seleccion.forEach(personaje => {
      const div = document.createElement("div");
      div.classList.add("personaje");
      div.innerHTML = `
        <img src="https://thesimpsonsapi.com${personaje.portrait_path}"  alt="${personaje.name}">
        <h3>${personaje.name}</h3>
        <p>${personaje.occupation}</p>
      `;
      galeria.appendChild(div);
    });

  } catch (error) {
    console.error("Error:", error);
    mensajeError.textContent = "¡Ocurrió un error al cargar los personajes!";
    mensajeError.classList.remove("oculto");
    galeria.innerHTML = "";
  }
}














// const Personaje1 = Promise.resolve("https://cdn.thesimpsonsapi.com/500/character/1.webp");
// const Personaje2 = Promise.resolve("https://cdn.thesimpsonsapi.com/500/character/2.webp");
// const Personaje3 = Promise.resolve("https://cdn.thesimpsonsapi.com/500/character/3.webp");
// const Personaje4 = Promise.resolve("https://cdn.thesimpsonsapi.com/500/character/4.webp");
// const Personaje5 = Promise.resolve("https://cdn.thesimpsonsapi.com/500/character/5.webp");
// const Personaje6 = Promise.resolve("https://cdn.thesimpsonsapi.com/500/character/6.webp");

// Promise.all([Personaje1, Personaje2, Personaje3, Personaje4 ,Personaje5 ,Personaje6])
// fetch("https://thesimpsonsapi.com/api")
// .then(response => response.json)
// .then(Data=> {
//     const name = Data.name;
//     console.log(name);
// })
// .catch(error => {console.log("Promesa fallida", error)});

