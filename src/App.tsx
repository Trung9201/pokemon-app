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
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getPokemon = async() => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit10?offset10")
      setNextUrl(res.data.next)
      res.data.results.forEach(async(pokemons:Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemons.name}`)
        
        setPokemons((p)=>[...p, poke.data])
        setLoading(false)
      })
    }
    getPokemon()
  },[])

  const nextPage = async () => {
    let res = await axios.get(nextUrl)
    setNextUrl(res.data.next)
    setLoading(true)

    res.data.results.forEach(async(pokemons:Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemons.name}`)
      setPokemons((p)=>[...p, poke.data])
        setLoading(false)
    })
  }

  return (
    <div className="App">
      <header className="pokemon-header">Pokemon</header>
      <PokemonColection pokemons={pokemons}/>
      <button className="btn-load" onClick={nextPage}>Load more</button>
    </div>
  );
}

export default App;
