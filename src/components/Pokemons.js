import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Fuse from 'fuse.js';

const Pokemons = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [searchValue, setSearchValue] = useState("");
    const [selectedGeneration, setSelectedGeneration] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get('https://tyradex.vercel.app/api/v1/pokemon')
            .then((res) => {
                const filteredData = res.data.slice(1);
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
        <div className='pokemons'>
            <div className='radio-container'>
                <div className='left-container'>
                    <input
                        type="range"
                        min='1'
                        max='1025'
                        value={rangeValue}
                        onChange={(event) => handleRangeChange(parseInt(event.target.value, 10))}
                    />
                    <span>{rangeValue} Pokémon par page </span>
                </div>
                <div className='center-container'>
                    <input
                        type="text"
                        placeholder="Rechercher par nom de Pokémon"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                </div>
                <div className='right-container'>
                    <select
                        id="generation-select"
                        value={selectedGeneration}
                        onChange={(event) => setSelectedGeneration(event.target.value)}
                    >
                         <option value="all">Toutes les générations</option>
                        <option value="1">Génération 1</option>
                        <option value="2">Génération 2</option>
                        <option value="3">Génération 3</option>
                        <option value="4">Génération 4</option>
                        <option value="5">Génération 5</option>
                        <option value="6">Génération 6</option>
                        <option value="7">Génération 7</option>
                        <option value="8">Génération 8</option>
                        <option value="9">Génération 9</option>
                    </select>
                </div>
            </div>
            <ul>
                {
                    filteredData
                        .slice(startIndex, endIndex)
                        .map((pokemon, index) =>
                            <Card key={index} pokemon={pokemon} />
                        )
                }
            </ul>
            <div className='PageNumbers'>
                {renderPageNumbers()}
            </div>
        </div>
    );
};

export default Pokemons;


