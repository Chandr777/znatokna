'use strict';
const solutions = {
 windows: {name:'Окна и двери',image:'slide3.jpg',alt:'Алюминиевые окна с тёмными рамами и видом на город',badge:'Для жилых и коммерческих объектов',title:'Окна и двери под задачи вашего объекта.',description:'Тёплые и холодные системы Alumark, а также профильные системы VEKA Euroline, Softline и Softline 82. Подберём решение с учётом назначения помещения и условий эксплуатации.',tags:['Alumark S-70 · тёплая серия','Alumark S-50 · холодная серия','VEKA Euroline','VEKA Softline','VEKA Softline 82'],profiles:[['Alumark S-70','Тёплые окна и двери'],['Alumark S-50','Холодные окна и двери'],['VEKA Euroline','3 камеры · монтажная ширина 58 мм'],['VEKA Softline','5 камер · монтажная ширина 70 мм'],['VEKA Softline 82','7 / 6 камер · монтажная ширина 82 мм']]},
 panorama: {name:'Раздвижные панорамные двери',image:'slide1.jpg',alt:'Панорамное остекление в светлом интерьере',badge:'Для домов, ресторанов и коммерческих объектов',title:'Панорамные двери. Пространство без лишних границ.',description:'Раздвижные панорамные двери KRAUSS KRLS-64. Проектируем конфигурацию под размеры проёма и сценарии использования, выполняем установку.',tags:['KRAUSS KRLS-64'],profiles:[['KRAUSS KRLS-64','Подъёмно-сдвижная система']]},
 facade: {name:'Фасадные витражи',image:'slide3.jpg',alt:'Пример масштабного алюминиевого остекления',badge:'Для частной и коммерческой архитектуры',title:'Фасад, открытый свету.',description:'Фасадные витражи на системе Alumark F-50. Разрабатываем решение с учётом архитектуры и назначения здания, проектируем и устанавливаем светопрозрачные конструкции.',tags:['Alumark F-50','Фасадное остекление'],profiles:[['Alumark F-50','Система фасадных витражей']]},
 garden: {name:'Зимние сады',image:'slide2.jpg',alt:'Зимний сад рядом с каменным домом',badge:'Светопрозрачные конструкции для зимнего сада',title:'Ближе к природе в любое время года.',description:'Проектируем и устанавливаем сами светопрозрачные конструкции зимних садов. Подбираем решение под архитектуру объекта и назначение пространства. Строительные и отделочные работы не входят в наши услуги.',tags:['Проектирование','Установка конструкций'],profiles:[['Индивидуальный проект','Систему и комплектацию подбираем под объект']]}
};
const $ = (selector) => document.querySelector(selector);
const tabs = [...document.querySelectorAll('[data-solution]')];
let currentSolution = 'windows';
const portfolioOpen = $('#portfolio-open');
const mediaLibrary = $('#media-library');
function openPortfolio() {
  mediaLibrary.hidden = false;
  portfolioOpen.setAttribute('aria-expanded', 'true');
  mediaLibrary.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  $('#portfolio-close').focus({ preventScroll: true });
}
function closePortfolio() {
  mediaLibrary.hidden = true;
  portfolioOpen.setAttribute('aria-expanded', 'false');
  portfolioOpen.focus({ preventScroll: true });
}
portfolioOpen.addEventListener('click', openPortfolio);
$('#portfolio-close').addEventListener('click', closePortfolio);
function selectProfile(key, moveFocus = false) {
  const buttons = [...$('#profile-specs').querySelectorAll('[data-profile]')];
  buttons.forEach(button => {
    const selected = button.dataset.profile === key;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) button.focus();
  });
  ['s70', 's50', 'krls64', 'veka-euroline', 'veka-softline', 'veka-softline82'].forEach(profile => {
    const panel = $(`#profile-${profile}-content`);
    if (panel) panel.hidden = key !== profile;
  });
}
function selectSolution(key, moveFocus = false) {
  if (!Object.hasOwn(solutions, key)) return;
  currentSolution = key;
  const data = solutions[key];
  tabs.forEach(tab => {
    const selected = tab.dataset.solution === key;
    tab.classList.toggle('selected', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });
  $('#solution-panel').setAttribute('aria-labelledby', `tab-${key}`);
  $('#solution-image').src = data.image;
  $('#solution-image').alt = data.alt;
  $('#open-image').setAttribute('aria-label', `Рассмотреть: ${data.name.toLowerCase()}`);
  $('#solution-badge').textContent = data.badge;
  $('#solution-title').textContent = data.title;
  $('#solution-description').textContent = data.description;
  const profileSpecs = $('#profile-specs');
  if (key === 'windows' || key === 'panorama') {
    const profileKeys = key === 'windows' ? ['s70', 's50', 'veka-euroline', 'veka-softline', 'veka-softline82'] : ['krls64'];
    profileSpecs.className = 'profile-specs profile-switch';
    profileSpecs.setAttribute('role', 'tablist');
    profileSpecs.setAttribute('aria-label', key === 'windows' ? 'Профиль алюминиевых окон и дверей' : 'Системы раздвижных панорамных дверей');
    profileSpecs.replaceChildren(...data.profiles.map(([name, detail], index) => {
      const profileKey = profileKeys[index];
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'profile-option'; button.id = `profile-${profileKey}-tab`;
      button.setAttribute('role', 'tab'); button.setAttribute('aria-controls', `profile-${profileKey}-content`);
      button.dataset.profile = profileKey;
      const title = document.createElement('strong'); title.textContent = name;
      const info = document.createElement('span'); info.textContent = detail;
      button.append(title, info); return button;
    }));
    selectProfile(profileKeys[0]);
  } else {
    profileSpecs.className = 'profile-specs';
    profileSpecs.removeAttribute('role'); profileSpecs.removeAttribute('aria-label');
    profileSpecs.replaceChildren(...data.profiles.map(([name, detail]) => {
      const card = document.createElement('div');
      const title = document.createElement('strong'); title.textContent = name;
      const info = document.createElement('span'); info.textContent = detail;
      card.append(title, info); return card;
    }));
    ['s70', 's50', 'krls64', 'veka-euroline', 'veka-softline', 'veka-softline82'].forEach(profile => {
      const panel = $(`#profile-${profile}-content`);
      if (panel) panel.hidden = true;
    });
  }
  $('#solution-tags').replaceChildren(...data.tags.map(label => {
    const span = document.createElement('span'); span.textContent = label; return span;
  }));
}
$('#profile-specs').addEventListener('click', event => {
  const button = event.target.closest('[data-profile]');
  if (button) selectProfile(button.dataset.profile);
});
$('#profile-specs').addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  const buttons = [...$('#profile-specs').querySelectorAll('[data-profile]')];
  const current = buttons.indexOf(event.target.closest('[data-profile]'));
  if (current < 0 || buttons.length < 2) return;
  event.preventDefault();
  const next = (current + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
  selectProfile(buttons[next].dataset.profile, true);
});
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSolution(tab.dataset.solution));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectSolution(tabs[next].dataset.solution, true); }
  });
});
document.querySelectorAll('[data-select]').forEach(link => {
  link.addEventListener('click', () => selectSolution(link.dataset.select));
});
$('#solution-discuss').addEventListener('click', () => {
  const topic = $('#selected-topic');
  topic.textContent = `Вас интересует: ${solutions[currentSolution].name.toLowerCase()}`;
  topic.hidden = false;
  $('#contacts').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  $('.contact-phone').focus({ preventScroll: true });
});
// A phone call is the contact action; no data is sent by the page.
$('#copy-phone').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('+79629446464');
    $('#copy-status').textContent = 'Номер скопирован: +7 (962) 944-64-64';
  } catch { $('#copy-status').textContent = 'Номер для копирования: +7 (962) 944-64-64'; }
});
const menuToggle = $('.menu-toggle');
const navigation = $('#navigation');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('open');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Закрыть меню' : 'Открыть меню');
  navigation.classList.toggle('open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuToggle.focus(); }
});
matchMedia('(max-width: 700px)').addEventListener('change', closeMenu);
const slides = [...document.querySelectorAll('.hero-slide')];
const captions = ['Панорамное остекление', 'Зимний сад у дома', 'Алюминиевые окна', 'Тепло вашего пространства', 'Архитектура зимнего сада'];
let slideIndex = 0;
let timer;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = reducedMotion.matches;
let controlsFocused = false;
let pointerOverControls = false;
function updatePauseControl() {
  $('#slide-pause').setAttribute('aria-pressed', String(userPaused));
  $('#slide-pause').setAttribute('aria-label', userPaused ? 'Продолжить слайдер' : 'Приостановить слайдер');
  $('#pause-icon').textContent = userPaused ? '▶' : 'Ⅱ';
}
function resetTimer() {
  clearInterval(timer);
  if (!userPaused && !document.hidden && !controlsFocused && !pointerOverControls) timer = setInterval(() => showSlide(slideIndex + 1), 10000);
}
function showSlide(next) {
  slides[slideIndex].classList.remove('active');
  slideIndex = (next + slides.length) % slides.length;
  slides[slideIndex].classList.add('active');
  $('#slide-number').textContent = String(slideIndex + 1).padStart(2, '0');
  $('#slide-caption').textContent = captions[slideIndex];
}
$('#slide-next').addEventListener('click', () => { showSlide(slideIndex + 1); resetTimer(); });
$('#slide-prev').addEventListener('click', () => { showSlide(slideIndex - 1); resetTimer(); });
$('#slide-pause').addEventListener('click', () => { userPaused = !userPaused; updatePauseControl(); resetTimer(); });
const controls = $('.slider-controls');
controls.addEventListener('mouseenter', () => { pointerOverControls = true; resetTimer(); });
controls.addEventListener('mouseleave', () => { pointerOverControls = false; resetTimer(); });
controls.addEventListener('focusin', () => { controlsFocused = true; resetTimer(); });
controls.addEventListener('focusout', event => { controlsFocused = controls.contains(event.relatedTarget); resetTimer(); });
document.addEventListener('visibilitychange', resetTimer);
reducedMotion.addEventListener('change', event => {
  if (event.matches) { userPaused = true; updatePauseControl(); resetTimer(); }
});
updatePauseControl(); resetTimer();
const imageDialog = $('#image-dialog');
$('#open-image').addEventListener('click', () => {
  const data = solutions[currentSolution];
  $('#dialog-image').src = data.image;
  $('#dialog-image').alt = data.alt;
  $('#dialog-caption').textContent = data.name;
  imageDialog.showModal();
  document.body.style.overflow = 'hidden';
});
$('#close-image').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  if (event.target !== imageDialog) return;
  const bounds = imageDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) imageDialog.close();
});
imageDialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  $('#open-image').focus({ preventScroll: true });
});

const applicationForm = $('#application-form');
applicationForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(applicationForm);
  const body = [
    `Имя: ${formData.get('name')}`,
    `Телефон: ${formData.get('phone')}`,
    `Что нужно остеклить: ${formData.get('project') || 'не указано'}`
  ].join('\\n');
  const mailto = `mailto:2156889@mail.ru?subject=${encodeURIComponent('Заявка с сайта «Знатные окна»')}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});
