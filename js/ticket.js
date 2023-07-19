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



const qrData = `Фильм: ${filmName} \nРяд/место: ${chairsString} \nЗал: ${hallName} \nСеанс: ${seanceTime}`;

const qrcode1 = QRCreator(qrData, {
  mode: 4,
  eccl: 0,
  version: -1,
  mask: -1,
  image: 'png',
  modsize: -1,
  margin: 0
});


const content = (qrcode) =>{
  return qrcode.error ?
    `недопустимые исходные данные ${qrcode.error}`:
     qrcode.result;
};

document.getElementById('qrcode1').append( '', content(qrcode1));


});
