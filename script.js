let selectedDate = null;
function createFilmSection(film) {
  const filmSection = document.createElement('section');
  filmSection.classList.add('movie');

  const movieInfo = document.createElement('div');
  movieInfo.classList.add('movie__info');
  filmSection.appendChild(movieInfo);

  const moviePoster = document.createElement('div');
  moviePoster.classList.add('movie__poster');
  movieInfo.appendChild(moviePoster);

  const posterImage = document.createElement('img');
  posterImage.classList.add('movie__poster-image');
  posterImage.alt = 'Постер фильма';
  posterImage.src = film.film_poster; 
  moviePoster.appendChild(posterImage);

  const movieDescription = document.createElement('div');
  movieDescription.classList.add('movie__description');
  movieInfo.appendChild(movieDescription);

  const movieTitle = document.createElement('h2');
  movieTitle.classList.add('movie__title');
  movieTitle.textContent = film.film_name;
  movieDescription.appendChild(movieTitle);

  const movieSynopsis = document.createElement('p');
  movieSynopsis.classList.add('movie__synopsis');
  movieSynopsis.textContent = film.film_description;
  movieDescription.appendChild(movieSynopsis);

  const movieData = document.createElement('p');
  movieData.classList.add('movie__data');
  movieDescription.appendChild(movieData);

  const movieDuration = document.createElement('span');
  movieDuration.classList.add('movie__data-duration');
  movieDuration.textContent = film.film_duration + ' минут';
  movieData.appendChild(movieDuration);

  const movieOrigin = document.createElement('span');
  movieOrigin.classList.add('movie__data-origin');
  movieOrigin.textContent = film.film_origin;
  movieData.appendChild(movieOrigin);

  const movieSeances = document.createElement('div');
  movieSeances.classList.add('movie-seances__hall');
  filmSection.appendChild(movieSeances);

  return filmSection;
}

function createSeancesList(hall, film, seances, selectedDate) {
  const seancesList = document.createElement('ul');
  seancesList.classList.add('movie-seances__list');
  const hallSeances = seances.result.filter((seance) => seance.seance_filmid === film.film_id && seance.seance_hallid === hall.hall_id);

	if (hallSeances.length > 0) {
		hallSeances.forEach((seance) => {
			const currentTime = new Date(); // Текущее время
			const seanceTime = new Date();
			const [hours, minutes] = seance.seance_time.split(':');
			seanceTime.setHours(hours);
			seanceTime.setMinutes(minutes);

				// Проверяем, если время сеанса еще не прошло
			if (selectedDate === null || selectedDate.toDateString() === new Date().toDateString()){
				const currentTime = new Date();
				if (seanceTime > currentTime) {
					const seanceTimeBlock = document.createElement('li');
					seanceTimeBlock.classList.add('movie-seances__time-block');
					seancesList.appendChild(seanceTimeBlock);
					const seanceTimeLink = document.createElement('a');
					seanceTimeLink.classList.add('movie-seances__time');
					seanceTimeLink.href = 'hall.html'; 
					seanceTimeLink.textContent = seanceTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
					seanceTimeBlock.appendChild(seanceTimeLink);

	
					seanceTimeLink.addEventListener('click', function(event) {
					  // Запоминаем данные о выбранном сеансе
					  const timestamp = seanceTime.getTime() / 1000;
					  const hallId = hall.hall_id;
					  const seanceId = seance.seance_id;
					  
					  sessionStorage.setItem('selectedSeanceTimestamp', timestamp);
					  sessionStorage.setItem('selectedSeanceHallId', hallId);
					  sessionStorage.setItem('selectedSeanceId', seanceId);
					  
					  // Вывод данных в консоль для проверки
					  console.log('Запомненные данные о сеансе:');
					  console.log('Timestamp:', timestamp);
					  console.log('Hall ID:', hallId);
					  console.log('Seance ID:', seanceId);
					});
				}
			}else {
				const seanceTimeBlock = document.createElement('li');
				seanceTimeBlock.classList.add('movie-seances__time-block');
				seancesList.appendChild(seanceTimeBlock);

				const seanceTimeLink = document.createElement('a');
				seanceTimeLink.classList.add('movie-seances__time');
				seanceTimeLink.href = 'hall.html'; 
				seanceTimeLink.textContent = seanceTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
				seanceTimeBlock.appendChild(seanceTimeLink);
				seanceTimeLink.addEventListener('click', function(event) {
					const timestamp = seanceTime.getTime() / 1000; 
					const hallId = hall.hall_id; 
					const seanceId = seance.seance_id; 
					sessionStorage.setItem('selectedSeanceTimestamp', timestamp);
					sessionStorage.setItem('selectedSeanceHallId', hallId);
					sessionStorage.setItem('selectedSeanceId', seanceId);
  
					// Вывод данных в консоль для проверки
					console.log('Запомненные данные о сеансе:');
					console.log('Timestamp:', timestamp);
					console.log('Hall ID:', hallId);
					console.log('Seance ID:', seanceId);
				});
			}
		});
	}
  
  return seancesList;
}




