
function preloadAssets() {
  const assets = [
    'logos/logosk2.png',
    'images/sun.png',
     'images/exp.png',
      'images/edu.png',
       'images/cert.png',
    'images/moon.png',
    'icons/import.svg',
    'icons/github-brands-solid.svg',
    'icons/circlelinkedimg.svg',
    'images/A.png',
    'logos/bb.png',
    'logos/vu_college.webp',
    'logos/tcs1.svg',
    'logos/icons8-aws-logo-50.png',
    'logos/pycharm.svg',
    'logos/javascript.png',
    'logos/icons8-html-50.png',
    'logos/icons8-css3-50.png',
    'logos/tailwind-css.png',
    'logos/icons8-java-50.png',
    'logos/icons8-python-50.png',
    'logos/icons8-c-programming-50.png',
    'logos/icons8-c++-50.png',
    'logos/icons8-react-js-50.png',
    'logos/node-js.png',
    '/logos/flask.svg',
    '/logos/django.svg',
    '/logos/selenium.svg',
    '/logos/opencv.svg',
    '/logos/tensorflow.svg',
    'logos/pytorch.svg',
    'logos/Pandas (1).png',
    'logos/numpy (1).svg',
    'logos/Matplotlib.png',
    'logos/pngwing.com.png',
    'logos/NicePng_python-logo-png_702215.png',
    'logos/tesseract.svg',
    'logos/pillow-logo-248x250.png',
    'logos/pngaaa.com-2438729.png',
    'icons/forward-solid.svg',
    'icons/chevron-right-solid.svg',
    'icons/github-uncol.svg',
    'images/pro-interface.PNG',
    'images/pro-velsscanner.PNG',
    'images/pro-resumerouter.PNG',
    'images/iy.png',
    'images/vrick-landongpage.png',
    'icons/instagram1.svg',
    'icons/317750_linkedin_icon.svg',
    'icons/instagram-uncol.svg',
    'icons/colored/instagram.svg',
    'icons/github-uncol.svg',
    'icons/colored/github-col.svg',
    'icons/linkedin-uncol.svg',
    'icons/colored/linkedin-col.svg',
    'images/wbh1.png',
    'images/wc.png',
    'images/opip.png',
    // Videos
    'images/heiop1.mp4',
    'images/ohh.mp4',
    'images/vmake2.mp4',
    'images/vanak1.mp4'
  ];

  assets.forEach((src) => {
    if (src.endsWith('.mp4')) {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.style.display = 'none';
      document.body.appendChild(video);
    } else {
      const img = new Image();
      img.src = src;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const mainContent = document.querySelector('.main_outer');

  loader.style.display = 'block';
  mainContent.style.display = 'none';

  // Preload assets (optional, define this if needed)
  preloadAssets();

  // ===== Loader animation setup =====
  const centerMessage = `Loading..`;
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&.()*\'{"\}`~ ';
  const center = loader.querySelector('#center');
  const background = loader.querySelector('#background');
  const intro = loader.querySelector('#intro');
  const port = loader.querySelector('#port');
  const incar = loader.querySelector('#incar');
  incar.style.opacity = `0`;

  // Create spans for each loading character
  const spans = centerMessage.split('').map(char => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ' ';
    center.appendChild(span);
    return span;
  });

  // Animate characters one-by-one
  function animateCenter(index = 0) {
    if (index >= spans.length) {
      stopBackground();
      return;
    }

    let frame = 0;
    const span = spans[index];

    const interval = setInterval(() => {
      const char = characters[Math.floor(Math.random() * characters.length)];
      span.textContent = char;

      if (char === centerMessage[index]) {
        span.textContent = centerMessage[index];
        clearInterval(interval);
        animateCenter(index + 1);
      }

      frame++;
      if (frame > 100) {
        span.textContent = centerMessage[index];
        clearInterval(interval);
        animateCenter(index + 1);
      }
    }, 9);
  }

  // ===== Background animation setup =====
  const charCols = Math.floor(window.innerWidth / 15);
  const charRows = Math.floor(window.innerHeight / 24);
  const bgChars = [];

  function setupBackground() {
    for (let r = 0; r < charRows; r++) {
      const row = [];
      for (let c = 0; c < charCols; c++) {
        row.push(randomChar());
      }
      bgChars.push(row);
    }
    drawBackground();
  }

  function randomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function drawBackground() {
    background.innerHTML = '';
    bgChars.forEach((row) => {
      const div = document.createElement('div');
      div.className = 'bg-row';
      div.textContent = row.join(' ');
      background.appendChild(div);
    });
  }

  function updateBackground() {
    for (let r = 0; r < charRows; r++) {
      for (let c = 0; c < charCols; c++) {
        bgChars[r][c] = randomChar();
      }
    }
    drawBackground();
  }

  let bgInterval = setInterval(updateBackground, 100);

  function stopBackground() {
    clearInterval(bgInterval);
    background.style.transition = 'opacity 2s ease';
    background.style.opacity = 0;
    center.style.transform = 'translate(-50%, -15%) scale(1.5)';
    center.style.top = `10%`;
    intro.style.display = `block`;
    port.style.display = `block`;
  }

  // ===== Start the loader animation =====
  animateCenter();
  setupBackground();

  // ===== After 10 seconds, hide loader and show content =====
  setTimeout(() => {
    loader.style.display = 'none';
    mainContent.style.display = 'grid';

    // Set up ResizeObserver to adjust height dynamically
    const par = document.querySelector('.par');
    if (par && mainContent) {
      const observer = new ResizeObserver(() => {
        const height = par.getBoundingClientRect().height;
        if (height > 0) {
          mainContent.style.height = `${height}px`;
        }
      });
      observer.observe(par);
    }

    document.body.classList.add('page-loaded');

    // Transition class for styling
    setTimeout(() => {
      document.body.classList.remove('page-loaded');
      document.body.classList.add('page-done');
    }, 9500);
  }, 10000);
});



// Original c.js code (unchanged)
const dlSun = document.querySelector(".dl1");
const dlMoon = document.querySelector(".dl2");
const v1 = document.getElementById("scrollVideo");
const v2 = document.getElementById("scrollvideo1");
const root = document.documentElement;
const main = document.querySelector(".main");

let isDark = true; // Initial state (dark)

function toggleTheme() {
  isDark = !isDark;

  if (!isDark) {
    // Switch to LIGHT MODE
    dlSun.hidden = true;
    dlMoon.hidden = false;

    // Change video sources
    v1.querySelector("source").src = "images/vmake2.mp4";
    v2.querySelector("source").src = "images/vanak1.mp4";
    v1.load();
    v2.load();

    // Change CSS variables
    root.style.setProperty("--im-wid", "66%");
    root.style.setProperty("--im-hei", "72%");
    root.style.setProperty("--im-top", "-2%");
    root.style.setProperty("--im-left", "-2rem");
    root.style.setProperty("--bg", "beige");
    root.style.setProperty("--bg-dark", "white");
    root.style.setProperty("--bg-grey", "burlywood");
    root.style.setProperty("--bg-lang-sec", "rgb(219, 182, 123)");
    root.style.setProperty("--bg-image-bh0", "url('images/wbh1.png')");
    root.style.setProperty("--border-orange-brown", "chocolate");
    root.style.setProperty("--font-bisque", "black");
    main.style.backgroundImage = "url('images/wc.png')";
    root.style.setProperty("--bg-od", "#E1BF93");
    root.style.setProperty("--border-edu-sec", "chocolate");
    root.style.setProperty("--bg-dark1", "#BA9A71");
    root.style.setProperty("--border-white", "black");
    root.style.setProperty("--font-white1", "rgb(255, 255, 255)");
    root.style.setProperty("--bhsha", "2px 2px 6px rgba(4, 4, 4, 0.7)");
    root.style.setProperty("--blur", " blur(0px)");
    root.style.setProperty("--bg-gradient-project", "linear-gradient(125deg, rgb(46, 21, 4), burlywood)");
    root.style.setProperty("--bg-proitem-div", "white");
    root.style.setProperty("--shadow-review-inset", "inset 0 0 40px 0 white, inset 0 0 10px 0 white");
    root.style.setProperty("--font-white", "black");
    root.style.setProperty("--font-off-white", "black");
    root.style.setProperty("--font-grey", "black");
    root.style.setProperty("--font-grey-alt", "chocolate");
    root.style.setProperty("--font-light-grey", "black");
    root.style.setProperty("--font-light-grey-alt", "black");
    root.style.setProperty("--font-dark-grey", "black");
    root.style.setProperty("--font-off-grey", "black");
    root.style.setProperty("--font-light-grey-main", "black");
  } else {
    // Switch back to DARK MODE
    dlSun.hidden = false;
    dlMoon.hidden = true;

    // Restore original video sources
    v1.querySelector("source").src = "images/heiop1.mp4";
    v2.querySelector("source").src = "images/ohh.mp4";
    v1.load();
    v2.load();
    root.style.setProperty("--im-wid", "60%");
    root.style.setProperty("--im-hei", "53%");
    root.style.setProperty("--im-left", "-.3rem");
    root.style.setProperty("--im-top", "0%");
    root.style.setProperty("--bg", "rgb(10, 6, 0)");
    root.style.setProperty("--bg-lang-sec", "rgb(24, 15, 1)");
    root.style.setProperty("--border-white", "white");
    root.style.setProperty("--bg-od", "rgba(225, 191, 147, 0)");
    root.style.setProperty("--bg-gradient-project", "linear-gradient(125deg, rgb(46, 21, 4), burlywood)");
    root.style.setProperty("--bg-proitem-div", "linear-gradient(burlywood 10%,rgb(145, 67, 11))");
    root.style.setProperty("--bg-dark", "rgb(10, 6, 0)");
    root.style.setProperty("--bg-image-bh0", "url('images/bh0.PNG')");
    root.style.setProperty("--font-bisque", "bisque");
    root.style.setProperty("--bhsha", "0px 0px 0px rgba(54, 32, 0, 0.7)");
    root.style.setProperty("--blur", " blur(0px)");
    main.style.backgroundImage = "url('images/up_car.png')";
    root.style.setProperty("--bg-dark1", "rgb(10, 6, 0)");
    root.style.setProperty("--bg-gradient-project", " linear-gradient(125deg, rgb(46, 21, 4), black)");
    root.style.setProperty("--bg-proitem-div", "linear-gradient(black 10%,rgb(145, 67, 11))");
    root.style.setProperty("--border-edu-sec", "rgb(197, 149, 78)");
    root.style.setProperty("--bg-grey", "rgb(58, 30, 10)");
    root.style.setProperty("--font-white", "#ffffff");
    root.style.setProperty("--font-off-white", "#fafafa");
    root.style.setProperty("--font-grey", "rgb(187, 187, 187)");
    root.style.setProperty("--shadow-review-inset", "inset 0 0 40px 0 rgb(10, 6, 0), inset 0 0 10px 0 rgb(10, 6, 0)");
    root.style.setProperty("--font-grey-alt", "rgb(181, 181, 181)");
    root.style.setProperty("--font-light-grey", "#bbbbbb");
    root.style.setProperty("--font-light-grey-alt", "rgb(228, 228, 228)");
    root.style.setProperty("--font-dark-grey", "#a2a2a2");
    root.style.setProperty("--font-off-grey", "rgb(224, 224, 224)");
    root.style.setProperty("--font-light-grey-main", "rgb(172, 172, 172)");
  }
}

dlSun.addEventListener("click", toggleTheme);
dlMoon.addEventListener("click", toggleTheme);

let items = document.querySelectorAll("[class^=pro_det]");
let next = document.getElementsByClassName("[class^=proitem]");
let hoo = document.querySelectorAll(".projects_head .proitem");

let active = 3;

function loadshow() {
  let stt = 0;
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].filter = `none`;
  items[active].style.opacity = 1;
  items[active].style.width = `28rem`;
  for (let i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px)`;
    items[i].style.zIndex = -stt;
    items[i].filter = `blur(5px)`;
    items[i].style.width = `28rem`;
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
  stt = 0;
  for (let i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt})`;
    items[i].style.zIndex = -stt;
    items[i].filter = `blur(5px)`;
    items[i].style.width = `28rem`;
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}

