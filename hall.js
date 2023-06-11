document.addEventListener('DOMContentLoaded', function() {
  // Получение данных из sessionStorage
  const selectedSeanceTimestamp = sessionStorage.getItem('selectedSeanceTimestamp');
  const selectedSeanceHallId = sessionStorage.getItem('selectedSeanceHallId');
  const selectedSeanceId = sessionStorage.getItem('selectedSeanceId');
  const selectedMovieTitle = sessionStorage.getItem('selectedMovieTitle');
  const selectedHours = sessionStorage.getItem('selectedHours');
  const selectedMinutes = sessionStorage.getItem('selectedMinutes');

  const selectedDate = sessionStorage.getItem('selectedDate');

  // Вывод данных в консоль для проверки
  console.log('Полученные данные о сеансе:');
  console.log('Timestamp:', selectedSeanceTimestamp);
  console.log('Hall ID:', selectedSeanceHallId);
  console.log('Seance ID:', selectedSeanceId);
  console.log('Title:', selectedMovieTitle);
  console.log('Hours:', selectedHours);
  console.log('Min:', selectedMinutes);
  console.log('Date:', selectedDate);

  // Отправка POST-запроса для получения схемы расположения мест
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  const requestBody = new URLSearchParams();
  requestBody.append('event', 'get_hallConfig');
  requestBody.append('timestamp', selectedSeanceTimestamp);
  requestBody.append('hallId', selectedSeanceHallId);
  requestBody.append('seanceId', selectedSeanceId);
	
	/*const movieTitle = sessionStorage.getItem('selectedMovieTitle');*/
const seanceStartTime = sessionStorage.getItem('selectedSeanceStartTime');
const hallName = sessionStorage.getItem('selectedHallName');

const buyingInfoTitle = document.querySelector('.buying__info-title');
buyingInfoTitle.textContent = `${selectedMovieTitle}`;

const buyingInfoStart = document.querySelector('.buying__info-start');
buyingInfoStart.textContent = `Начало сеанса: ${selectedHours}:${selectedMinutes}`;

const buyingInfoHall = document.querySelector('.buying__info-hall');
buyingInfoHall.textContent = `Зал ${hallName}`;

	
	
  fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST',
    headers: headers,
    body: requestBody.toString()
  })
    .then(response => response.text())
    .then(htmlString => {
      // Вывод полученной HTML-строки в консоль для проверки
      console.log(htmlString);

      // Вставка HTML-строки на страницу hall.html
      const hallLayoutContainer = document.getElementById('hall-layout-container');
      hallLayoutContainer.innerHTML = htmlString;
    })
    .catch(error => {
      console.error(error);
    });
});
