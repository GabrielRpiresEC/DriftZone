// Menu hamburguer responsivo
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Scroll suave para navegação
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    nav.classList.remove('open');
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - document.querySelector('.header').offsetHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Slider/carrossel da galeria
const track = document.getElementById('carousel-track');
const images = Array.from(track.children);
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const indicators = document.getElementById('carousel-indicators');
let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * images[0].clientWidth}px)`;
  indicators.innerHTML = '';
  images.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'indicator' + (idx === currentIndex ? ' active' : '');
    dot.addEventListener('click', () => {
      currentIndex = idx;
      updateCarousel();
    });
    indicators.appendChild(dot);
  });
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);
updateCarousel();

// Validação do formulário de contato
const form = document.getElementById('contact-form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem');
const errorNome = document.getElementById('error-nome');
const errorEmail = document.getElementById('error-email');
const errorMensagem = document.getElementById('error-mensagem');

function validateNome() {
  if (nome.value.trim().length < 2) {
    errorNome.textContent = 'Digite seu nome completo.';
    return false;
  }
  errorNome.textContent = '';
  return true;
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.value.trim())) {
    errorEmail.textContent = 'Digite um e-mail válido.';
    return false;
  }
  errorEmail.textContent = '';
  return true;
}

function validateMensagem() {
  if (mensagem.value.trim().length < 10) {
    errorMensagem.textContent = 'Mensagem muito curta.';
    return false;
  }
  errorMensagem.textContent = '';
  return true;
}

nome.addEventListener('input', validateNome);
email.addEventListener('input', validateEmail);
mensagem.addEventListener('input', validateMensagem);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const validNome = validateNome();
  const validEmail = validateEmail();
  const validMensagem = validateMensagem();
  if (validNome && validEmail && validMensagem) {
    form.reset();
    errorNome.textContent = '';
    errorEmail.textContent = '';
    errorMensagem.textContent = '';
    alert('Mensagem enviada com sucesso!');
  }
});

