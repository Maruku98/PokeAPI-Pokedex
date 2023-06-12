let fetchedPokemons = [];

//JS fetches first 386 pokémons from PokéAPI (up until generation III). Last pokémon is Deoxys-normal
fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=386")
    .then((response) => response.json())
    .then((content) => {
        content.results.forEach((element) => {
            fetch(element.url)
            .then((response) => response.json())
            .then((content) => {
                fetchedPokemons.push(content);  //These pokémon objects are saved in fetchedPokemons array
            });
        });
    })
    .catch(() => {
        alert("Something went wrong while fetching Pokémon data!\nPlease reload the page.");
    });

//Select elements from the DOM
let input = document.querySelector(".user-input");
let form = document.querySelector(".form");
let submitButton = document.querySelector(".submit");
let pokemonName = document.querySelector(".pokemon-name");
let pokemonImage = document.querySelector(".pokemon-image");
let tableCells = document.querySelectorAll(".table-cells");
let allPokemonTypes = [];

//Define event listeners
form.addEventListener("submit", lookup);
input.addEventListener("keydown", () => {
    setTimeout(() => {
        input.value = input.value.toUpperCase();  //Change user input to uppercase while typing
    }, 95);
});

//Define function to show pokémon data or display a warning when the user introduces invalid data
function lookup(e) {
    e.preventDefault();
    if (input.value !== "") {
        for (let element of fetchedPokemons) {
            if (element.name === input.value.toLowerCase()) {
                getPokemonData(element, fetchedPokemons.indexOf(element) - 1, fetchedPokemons.indexOf(element) + 1);
                return;
            };
        };
        userAlert();  //Do something to alert the user that the introduced pokémon name is not a valid name
    };
};

//Define main function to display pokémon data
function getPokemonData(element, beforeIndex, afterIndex) {
    let {name, base_experience, types, sprites, id, weight} = element; //Destructure Pokemon data

    //Reset available moves input
    for (let i = 0; i < 3; i++) {
        tableCells[7].children[i].innerText = "";
    };

    //Display fetched pokémon data
    pokemonImage.setAttribute("src", sprites.front_default);
    pokemonImage.style.padding = "8px";
    pokemonName.innerText = name.toUpperCase();
    tableCells[0].innerText = base_experience;
    tableCells[1].innerText = id;
    tableCells[3].innerText = `${weight / 10} kg`; //Display weight in kilograms

    //Display pokémon type(s)
    allPokemonTypes = [];
    for (let i = 0; i < types.length; i++) {
        allPokemonTypes.push(types[i].type.name);
    };
    tableCells[2].innerText = allPokemonTypes.join(", ").toUpperCase();

    //If-else statement to detect if pokémon is Ditto (Ditto has only 1 move)
    if (element.name !== "ditto") {
        let totalMoves = element.moves.length; //Get total number of moves that that pokémon can learn
        let randomMove;
        for (let i = 0; i < 3; i++) {
            randomMove = Math.floor(Math.random() * totalMoves);  //Get 3 random moves of that pokémon on every search
            tableCells[7].children[i].innerText = element.moves[randomMove].move.name.toUpperCase();
        }
    }
    else {
        let {move: {name: move1}} = element.moves[0]; //Pokémon is Ditto, so retrieve its unique move (transform)
        tableCells[7].children[0].innerText = `${move1.toUpperCase()} (ONLY)`;
    };

    //Display pokémons that are one position before and after the searched one
    tableCells[4].innerText = fetchedPokemons[beforeIndex].name.toUpperCase();
    tableCells[5].innerText = fetchedPokemons[afterIndex].name.toUpperCase();

    //Reset input and extit function
    input.value = "";
    return;
};

//Define function to alert the user that the introduced pokémon name is not a valid name
function userAlert() {
    input.value = "";
    input.setAttribute("placeholder", "Please enter a valid name! :(");
    input.style.borderColor = "red";
    setTimeout(() => {
        input.setAttribute("placeholder", "Enter Pokemon name");
        input.style.borderColor = "black";
    }, 2000);
};