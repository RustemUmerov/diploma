document.addEventListener('DOMContentLoaded', function() {
  let seance = JSON.parse(sessionStorage.getItem('seance'));
  let hallPriceStandart = parseInt(seance.hall.hall_price_standart);
  const priceStandart = document.querySelector('.conf-step__legend-value.price-standart');
priceStandart.textContent = hallPriceStandart;
  let hallPriceVip = parseInt(seance.hall.hall_price_vip);
const priceVip = document.querySelector('.conf-step__legend-value.price-vip');
priceVip.textContent = hallPriceVip;
  const date = new Date(seance.timestamp);

  const buyingInfoTitle = document.querySelector('.buying__info-title');
  buyingInfoTitle.textContent = seance.film.film_name;

  const buyingInfoStart = document.querySelector('.buying__info-start');
  buyingInfoStart.textContent = 'Начало сеанса: ' + seance.seance_time;

  const buyingInfoHall = document.querySelector('.buying__info-hall');
  buyingInfoHall.textContent = seance.hall.hall_name;

  console.log('Полученные данные о сеансе:');
  console.log(seance);
  let seance_start = seance.seance_start;
  const hallConfig = seance.hall.hall_config;

  const buyingSection = document.querySelector('.conf-step__wrapper');
  buyingSection.innerHTML = hallConfig;
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const timestamp = Math.trunc(startOfDay.getTime() / 1000) + (seance_start * 60);

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const requestBody = new URLSearchParams();
  requestBody.append('event', 'get_hallConfig');
  requestBody.append('timestamp', timestamp);
  requestBody.append('hallId', String(seance.seance_hallid));
  requestBody.append('seanceId', String(seance.seance_id));

  fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST',
    headers: headers,
    body: requestBody
  })
    .then(response => response.json())
    .then(htmlString => {
      console.log(htmlString);
      const hallLayoutContainer = document.querySelector('.conf-step__wrapper');
      if (htmlString !== null && htmlString !== 'null') {
        hallLayoutContainer.innerHTML = htmlString;
      }

      addClickHandlers(); // Добавление обработчиков клика независимо от ответа сервера
    })
    .catch(error => {
      console.error(error);
    });

  const selectedSeats = [];
  let totalCost = 0;

  function addClickHandlers() {
    const rows = document.querySelectorAll('.conf-step__row');

    rows.forEach((row, rowIndex) => {
      const seats = row.querySelectorAll('.conf-step__chair');

      seats.forEach((seat, seatIndex) => {
        seat.addEventListener('click', () => {
          if (!seat.classList.contains('conf-step__chair_taken')) {
            const selectedRow = rowIndex + 1;
            const selectedSeat = seatIndex + 1;
            selectedSeats.push({ row: selectedRow, seat: selectedSeat });
            seat.classList.add('conf-step__chair_selected');

            if (seat.classList.contains('conf-step__chair_standart')) {
              totalCost += hallPriceStandart;
            } else if (seat.classList.contains('conf-step__chair_vip')) {
              totalCost += hallPriceVip;
            }

            console.log('Ряд:', selectedRow);
            console.log('Место:', selectedSeat);
            console.log('Общая стоимость билетов:', totalCost);
            console.log(selectedSeats);
          }
        });
      });
    });
  }

  const acceptButton = document.querySelector('.acceptin-button');

  acceptButton.addEventListener('click', () => {
   // const timestamp = seance.timestamp + (seance_start * 60);
    const hallId = seance.seance_hallid;
    const seanceId = seance.seance_id;
    const hallConfiguration = document.querySelector('.conf-step__wrapper').innerHTML;
    const filmName = seance.film.film_name;
    const hallName = seance.hall.hall_name;
    const sessionData = JSON.parse(sessionStorage.getItem('seance'));
    const seanceTime = sessionData.seance_time;

    sessionStorage.setItem('timestamp', timestamp);
    sessionStorage.setItem('hallId', hallId);
    sessionStorage.setItem('seanceId', seanceId);
    sessionStorage.setItem('hallConfiguration', hallConfiguration);
    sessionStorage.setItem('film_name', filmName);
    sessionStorage.setItem('hallName', hallName);
    sessionStorage.setItem('seanceTime', seanceTime);

    sessionStorage.setItem('totalCost', totalCost);
    sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));

    window.location.href = 'payment.html';
  });

});
