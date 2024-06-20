import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import PokemonDetails from './pages/PokemonDetails';
import GigamaxPokemon from './components/GigamaxPokemon';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gigamax' element={<GigamaxPokemon />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<Home />} />
          <Route path='pokemon/:id' element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
