
let poken = async (namePoken)=>{
  try{
    let apiPoken = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePoken}`)
    let pokemon = await apiPoken.json();

    let divVerBusqueda = document.getElementById("pokeInfo");
    divVerBusqueda.className="container-sm div-ver-pokemon d-md-flex justify-content-md-evenly cargaPag";    
    divVerBusqueda.innerHTML="";
      let divPoken = document.createElement("div");
      divPoken.className="div-caracteristicas text-center";
      let namePokemon = document.createElement("h1");
      namePokemon.textContent=pokemon.name;
      let imgPokenFront = document.createElement("img");
      imgPokenFront.src=pokemon.sprites.front_default;
      let imgPokenBack = document.createElement("img");
      imgPokenBack.src=pokemon.sprites.back_default;
      let divPokeMovi=document.getElementById("infoPokeDiv")
      let divMoviPoken = document.createElement("ul");
      divPokeMovi.insertAdjacentElement("beforeend", divMoviPoken);
      
//Movimiento
      divMoviPoken.className="div-movimientos containers-scroll gap-2";
      divPokeMovi.innerHTML="";
      movimientos(pokemon,divPokeMovi);
// Stats
      let divEstadis = document.createElement("ul");
      divEstadis.className="div-estadisticas align-items-center gap-3";
      estadisticas(pokemon,divEstadis);
      let tipoPoken = document.createElement("p")
      tipePokemon(pokemon,tipoPoken);
      let anchuraPoken = document.createElement("p");
      anchuraPoken.textContent=`Altura ${pokemon.height}`;
      let alturaPoken = document.createElement("p");
      alturaPoken.textContent=`Anchura ${pokemon.weight}`;
// Habilidad
      let divHabilidad = document.createElement("div");
      divHabilidad.className="div-hablidades"
      let textHabilidades = document.createElement("h4");
      textHabilidades.textContent="Habilidades";
      divHabilidad.insertAdjacentElement("beforeend",textHabilidades);
      habilidades(pokemon,divHabilidad);
// Area
      ubicacionPoken(namePoken);
      
//Insert
      divVerBusqueda.insertAdjacentElement("beforeend",divPoken);
      divPoken.insertAdjacentElement("beforeend",namePokemon);
      divPoken.insertAdjacentElement("beforeend",tipoPoken);
      divPoken.insertAdjacentElement("beforeend",imgPokenFront);
      divPoken.insertAdjacentElement("beforeend",imgPokenBack);
      divPoken.insertAdjacentElement("beforeend",anchuraPoken);
      divPoken.insertAdjacentElement("beforeend",alturaPoken);
      divPoken.insertAdjacentElement("beforeend",divHabilidad);
      
      divVerBusqueda.insertAdjacentElement("beforeend",divMoviPoken);
      divVerBusqueda.insertAdjacentElement("beforeend",divEstadis);
  }
  catch(error){
    let divVerBusqueda = document.getElementById("pokeInfo");
    let area = document.getElementById("areas")
    let move= document.getElementById("infoPokeDiv");
    area.innerHTML="";
    move.innerHTML="";
    divVerBusqueda.innerHTML="";
    divVerBusqueda.className="container-sm div-ver-pokemon d-md-flex justify-content-md-evenly error";
    alert("El pokemon no existe, o introduciste mal el nombre");
    console.log(error);
  }
  finally{
    let spinner = document.getElementById("pokemonSpinner");
    spinner.className="displays"
  }
}

let ubicacionPoken = async (namePoken)=>{
  try{
    
  let apiPoken = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePoken}/encounters`)
  let ubiPoken = await apiPoken.json();
    let title= document.createElement("h2");
    title.textContent="Areas"
  let divVerBusqueda = document.getElementById("areas"); 
  divVerBusqueda.innerHTML="";

  divVerBusqueda.insertAdjacentElement("beforeend", title)
 
    let listaAreaPoken = document.createElement("ul");
    listaAreaPoken.id="lista-area-poken";

    ubiPoken.forEach(element => {
      debugger
      let ubicacion = document.createElement("li");
      ubicacion.textContent=element.location_area.name;

      divVerBusqueda.insertAdjacentElement("beforeend",listaAreaPoken);
      listaAreaPoken.insertAdjacentElement("beforeend",ubicacion);
    });
    
  }
  catch(error){
    console.log(error);
    alert("ERROR al buscar las areas de los pokemons")
  }
  finally{
    let spinner = document.getElementById("pokemonSpinner");
        spinner.className="spinerOculto"
  }
}

