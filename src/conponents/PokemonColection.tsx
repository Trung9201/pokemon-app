import React from 'react'
import { Pokemon } from '../interface'
import PokemonList from './PokemonList';
import './pokemon.css'

interface Props {
  pokemons: Pokemon[];
}

const PokemonColection:React.FC<Props> = (props) => {
  const {pokemons} = props
  return (
    <div>
      <section className="container">
        {pokemons.map((e,index) => 
          (
            <div>
              <PokemonList name={e.name} key={e.id} id={e.id} image={e.sprites.front_default} />
            </div>
          )
        )}
      </section>
    </div>
  )
}

export default PokemonColection