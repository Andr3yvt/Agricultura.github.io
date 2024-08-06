document.addEventListener('DOMContentLoaded', () => {
    // Define a posição do scroll para o topo
    window.scrollTo(0, 0);
    document.body.classList.add('no-scroll'); // Desativa o scroll imediatamente

    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('preloader').style.opacity = '0';
            document.getElementById('main-content').classList.remove('hide');
            document.getElementById('main-content').classList.add('show');
            setTimeout(function() {
                document.getElementById('preloader').style.display = 'none';
                document.body.classList.remove('no-scroll'); // Reativa o scroll após a animação
            }, 1000); // Tempo da transição de opacidade
        }, 3000); // Tempo do preloader
    });

// Seleciona os elementos necessários
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.button .close');
const loginForm = document.getElementById('login-form');
const loggedInUserDiv = document.getElementById('logged-in-user');
const usernameInput = document.getElementById('username');
const loggedusername = localStorage.getItem('loggedInUsername');

// Função para abrir o modal de login
const openLoginModal = () => {
    loginModal.style.display = 'block';
};

// Função para fechar o modal de login
const closeLoginModal = () => {
    loginModal.style.display = 'none';
};

// Função para abrir o modal de configurações
const openSettingsModal = () => {
    // Implementar a abertura do modal de configurações se necessário
};

// Event listener para abrir o modal de login ao clicar no botão de login
loginBtn.addEventListener('click', () => {
    openLoginModal();
    closeSettingsModal(); // Fecha o modal de configurações se estiver aberto
});

// Event listener para fechar o modal de login ao clicar no botão de fechar
closeBtn.addEventListener('click', closeLoginModal);

// Event listener para tratar o login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const username = usernameInput.value.trim();
    if (username) {
        // Esconde o botão de login e mostra o nome do usuário
        loginBtn.style.display = 'none';
        closeLoginModal();
        loggedInUserDiv.textContent = `Bem-vindo, ${username}!`;
        loggedInUserDiv.style.display = 'block';
        localStorage.setItem('loggedInUsername', username);
    }
});

// Função para fechar o modal de configurações
function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal && modal.style.display !== 'none') {
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fade-out');
        }, 300); // Tempo da animação de fade-out (0.3s)
    }
}

// Verifica se há um usuário logado no localStorage ao carregar a página
if (loggedusername) {
    loggedInUserDiv.textContent = `Bem-vindo, ${loggedusername}!`;
    loggedInUserDiv.style.display = 'block';
    loginBtn.style.display = 'none';
}

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




   // Seções Toggle
const buttons = document.querySelectorAll('.toggle-section');
const sections = document.querySelectorAll('main > section');
const servicosSection = document.getElementById('servicos');
const tecnologiaSection = document.getElementById('tecnologia');
const sustentabilidadeSection = document.getElementById('sustentabilidade');
const eventosSection = document.getElementById('eventos');
const empreendedorismoRuralSection = document.getElementById('empreendedorismo-rural');
const oportunidadesCampoCidadeSection = document.getElementById('oportunidades-campo-cidade');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSectionId = button.getAttribute('data-target').substring(1); // Remove o caractere '#'
        
        sections.forEach(section => {
            // Verifica se a seção não é a alvo e não é uma das seções específicas
            if (section.id !== targetSectionId && 
                section.id !== 'servicos' && 
                section.id !== 'tecnologia' &&
                section.id !== 'sustentabilidade' &&
                section.id !== 'eventos' &&
                section.id !== 'empreendedorismo-rural' &&
                section.id !== 'oportunidades-campo-cidade') {
                section.classList.add('hide');
            }
        });

        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.remove('hide');
        }

        // Sempre exibe as seções específicas
        servicosSection.classList.remove('hide');
        tecnologiaSection.classList.remove('hide');
        sustentabilidadeSection.classList.remove('hide');
        eventosSection.classList.remove('hide');
        empreendedorismoRuralSection.classList.remove('hide');
        oportunidadesCampoCidadeSection.classList.remove('hide');
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
const eventosElement = document.querySelector('#eventos');
const empreendedorismoRuralElement = document.querySelector('#empreendedorismo-rural');
const oportunidadesCampoCidadeElement = document.querySelector('#oportunidades-campo-cidade');

