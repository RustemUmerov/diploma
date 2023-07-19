document.addEventListener('DOMContentLoaded', function() {
  // Получение данных из sessionStorage
  const timestamp = sessionStorage.getItem('timestamp');
  const hallId = sessionStorage.getItem('hallId');
  const seanceId = sessionStorage.getItem('seanceId');
  const hallConfiguration = sessionStorage.getItem('hallConfiguration');
  const filmName = sessionStorage.getItem('film_name');
  const hallName = sessionStorage.getItem('hallName');
  const seanceTime = sessionStorage.getItem('seanceTime');

  const totalCost = sessionStorage.getItem('totalCost');

  // Вставка данных в соответствующие элементы на странице
  const ticketTitle = document.querySelector('.ticket__details.ticket__title');
  ticketTitle.textContent = filmName;

  const hallTitle = document.querySelector('.ticket__details.ticket__hall');
  hallTitle.textContent = hallName;

  const timeTitle = document.querySelector('.ticket__details.ticket__start');
  timeTitle.textContent = seanceTime;

  const ticketCost = document.querySelector('.ticket__details.ticket__cost');
  ticketCost.textContent = totalCost;

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

  const acceptButton = document.querySelector('.acceptin-button');
  acceptButton.addEventListener('click', () => {
    const updatedHallConfiguration = hallConfiguration.replace(/conf-step__chair_selected/g, 'conf-step__chair_taken');
	
	// Отправка запроса sale_add
    const requestBody = new URLSearchParams();
  requestBody.append('event', 'sale_add');
  requestBody.append('timestamp', timestamp);
  requestBody.append('hallId', hallId);
  requestBody.append('seanceId', seanceId);
  requestBody.append('hallConfiguration', updatedHallConfiguration);

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    fetch('https://jscp-diplom.netoserver.ru/', {
      method: 'POST',
      headers: headers,
      body: requestBody
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Ответ сервера на запрос sale_add:', responseData);
        // Другие действия при получении ответа от сервера

        // Перенаправление на страницу ticket.html
        window.location.href = 'ticket.html';
      })
      .catch(error => {
        console.error(error);
        // Обработка ошибки при выполнении запроса
      });

    // Сохранение данных в sessionStorage
    sessionStorage.setItem('filmName', filmName);
    sessionStorage.setItem('hallName', hallName);
    sessionStorage.setItem('seanceTime', seanceTime);
    sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  });
});
