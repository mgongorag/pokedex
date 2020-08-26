let POKEMONES = [];
const IMGPOKEMON = 'https://pokeres.bastionbot.org/images/pokemon/';

window.addEventListener("load", function () {

     obtenerTiposPokemon();
     //Ejecutamos la promesa
     // pokemons.then(pokemons => {
     //      pokemons.results.forEach(pokemon => {
     //           guardarPokemonArray(pokemon.url);
     //      });
     // })
     obtenerPokemones();
     

})




function obtenerTiposPokemon() {
     fetch(urlApi + 'type', {
               method: 'GET'
          })
          .then(function (response) {
               return response.json();
          })
          .then(function (types) {
               let html = '';
               types.results.forEach((type) => {
                    if (type.name !== 'unknown' && type.name !== 'shadow')
                         html += `
               <a href="#"><span class="pill background-color-${type.name}">${type.name}</span></a>
          `
               });

               document.querySelector('.tipos-pokemon .card div').innerHTML = html;

          })
          .catch(function (error) {
               console.log(error);
          })
}

function obtenerPokemones() {
     fetch(urlApi + 'pokemon?limit=151&offset=0')
          .then(response => {
               return response.json();
          })
          .then(pokemons =>{
               console.log(pokemons);
               pokemons.results.forEach(pokemon => {
                    guardarPokemonArray(pokemon.url);
               })
               
               setTimeout(() =>{
                    printPokemons();
               },4000)
          })
          .catch(error => {
               return error;
          })
}




const urlApi = 'https://pokeapi.co/api/v2/';
const pokemons = new Promise((resolve, rejected) => {
     return fetch(urlApi + 'pokemon?limit=150&offset=0')
          .then(response => {
               return response.json();
          })
          .then(data => {
               resolve(data);
          })
          .catch(error => {
               rejected(error);
          })
})


function guardarPokemonArray(url) {
     let id, nombre, img;
     let tipos = new Array();
     fetch(url)
          .then(response => {
               return response.json();
          })
          .then(pokemons => {

               id = pokemons.id;
               nombre = pokemons.name;
               img = IMGPOKEMON + id + '.png';

               pokemons.types.forEach(pokemon => {
                    tipos.push(pokemon.type.name);
               });

               let objPokemon = new Pokemon(id, nombre, tipos, img);
               POKEMONES.push(objPokemon);

               //Ordenamos el arreglo.
               POKEMONES.sort(function (a, b) {
                    if (a.id > b.id) {
                         return 1;
                    }
                    if (a.id < b.id) {
                         return -1;
                    }
                    return 0;
               });

          })
          .catch(error => {
               console.log(error);
          })
     // console.log(POKEMONES.Pokemon[0]);
}


function printPokemons() {
     
     POKEMONES.forEach(pokemon => {

          //Tarjeta
          let cardPokemon = document.createElement('div');
          cardPokemon.classList.add('card-pokemon');

          //Nodo CardHeader
          let cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          let h3 = `<h3>${pokemon.nombre}</h3>`;
          cardHeader.innerHTML = h3;

          // Nodo Card-Body
          cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          cardBody.innerHTML = `<img src="${pokemon.img}" alt="${pokemon.nombre}"
                      width="175px">`;
          
          //Nodo Card-footer
          cardFooter = document.createElement('div');
          cardFooter.classList.add('card-footer');
          cardFooter.innerHTML = `
                              <div>
                                   <span class="badge badge-primary">
                                        N° ${pokemon.idFormato}
                                   </span>
                              </div>
          `
          pokemon.tipos.forEach(tipo => {
               let divTipo =document.createElement('div');
               divTipo.classList.add('pill', 'background-color-' + tipo);
               divTipo.innerHTML = tipo;
               cardFooter.appendChild(divTipo);
          });
          
          //Se agrega cada nodo hijo al nodo padre de la lista 
          cardPokemon.appendChild(cardHeader);
          cardPokemon.appendChild(cardBody);
          cardPokemon.appendChild(cardFooter);

          document.querySelector('.pokemons').appendChild(cardPokemon);

     })
  
}

