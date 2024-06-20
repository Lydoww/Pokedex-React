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
            className="ReactModal__Content" // Utilisation de la classe CSS pour styliser le modal
            overlayClassName="ReactModal__Overlay" // Classe pour styliser l'overlay du modal si nécessaire
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


