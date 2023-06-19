let films, halls;

let selectedDate = new Date();
let activeNavItem;
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

const createSeancesContainer = (list) => {
  const block = document.createElement('li');
  block.classList.add('movie-seances__time-block');
  list.appendChild(block);

  return block;
}

const getSelectedDate = () => {
  const selected = parseInt(sessionStorage.getItem('selectedDate', null));

  return selected ? new Date(selected) : new Date();
}

const getSeanceDate = (seance) => {
  const date = getSelectedDate();

  const [hours, minutes] = seance.seance_time.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);

  return date;
}

const addSeanceBtn = (seance, container) => {
  let date = getSeanceDate(seance);

  seance.timestamp = getSeanceDate(seance).getTime();

  let active = seance.timestamp > new Date();

  const btn = document.createElement('a');
  btn.classList.add('movie-seances__time');
  btn.href = active ? 'hall.html' : '#'; 
  btn.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  container.appendChild(btn);

  if(!active) {
    return;
  }

  seance.film = films.result.find(film => seance.seance_filmid === film.film_id);

  seance.hall = halls.result.find(hall => seance.seance_hallid === hall.hall_id);

  btn.dataset.seance = JSON.stringify(seance);

  btn.addEventListener('click', e => sessionStorage.setItem('seance', e.target.dataset.seance));
}

function createSeancesList(hall, film, seances, seanceTime) {
  const list = document.createElement('ul');
  list.classList.add('movie-seances__list');

  const hallSeances = seances.result.filter((seance) => seance.seance_filmid === film.film_id && seance.seance_hallid === hall.hall_id);

	if (!hallSeances.length) {
    return;
  }

	hallSeances.forEach((seance) => {
    const container = createSeancesContainer(list);

		addSeanceBtn(seance, container);
	});
  
  return list;
}

function setActiveNavItem() {
  const navItems = document.querySelectorAll('.page-nav__day');

  navItems.forEach((item) => {
    item.classList.remove('page-nav__day_chosen');
  });

  const selectedNavItem = document.querySelector('.page-nav__day_today, .page-nav__day_weekend');
  if (selectedNavItem) {
    selectedNavItem.classList.add('page-nav__day_chosen');
  }
}

document.addEventListener('DOMContentLoaded', function() {
	 
  const url = 'https://jscp-diplom.netoserver.ru/';
  const requestData = 'event=update';
  let seances;
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
			const hallSeances = seances.result.filter((seance) => seance.seance_filmid === film.film_id && seance.seance_hallid === hall.hall_id);
			const hallOpen = hall.hall_open;

			if (hallOpen === 0 || hallSeances.length === 0) {
        
			return;
      }

			
			const hallTitle = document.createElement('h3');
            hallTitle.classList.add('movie-seances__hall-title');
            hallTitle.textContent = hall.hall_name;
            filmSection.querySelector('.movie-seances__hall').appendChild(hallTitle);

            const seancesList = createSeancesList(hall, film, seances, selectedDate);
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
      const date = new Date();
      date.setDate(currentDate.getDate()+i);

      const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
      const dayOfMonth = date.getDate();

  const link = document.createElement('a');
  link.classList.add('page-nav__day');
  link.href = '#';
  link.dataset.date = date.getTime();

  if (i === 0) {
    link.classList.add('page-nav__day_today');
  }

  console.log(date.getTime(), getSelectedDate().getTime());

  let selectedDate = getSelectedDate();

  if (date.getFullYear() === selectedDate.getFullYear() && date.getMonth() === selectedDate.getMonth() && date.getDay() === selectedDate.getDay()) {
	  link.classList.add('page-nav__day_chosen');
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

  link.addEventListener('click', function(event) {
    event.preventDefault();

    const navItems = document.querySelectorAll('.page-nav__day');

    navItems.forEach((item) => {
      item.classList.remove('page-nav__day_chosen');
    });

    this.classList.add('page-nav__day_chosen');

    sessionStorage.setItem('selectedDate', this.dataset.date);
    buildMovieBlocks();
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