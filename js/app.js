const UI = {
	timer: null,
	handContainer: null,
	startButton: null,
	resetButton: null,
	stopButton: null,
	pomBox: null
}

const Timer = {
	handle:null, 
	running: false, 
	counter: 0, 
	pomodoros: []
}


function rotate() {
	if (Timer.counter === 360) { 
		Timer.counter = 0;
		Timer.pomodoros.push(1)
		UI.timer.style.backgroundColor = `rgba(239, 239, 239,${0.2 + Timer.pomodoros.length/10})`
		renderPoms()
	}
	UI.handContainer.style.transform = `rotate(${Timer.counter}deg)`
	Timer.counter++
}

function start() {
	!Timer.running ? Timer.handle = setInterval(rotate,1) : null;
	Timer.running = true;
}

function reset() {
	Timer.counter = 0;
	Timer.pomodoros = 0;
	Timer.running = false;	
	if (Timer.handle > 0) {clearInterval(Timer.handle)}
	UI.handContainer.style.transform = `rotate(${Timer.counter}deg)`;
	UI.timer.style.backgroundColor = `rgba(239, 239, 239,0.2)`

}

function stop() {
	clearInterval(Timer.handle)
	Timer.running = false;
}

function renderPoms() {
	Timer.pomodoros.forEach( pom => {
		let p = document.createElement('div')
		p.classList.add('pom')
		UI.pomBox.appendChild(p)
	})
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
	
})