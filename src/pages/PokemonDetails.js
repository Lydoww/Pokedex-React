import { useParams } from "react-router-dom";
import React from 'react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import PokemonDetailsComponent from "../components/PokemonDetailsComponent";
import Navigation from "../components/Navigation";


const PokemonDetails = () => {
    const {} = useParams();

    return (
        <div className="pokemon-detail">
            <Logo />
            <Navigation />
            <PokemonDetailsComponent />
            <Footer />
        </div>
    )
}

export default PokemonDetails;