import React,{ useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  async function DownloadeData() {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon")
      const PokemonResults = response.data.results
      // console.log(PokemonResults);
      const pokemonResultPromise = PokemonResults.map((pokemon)=> axios.get(pokemon.url))
      const pokemonData = await axios.all(pokemonResultPromise)
      console.log(pokemonData);
      const res = pokemonData.map((pokeData)=>{
        const pokemon = pokeData.data;
        return {
            id : pokemon.id,
            name : pokemon.name,
            image : (pokemon.sprites.other) 
                  ? pokemon.sprites.other.dream_world.front_default 
                  : pokemon.sprites.front_shiny,
            type : pokemon.types
        }
      }) 
      console.log(res);
      setPokemonList(res)
      setIsLoading(false)
  }

  useEffect(() => {
      DownloadeData()
  },[])

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/pokemon").then((result) => {
  //     result.json().then((res) => {
  //       console.log(res);
  //       setData([res.data]);
  //     });
  //   });
  // }, []);
  // console.log(data);

  return (
    <div>
      <h2>pokemon List</h2>
      <br />
      <br />
      {
        (isLoading) ? "Loading Data" : pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/> )
      }
    </div>
  );
}

export default PokemonList;


