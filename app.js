let items = document.querySelectorAll("[class^=pro_det]");
let next = document.getElementsByClassName("[class^=proitem]");
let hoo = document.querySelectorAll(".projects_head .proitem");
const container = document.querySelector(".logos");
const slide = document.querySelector(".logo_slide");
const interval = 2000;
let slides = document.querySelectorAll(".slide");
let images = document.querySelectorAll(".logo_slide .slide .imgs");
let index = 1;
let count = -75;

// ------------------------------------------motion----------------------------------------------------


const slidewidth = slides[index].clientWidth;
// slide.style.transform = `translateX(${-count}px)`;
const startslide = ()=> {
       setInterval(() => {
        index = index < slides.length ? index+1:1;
        count = index === 1 ? -75:count+(slidewidth);
        slide.style.transform = `translateX(${-count}px)`;
        slide.style.transition = `.7s`;
       }, interval);

}

startslide();

'------------------------------------------------------------------------------------------------------------------'

const containers = document.querySelector(".logos");
const slide2 = document.querySelector(".back_end .logo_slide2");
const interval2 = 3000;
let slides2 = document.querySelectorAll(".back_end .logo_slide2 .slide");
let im = document.querySelectorAll(".back_end .logo_slide .slide .imgs");
let index2 = 1;

const startslide2 = ()=> {
       setInterval(() => {
    slides2 = document.querySelectorAll(".logo_side2 .slide");
    im = document.querySelectorAll(".logo_slide2 .slide .imgs");
    d_s = document.querySelectorAll(".p_apps .levels .d");
    let ppastactive = document.querySelector('.logo_slide2 .slide .imgs.active'); 
    let dpastactive = document.querySelector('.p_apps .levels .bp_lang .d.active'); 
    ppastactive.classList.remove('active');
    im[index2].classList.add('active');
    dpastactive.classList.remove('active');
    d_s[index2].classList.add('active');
    index2++;
    if(index2 === im.length){
        index2 = 0;
    }
    }, interval2);
}
startslide2();

// ----------------------------------------------------------------------------------------------------

let active = 3;

function loadshow() {
    let stt = 0;
    items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].filter = `none`;
        items[active].style.opacity =1
        items[active].style.width = `350px`;
    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2*stt}) perspective(16px)`;
        items[i].style.zIndex = -stt;
        items[i].filter = `blur(5px)`;
        items[i].style.width = `300px`;
        items[i].style.opacity = stt > 2 ? 0:0.6;
    }
    stt = 0;
    for (let i = active - 1; i >=0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2*stt})`;
        items[i].style.zIndex = -stt;
        items[i].filter = `blur(5px)`;
        items[i].style.width = `300px`;
        items[i].style.opacity = stt > 2 ? 0:0.6;

    }

}

loadshow();
function clicker(abc,obj){
    active = abc;
    let hoo = document.querySelectorAll(".projects_head .proitem");
    let present_active = document.querySelector('.projects_head .proitem.active'); 
    present_active.classList.remove('active');
    hoo[abc].classList.add('active');
    loadshow(); 
}

"--------------------------------------------------------------------------------------------------------------------"

document.querySelector('.exp_data').addEventListener('click', function() {
    // Find the associated .int_data element (it is inside the same parent as .exp_data)
    var expData = this.closest('.exp_data');
    var intData = expData.querySelector('.int_data');
    
    // Toggle the visibility of .int_data
    intData.classList.toggle('visible');
    this.classList.toggle('int_data-visible');
});






let lastScrollTop = 0; // Keeps track of the last scroll position
let isScrolling = false; // Flag to prevent excessive scroll event handling

