document.addEventListener('DOMContentLoaded', function() {

  let seance = JSON.parse(sessionStorage.getItem('seance'));

  const date = new Date(seance.timestamp);

  const buyingInfoTitle = document.querySelector('.buying__info-title');
  buyingInfoTitle.textContent = seance.film.film_name;

  const buyingInfoStart = document.querySelector('.buying__info-start');
  buyingInfoStart.textContent = 'Начало сеанса: '+seance.seance_time;

  const buyingInfoHall = document.querySelector('.buying__info-hall');
  buyingInfoHall.textContent = seance.hall.hall_name; 

  console.log('Полученные данные о сеансе:');
  console.log(seance);
	let seance_start = seance.seance_start;
const hallConfig = seance.hall.hall_config;
//console.log(hallConfig);

const buyingSection = document.querySelector('.conf-step__wrapper');
  buyingSection.innerHTML = hallConfig;
const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
console.log(startOfDay);
console.log(seance_start);

//const timestamp = (startOfDay.getTime() / 1000) + (seance_start * 60);
const timestamp = Math.trunc(startOfDay.getTime() / 1000) + (seance_start * 60);
console.log(timestamp);

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');


  const requestBody = new URLSearchParams();
  requestBody.append('event', 'get_hallConfig');
  requestBody.append('timestamp', timestamp);
  requestBody.append('hallId', String(seance.seance_hallid));
  requestBody.append('seanceId', String(seance.seance_id));

 console.log(requestBody.toString());
 
  fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST',
    headers: headers,
    body: requestBody
  })
    .then(response => response.json())
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
// Получаем все элементы с классом "conf-step__chair"
const chairElements = document.querySelectorAll('.conf-step__chair');

// Добавляем обработчик клика для каждого элемента
chairElements.forEach(chairElement => {
  chairElement.addEventListener('click', () => {
    // Добавляем класс "conf-step__chair_taken"
    chairElement.classList.add('conf-step__chair_taken');
  });
});

const acceptButton = document.querySelector('.acceptin-button');

acceptButton.addEventListener('click', () => {
  const timestamp = seance.timestamp + (seance_start * 60); // Значение timestamp с учетом даты в секундах
  const hallId = seance.seance_hallid; // ID зала
  const seanceId = seance.seance_id; // ID сеанса
  const hallConfiguration = document.querySelector('.conf-step__wrapper').innerHTML; // HTML-разметка из контейнера conf-step__wrapper

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const requestBody = new URLSearchParams();
  requestBody.append('event', 'sale_add');
  requestBody.append('timestamp', timestamp);
  requestBody.append('hallId', hallId);
  requestBody.append('seanceId', seanceId);
  requestBody.append('hallConfiguration', hallConfiguration);

  fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST',
    headers: headers,
    body: requestBody.toString()
  })
    .then(response => response.json())
    .then(result => {
      console.log('Результат бронирования:', result);
      // Дополнительные действия после успешного бронирования
    })
    .catch(error => {
      console.error('Ошибка при бронировании:', error);
      // Дополнительные действия в случае ошибки при бронировании
    });
});



});

