const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
const body = document.body;

menuToggle.addEventListener('click', function (event) {
    event.stopPropagation();  // Предотвращаем всплытие события на body
    navList.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

body.addEventListener('click', function (event) {
    if (!navList.contains(event.target) && !menuToggle.contains(event.target)) {
        navList.classList.remove('open');
        menuToggle.classList.remove('open');
    }
});

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        480: {
            slidesPerView: 1.5,
            spaceBetween: 15,
        },
    },
});

// let countdownDate = new Date().getTime() + 30 * 60 * 1000; // 30 минут от текущего времени

//   let timer = setInterval(function() {
//     let now = new Date().getTime();
//     let distance = countdownDate - now;

//     let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     document.getElementById("countdown").innerHTML = hours + ":" + minutes + ":" + seconds;

//     if (distance < 0) {
//       clearInterval(timer);
//       document.getElementById("countdown").innerHTML = "EXPIRED";
//     }
//   }, 1000);

// Получаем все вопросы
let questions = document.querySelectorAll('.faq__question');

// Добавляем обработчик событий для каждого вопроса
questions.forEach((question) => {
    question.addEventListener('click', () => {
        // Скрываем или показываем ответ при клике
        let answer = question.nextElementSibling;

        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    });
});


// Получаем элементы модального окна и кнопки
const modal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');
const openModalBtn = document.getElementById('openModalBtn');
const confirmationMessage = document.getElementById('confirmationMessage');
const orderForm = document.getElementById('orderForm');

// Функция для открытия модального окна
function openModal() {
    modal.style.display = 'flex';
}

// Функция для закрытия модального окна
closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};


var myForm = document.getElementById("myForm");

myForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    var formData = new FormData(myForm);

    fetch('./order.php', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Ошибка ' + response.status);
        }
        return response.text();
    })
    .then(function(data) {
        alert('Данные успешно отправлены');
        closeModal(); // Закрываем модальное окно после успешной отправки
    })
    .catch(function(error) {
        console.error('Произошла ошибка:', error);
        alert('Произошла ошибка при отправке данных');
    });
});