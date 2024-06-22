import React, { useEffect, useState } from 'react';
import ModalPokemonGmax from './ModalPokemonGmax';

const GigaCard = ({ pokemon, index, modal }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if(index !== modal) {
            setModalIsOpen(false)
        }
        console.log(index, modal);
    }, [index, modal])

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <>
            <li className="card" onClick={openModal}>
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
            <ModalPokemonGmax
                isOpen={modalIsOpen}
                closeModal={closeModal}
                pokemon={pokemon}
            />
        </>
    );
};

export default GigaCard;