function handleSeanceClick(timestamp, hallId, seanceId) {
  // Запоминаем данные о выбранном сеансе
  sessionStorage.setItem('selectedSeanceTimestamp', timestamp);
  sessionStorage.setItem('selectedSeanceHallId', hallId);
  sessionStorage.setItem('selectedSeanceId', seanceId);
  
  // Вывод данных в консоль для проверки
  console.log('Запомненные данные о сеансе:');
  console.log('Timestamp:', timestamp);
  console.log('Hall ID:', hallId);
  console.log('Seance ID:', seanceId);
}

document.addEventListener('DOMContentLoaded', function() {
  const url = 'https://jscp-diplom.netoserver.ru/';
  const requestData = 'event=update';
  let films, halls, seances;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      halls = response.halls;
      films = response.films;
      seances = response.seances;

    console.log('Полученные данные:');
    console.log('Halls:', halls);
    console.log('Films:', films);
    console.log('Seances:', seances);




      const mainContainer = document.querySelector('main'); // Контейнер для фильмов

      function buildMovieBlocks() {
        mainContainer.innerHTML = '';

        films.result.forEach((film) => {
          const filmSection = createFilmSection(film);

          halls.result.forEach((hall) => {
            const hallTitle = document.createElement('h3');
            hallTitle.classList.add('movie-seances__hall-title');
            hallTitle.textContent = hall.hall_name;
            filmSection.querySelector('.movie-seances__hall').appendChild(hallTitle);

            const seancesList = createSeancesList(hall, film, seances, selectedDate);//1
            filmSection.querySelector('.movie-seances__hall').appendChild(seancesList);
          });

          mainContainer.appendChild(filmSection);
        });
      }


      buildMovieBlocks();

      const currentDate = new Date();

      const navElement = document.querySelector('.page-nav');
      navElement.innerHTML = '';

      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);

        const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
        const dayOfMonth = date.getDate();

        const link = document.createElement('a');
        link.classList.add('page-nav__day');
        link.href = '#';
		
		if (i === 0) {
    link.classList.add('page-nav__day_today');
  }
		if (date.getDay() === 0 || date.getDay() === 6) {
    link.classList.add('page-nav__day_weekend');
  }
        const dayOfWeekElement = document.createElement('span');
        dayOfWeekElement.classList.add('page-nav__day-week');
        dayOfWeekElement.textContent = dayOfWeek;

        const dayOfMonthElement = document.createElement('span');
        dayOfMonthElement.classList.add('page-nav__day-number');
        dayOfMonthElement.textContent = dayOfMonth;

        link.appendChild(dayOfWeekElement);
        link.appendChild(dayOfMonthElement);

        /*link.addEventListener('click', function() {
          buildMovieBlocks();
        });*/
		link.addEventListener('click', function(event) {
		event.preventDefault();
		
		console.log(this);
		
		if (this.classList.contains('page-nav__day')) {
			const day = parseInt(this.querySelector('.page-nav__day-number').textContent);
			selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
		buildMovieBlocks();
  }
});


        navElement.appendChild(link);
      }
    } else {
      console.error('Произошла ошибка при выполнении запроса:', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.error('Произошла ошибка при выполнении запроса');
  };

  xhr.send(requestData);
});