document.addEventListener('DOMContentLoaded', function() {
  // Получение данных из sessionStorage
  const timestamp = sessionStorage.getItem('timestamp');
  const hallId = sessionStorage.getItem('hallId');
  const seanceId = sessionStorage.getItem('seanceId');
  const hallConfiguration = sessionStorage.getItem('hallConfiguration');
  const filmName = sessionStorage.getItem('film_name');
  const hallName = sessionStorage.getItem('hallName');
  const seanceTime = sessionStorage.getItem('seanceTime');

  // Дальнейшие операции с полученными данными
  // Например, вывод данных в консоль
  console.log('Timestamp:', timestamp);
  console.log('Hall ID:', hallId);
  console.log('Seance ID:', seanceId);
  console.log('Hall Configuration:', hallConfiguration);

  // Другие действия..
  
  
  //const filmName = sessionStorage.getItem('filmName');

  // Вставка названия фильма в контейнер
  const ticketTitle = document.querySelector('.ticket__details.ticket__title');
  ticketTitle.textContent = filmName;
  
  const hallTitle = document.querySelector('.ticket__details.ticket__hall');
  hallTitle.textContent = hallName;
  
  const timeTitle = document.querySelector('.ticket__details.ticket__start');
  timeTitle.textContent = seanceTime;

});
