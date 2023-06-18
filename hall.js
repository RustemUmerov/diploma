document.addEventListener('DOMContentLoaded', function() {
  // Получение данных из sessionStorage
  let seance = JSON.parse(sessionStorage.getItem('seance'));

  const date = new Date(seance.timestamp);

  const buyingInfoTitle = document.querySelector('.buying__info-title');
  buyingInfoTitle.textContent = seance.film.film_name;

  const buyingInfoStart = document.querySelector('.buying__info-start');
  buyingInfoStart.textContent = 'Начало сеанса: '+seance.seance_time;

  const buyingInfoHall = document.querySelector('.buying__info-hall');
  buyingInfoHall.textContent = seance.hall.hall_name; 
  
 // const hallLayoutContainer = document.getElementById('hall-layout-container');
    //  hallLayoutContainer.innerHTML = seance.hall.hall_config;
 //const config = document.querySelector('.hall-layout-container');
 // config.innerHTML = seance.hall.hall_config;  

  // Вывод данных в консоль для проверки
  console.log('Полученные данные о сеансе:');
  console.log(seance);

  // Отправка POST-запроса для получения схемы расположения мест
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const requestBody = new URLSearchParams();
  requestBody.append('event', 'get_hallConfig');
  requestBody.append('timestamp', seance.timestamp / 1000);
  requestBody.append('hallId', seance.seance_hallid);
  requestBody.append('seanceId', seance.seance_id);
	
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
