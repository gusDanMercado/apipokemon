// a consumir la api de pokemon:  
/*
    https://pokeapi.co/api/v2/move-learn-method/{id or name}/
    En este caso vamos a trabajar con el id

    nota: esta api tiene 11 pokemones para poder trabajar
*/
let btnResultado = document.getElementById("btn_Res");
btnResultado.style.opacity=0;

let recargarJuego = document.getElementById("recargarJuego");

recargarJuego.addEventListener("click",()=> {
    location.reload();
});

const card =10; //26 10;  14

// vamos generar id aleatorios de pokemon y estos son los que vamos a pasar uno por uno al fetch
let pokemonesId = [];

const generarIdPokemones = () => {
    let i = 0;
    
    while(i<card){
        ///Math.random() * (max - min + 1) + min;  [min, max)
        let id = Math.trunc(Math.random() * (200 - 1) + 1); 
    
        if(pokemonesId.length == 0){
            pokemonesId.push(id);
        }
        else{
            //elijo otro id que no este en el vector para que asi no haya pokemonesId repetidos
            while(pokemonesId.indexOf(id) != (-1)){
                id = Math.trunc(Math.random() * (200 - 1) + 1);
            }
    
            pokemonesId.push(id);
        }
    
        i = i + 1;
    }
}

//generarIdPokemones();
//console.log(pokemonesId);

// consulto a la API  (API FETCH)

let nombresPok = [];
let imgsPok = [];

//traigo los div:
const imagenes = document.getElementById("imagenes");
const nombres = document.getElementById("nombres");

/*
const agregarNomTablero = (nomPoks) => {
    //console.log("agregando "+nomPok+" al tablero!!!");

    /*
    let caja = document.createElement("div");
    caja.id = "soltado";
    caja.ondragover = "evdragover(event)";
    caja.ondrop = "evdrop(event)";

    let nom = document.createElement("p");
    nom.innerText = nomPok;
    caja.appendChild(nom);
    nombres.appendChild(caja);
    

    for(let nomPok in nomPoks){
        //console.log(nomPoks[nomPok]);
        let nom = document.createElement("div");
        nom.innerHTML = `<div id="nombre"><p>${nomPoks[nomPok]}</p></div>`;
        nombres.appendChild(nom);
    }

    /*
    caja.style.background = "red";
    caja.style.height = "80px";
    caja.style.border = "2px solid blue"
    
}

const agregarImgTablero = (srcImg) => {
    //console.log("La direccion de la imagen es: "+srcImg);

    /*
    let img = document.createElement("img");
    img.src = srcImg;
    img.id = "pokemon";
    img.draggable = true;
    img.ondragstart = "evdragstart(event)";
    imagenes.appendChild(img);

    let img = document.createElement("div");
    img.innerHTML = `<img src="${srcImg}" alt="" id="pokemon" name="pokemon" draggable="true">`;
    imagenes.appendChild(img);
}


const cargarNomPok = (nombre) => {
    //console.log(nombre);
    nombresPok.push(nombre);
    //console.log(nombresPok);
}
*/

