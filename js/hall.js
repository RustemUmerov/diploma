function getSelectedSeat() {
  const rows = document.querySelectorAll('.conf-step__row');
  let selectedRow = -1;
  let selectedSeat = -1;

  for (let i = 0; i < rows.length; i++) {
    const seats = rows[i].querySelectorAll('.conf-step__chair');

    for (let j = 0; j < seats.length; j++) {
      if (seats[j].classList.contains('conf-step__chair_taken')) {
        selectedRow = i + 1;
        selectedSeat = j + 1;
        break;
      }
    }

    if (selectedSeat === -1) {
      // Если не найдено выбранного места в текущем ряду, пропускаем его и продолжаем со следующим рядом
      continue;
    }

    if (selectedRow !== -1 && selectedSeat !== -1) {
      break;
    }
  }

  return { selectedRow, selectedSeat };
}



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
     // const hallLayoutContainer = document.getElementById('conf-step__wrapper');
     //const hallLayoutContainer = document.getElementsByClassName('conf-step__wrapper');
const hallLayoutContainer = document.querySelector('.conf-step__wrapper');
if (htmlString !== null) {
hallLayoutContainer.innerHTML = htmlString;}


     // hallLayoutContainer.innerHTML = htmlString;
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
	const selectedSeat = getSelectedSeat();
	console.log('Ряд:', selectedSeat.selectedRow);
console.log('Место:', selectedSeat.selectedSeat);
  });
});

const acceptButton = document.querySelector('.acceptin-button');

acceptButton.addEventListener('click', () => {
	
  const timestamp = seance.timestamp + (seance_start * 60); // Значение timestamp с учетом даты в секундах
  const hallId = seance.seance_hallid; // ID зала
  const seanceId = seance.seance_id; // ID сеанса
  const hallConfiguration = document.querySelector('.conf-step__wrapper').innerHTML; 
  const filmName = seance.film.film_name;
  const hallName = seance.hall.hall_name;
  //const seanceTime = seance.seance_time;
  const sessionData = JSON.parse(sessionStorage.getItem('seance'));
const seanceTime = sessionData.seance_time;


  
  // HTML-разметка из контейнера conf-step__wrapper

	sessionStorage.setItem('timestamp', timestamp);
sessionStorage.setItem('hallId', hallId);
sessionStorage.setItem('seanceId', seanceId);
sessionStorage.setItem('hallConfiguration', hallConfiguration);
sessionStorage.setItem('film_name', filmName);
sessionStorage.setItem('hallName', hallName);
sessionStorage.setItem('seanceTime', seanceTime);
window.location.href = 'payment.html';



  /* const headers = new Headers();
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
    }); */
});
});

