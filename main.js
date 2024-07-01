document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-section');
    const sections = document.querySelectorAll('main > section'); // Seleciona todas as seções dentro do main
    const servicosSection = document.getElementById('servicos'); // Obtém a seção "Nossos Serviços"
    const tecnologiaSection = document.getElementById('tecnologia'); // Obtém a seção "Tecnologia Avançada"
    const sustentabilidadeSection = document.getElementById('sustentabilidade'); // Obtém a seção "Sustentabilidade"

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSectionId = button.getAttribute('data-target').substring(1); // Obtém o ID da seção alvo sem o '#'
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


const container = document.querySelector("#carrossel .container");
const containerCarrossel = container.querySelector(".container-carrossel");
const carrossel = container.querySelector(".carrossel");
const carrosselItems = carrossel.querySelectorAll(".carrossel-item");

// Iniciamos variáveis que mudarão seu estado.
let isMouseDown = false;
let currentMousePos = 0;
let lastMousePos = 0;
let lastMoveTo = 0;
let moveTo = 0;

const createCarrossel = () => {
  const carrosselProps = onResize();
  const length = carrosselItems.length; // Comprimento do array
  const degrees = 360 / length; // Graus por cada item
  const gap = 20; // Espaço entre cada item
  const tz = distanceZ(carrosselProps.w, length, gap);

  const fov = calculateFov(carrosselProps);
  const height = calculateHeight(tz);

  container.style.width = tz * 2 + gap * length + "px";
  container.style.height = height + "px";

  carrosselItems.forEach((item, i) => {
    const degreesByItem = degrees * i + "deg";
    item.style.setProperty("--rotatey", degreesByItem);
    item.style.setProperty("--tz", tz + "px");
  });
};

// Função que dá suavidade à animação
const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

// https://3dtransforms.desandro.com/carousel
const distanceZ = (widthElement, length, gap) => {
  return widthElement / 2 / Math.tan(Math.PI / length) + gap; // Distância Z dos itens
};

// Calcula a altura do contêiner usando o campo de visão e a distância da perspectiva
const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = t * 2 * z;

  return height;
};

// Calcula o campo de visão do carrossel
const calculateFov = (carrosselProps) => {
  const perspective = window
    .getComputedStyle(containerCarrossel)
    .perspective.split("px")[0];

  const length =
    Math.sqrt(carrosselProps.w * carrosselProps.w) +
    Math.sqrt(carrosselProps.h * carrosselProps.h);
  const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  return fov;
};

// Obtém a posição X e avalia se a posição é direita ou esquerda
const getPosX = (x) => {
  currentMousePos = x;

  moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;

  lastMousePos = currentMousePos;
};

const update = () => {
  lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
  carrossel.style.setProperty("--rotatey", lastMoveTo + "deg");

  requestAnimationFrame(update);
};

const onResize = () => {
  // Obtém as propriedades do tamanho do carrossel
  const boundingCarrossel = containerCarrossel.getBoundingClientRect();

  const carrosselProps = {
    w: boundingCarrossel.width,
    h: boundingCarrossel.height,
  };

  return carrosselProps;
};

const initEvents = () => {
  // Eventos do mouse
  carrossel.addEventListener("mousedown", () => {
    isMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("mouseup", () => {
    isMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  container.addEventListener("mouseleave", () => (isMouseDown = false));

  carrossel.addEventListener(
    "mousemove",
    (e) => isMouseDown && getPosX(e.clientX)
  );

  // Eventos de toque
  carrossel.addEventListener("touchstart", () => {
    isMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("touchend", () => {
    isMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  container.addEventListener(
    "touchmove",
    (e) => isMouseDown && getPosX(e.touches[0].clientX)
  );

  window.addEventListener("resize", createCarrossel);

  update();
  createCarrossel();
};

initEvents();