import React from 'react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import PokemonDetailsComponent from "../components/PokemonDetailsComponent";
import Navigation from "../components/Navigation";


const PokemonDetails = () => {
    

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