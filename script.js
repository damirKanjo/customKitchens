// --- Osnovni selektori ---
const menuToggle = document.getElementById('menuToggle');
const sideMenu   = document.getElementById('sideMenu');
const closeBtn   = document.getElementById('closeBtn');
const rotatedTxt = document.querySelector('.rotated-fixed');

// Otvaranje/zatvaranje menija
menuToggle.addEventListener('click', () => {
  sideMenu.classList.add('active');
  sideMenu.setAttribute('aria-hidden', 'false');
  menuToggle.classList.add('hidden');
  positionRotatedText();
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  sideMenu.setAttribute('aria-hidden', 'true');
  setTimeout(() => { menuToggle.classList.remove('hidden'); }, 260);
  positionRotatedText();
});

// Zatvori meni na Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sideMenu.classList.contains('active')) closeBtn.click();
});

// Pozicioniranje rotiranog teksta
function positionRotatedText() {
  if (!menuToggle || !rotatedTxt) return;
  const rect = menuToggle.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = window.innerHeight / 2;
  rotatedTxt.style.left = `${centerX}px`;
  rotatedTxt.style.top  = `${centerY}px`;
}

window.addEventListener('load', positionRotatedText);
window.addEventListener('resize', positionRotatedText);
window.addEventListener('scroll', positionRotatedText);

// Desni rotirani tekst
const rotatedTxtRight = document.querySelector('.rotated-fixed.right');
function positionRotatedTextRight() {
  if (!rotatedTxtRight) return;
  const centerY = window.innerHeight / 2;
  rotatedTxtRight.style.top = `${centerY}px`;
}
window.addEventListener('load', positionRotatedTextRight);
window.addEventListener('resize', positionRotatedTextRight);
window.addEventListener('scroll', positionRotatedTextRight);

if (menuToggle) {
  const obs = new MutationObserver(positionRotatedText);
  obs.observe(menuToggle, { attributes: true, attributeFilter: ['class', 'style'] });
}

// --- Navigacija sekcijama ---
const circleLeft = document.getElementById("circleLeft");
const circleRight = document.getElementById("circleRight");
const menuLinks = document.querySelectorAll(".side-menu a");
const sections = document.querySelectorAll("header.hero, section");

let currentSection = 0;

// Izračunaj trenutnu sekciju
function computeCurrentSection() {
  let closestIndex = 0;
  let minDistance = Infinity;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  currentSection = closestIndex;
}

// Skroluj do određene sekcije
function scrollToSection(index) {
  currentSection = index;
  window.scrollTo({
    top: sections[index].offsetTop,
    behavior: "smooth"
  });
  updateButtons();
}

// Ažuriraj strelice
function updateButtons() {
  if (currentSection <= 0) {
    circleLeft.classList.add("blurred");
  } else {
    circleLeft.classList.remove("blurred");
  }
}

// Klik na desnu strelicu
circleRight.addEventListener("click", () => {
  if (currentSection < sections.length - 1) {
    scrollToSection(currentSection + 1);
  } else {
    scrollToSection(0); // vrati na vrh
  }
});

// Klik na levu strelicu
circleLeft.addEventListener("click", () => {
  if (currentSection > 0) {
    scrollToSection(currentSection - 1);
  }
});

// Klik na link iz menija
menuLinks.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToSection(index + 1); // +1 jer je hero sekcija na poziciji 0
  });
});

// Osvežavanje pri ručnom skrolu
window.addEventListener("scroll", () => {
  computeCurrentSection();
  updateButtons();
});

// Inicijalno stanje
window.addEventListener("load", () => {
  computeCurrentSection();
  updateButtons();
});



//****** KONTROLA ZA DUGMICE *****//
const kontakt = document.getElementById("kontakt");
const circle = document.getElementById("circleRight");

function checkKontaktBottom() {
  const rect = kontakt.getBoundingClientRect();
  const kontaktBottom = rect.bottom;
  const viewportHeight = window.innerHeight;

  const isAtBottom = kontaktBottom <= viewportHeight;

  // Rotiraj sadržaj kružića (ikonica unutar dugmeta)
  const content = circle.firstElementChild;
  content.style.transform = isAtBottom ? "rotate(-90deg)" : "rotate(0deg)";
}

window.addEventListener("scroll", checkKontaktBottom);
window.addEventListener("load", checkKontaktBottom);
window.addEventListener("resize", checkKontaktBottom);




//***** O NAMA *****// 

const oNamaSection = document.getElementById("o-nama");
const oNamaTitle = oNamaSection.querySelector(".section-title");
const typingTarget = document.getElementById("typingText");

const fullText = "Mi smo tvrtka za proizvodnju kuhinja po meri iz Osijeka. Vaše ideje naše delo. Naš kvalitet je garancija koju nudimo. Vrhunska izrada kuhinja po meri. Sve po vašem ukusu. Od dizajna do montaže vas deli samo jedan poziv.";

let oNamaAnimated = false;

function typeText(text, element, delay = 25) {
  let index = 0;
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, delay);
    }
  }
  type();
}

function triggerONamaAnimation() {
  const rect = oNamaSection.getBoundingClientRect();
  const sectionMiddle = rect.top + rect.height / 2;
  const viewportMiddle = window.innerHeight / 2;

  const isCentered = Math.abs(sectionMiddle - viewportMiddle) < 100;

  if (isCentered && !oNamaAnimated) {
    oNamaAnimated = true;
    oNamaTitle.classList.add("slide-up");

    setTimeout(() => {
      typeText(fullText, typingTarget);
    }, 1300); // čekaj 2.5 sekunde nakon podizanja naslova
  }
}

window.addEventListener("scroll", triggerONamaAnimation);
window.addEventListener("load", triggerONamaAnimation);
window.addEventListener("resize", triggerONamaAnimation);