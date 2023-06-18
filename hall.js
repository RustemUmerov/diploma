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

const hallConfig = seance.hall.hall_config;
console.log(hallConfig);

const buyingSection = document.querySelector('.conf-step');
  buyingSection.innerHTML = hallConfig;


  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');





  const requestBody = new URLSearchParams();
  requestBody.append('event', 'get_hallConfig');
  requestBody.append('timestamp', seance.timestamp / 1000);
  requestBody.append('hallId', seance.seance_hallid);
  requestBody.append('seanceId', seance.seance_id);

 console.log(requestBody.toString());
 
  fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST',
    headers: headers,
    body: requestBody.toString()
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
	
	

/*const requestBody = 'event=get_hallConfig&timestamp=$1687184404.483&hallId=$71&seanceId=$64';

fetch('https://jscp-diplom.netoserver.ru/', {
  method: 'POST',
  headers: headers,
  body: requestBody
})
  .then(response => response.text())
  .then(htmlString => {
    console.log(htmlString);
    // Дальнейшая обработка полученной HTML-строки
  })
  .catch(error => {
    console.error(error);
  });
*/
	
});
