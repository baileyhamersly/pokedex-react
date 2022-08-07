import React, { useEffect, useState } from "react";
import axios from "axios"; // optional
import "./styles.css";

export default function App() {
  const [pokeList, setPokeList] = useState();
  const [currentPoke, setCurrentPoke] = useState(1);
  const [currentPokeData, setCurrentPokeData] = useState();
  async function getPokemonList() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      console.log("RES IN GET LIST:", response);
      return response.data.results;
    } catch (error) {
      console.log("ERROR IN GET LIST:", error);
    }
  }

  async function getPokemonData(pokeNumber) {
    try {
      console.log("pokeNumber", pokeNumber);
      const url = "https://pokeapi.co/api/v2/pokemon/" + pokeNumber;
      console.log(url);
      const response = await axios.get(url);
      console.log("RES IN GET DATA:", response);
      return response.data;
    } catch (error) {
      console.log("ERROR IN GET DATA:", error);
    }
  }

  async function getPokemonDescription(pokeName) {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon/" + pokeName;
      const descResponse = await axios.get(url);
      console.log("RES IN GET DESC", descResponse);
      return descResponse.data;
    } catch (error) {
      console.log("ERROR IN GET DESC: ", error);
    }
  }

  useEffect(() => {
    async function getData() {
      const pokeData = await getPokemonList();
      setPokeList(pokeData);
      console.log("pokeList", pokeList);
    }
    getData();
    console.log("pokeList", pokeList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getData() {
      const pokeData = await getPokemonData(currentPoke);
      const pokeDesc = await getPokemonDescription(pokeData.name);
      setCurrentPokeData({ pokeData, pokeDesc });
      console.log("current poke data", pokeData, pokeDesc);
    }
    getData();
  }, [currentPoke]);

  /*
Instructions
1. Create a dropdown that displays the names of the first 151 pokemon
- fetch pokemon list at https://pokeapi.co/api/v2/pokemon?limit=151

2. Render the image for the first pokemon
- fetch first pokemon information at https://pokeapi.co/api/v2/pokemon/1
- in the response, find image source in sprites > front_default

3. After a pokemon is selected, render the image for that selected pokemon
- fetch pokemon information at https://pokeapi.co/api/v2/pokemon/{POKEMON NAME}
- in the response, find image source in sprites > front_default
*/

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <label htmlFor="pokemon-select">Select pokémon</label>
      <select
        name="pokemon"
        id="pokemon-select"
        onChange={(e) => {
          console.log("event", e.target.value);
          setCurrentPoke(e.target.value);
          console.log("currentPoke", currentPoke);
        }}
      >
        {pokeList &&
          pokeList.map((pokemon, index) => {
            return (
              <option key={index} value={index + 1}>
                {pokemon?.name}
              </option>
            );
          })}
      </select>
      {console.log("currentPokeData", currentPokeData)}
      <img
        src={currentPokeData?.pokeData?.sprites?.back_default}
        alt={currentPokeData?.pokeData?.name}
      ></img>
      <div>{/* {currentPokeData.pokeDesc.} */}</div>
    </div>
  );
}