let tipePokemon = async (pokemon,tipoPoken)=>{
  try{
    let prom = await fetch(pokemon.types[0].type.url);
    let promData = await prom.json();
    let arrayLenguage = promData.names
      arrayLenguage.forEach(element => {
        if (element.language.name === "es") {
          tipoPoken.textContent=`Tipo de pokemon: ${element.name}`;
        }
      });
  }
  catch{
    alert("ERROR, fallo en la busqueda de tipo del pokemon")
  }
}

function movimientos (pokemon,divPokeMovi){
 
  let arrayMoves = pokemon.moves;
let title= document.createElement("h2");
title.textContent="Movements";
divPokeMovi.insertAdjacentElement("beforeend", title)
  arrayMoves.forEach(async element => {
    try{
      let prom = await fetch(element.move.url)
      let dataProm = await prom .json();
  
      let arrayLenguage = dataProm.names
        arrayLenguage.forEach(element => {
          if (element.language.name === "es") {
            let movimientos = document.createElement("li");
            movimientos.textContent=element.name;
            divPokeMovi.insertAdjacentElement("beforeend",movimientos);
          }
        });
    }
    catch{
      alert("ERROR, fallo en la busqueda de movimientos del pokemon")
    }
  });
}

function estadisticas(pokemon,divEstadis){
  let textEstadisticas = document.createElement("h4");
  textEstadisticas.textContent="Estadisticas";
  textEstadisticas.className="text-estadisticas text-center";
  divEstadis.insertAdjacentElement("beforeend",textEstadisticas);

  let estadiPoken = pokemon.stats;
  estadiPoken.forEach(element => {
    let baseStat = element.base_stat
    let statName  = document.createElement("li");
    iconEstadisticas(element,statName)
    let statsUrl = element.stat.url;

    let dataEstadis = async(statsUrl)=>{
      try{
        let prom = await fetch(statsUrl)
        let dataProm = await prom.json();
        let arrayLenguage = dataProm.names
      arrayLenguage.forEach(element => {
        if (element.language.name === "es") {
          statName.textContent=`${element.name}: ${baseStat}`;
          divEstadis.insertAdjacentElement("beforeend",statName);
        }
      });
      }
      catch{
        alert("ERROR, fallo en la busqueda de estadisticas del pokemon")
      }
    }
    dataEstadis(statsUrl);
  });
}

function iconEstadisticas(element,statName){
    if(element.stat.name==="hp"){
      statName.className="hp-poken";
    }
    else if(element.stat.name==="attack"){
      statName.className="attack-poken";
    }
    else if(element.stat.name==="defense"){
      statName.className="defense-poken";
    }
    else if(element.stat.name==="special-attack"){
      statName.className="special-attack-poken";
    }
    else if(element.stat.name==="special-defense"){
      statName.className="special-defense-poken";
    }
    else if(element.stat.name==="speed"){
      statName.className="speed-poken";
    }
}

function habilidades(pokemon,divHabilidad){
  let habilidad = pokemon.abilities;

  habilidad.forEach(async (element) =>{
    try{
      let prom = await fetch(element.ability.url);
      let dataProm = await prom.json();
      let arrayLenguage = dataProm.names
      arrayLenguage.forEach(element => {
        if (element.language.name === "es") {
          let habilidades = document.createElement("p");
          habilidades.textContent=element.name;
          divHabilidad.insertAdjacentElement("beforeend",habilidades);
        }
      });
    }
    catch(error){
      alert(error);
    }
  })
}

function validacion(namePokemon){
  if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(namePokemon)){
    let spinner = document.getElementById("pokemonSpinner");
    spinner.className="pokemon";
    poken(namePokemon);

    formulario.reset();
  }
  else{
    alert("Solo se aceptan letras")
  }
}

let formulario = document.getElementById("form");
formulario.addEventListener("submit",buscarPokemon);

function buscarPokemon(e){
  e.preventDefault();
  let pokemon = document.getElementById("pokemonSearch").value;
  let namePokemon = pokemon.toLowerCase();
  validacion(namePokemon);
}
