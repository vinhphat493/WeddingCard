import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/swiper.css';
import 'swiper/css/effect-fade';
import anime from 'animejs';

// Music autoplay bypass
const audio = document.getElementById('bg-music');
const splash = document.getElementById('splash');
document.getElementById('splash-btn').addEventListener('click', () => {
  audio.play();
  splash.classList.add('hidden');
});

AOS.init();

// Swiper
new Swiper('.swiper', {
  modules: [Autoplay, EffectFade],
  loop: true,
  autoplay: { delay: 3000 },
  effect: 'fade',
});

// Petals
const petalsContainer = document.getElementById('petals');
for (let i = 0; i < 25; i++) {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = (5 + Math.random() * 5) + 's';
  petal.style.animationDelay = Math.random() * 5 + 's';
  petalsContainer.appendChild(petal);
}

// Countdown
const weddingDate = new Date('2026-04-12T18:00:00');
const elDays = document.getElementById('cd-days');
const elHours = document.getElementById('cd-hours');
const elMinutes = document.getElementById('cd-minutes');
const elSeconds = document.getElementById('cd-seconds');

function animateValue(el, toValue) {
  const obj = { val: parseFloat(el.innerText) || 0 };
  anime({
    targets: obj,
    val: toValue,
    round: 1,
    duration: 600,
    easing: 'easeOutExpo',
    update: () => (el.innerText = obj.val),
  });
}

function updateCountdown() {
  const diff = weddingDate - new Date();
  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (elDays.innerText != days) animateValue(elDays, days);
  if (elHours.innerText != hours) animateValue(elHours, hours);
  if (elMinutes.innerText != minutes) animateValue(elMinutes, minutes);
  animateValue(elSeconds, seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);