const buscarPokemonPorId = (id) => {
    return new Promise((resolve, reject) => {
        const pok = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(
                response => {
                    if(response.ok){
                        return response.json();
                    }
                    reject("No hemos podido recuperar el pokemon, el codigo de respues del servidor es "+response.status);
                }
            )
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

/*
buscarPokemonPorId(3)
    .then(data => console.log(data))
    .catch(err => console.log(err));
*/
//realizo lo anterior utilizando async y await

generarIdPokemones();
let data = [];

const buscar = async () => {
    try{
        for(let i=0;i<pokemonesId.length;i++){
            const pok = await buscarPokemonPorId(pokemonesId[i]);
            nombresPok.push(pok.name);
            data.push(pok);
            //const pok = await buscarPokemonPorId(id);
            //console.log(pok);    
            //console.log(pok.name);
            //console.log(pok.sprites.front_default);
            //nombresPok.push(pok.name);
            //imgsPok.push(pok.sprites.front_default);
        }

        //console.log(data[2].sprites.front_default); //necesito el id para comparar las imagenes

        nombresPok = nombresPok.sort(() => Math.random() - 1.5);  // para mezclar

        nombresPok.forEach(
            nom => {
                //console.log(nom)

                let nomb = document.createElement("div");
                //nomb.innerHTML = `<div id="nombre" class="name"><p>${nom}</p></div>`;
                nomb.innerHTML = `<p id="nombre" class="name border border-3 border border-warning m-3 fw-bold">${nom}</p>`;  //p-4 m-3
                nombres.appendChild(nomb);
            }
        );

        /*
        let spinner = document.createElement("div");
        spinner.innerHTML = `
            <div class="container">
                <div class="spinner-grow text-primary text-center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-warning text-center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-dark text-center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>`
        ;

        imagenes.appendChild(spinner);
        imagenes.removeChild(spinner);
        */

        data.forEach(
            data => {
                //console.log("-----------------------");
                //console.log(data.id);
                //console.log(data.name);
                //console.log(data.sprites.front_default);

                let img = document.createElement("div");
                img.innerHTML = `<img src="${data.sprites.front_default}" alt="" id="${data.name}" class="image img-fluid" name="pokemon" draggable="true">`;
                imagenes.appendChild(img);
            } 
        );

        let pokemones = document.querySelectorAll(".image");
        
        //console.log(pokemones);
        pokemones = [...pokemones]; //convertimos a arreglo
        //console.log(pokemones);

        pokemones.forEach(
            pokemon => {
                //console.log(pokemon);
                pokemon.addEventListener("dragstart", (event) => {
                    //console.log("dragstart");
                    //console.log(pokemon);
                    //seteamos la data que se va a transferir:
                    event.dataTransfer.setData("text", event.target.id);//aqui tenemos los datos que se van a transferir

                });
            }
        );

        let nombresP = document.querySelectorAll(".name");
        nombresP = [...nombresP];

        let cartel = document.getElementById("cartelito");
        let cantFallas = 0;

        nombresP.forEach(
            nom => {
                nom.addEventListener("dragover", (event) => {
                    event.preventDefault();  // para que podamos hacer un drop
                    //console.log("dragover");
                });

                nom.addEventListener("drop", (event)=>{
                    //console.log("drop");
                    //aqui captuaramos la data transferida
                    const data = event.dataTransfer.getData("text");
                    //console.log(data);

                    let imgP = document.getElementById(`${data}`);

                    if(event.target.innerHTML == data){
                        //console.log("SI");//la imagene es la correcta
                        //console.log(imgP);

                        event.target.innerHTML = ""  //borro el nombre
                        event.target.appendChild(imgP);

                        //cartel.innerHTML = "";
                    }
                    else{
                        //console.log("NO");
                        cantFallas = cantFallas +1;
                        //cartel.innerHTML = "Uups!!!"+cantFallas;
                        //cartel.innerHTML = cantFallas;
                        //console.log(cartel.innerText);
                    }

                    if(imagenes.clientHeight == 0){  //pregunto por el tamaño del div, si se achico quiere decir que ya no hay imagenes

                        //let btnResultado = document.getElementById("btn_Res");
                        btnResultado.style.opacity = 2;
                        //btnResultado.removeAttribute("disabled");
                        //btnResultado.setAttribute("disabled", "");
                        let btn = document.getElementById("btn");
                        btn.disabled = false;  // habilito el boton de nuevo
                        
                        if(cantFallas == 0){
                            cartel.innerHTML = "Cantidad de Fallas: "+cantFallas+"<br> Excelente!!!, GANASTE, eres el mejor!!!";
                            recargarJuego.innerText = "Volver a Jugar";
                        }
                        else{
                            cartel.innerHTML = "uhh!!!, Fallaste "+cantFallas+" veces, pero igual Ganaste, sigue intentandolo!!!";
                        }
                    }
                });
            }
        );
    } catch(error){
        console.log(error);
    }
    finally{
        console.log("La ejecucion continua....");
    }
}

buscar();

console.log(nombresPok);

//generarIdPokemones();
/*    
for(let i=0;i<pokemonesId.length;i++){
    buscar(pokemonesId[i]);
}*/

/*
console.log(nombresPok);
console.log(typeof nombresPok);
console.log("fin del codigo");
*/


/*
{
    const pok = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`) // fetch es una funcion que toma una URL y manda un requiest a esa URL 
    //.then(res => console.log(res));  // tenemos que cachear esa respuesta Pero esto no es lo que necesitamos
    //lo que necesitamos son los datos del pokemon, para esto:
    .then(res => res.json()) //JSON es el formato por el que se pasan datos a travez de la web (el return lo hace de forma automatica)
    .then(data => {   
        // este then captura la data que ya viene preformateada
        // es decir, ya viene listo para poder manipularlo 
        //aqui es donde podemos trabajar con este objeto data:
        // tenemos que seguir trabajando dentro de la promesa, porque si lo hacemos fuera, no 
        //vamos a tener acceso a esto hasta que finalice la promesa.s

        console.log(data); // dato completo
        //console.log(data.name);

        //cargarPok(data);
        cargarNomPok(data.name);


        //data;  // valor que retorna la promesa
        //console.log(data.name);  // nombre del pokemon
        //console.log(data.sprites.front_default) //imagen del pokemon aqui tenemos un vector de vector de imagenes (vamos a tomar la imagen front_default)
        //nombresPok.push(data.name);
        //imgsPok.push(data.sprites.front_default);

        //console.log(nombresPok);
        //nombresPok = nombresPok.sort(() => Math.random() - 0.5);
        //console.log(nombresPok);
        
        //agregarImgTablero(data.sprites.front_default);
        //agregarNomTablero(nombresPok);  //data.name
    }); // y necesitamos otro the para cachear los datos

    //console.log("estoy aqui!!!");
    //agregarNomTablero(nombresPok);  //data.name

    ///console.log(nombresPok);
    /*
    nombresPok.forEach(
        (nom) => {
            console.log(nom);
        }
    );

    /*
    nom = document.createElement("p");
    nom.innerText = data.name;
    nombres.appendChild(nom);
    console.log("El nombre del pokemon es: "+nom.innerText);
    
    nombres.innerHTML = nombres.innerHTML + `<div id="nombre" ondragover="evdragover(event)" ondrop="evdrop(event)"><p>${data.name}</p></div>`;
    imagenes.innerHTML = imagenes.innerHTML + `<div><img src="${data.sprites.front_default}" alt="" id="pokemon" draggable="true" ondragstart="evdragstart(event)"></div>`;
    
}
*/

/*
const armarTableroPok = () => {
    let pok;
    generarIdPokemones();

    for(let i=0;i<pokemonesId.length;i++){
        buscarPokemonPorId(pokemonesId[i]);
        //console.log("El nombre es: "+pok);
    }
    

    //console.log(nombresPok);
    //agregarNomTablero(nombresPok);  //data.name

    /*
    console.log(nombresPok);
    nombresPok = nombresPok.sort(() => Math.random() - 0.5);
    console.log(nombresPok);

    nombresPok.forEach(
        console.log
    );*/     

    /*
    for(let nom in nombresPok){
        agregarNomTablero(nom);
    }
}*/

//armarTableroPok();

//console.log("Los nombre son: ");
//console.log(nombresPok.length);

//let pokemon = document.querySelectorAll("img.pokemon");
//let pokemon = document.getElementsByTagName("img");  //traigo todas las imagenes
//const pokemon = document.getElementsByName("pokemon");
//console.log(pokemon);
//console.log(typeof pokemon);
/*
console.log(pokemon);


for(let i=0;i<pokemon.length;i++){
    pokemon[i].style.borderColor = "5px solid red";
}

pokemon.forEach(
    pok => {
        console.log(pok);
    }
);
*/
//console.log("Los imagenes son: ");
//console.log(pokemon.item(1));

/*
pokemon.forEach((clave) => {
    console.log(pokemon.item(clave))
});*/


//console.log(nombresPok);
//console.log(typeof nombresPok);

/*
const nomPok = nombresPok.map(key => {
    console.log("Entre")
    const value = nombresPok[key]
    console.log(key+' '+value);
});
*/
/*
const nomPok = Object.entries(nombresPok)
    .map(entry => {
        console.log("Entre");
        alert("skdjskd");
        const [key, value] = entry;
        console.log({key, value});
    }
);

nomPok;*/




/*
const buscarPokemonPorId = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`) // fetch es una funcion que toma una URL y manda un requiest a esa URL 
    //.then(res => console.log(res));  // tenemos que cachear esa respuesta Pero esto no es lo que necesitamos
    //lo que necesitamos son los datos del pokemon, para esto:
    .then(res => res.json()) //JSON es el formato por el que se pasan datos a travez de la web 
    .then(data => { 
        console.log(data); // dato completo
        data;  // valor que retorna la promesa
        //console.log(data.name);  // nombre del pokemon
        //console.log(data.sprites.front_default) //imagen del pokemon aqui tenemos un vector de vector de imagenes (vamos a tomar la imagen front_default)
        //nombresPok.push(data.name);
        //imgsPok.push(data.sprites.front_default);

        //console.log(nombresPok);
        //nombresPok = nombresPok.sort(() => Math.random() - 0.5);
        //console.log(nombresPok);
        
        //agregarImgTablero(data.sprites.front_default);
        //agregarNomTablero(nombresPok);  //data.name
    }); // y necesitamos otro the para cachear los datos

    //console.log("estoy aqui!!!");
    //agregarNomTablero(nombresPok);  //data.name

    ///console.log(nombresPok);
    /*
    nombresPok.forEach(
        (nom) => {
            console.log(nom);
        }
    );*/

    /*
    nom = document.createElement("p");
    nom.innerText = data.name;
    nombres.appendChild(nom);
    console.log("El nombre del pokemon es: "+nom.innerText);
    
    nombres.innerHTML = nombres.innerHTML + `<div id="nombre" ondragover="evdragover(event)" ondrop="evdrop(event)"><p>${data.name}</p></div>`;
    imagenes.innerHTML = imagenes.innerHTML + `<div><img src="${data.sprites.front_default}" alt="" id="pokemon" draggable="true" ondragstart="evdragstart(event)"></div>`;
    
}*/
