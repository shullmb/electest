const UI = {
	timer: null,
	handContainer: null,
	startButton: null,
	resetButton: null,
	stopButton: null,
	pomBox: null,
}

const Timer = {
	handle:null, 
	running: false,
	interval: 10, 
	counter: 0, 
	pomodoros: [],
	opacity: 0
}


function animateTimer() {
	if (Timer.counter === 360) { 
		Timer.counter = 0;
		Timer.pomodoros.push(1)
		// Timer.opacity = 0.2 + Timer.pomodoros.length / 6;
		// UI.timer.style.backgroundColor = `rgba(239, 239, 239,${Timer.opacity})`
		renderPom()
	}
	rotate(Timer.counter);
	Timer.counter++
	Timer.opacity = (((Timer.pomodoros.length + 1) / 10) + (Timer.counter / 360 )) / 5
	UI.timer.style.backgroundColor = `rgba(239, 239, 239,${Timer.opacity})`
	if (Timer.pomodoros.length === 5) { 
		autoStop(); 
	}
}

function rotate(num) {
	UI.handContainer.style.transform = `rotate(${num}deg)`;
}

function autoStop() {
	UI.stopButton.click();
	UI.stopButton.classList.add('click');
	setTimeout(() => {
		UI.stopButton.classList.remove('click');
	}, 333);
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
	UI.timer.style.backgroundColor = `rgba(239, 239, 239,0.2)`;
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

document.addEventListener('DOMContentLoaded', () => {
	UI.timer = document.getElementById('timer');
	UI.handContainer = document.getElementById('handContainer');
	UI.startButton = document.getElementById('start');
	UI.resetButton = document.getElementById('reset');
	UI.stopButton = document.getElementById('stop');
	UI.pomBox = document.getElementById('pomBox');
	
	UI.startButton.addEventListener('click', start)
	UI.resetButton.addEventListener('click', reset)
	UI.stopButton.addEventListener('click', stop)	
	UI.handContainer.addEventListener('click', () => {
		UI.timer.style.animation = 'wiggle 333ms';
		setTimeout( () => {
			UI.timer.style.animation = '';
		},333)
	})
	let computedTimerOpacity = getComputedStyle(UI.timer).backgroundColor.match(/0.\d+/)[0]
	Timer.opacity = computedTimerOpacity;

})