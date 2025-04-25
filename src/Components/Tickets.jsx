import './Tickets.css';

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send({ type: 'FINISH' });
  };

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>{context.flightCountry}</div>
        <div className='Tickets-passengers'>
          <div>
            {
              context.passengers.map((passenger, index) => (
                <p key={index}>{passenger}</p>
              ))
            }
          </div>
          <span>✈</span>
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  );
}; 