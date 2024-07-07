document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    window.addEventListener('load', function() {
        document.body.classList.add('no-scroll');
        setTimeout(function() {
            document.getElementById('preloader').style.opacity = '0';
            document.getElementById('main-content').classList.remove('hide');
            document.getElementById('main-content').classList.add('show');
            setTimeout(function() {
                document.getElementById('preloader').style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 1000);
        }, 3000);
    });

 // Login Modal
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.button');
const loginForm = document.getElementById('login-form');
const loggedInUsername = localStorage.getItem('loggedInUsername');

const openLoginModal = () => {
    loginModal.style.display = 'block';
};

const closeLoginModal = () => {
    loginModal.style.display = 'none';
};

loginBtn.addEventListener('click', () => {
    openLoginModal();
    closeSettingsModal(); // Fecha o modal de configurações se estiver aberto
});
closeBtn.addEventListener('click', closeLoginModal);

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginBtn.style.display = 'none';
    closeLoginModal();
    document.getElementById('logged-in-user').textContent = usernameInput.value;
    document.getElementById('logged-in-user').style.display = 'block';
    localStorage.setItem('loggedInUsername', usernameInput.value);
});

// Função para abrir e fechar o modal de configurações
document.getElementById('settings-btn').addEventListener('click', function() {
    var modal = document.getElementById('settings-modal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
        closeLoginModal(); // Fecha o modal de login se estiver aberto
    } else {
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fade-out');
        }, 300); // Tempo da animação de fade-out (0.3s)
    }
});

// Função para fechar o modal de configurações
function closeSettingsModal() {
    var modal = document.getElementById('settings-modal');
    if (modal.style.display !== 'none') {
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fade-out');
        }, 300); // Tempo da animação de fade-out (0.3s)
    }
}


    // Seções Toggle
    const buttons = document.querySelectorAll('.toggle-section');
    const sections = document.querySelectorAll('main > section');
    const servicosSection = document.getElementById('servicos');
    const tecnologiaSection = document.getElementById('tecnologia');
    const sustentabilidadeSection = document.getElementById('sustentabilidade');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSectionId = button.getAttribute('data-target').substring(1);
            sections.forEach(section => {
                if (section.id !== targetSectionId && section.id !== 'servicos' && section.id !== 'tecnologia'
                 && section.id !== 'sustentabilidade') {
                    section.classList.add('hide');
                }
            });
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.remove('hide');
                servicosSection.classList.remove('hide');
                tecnologiaSection.classList.remove('hide');
                sustentabilidadeSection.classList.remove('hide');
            }
        });
    });

    // Formulário de Cultivo
    const form = document.getElementById('cultivo-form');
    const listaCultivos = document.getElementById('lista-cultivos');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const dataPlantio = document.getElementById('data-plantio').value;
        const area = document.getElementById('area').value;

        const listItem = document.createElement('li');
        listItem.textContent = `Tipo: ${tipo}, Data de Plantio: ${dataPlantio}, Área: ${area} hectares`;
        listaCultivos.appendChild(listItem);

        form.reset();
    });

    // Clima
    const apiKey = 'ac3976b1ab5f5c70fec9cd0a2b2bb9df';
    const searchButton = document.getElementById('search');
    const cityInput = document.getElementById('city-input');
    const weatherData = document.getElementById('weather-data');
    const cityName = document.getElementById('city');
    const countryImg = document.getElementById('country');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weather-icon');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    weatherData.classList.remove('hide');
                    cityName.textContent = data.name;
                    countryImg.src = `https://flagsapi.com/${data.sys.country}/shiny/64.png`;
                    temperature.querySelector('span').textContent = Math.round(data.main.temp);
                    description.textContent = data.weather[0].description;
                    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    humidity.querySelector('span').textContent = `${data.main.humidity}%`;
                    wind.querySelector('span').textContent = `${data.wind.speed} m/s`;
                })
                .catch(error => console.error('Error fetching weather data:', error));
        }
    });

    // Intersection Observer
    const quemSomosElements = document.querySelectorAll('.quem-somos-content div');
    const servicosElements = document.querySelectorAll('.servico');
    const tecnologiaElements = document.querySelectorAll('.Tecnologia');
    const sustentabilidadeElements = document.querySelectorAll('#sustentabilidade .item');

    const elements = [...quemSomosElements, ...servicosElements, ...tecnologiaElements, ...sustentabilidadeElements];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });

    // Accordion
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            const panel = accordion.nextElementSibling;
            accordion.classList.toggle('active');
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
            }
        });
    });
});