function onScroll() {
    if (isScrolling) return;

    isScrolling = true;

    window.requestAnimationFrame(() => {
        const comb = document.querySelectorAll('section'); 
        const others = document.querySelectorAll('.lib');
        const p_mo = document.querySelectorAll('.proitem');
        const b_motion = document.querySelectorAll('[class^=point_dot]');
        const divs =[...comb, ...others, ...p_mo, ...b_motion]
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        divs.forEach(div => {
            // Apply animation only if the div doesn't already have the animation
            if (currentScroll > lastScrollTop) {
                if (div.classList.contains('proitem')) {
                    div.classList.add('345');
                }
                else if (div.classList.contains('point_dot')) {
                    div.classList.add('ud');
                }
                else if (!div.classList.contains('123')) {
                    div.classList.add('123');
                }
            } 
            
            else {
                if(div.classList.contains('345')){
                    div.classList.remove('345');
                }
                else if (div.classList.contains('123')) {
                    div.classList.remove('123');
                }
                else if(div.classList.contains('point_dot')){
                    div.classList.remove('ud');
                }
            }
        });

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
        isScrolling = false; // Reset flag after the animation frame
    });
}

window.addEventListener('scroll', onScroll);


// const gridContainer = document.getElementById('grid');
// const rows = 13;
// const columns = 6;

// for (let i = 0; i < rows * columns; i++) {
//     const cell = document.createElement('div');
//     cell.classList.add('cell');
//     gridContainer.appendChild(cell);
// }

// const cells = document.querySelectorAll('.cell');


const gridContainer = document.getElementById('grid');
const rows = 43;
const columns = 12;

for (let i = 0; i < rows * columns; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gridContainer.appendChild(cell);
}

const cells = document.querySelectorAll('.cell');

// Make sure the cells fill the full width and height of the grid
gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;





// const gridContainer = document.getElementById('grid');

// function createGrid() {
//     gridContainer.innerHTML = ''; // Clear existing cells

//     const cellSize = 150; // Approximate size of each cell
//     const numColumns = Math.ceil(window.innerWidth / cellSize);
//     const numRows = Math.ceil(document.body.scrollHeight / cellSize);

//     gridContainer.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
//     gridContainer.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

//     for (let i = 0; i < numColumns * numRows; i++) {
//         const cell = document.createElement('div');
//         cell.classList.add('cell');
//         gridContainer.appendChild(cell);
//     }
// }

// // Create grid initially and update on resize
// createGrid();
// window.addEventListener('resize', createGrid);
// window.addEventListener('scroll', createGrid); // Ensures grid updates if page grows



// Get the custom cursor element
// Create the glowing effect container dynamically
// Add this to your existing JavaScript
// Add this to your existing JavaScript
// Add this to your existing JavaScript
const mainOuter = document.querySelector('.main_outer');
const cursorGradient = document.createElement('div');
const cursorGlow = document.createElement('div');

cursorGradient.classList.add('cursor-gradient');
cursorGlow.classList.add('cursor-glow');

// Append to .main_outer
mainOuter.appendChild(cursorGradient);
mainOuter.appendChild(cursorGlow);

// Update gradient and glow position on mouse move
mainOuter.addEventListener('mousemove', (e) => {
    const rect = mainOuter.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position relative to .main_outer
    const y = e.clientY - rect.top; // Y position relative to .main_outer

    // Update gradient position
    cursorGradient.style.setProperty('--x', `${x}px`);
    cursorGradient.style.setProperty('--y', `${y}px`);
    cursorGradient.style.opacity = 1; // Show gradient
    cursorGradient.style.transform = 'translate(-50%, -50%) scale(1)'; // Expand gradient

    // Update glow position
    cursorGlow.style.setProperty('--x', `${x}px`);
    cursorGlow.style.setProperty('--y', `${y}px`);
    cursorGlow.style.opacity = 1; // Show glow
    cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)'; // Expand glow
});

// Hide gradient and glow when mouse leaves .main_outer
mainOuter.addEventListener('mouseleave', () => {
    cursorGradient.style.opacity = 0;
    cursorGradient.style.transform = 'translate(-50%, -50%) scale(0)'; // Shrink gradient
    cursorGlow.style.opacity = 0;
    cursorGlow.style.transform = 'translate(-50%, -50%) scale(0)'; // Shrink glow
});


