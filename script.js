// Select Element
const image = document.getElementById('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playBtn = document.getElementById('play');

// Music
const songs = [
	{
		name: 'bruce_springsteen-born_to_run',
		displayName: 'Born to Run',
		artist: 'Bruce Springsteen',
	},
	{
		name: 'the_rolling_stones-i_cant_get_no_satisfaction',
		displayName: '(I Can´t Get No) Satisfaction',
		artist: 'The Rolling Stones',
	},
	{
		name: 'nirvana-smells_like_teen_spirit',
		displayName: 'Smells Like Teen Spirit',
		artist: 'Nirvana',
	},
	{
		name: 'oasis-live_forever',
		displayName: 'Live Forever',
		artist: 'Oasis',
	},
];

// Check if Playing
let isPlaying = false;

// Function Play
function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

// Function Pause
function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

function playOrPause() {
	isPlaying ? pauseSong() : playSong();
}

// Update DOM
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

// Next Song
function nextSong() {
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	songIndex++;
	loadSong(songs[songIndex]);
	playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar in Time
function updateProgressBar(e) {
	if (isPlaying) {
		const { duration, currentTime } = e.srcElement;

		// Update Prograss Bar Width
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;

		// Calculate display for duration
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}

		// Delay Switching Duration Element to Avoid NaN
		if (durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}

		// Calculate display for current
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

// Set Progress Bar
function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = music;
	music.currentTime = (clickX / width) * duration;
}

// Event Listeners
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
