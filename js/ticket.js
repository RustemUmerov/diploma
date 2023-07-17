document.addEventListener('DOMContentLoaded', function() {
  // Получение данных из sessionStorage
  const filmName = sessionStorage.getItem('filmName');
  const ticketTitle = document.querySelector('.ticket__details.ticket__title');
  ticketTitle.textContent = filmName;
  
const hallName = sessionStorage.getItem('hallName');
const hallTitle = document.querySelector('.ticket__details.ticket__hall');
  hallTitle.textContent = hallName;
  
const seanceTime = sessionStorage.getItem('seanceTime');
const timeTitle = document.querySelector('.ticket__details.ticket__start');
  timeTitle.textContent = seanceTime;

const ticketChairsSpan = document.querySelector('.ticket__chairs');
  const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));




  let chairsString = '';

  for (let i = 0; i < selectedSeats.length; i++) {
    const { row, seat } = selectedSeats[i];
    const seatString = `${row}/${seat}`;

    if (i === 0) {
      chairsString += seatString;
    } else {
      chairsString += `, ${seatString}`;
    }
  }

  ticketChairsSpan.textContent = chairsString;







});
