import axios from "axios";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import GigaCard from "./GigaCard";
import Logo from '../components/Logo';
import Navigation from "./Navigation";
import Footer from '../components/Footer';
import ModalPokemonGmax from './ModalPokemonGmax';

const GigamaxPokemons = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [searchValue, setSearchValue] = useState("");
    const [selectedGeneration, setSelectedGeneration] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

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

    const pageCount = Math.ceil(filteredData.length / rangeValue);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRangeChange = (value) => {
        setRangeValue(value);
        // Adjust the current page if the new rangeValue exceeds the total number of pages
        const newPageCount = Math.ceil(filteredData.length / value);
        if (currentPage > newPageCount) {
            setCurrentPage(newPageCount);
        }
    };

    const openModal = (pokemon) => {
        setSelectedPokemon(pokemon);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedPokemon(null);
        setModalIsOpen(false);
    };

    const startIndex = Math.max((currentPage - 1) * rangeValue, 0);
    const endIndex = Math.min(startIndex + rangeValue, filteredData.length);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const pagesToShow = 3;

        let startPage = 1;
        if (currentPage > 2) {
            startPage = currentPage - 1;
        }

        for (let i = startPage; i <= startPage + pagesToShow - 1; i++) {
            if (i > pageCount) {
                break;
            }
            pageNumbers.push(i);
        }

        return pageNumbers.map((page) => (
            <button 
                key={page} 
                className={currentPage === page ? "page-button selected-page" : "page-button"} 
                onClick={() => handlePageChange(page)}
            >
                {page}
            </button>
        ));
    };

    return (
        <>
        <Logo />
        <Navigation />
        <div className='gigaPokemon'>
            <ul>
                {
                    filteredData
                        .slice(startIndex, endIndex)
                        .map((pokemon, index) =>
                            <GigaCard key={index} pokemon={pokemon} onClick={() => openModal(pokemon)} />
                        )
                }
            </ul>
            <div className='PageNumbers'>
                {renderPageNumbers()}
            </div>
        </div>
        <Footer />

        <ModalPokemonGmax
            isOpen={modalIsOpen}
            closeModal={closeModal}
            pokemon={selectedPokemon}
        />
        </>
    );
};

export default GigamaxPokemons;
