import React from 'react';
import list from './PokemonList';
import Pokedex from './Pokedex'
// import logo from './logo.svg';
// import './App.css';

const App = () => {
  return (
    <>
    <Pokedex list={list} />
    </>
  )
}

export default App;
