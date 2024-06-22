import React, { useState } from 'react';
import Modal from 'react-modal';

const ModalPokemonGmax = ({ isOpen, closeModal, pokemon }) => {
    const [isShiny, setIsShiny] = useState(false);

    const handleToggleShiny = () => {
        setIsShiny(!isShiny);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Détails du Pokémon"
            className="ModalPokemonGmax__Content" // Classe CSS pour styliser le contenu du modal
            overlayClassName="ModalPokemonGmax__Overlay" // Classe CSS pour styliser l'overlay du modal
        >
            {pokemon && (
                <div className="modal-content">
                    <h2>{pokemon.name.fr}</h2>
                    <img
                        src={isShiny ? pokemon.sprites.gmax.shiny : pokemon.sprites.gmax.regular}
                        alt={pokemon.name.fr}
                    />
                    <button onClick={handleToggleShiny}>
                        {isShiny ? 'Normal' : 'Shiny'}
                    </button>
                    <button onClick={closeModal}>Fermer</button>
                </div>
            )}
        </Modal>
    );
};

export default ModalPokemonGmax;