loadshow();

function clicker(abc, obj) {
  active = abc;
  let proitems = document.querySelectorAll(".projects_head .proitem");
  document.querySelector(".projects_head .proitem.active")?.classList.remove("active");
  proitems[abc].classList.add("active");
  let current = document.querySelector(".project_details .pro_det.active");
  if (current) {
    current.classList.remove("active");
  }
  items[abc].classList.add("active");
  loadshow();
}

document.querySelector('.exp_data').addEventListener('click', function () {
  var expData = this.closest('.exp_data');
  var intData = expData.querySelector('.int_data');
  intData.classList.toggle('visible');
  this.classList.toggle('int_data-visible');
});

document.addEventListener("DOMContentLoaded", function () {
  const getInTouchBtn = document.getElementById("git");
  const git2 = document.getElementById("git2");
  const emailBtn = document.querySelector(".mail");
  const formBtn = document.querySelector(".frm");
  const ips = document.getElementById("ips");
  const form = document.querySelector("form");
  const review = document.querySelector(".review");
  const wrp = document.querySelector(".wrp");

  getInTouchBtn.addEventListener("click", function () {
    wrp.style.display = 'none';
    git2.style.display = "grid";
  });

  formBtn.addEventListener("click", function () {
    review.classList.remove("se");
    review.classList.add("sf");
  });

  emailBtn.addEventListener("click", function () {
    review.classList.remove("sf");
    review.classList.add("se");
  });

  document.addEventListener("click", function (event) {
    const isClickInside = git2.contains(event.target) || getInTouchBtn.contains(event.target);
    if (!isClickInside && git2.style.display === "grid") {
      git2.style.display = "none";
      wrp.style.display = "block";
    }
  });
});

gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("scrollvideo1");
const videoDuration = 3.8;

gsap.to(video, {
  currentTime: videoDuration,
  ease: "none",
  scrollTrigger: {
    trigger: ".oouutt",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  }
});

const sections = {
  experience: document.getElementById('experience'),
  education: document.getElementById('education'),
  certificate: document.getElementById('certificate')
};

const buttons = {
  experience: document.getElementById('btn-experience'),
  education: document.getElementById('btn-education'),
  certificate: document.getElementById('btn-certificate')
};

function showSection(key) {
  for (let section in sections) {
    sections[section].classList.toggle('active', section === key);
  }
  for (let button in buttons) {
    buttons[button].classList.toggle('active', button === key);
  }
}

buttons.experience.addEventListener('click', () => showSection('experience'));
buttons.education.addEventListener('click', () => showSection('education'));
buttons.certificate.addEventListener('click', () => showSection('certificate'));

const yVehicles = [
  document.getElementById("Y1"),
  document.getElementById("Y2"),
  document.getElementById("Y3"),
  document.getElementById("Y4"),
  document.getElementById("Y5"),
  document.getElementById("Y6"),
  document.getElementById("Y7"),
  document.getElementById("Y8"),
];
const gVehicles = [
  document.getElementById("G1"),
  document.getElementById("G2"),
  document.getElementById("G3"),
  document.getElementById("G4"),
  document.getElementById("G5"),
  document.getElementById("G6"),
];

