import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const PokemonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [showShiny, setShowShiny] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await axios.get(`https://tyradex.vercel.app/api/v1/pokemon/${id}`);
                setPokemon(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the Pokemon data:', error);
            }
        };

        fetchPokemon();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>; // Ajoutez un composant de chargement ici si nécessaire
    }

    const toggleShiny = () => {
        setShowShiny(!showShiny);
    };

    const renderPokemonImage = () => {
        const sprite = showShiny && pokemon.sprites.shiny ? pokemon.sprites.shiny : pokemon.sprites.regular;

        return (
            <img
                src={sprite}
                alt={pokemon.name.fr}
                onMouseEnter={toggleShiny}
                onMouseLeave={toggleShiny}
            />
        );
    };

    const renderEvolutions = () => {
        if (!pokemon.evolution) {
            return <p>Ce Pokémon n'a pas d'évolution</p>;
        }
        if (!pokemon.evolution.next && !pokemon.evolution.pre) {
            return <p>Ce Pokémon n'a pas d'évolution</p>;
        } else {
            const allEvolutions = [...(pokemon.evolution.pre || []), ...(pokemon.evolution.next || [])];

            return (
                <div className="evolutions">
                    <p>Évolution :</p>
                    <ul>
                        {allEvolutions.map(evolution => (
                            <li key={evolution.pokedex_id}>
                                <img src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${evolution.pokedex_id}/regular.png`} alt={evolution.name} />
                                <div>
                                    <Link to={`/pokemon/${evolution.pokedex_id}`}>
                                        <p>{evolution.name}</p>
                                        <p>{evolution.condition}</p>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    const renderTypeImages = () => {
        return (
            <div className="type-images">
                {pokemon.types.map(type => (
                    <img key={type.name} src={type.image} alt={type.name} />
                ))}
            </div>
        );
    };

    const handlePreviousPokemon = () => {
        const previousId = parseInt(id) - 1;
        if (previousId > 0) {
            navigate(`/pokemon/${previousId}`);
        }
    };

    const handleNextPokemon = () => {
        const nextId = parseInt(id) + 1;
        if (nextId <= 1025) {
            navigate(`/pokemon/${nextId}`);
        }
    };

    return (
        <div>
            <div className="navigation-buttons">
                <button onClick={handlePreviousPokemon} disabled={parseInt(id) <= 1}>
                    <FaLongArrowAltLeft size="2em"/>
                </button>
                <button onClick={handleNextPokemon} disabled={parseInt(id) >= 1025}>
                    <FaLongArrowAltRight size="2em"/>
                </button>
            </div>
            <div className="pokemon-detail">
                <div className="pokemon-info">
                    <div className="pokemon-image">
                        {renderPokemonImage()}
                        {renderTypeImages()}
                    </div>
                    <div className="pokemon-details">
                        <h1>{pokemon.name.fr} N° {pokemon.pokedex_id}</h1>
                        <p><span>Type:</span> {pokemon.types.map(type => type.name).join(', ')}</p>
                        <p><span>Taille:</span> {pokemon.height} </p>
                        <p><span>Poids:</span> {pokemon.weight} </p>
                        <p><span>Génération:</span> {pokemon.generation} </p>
                        <p><span>Catégorie:</span> {pokemon.category} </p>
                        <p><span>Talent:</span> {pokemon.talents.map(talent => talent.name).join(', ')} </p>
                    </div>
                </div>
                {renderEvolutions()}
            </div>
        </div>
    );
};

export default PokemonDetail;

