import axios from "axios";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import GigaCard from "./GigaCard";
import Logo from '../components/Logo';
import Navigation from "./Navigation";
import Footer from '../components/Footer';

const GigamaxPokemons = () => {
    const [data, setData] = useState([]);
    const [searchValue] = useState(""); // Retiré setSearchValue car non utilisé
    const [selectedGeneration] = useState("all"); // Retiré setSelectedGeneration car non utilisé
    const [modal, setModal] = useState(-1)

    useEffect(() => {
        axios
            .get('https://tyradex.vercel.app/api/v1/pokemon')
            .then((res) => {
                // Filtrer les Pokémon pour inclure uniquement ceux avec une image gmax
                const filteredData = res.data.slice(1).filter(pokemon => pokemon.sprites && pokemon.sprites.gmax);
                setData(filteredData);
            });
    }, []);

    const fuse = new Fuse(data, {
        keys: ['name.fr'],
        includeScore: true
    });

    const exactMatch = data.find(pokemon => pokemon.name.fr.toLowerCase() === searchValue.toLowerCase());

    let filteredData;
    if (exactMatch) {
        filteredData = [exactMatch];
    } else {
        filteredData = searchValue.length >= 2 ? fuse.search(searchValue).map(result => result.item) : data;
    }

    if (selectedGeneration !== "all") {
        filteredData = filteredData.filter(pokemon => pokemon.generation === parseInt(selectedGeneration, 10));
    }

    const renderPokemonCards = () => {
        return filteredData.map((pokemon, index) => (
            <div key={index} onClick={() => {setModal(index); 
                console.log("yes");
            }}>
            <GigaCard index={index} pokemon={pokemon} modal={modal} />
            </div>
        ));
    };

    return (
        <>
            <Logo />
            <Navigation />
            <div className='gigaPokemon'>
                <ul>
                    {renderPokemonCards()}
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default GigamaxPokemons;
