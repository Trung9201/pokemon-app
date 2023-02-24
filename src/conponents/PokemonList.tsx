import React from 'react'
import './pokemon.css'

interface Props {
    name: string,
    id: number,
    image: string
}

const PokemonList:React.FC<Props> = (props) => {
    const {name, id, image} = props
  return (
    <div>
        <section className="pokemon-list">
            <div className="pokemon-name">{name}</div>
            <img className="pokemon-image" src={image} />
        </section>
    </div>
  )
}

export default PokemonList