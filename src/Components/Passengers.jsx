import './Passengers.css';
import { useState } from 'react';
export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send({ type: 'DONE' });
  }

  const submit = (e) => {
    e.preventDefault();
    changeValue('');
    send({ type: 'ADD', passenger: value });
  }

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar</p>
      <div>
        {
          state.context.passengers.map((passenger, index) => (
            <p key={index}>{passenger}</p>
          ))
        }
      </div>
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};