const elements = [
    ...quemSomosElements, 
    ...servicosElements, 
    ...tecnologiaElements, 
    ...sustentabilidadeElements,
    eventosElement,
    empreendedorismoRuralElement,
    oportunidadesCampoCidadeElement
].filter(Boolean); // Remove valores nulos ou indefinidos

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
    if (element) { // Verifica se o elemento existe antes de observar
        observer.observe(element);
    }
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

document.addEventListener("DOMContentLoaded", function() {
    var languageButton = document.getElementById("languageButton");
    var languageModal = document.getElementById("languageModal");
    var closeLanguageModal = document.getElementById("closeLanguageModal");
    var languageCheckboxes = document.querySelectorAll('input[name="language"]');

    // Abrir modal
    languageButton.onclick = function() {
        languageModal.style.display = "block";
    }

    // Fechar modal
    closeLanguageModal.onclick = function() {
        languageModal.style.display = "none";
    }

    // Fechar modal clicando fora
    window.onclick = function(event) {
        if (event.target == languageModal) {
            languageModal.style.display = "none";
        }
    }

    // Marcar "Português" como selecionado inicialmente
    var savedLanguage = localStorage.getItem('selectedLanguage') || 'Português';
    document.querySelector(`input[value="${savedLanguage}"]`).checked = true;

    // Salvar seleção no localStorage
    languageCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('selectedLanguage', this.value);
                languageCheckboxes.forEach(function(box) {
                    if (box !== checkbox) box.checked = false;
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let translations;

    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            const savedLanguage = localStorage.getItem('selectedLanguage') || 'pt';
            setLanguage(savedLanguage);
        });

    function setLanguage(lang) {
        if (lang === 'pt') {
            // If the selected language is Portuguese, reset the texts to their original content
            document.querySelectorAll('[data-translate]').forEach(element => {
                element.textContent = element.getAttribute('data-original-text');
            });
        } else {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                element.textContent = translations[lang][key];
            });
        }
        localStorage.setItem('selectedLanguage', lang);
    }

    window.setLanguage = setLanguage;

    // Store original text content for elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        element.setAttribute('data-original-text', element.textContent);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let translations;

    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            const savedLanguage = localStorage.getItem('selectedLanguage') || 'pt';
            setLanguage(savedLanguage);
        });

    function setLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            // Adiciona a classe de animação
            element.classList.add('fade-in');

            // Remove a classe de animação após a animação terminar
            element.addEventListener('animationend', () => {
                element.classList.remove('fade-in');
            });

            if (lang === 'pt') {
                // Se o idioma selecionado for Português, redefine os textos para o conteúdo original
                element.textContent = element.getAttribute('data-original-text');
            } else {
                const key = element.getAttribute('data-translate');
                element.textContent = translations[lang][key];
            }
        });
        localStorage.setItem('selectedLanguage', lang);
    }

    window.setLanguage = setLanguage;

    // Armazena o conteúdo de texto original para os elementos
    document.querySelectorAll('[data-translate]').forEach(element => {
        element.setAttribute('data-original-text', element.textContent);
    });

    // Marcar "Português" como selecionado inicialmente
    var savedLanguage = localStorage.getItem('selectedLanguage') || 'Português';
    document.querySelector(`input[value="${savedLanguage}"]`).checked = true;

    // Salvar seleção no localStorage
    const languageCheckboxes = document.querySelectorAll('input[name="language"]');
    languageCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('selectedLanguage', this.value);
                languageCheckboxes.forEach(function(box) {
                    if (box !== checkbox) box.checked = false;
                });
                setLanguage(this.value);
            }
        });
    });
});

const eventosElements = document.querySelectorAll('#eventos .item'); // Atualizado para observar todos os elementos dentro de eventos
const empreendedorismoRuralElements = document.querySelectorAll('#empreendedorismo-rural .item'); // Atualizado para observar todos os elementos dentro de empreendedorismo-rural
const oportunidadesCampoCidadeElements = document.querySelectorAll('#oportunidades-campo-cidade .item'); // Atualizado para observar todos os elementos dentro de oportunidades-campo-cidade

const elements = [ ...eventosElements, // Atualizado para adicionar todos os eventos
...empreendedorismoRuralElements, // Atualizado para adicionar todos os empreendedores rurais
...oportunidadesCampoCidadeElements // Atualizado para adicionar todas as oportunidades
].filter(Boolean); // Remove valores nulos ou indefinidos

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
if (element) { // Verifica se o elemento existe antes de observar
    observer.observe(element);
}
});