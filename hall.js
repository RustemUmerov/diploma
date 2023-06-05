document.addEventListener('DOMContentLoaded', function() {
  // Получение данных из sessionStorage
  const selectedSeanceTimestamp = sessionStorage.getItem('selectedSeanceTimestamp');
  const selectedSeanceHallId = sessionStorage.getItem('selectedSeanceHallId');
  const selectedSeanceId = sessionStorage.getItem('selectedSeanceId');
  
  // Вывод данных в консоль для проверки
  console.log('Полученные данные о сеансе:');
  console.log('Timestamp:', selectedSeanceTimestamp);
  console.log('Hall ID:', selectedSeanceHallId);
  console.log('Seance ID:', selectedSeanceId);
  
  // Дополнительные действия с данными на странице hall.html
  // ...
  const headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded');
const requestBody = new URLSearchParams();
requestBody.append('event', 'get_hallConfig');
requestBody.append('timestamp', selectedSeanceTimestamp);
requestBody.append('hallId', selectedSeanceHallId);
requestBody.append('seanceId', selectedSeanceId);

// Отправка POST-запроса
fetch('https://jscp-diplom.netoserver.ru/', {
  method: 'POST',
  headers: headers,
  body: requestBody
})
  .then(response => response.text())
  .then(htmlString => {
    console.log(htmlString);
  })
  .catch(error => {
    console.error(error);
  });
  });