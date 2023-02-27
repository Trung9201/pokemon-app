import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonColection from '../src/conponents/PokemonColection'
import { Pokemon } from './interface';

interface Pokemons {
  name: string,
  url: string
}

export interface Detail {
  id: number,
  isOpened: boolean,
}


function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [detail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  })

  useEffect(() => {
    const getPokemon = async() => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5?offset=5")
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
      <PokemonColection pokemons={pokemons} detail={detail} setDetail={setDetail} />
      <button className="btn-load" onClick={nextPage}>{loading ? "Loading...": "Load more"}</button>
    </div>
  );
}

export default App;
