import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'antd'; // import antd Modal component
import 'antd/dist/reset.css'; // import antd CSS styles
import './index'; // import custom CSS styles

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null); // new state variable for selected pokemon

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then(res => {
        setPokemons(res.data.results)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const getPokemonImage = (pokemonName) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.find(pokemon => pokemon.name === pokemonName).url.split('/')[6]}.png`;
  }

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  }

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  }

  const handleOk = () => {
    handleCloseModal();
  }

  const filteredPokemons = pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Pokedex by Juan Pinheiro</h1>
      <input type="text" placeholder="Search Pokemon" className="search-input" onChange={handleSearchChange} />
      <div className="pokemons-container">
        {filteredPokemons.map((pokemon, index) => {
          return (
            <div key={index} className="pokemon-card" onClick={() => handleCardClick(pokemon)}>
              <img src={getPokemonImage(pokemon.name)} alt={pokemon.name} className="pokemon-image" />
              <p className="pokemon-name">{pokemon.name}</p>
            </div>
          );
        })}
      </div>
      {/* Render modal if selectedPokemon is truthy */}
      {selectedPokemon && (
        <Modal visible={true} onCancel={handleCloseModal} onOk={handleOk}>
          <div className="pokemon-details">
            <img src={getPokemonImage(selectedPokemon.name)} alt={selectedPokemon.name} className="pokemon-image" />
            <h2 className="pokemon-name">{selectedPokemon.name}</h2>
            <p>Height: {selectedPokemon.height && pokemons.height}</p>
            <p>Weight: {selectedPokemon.weight && pokemons.weight}</p>
            {/* Render other details as needed */}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Pokedex;
