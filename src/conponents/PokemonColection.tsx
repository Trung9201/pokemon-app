import React from 'react'
import { Pokemon, PokemonDetail } from '../interface'
import PokemonList from './PokemonList';
import './pokemon.css'
import { Detail } from '../App';

interface Props {
  pokemons: PokemonDetail[];
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection:React.FC<Props> = (props) => {
  const { pokemons, detail, setDetail } = props
  
  const selecPokemon = (id: number) => {
    if (!detail.isOpened) {
      setDetail({
        id: id,
        isOpened: true
      })
    }
  }

  return (
    <>
      <section className={detail.isOpened ? "container-active" : "container"}>
        {detail.isOpened ? (
          <div className="overlay"></div>
        ) : (
            <div className=""></div>
        )}
        {pokemons.map((pokemon,index) => 
          (
            <div onClick={() => selecPokemon(pokemon.id)}>
              <PokemonList name={pokemon.name} key={pokemon.id} id={pokemon.id} image={pokemon.sprites.front_default} abilities = {pokemon.abilities} detail={detail} setDetail={setDetail} />
            </div>
          )
        )}
      </section>
    </>
  )
}

export default PokemonColection