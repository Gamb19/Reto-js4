let errorDiv=document.getElementById("error")
errorDiv.style="display:none"

let divinfo = document.getElementById("pokeInfo");
divinfo.style="display:block"


let pokemons = async (e) => {
  try {
    let dataPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);
//Div
    let infoPoke = await dataPokemon.json();
    let infoPokeDiv= document.getElementById("infoPokeDiv");
    let statsPokeDiv= document.getElementById("statsPokeDiv");
//lIMPIAR
    errorDiv.innerHTML="";
    statsPokeDiv.innerHTML = "";
    infoPokeDiv.innerHTML="";
//Titulos
    let title= document.createElement("h2")
    title.textContent="Moves"
    infoPokeDiv.insertAdjacentElement("beforeend",title)
    
    let title2= document.createElement("h2")
    title2.textContent="stats"
    statsPokeDiv.insertAdjacentElement("beforeend",title2);

    //  Parte 1 izquierda
    divinfo.style="display:block";
    divinfo.innerHTML="";
    errorDiv.style="display:none";
    
    let habilidadesText = document.createElement("h2");
    habilidadesText.textContent = "Habilidades";
    habilidadesText.style="color:white"

    let nombre=document.createElement("h1")
    nombre.textContent=infoPoke.name;
    nombre.style="color:white"

    let type= document.createElement("p")
    type.textContent= infoPoke.types[0].type.name;
    type.style="color:white;"

  

   

    divinfo.insertAdjacentElement("beforeend", nombre)
    divinfo.insertAdjacentElement("beforeend", type)

    imgPokemons(infoPoke, divinfo);

    let height = document.createElement("P")
    height.textContent="Height: " + infoPoke.height;
    height.style="color:white"
    divinfo.insertAdjacentElement("beforeend", height);

    let weight = document.createElement("p")
    weight.textContent="Weight: " + infoPoke.weight;
    divinfo.insertAdjacentElement("beforeend", weight);
    weight.style="color:white"

    divinfo.insertAdjacentElement("beforeend", habilidadesText);
    dataAbilities(infoPoke, divinfo);

    // Parte derecha
    moves(infoPoke,infoPokeDiv);

    
    stats(infoPoke,statsPokeDiv);

   
  } catch (error) {
//errores mostrar img
    alert("Tu pokemon no es valido");
    let divinfo = document.getElementById("pokeInfo");
    let infoPokeDiv= document.getElementById("infoPokeDiv");
    let statsPokeDiv= document.getElementById("statsPokeDiv")
    let errorDiv=document.getElementById("error")
    errorDiv.innerHTML="";
    divinfo.style="display:none"
    errorDiv.style="display:block"
    divinfo.innerHTML = "";
    infoPokeDiv.innerHTML = "";
    statsPokeDiv.innerHTML = "";
    divinfo.className="error"

  }
  finally{
    let spinner= document.getElementById("pokemonSpinner");
    spinner.style="display:none";
  }
};
//formulario
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.getElementById("pokemonSearch").value.toLowerCase();
  let spinner= document.getElementById("pokemonSpinner")
  spinner.style="display:block";
  pokemons(input);
  areas(input);
  form.reset();
});
//Imagenes delante y detras
function imgPokemons(infoPoke, divinfo) {
  
  let imagenFront = document.createElement("img");
  let imagenBackPoke = document.createElement("img");
  imagenFront.src = infoPoke.sprites.front_default;
  imagenBackPoke.src = infoPoke.sprites.back_default;
  divinfo.insertAdjacentElement("beforeend", imagenFront);
  divinfo.insertAdjacentElement("beforeend", imagenBackPoke);
}
 //habilidades
function dataAbilities(infoPoke, divinfo) {
 
  let habilidades = infoPoke.abilities;
  habilidades.forEach((element) => {
    let habilidadesData = element.ability.name;
    console.log(habilidadesData);
    let lista = document.createElement("ul");
    let name = document.createElement("li");
    name.textContent = habilidadesData;
    name.style="color:white"
    lista.insertAdjacentElement("beforeend", name);
    divinfo.insertAdjacentElement("beforeend", lista);
  });
}
//movimientos
function moves(infoPoke,infoPokeDiv){
  let movimiento= infoPoke.moves;
  
  

  movimiento.forEach((element) =>{

    let movesRes=element.move.name;

    let lista=document.createElement("ul")

    let movesPoke=document.createElement("li")

    movesPoke.textContent=movesRes
   
   

    lista.insertAdjacentElement("beforeend", movesPoke);
    infoPokeDiv.insertAdjacentElement("beforeend", lista);
  })
}
//Stats
function stats(infoPoke,statsPokeDiv){
  let stats = infoPoke.stats;
  stats.forEach((element)=>{
   let res=document.createElement("p");
   res.textContent=element.stat.name + ":" + element.base_stat; 
    statsPokeDiv.insertAdjacentElement("beforeend",res);
  })
}
//areas
let areas = async (e)=>{
  try{
    
    let dataArea= await fetch(`https://pokeapi.co/api/v2/pokemon/${e}/encounters`);
    let infoArea= await dataArea.json();
    console.log(infoArea);
    let divArea=document.getElementById("areas");
    divArea.innerHTML="";

    let title= document.createElement("h2")
    title.textContent="Areas"
    divArea.insertAdjacentElement("beforeend",title)
    

    
    infoArea.forEach((element=>{
      console.log(element);
      areaList=document.createElement("ul");
      areaName=document.createElement("li");
      areaName.textContent=element.location_area.name
      
      areaList.insertAdjacentElement("beforeend", areaName);
      divArea.insertAdjacentElement("beforeend", areaList)
    }))
  }
  catch{
    let divArea=document.getElementById("areas");
    divArea.innerHTML="";
  }
}