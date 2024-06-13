document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-section');
    const sections = document.querySelectorAll('main > section'); // Seleciona todas as seções dentro do main
    const servicosSection = document.getElementById('servicos'); // Obtém a seção "Nossos Serviços"
    const tecnologiaSection = document.getElementById('tecnologia'); // Obtém a seção "Tecnologia Avançada"

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSectionId = button.getAttribute('data-target').substring(1); // Obtém o ID da seção alvo sem o '#'
            sections.forEach(section => {
                if (section.id !== targetSectionId && section.id !== 'servicos' && section.id !== 'tecnologia') {
                    section.classList.add('hide');
                }
            });
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.remove('hide');
                servicosSection.classList.remove('hide');
                tecnologiaSection.classList.remove('hide');
            }
        });
    });

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
});

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    // Função para exibir o modal de login
    const openLoginModal = () => {
        loginModal.style.display = 'block';
    };

    // Função para fechar o modal de login
    const closeLoginModal = () => {
        loginModal.style.display = 'none';
    };

    // Evento de clique no botão de login
    loginBtn.addEventListener('click', openLoginModal);

    // Evento de clique no botão de fechar
    closeBtn.addEventListener('click', closeLoginModal);

    // Evento de envio do formulário de login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Oculta o botão de login
        loginBtn.style.display = 'none';
        closeLoginModal(); // Fecha o modal de login
        document.getElementById('logged-in-user').textContent = usernameInput.value;
        document.getElementById('logged-in-user').style.display = 'block';
        localStorage.setItem('loggedInUsername', usernameInput.value);
    });
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const quemSomosElements = document.querySelectorAll('.quem-somos-content div');
    const servicosElements = document.querySelectorAll('.servico');
    const tecnologiaElements = document.querySelectorAll('.Tecnologia');

    const elements = [...quemSomosElements, ...servicosElements, ...tecnologiaElements];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once the item is visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const acc = document.querySelectorAll('.accordion');
    
    acc.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const panel = this.nextElementSibling;
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
            }
        });
    });
});
