import React from 'react';

const GigaCard = ({ pokemon, onClick }) => {
    return (
        <li className="card" onClick={() => onClick(pokemon)}>
            <img src={pokemon.sprites.gmax.regular} alt={"pokemon " + pokemon.name.fr}/>
            <div className="infos">
                <h2>N° {pokemon.pokedex_id}</h2>
                <h4>{pokemon.name.fr}</h4>
                <p>Types : {
                    pokemon.types.map((type, index) => (
                        <span key={index}>{type.name} </span>
                    ))
                }</p>
            </div>
        </li>
    );
};

export default GigaCard;

