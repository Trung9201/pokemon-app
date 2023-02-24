import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonColection from '../src/conponents/PokemonColection'
import { Pokemon } from './interface';

interface Pokemons {
  name: string,
  url: string
}


function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  useEffect(() => {
    const getPokemon = async() => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20?offset=20")
      res.data.results.forEach(async(pokemons:Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemons.name}`)
        
        setPokemons((p)=>[...p, poke.data])
        
      })
    }
    getPokemon()
  },[])
  return (
    <div className="App">
      <header className="pokemon-header">Pokemon</header>
      <PokemonColection pokemons={pokemons}/>
    </div>
  );
}

export default App;
