# PokéAPI Pokédex
Get Pokémon data from PokéAPI!<br></br>
<img src="https://github.com/Maruku98/PokeAPI-Pokedex/assets/133391272/6c457265-720a-4399-8254-b59516454a4c" height="600">

## Overview
Consuming `RESTful APIs` is one of the key skills that every front-end developer should have. After getting familiar with promises and asynchronous language, I decided I wanted to develop a project that involved consuming an `API` of my choice and letting the user interact with its information.<br></br> Since I played Pokémon a lot when I was a child —more specifically, **Pokémon Mystery Dungeon: Blue Rescue Team**— I chose PokéAPI, a free `RESTful` `API` connected to an extensive database detailing everything about the Pokémon main game series: Pokémon names, their stats, their living areas, and so on!
⚠️I've always been fond of Pokémon up to the third generation, so the latest Pokémon that the user can retrieve data from is `Deoxys-Normal` (number 386).

## PROGRAMMING LANGUAGES USED
- **HTML5**
- **CSS3**
- **Vanilla JavaScript ES6**

## Pokédex Features
### Overall behavior
When page loads, JavaScript fetches the first 386 Pokémon from `PokéAPI`, i.e, Pokémon up to generation III. Then, the retrieved Pokémon are stored in an array named `fetchedPokemons`.  
From this point, users can type and submit a Pokémon name within the mentioned range to obtain certain features about them. If the submitted name is wrong or doesn't exist, a warning message is shown.

### INPUT
Users are expected to submit a Pokémon name in the text input. Once done, data from that Pokémon is displayed on the page. The text input covers the following aspects:
- Text is automatically converted to upper case while typing.
- Users can submit the text both by pressing `Enter` or clicking on the `Search!` button.
- If users submit an invalid Pokémon name, i.e, a non-existent Pokémon or a misspelled name, an alert message is displayed. This also includes out-of-range Pokémon names like Piplup or Lucario.

### POKÉMON DATA
Not all data from the API is retrieved and shown to the user. Below are the following aspects covered in my Pokédex:
- Base Pokémon experience (a number).
- Pokémon ID (a number).
- All types of the Pokémon (a string). If the Pokémon belongs to more than one type, they are displayed separated by commas.
- Pokémon weight in kilograms (a string). Since PokéAPI provides Pokémon weight in hectograms, they are converted to kilograms right before being displayed.
- Previous Pokémon on the PokéAPI (a string). **Important**: this is not actually the previous Pokémon in the standard order, but in the order used in the API.
- Next Pokémon on the PokéAPI (a string).
- Three random moves that Pokémon can learn. This was such a tricky part because while some Pokémon can learn plenty of moves, some others like Silcoon or Cascoon cannot. To achieve this, `Math.random()` was used in combination with `Math.floor()` to generate 3 random numbers every time a Pokémon is searched. Since the mathematical result is multiplied by the total number of that Pokémon available moves, a number bigger than their total available moves is never generated.

> There are only 5 moves available to Silcoon, each one of them assigned to an array index between 0 and 5.  
> Therefore, the lowest number randomly generated this way is 0 and the largest 5.

- If the searched Pokémon is Ditto, the only displayed move is the only one it can learn (transform).
