import './Search.css';
import { useState } from 'react';
import Select from 'react-select';

export const Search = ({ context, send }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const goToPassengers = () => {
    send({ type: 'CONTINUE', flightCountry: selectedOption?.value });
  }

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const options = context.countries.map(country => ({
    value: country.name.common,
    label: country.name.common
  }));

  const customStyles = {
    control: (base) => ({ // el base significa que mantenemos los estilos que trae por defecto de react-select
      ...base,
      padding: '8px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      margin: '0',
    }),
    menu: (base) => ({
      ...base,
      maxHeight: '200px',
      overflowY: 'auto',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#f0f0f0' : 'white',
      // el state es un objeto que contiene propiedades como isSelected, isFocused, isDisabled
      color: '#333',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    }),
  };

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <Select
        className='Search-select'
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        placeholder="Escoge un país"
        styles={customStyles}
        isClearable // esto hace que cuando tiene un value aparezca un x para limpiar el input
      />
      <button 
        onClick={goToPassengers} 
        disabled={!selectedOption} 
        className='Search-continue button'
      >
        Continuar
      </button>
    </div>
  );
}; 