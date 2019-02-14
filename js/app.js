const UI = {
	header: null,
	timer: null,
	handContainer: null,
	startButton: null,
	resetButton: null,
	stopButton: null,
	pomBox: null,
	timerBGColor: null
}

const Timer = {
	handle:null, 
	running: false,
	interval: 10, 
	counter: 0, 
	pomodoros: [],
	opacity: 0,
	RESET_VALUE: 360,
	POM_GOAL: 5
}


function animateTimer() {
	if (Timer.counter === Timer.RESET_VALUE) { 
		Timer.counter = 0;
		Timer.pomodoros.push(1)
		renderPom()
	}
	rotate(Timer.counter);
	adjustBGOpacity()
	Timer.counter++
	if (Timer.pomodoros.length === Timer.POM_GOAL) autoStop(); 
}

function rotate(num) {
	UI.handContainer.style.transform = `rotate(${num}deg)`;
}

function autoStop() {
	stop()
	UI.stopButton.classList.add('click');
	setTimeout(() => {
		UI.stopButton.classList.remove('click');
	}, 333);
	rotate(0);
}

function start() {
	!Timer.running ? Timer.handle = setInterval(animateTimer, Timer.interval) : null;
	Timer.running = true;
}

function reset() {
	Timer.counter = 0;
	Timer.pomodoros.length = 0;
	Timer.running = false;	
	if (Timer.handle > 0) { clearInterval(Timer.handle) }
	rotate(0)
	UI.timer.style.backgroundColor = `rgba(239, 239, 239, 0.0)`;
	while (UI.pomBox.lastChild) {UI.pomBox.removeChild(UI.pomBox.lastChild)}
}

function stop() {
	clearInterval(Timer.handle)
	Timer.running = false;
}

function renderPom() {
	let p = document.createElement('div')
	p.classList.add('pom')
	UI.pomBox.appendChild(p)
}

function adjustBGOpacity() {
	Timer.opacity = (Timer.counter + (Timer.pomodoros.length * Timer.RESET_VALUE)) / (Timer.RESET_VALUE * Timer.POM_GOAL)
	let rgbaVal = /rgba\(\d+\,\s?\d+\,\s?\d+\,\s?(\d+\.?\d+|0|1)\)/
	UI.timer.style.backgroundColor = UI.timerBGColor.replace(rgbaVal, (str, match) => {
		return str.replace(match, Timer.opacity)
	})
}

document.addEventListener('DOMContentLoaded', () => {
	UI.header = document.getElementsByTagName('h1')[0]
	UI.timer = document.getElementById('timer');
	UI.timerBGColor = getComputedStyle(UI.timer).backgroundColor
	UI.handContainer = document.getElementById('handContainer');
	UI.startButton = document.getElementById('start');
	UI.resetButton = document.getElementById('reset');
	UI.stopButton = document.getElementById('stop');
	UI.pomBox = document.getElementById('pomBox');
	
	UI.startButton.addEventListener('click', start)
	UI.resetButton.addEventListener('click', reset)
	UI.stopButton.addEventListener('click', stop)	
	UI.handContainer.addEventListener('click', () => {
		UI.header.style.animation = 'wiggle 333ms';
		setTimeout( () => {
			UI.header.style.animation = '';
		},333)
	})
})