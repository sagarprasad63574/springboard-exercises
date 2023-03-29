import React from 'react';
import "./Pokedex.css";
import Pokecard from './Pokecard'

const Pokedex = ({ list }) => {
    return (
        <div className="Pokedex">
            <h2 className="Pokedex-title">Pokedex</h2>
            <div className="Pokedex-cards">
                {list.map(pokemon => (
                    <div key={pokemon.id}>
                        <Pokecard
                            id={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            base_experience={pokemon.base_experience}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pokedex;