const CENTER_X = 220;
const CENTER_Y = 140;

let paused = false;

const container = document.getElementById("scene");
container.addEventListener("mouseenter", () => paused = true);
container.addEventListener("mouseleave", () => paused = false);

function getXPositions() {
  return [-80, -30, 50, 130, 310, 390, 470, 550];
}

function getYPositions() {
  return [-80, -30, 50, 240, 320, 400];
}

function disableTransition(elem) {
  elem.style.transition = "none";
}

function enableTransition(elem) {
  elem.style.transition = "";
}

async function moveCenter(vehicle, direction) {
  return new Promise((resolve) => {
    vehicle.classList.add("center-scale");
    setTimeout(() => {
      vehicle.classList.remove("center-scale");
      if (direction === "x") {
        let left = parseInt(vehicle.style.left);
        left += 50;
        if (left > 620) left = 0;
        vehicle.style.left = `${left}px`;
      } else {
        let top = parseInt(vehicle.style.top);
        top += 50;
        if (top > 480) top = 0;
        vehicle.style.top = `${top}px`;
      }
      resolve();
    }, 800);
  });
}

async function loop() {
  let isYTurn = true;
  const xPositions = getXPositions();
  const yPositions = getYPositions();

  while (true) {
    while (paused) {
      await new Promise(r => setTimeout(r, 100));
    }

    if (isYTurn) {
      const centerVehicle = yVehicles[3];
      const nextVehicles = yVehicles.slice(0, 3);
      const last = yVehicles.pop();

      centerVehicle.style.left = `${CENTER_X}px`;
      const centerMove = moveCenter(centerVehicle, "x");

      nextVehicles.forEach((v, i) => {
        v.style.left = `${xPositions[i + 1]}px`;
      });

      disableTransition(last);
      last.style.left = `${xPositions[0]}px`;
      yVehicles.unshift(last);
      void last.offsetWidth;
      enableTransition(last);

      await centerMove;

      yVehicles.forEach((v, i) => {
        v.style.left = `${xPositions[i]}px`;
      });
    } else {
      const centerVehicle = gVehicles[2];
      const nextVehicles = gVehicles.slice(0, 2);
      const last = gVehicles.pop();

      centerVehicle.style.top = `${CENTER_Y}px`;
      const centerMove = moveCenter(centerVehicle, "y");

      nextVehicles.forEach((v, i) => {
        v.style.top = `${yPositions[i + 1]}px`;
      });

      disableTransition(last);
      last.style.top = `${yPositions[0]}px`;
      gVehicles.unshift(last);
      void last.offsetHeight;
      enableTransition(last);

      await centerMove;

      gVehicles.forEach((v, i) => {
        v.style.top = `${yPositions[i]}px`;
      });
    }

    isYTurn = !isYTurn;
    await new Promise((r) => setTimeout(r, 300));
  }
}

