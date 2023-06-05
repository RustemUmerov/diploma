const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

// Парсинг тела запроса
app.use(bodyParser.urlencoded({ extended: true }));

// Получение списков всех Залов Кинофильмов и Сеансов
app.post('/cinema-sessions', async (req, res) => {
  try {
    const apiUrl = 'https://jscp-diplom.netoserver.ru/';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'event=update'
    });

    const data = await response.json();

    // Обработка полученных данных
    const halls = data.halls.result;
    const films = data.films.result;
    const seances = data.seances.result;

    res.json({
      halls: halls,
      films: films,
      seances: seances
    });
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

// Получение актуальной схемы посадочных мест на выбранный сеанс
app.post('/seat-map', async (req, res) => {
  const apiUrl = 'https://jscp-diplom.netoserver.ru/';
  const timestamp = req.body.timestamp;
  const hallId = req.body.hallId;
  const seanceId = req.body.seanceId;

  const requestBody = `event=get_hallConfig&timestamp=${timestamp}&hallId=${hallId}&seanceId=${seanceId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody
    });

    const data = await response.text();

    res.send(data);
  } catch (error) {
    console.error('Ошибка при получении схемы посадочных мест:', error);
    res.status(500).json({ error: 'Ошибка при получении схемы посадочных мест' });
  }
});

// Добавление информации о забронированных билетах в базу данных
app.post('/book-ticket', async (req, res) => {
  const apiUrl = 'https://jscp-diplom.netoserver.ru/';
  const timestamp = req.body.timestamp;
  const hallId = req.body.hallId;
  const seanceId = req.body.seanceId;
  const hallConfiguration = req.body.hallConfiguration;

  const requestBody = `event=sale_add&timestamp=${timestamp}&hallId=${hallId}&seanceId=${seanceId}&hallConfiguration=${hallConfiguration}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody
    });

    const data = await response.text();

    res.send(data);
  } catch (error) {
    console.error('Ошибка при добавлении информации о билете:', error);
    res.status(500).json({ error: 'Ошибка при добавлении информации о билете' });
  }
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('API server running on port 3000');
});



// Функция для отображения списка фильмов
function renderMovies(movies) {
  const moviesContainer = document.getElementById('movies-container');

  // Очищаем контейнер перед отображением новых данных
  moviesContainer.innerHTML = '';

  // Проходимся по каждому фильму и создаем HTML-элемент для его отображения
  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <h2>${movie.film_name}</h2>
      <p>Длительность: ${movie.film_duration} мин.</p>
      <p>Страна: ${movie.film_origin}</p>
      <img src="${movie.film_poster}" alt="${movie.film_name} Poster">
      <p>${movie.film_description}</p>
    `;

    // Добавляем созданный HTML-элемент в контейнер
    moviesContainer.appendChild(movieElement);
  });
}

// Функция для получения списка фильмов с сервера
async function fetchMovies() {
  try {
    const response = await fetch('/cinema-sessions');
    const data = await response.json();
    const movies = data.films;

    // Вызываем функцию для отображения списка фильмов
    renderMovies(movies);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

// Вызываем функцию для получения и отображения списка фильмов
fetchMovies();

// Здесь находится ваш код для получения данных залов и сеансов

// Здесь находится ваш код для добавления информации о билетах в базу данных