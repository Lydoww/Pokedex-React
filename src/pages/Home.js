import React from 'react';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import Pokemons from '../components/Pokemons';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Logo />
            <Navigation />
            <Pokemons />
            <Footer />
        </div>
    );
};

export default Home;