loop();

const gridContainer = document.getElementById('grid');
gridContainer.style.height = `${window.innerHeight}px`;
gridContainer.style.overflowY = 'auto';
const columns = 12;
const rows = 196;
let cellsCreated = false;

function setupGridCells() {
  if (cellsCreated) return;
  const totalCells = rows * columns;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gridContainer.appendChild(cell);
  }

  gridContainer.style.display = 'grid';
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  cellsCreated = true;
}

function updateGridVisibility() {
  const shouldShow = window.innerWidth > 650;
  setupGridCells();
  gridContainer.querySelectorAll('.cell').forEach(cell => {
    cell.style.display = shouldShow ? 'block' : 'none';
  });
  gridContainer.style.visibility = 'visible';
  gridContainer.style.minHeight = shouldShow ? '' : '0';
}

updateGridVisibility();
window.addEventListener('resize', updateGridVisibility);

function syncMainOuterHeight() {
  const par = document.querySelector('.par');
  const mainOuter = document.querySelector('.main_outer');
  if (!par || !mainOuter) return;
  const h = par.getBoundingClientRect().height;
  mainOuter.style.height = `${h}px`;
}

window.addEventListener('load', syncMainOuterHeight);
window.addEventListener('resize', syncMainOuterHeight);

const mainOuter = document.querySelector('.main_outer');
const cursorGradient = document.createElement('div');
const cursorGlow = document.createElement('div');
const innerele = document.querySelector(".container #outer_lib .inner");

cursorGradient.classList.add('cursor-gradient');
cursorGlow.classList.add('cursor-glow');

mainOuter.appendChild(cursorGradient);
mainOuter.appendChild(cursorGlow);

mainOuter.addEventListener('mousemove', (e) => {
  const rect = mainOuter.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  cursorGradient.style.setProperty('--x', `${x}px`);
  cursorGradient.style.setProperty('--y', `${y}px`);
  cursorGradient.style.opacity = 1;
  cursorGradient.style.transform = 'translate(-50%, -50%) scale(1)';

  cursorGlow.style.setProperty('--x', `${x}px`);
  cursorGlow.style.setProperty('--y', `${y}px`);
  cursorGlow.style.opacity = 1;
  cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
});

