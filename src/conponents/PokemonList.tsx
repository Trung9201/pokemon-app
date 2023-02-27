import React, { useEffect, useState } from 'react';
import { Detail } from '../App';
import './pokemon.css';

interface Props {
  name: string;
  id: number;
  image: string;
  abilities: {
    name: string,
    ability: string
  }[] | undefined;
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonList:React.FC<Props> = (props) => {
  const { name, id, image, abilities, detail, setDetail } = props;
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(id === detail?.id)
  }, [detail])
   
  const closeDetail = () => {
    setDetail({
      id: 0,
      isOpened: false
    })
  }

  return (
    <div>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
            <div className="detail-info">
              <img src={image} alt="poke" className='detail-img' />
              <div className="detail-name">{ name }</div>
            </div>
            <div className="detail-skill">
              <div className="detail-ability">Abilities:</div>
              <br />
              {
              abilities?.map((ab: any) => {
                return (
                  <div className="skill">{ab.ability.name}</div>
                )
              })
          }
            </div>
          </div>
        </section>
      ):
      (
        <section className="pokemon-list">
          <div className="pokemon-name">{name}</div>
          <img className="pokemon-image" src={image} />
        </section>
      )}
    </div>
  )
}

export default PokemonList