mainOuter.addEventListener('mouseleave', () => {
  cursorGradient.style.opacity = 0;
  cursorGradient.style.transform = 'translate(-50%, -50%) scale(0)';
  cursorGlow.style.opacity = 0;
  cursorGlow.style.transform = 'translate(-50%, -50%) scale(0)';
});



let lastScrollTop = 0; 
let isScrolling = false; 

function onScroll() {
    if (isScrolling) return;

    isScrolling = true;

    window.requestAnimationFrame(() => {
        const language_slide = document.querySelectorAll('#personal .simplemethod'); 
        const others = document.querySelectorAll('.inner .lib');
        const p_mo = document.querySelectorAll('.proitem');
        const b_motion = document.querySelectorAll('[class^=point_dot]');
        
        const divs =[...language_slide, ...others, ...p_mo, ...b_motion]
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        divs.forEach(div => {
            if (currentScroll > lastScrollTop) {
                if (div.classList.contains('simplemethod')) {
                    div.classList.add('ls');
                }
              else if (div.classList.contains('point_dot')) {
                    div.classList.add('ud');
                }
                 
                else if (!div.classList.contains('123') && !div.classList.contains('language_slide')){
                    div.classList.add('123');
                }
            } 
            
            else {
                if(div.classList.contains('simplemethod')){
                    div.classList.remove('.simplemethod');
                }
                else if (div.classList.contains('123')) {
                    div.classList.remove('123');
                }
                else if(div.classList.contains('ud')){
                    div.classList.remove('ud');
                }
            }
        });

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
        isScrolling = false; // Reset flag after the animation frame
    });
}

window.addEventListener('scroll', onScroll);


let scrollLast = window.pageYOffset || document.documentElement.scrollTop;
let scrollDirectionTimer;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const isScrollingDown = currentScroll > scrollLast;

  document.body.classList.remove('scrolling-up', 'scrolling-down');
  document.body.classList.add(isScrollingDown ? 'scrolling-down' : 'scrolling-up');

  scrollLast = currentScroll <= 0 ? 0 : currentScroll;

  clearTimeout(scrollDirectionTimer);
  scrollDirectionTimer = setTimeout(() => {
    document.body.classList.remove('scrolling-up', 'scrolling-down');
  }, 200); 
}); 


const SECRET_KEY = "Iam12LpaGoalsan938010Ai";
const MAX_WORDS = 200;

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const wordCountDisplay = document.getElementById("wordCount");
    const successPopup = document.getElementById("successPopup");

    // ✅ Word counter and limit
    messageField.addEventListener("input", () => {
      const words = messageField.value.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;

      if (wordCount > MAX_WORDS) {
        messageField.value = words.slice(0, MAX_WORDS).join(" ");
        wordCountDisplay.innerText = `${MAX_WORDS}/${MAX_WORDS}`;
      } else {
        wordCountDisplay.innerText = `${wordCount}/${MAX_WORDS}`;
      }
    });

    // ✅ Handle form submit
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // 🚫 Prevent page reload

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const message = messageField.value.trim();

      if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("❌ Name must contain only letters.");
        return;
      }

      // ✅ Prepare payload
      const payload = {
        name,
        email,
        message,
        secret: SECRET_KEY,
      };

      try {
        const response = await fetch("https://script.google.com/macros/library/d/1g77LaEzYGXYuvBXetLhdd5OUxKmu6Xv0XOVEfAtKVTLvilUANdOiGrbx/1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
})

        const result = await response.text();
        console.log("Server response:", result);

        if (result.includes("Success")) {
          // ✅ Show popup
          successPopup.style.display = "block";
          setTimeout(() => {
            successPopup.style.display = "none";
            form.reset();
            wordCountDisplay.innerText = `0/${MAX_WORDS}`;
          }, 3000);
        } else {
          alert("❌ Failed: " + result);
        }
      } catch (err) {
        console.error("❌ Error:", err);
        alert("❌ Error sending message. Please try again.");
      }
    });
  });
