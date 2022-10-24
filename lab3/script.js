
let AUDIO_1 = AUDIO_2 = AUDIO_3 = AUDIO_4 = [];
let recordingStartTime, songNotes, totalMiliseconds, i;

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let milisecondsLabel = document.getElementById("miliseconds");
const recordBtn = document.querySelector("#record");

const keys = document.querySelectorAll(".key");

//Playing sounds

document.addEventListener("keypress", onKeyPress);

function onKeyPress(event) {
  const key = event.keyCode;
  let sound = "";
  console.log(key);
  if (key < 49 || key > 57) return;
  switch (key) {
    case 49:
      sound = "boom";
      break;
    case 50:
      sound = "clap";
      break;
    case 51:
      sound = "hihat";
      break;
    case 52:
      sound = "kick";
      break;
    case 53:
      sound = "openhat";
      break;
    case 54:
      sound = "ride";
      break;
    case 55:
      sound = "snare";
      break;
    case 56:
      sound = "tink";
      break;
    case 57:
      sound = "tom";
      break;

    default:
      break;
  }

  playSound(sound);
}

function playSound(sound) {
  if (isRecording()) recordNote(sound);

  const audioTag = document.querySelector("#" + sound);
  const audioBtn = document.querySelector("#" + sound + "-btn");

  audioTag.currentTime = 0;
  audioTag.play();
  audioBtn.classList.add("active");
  document.addEventListener("keyup", () => {
    audioBtn.classList.remove("active");
  });
}

//Path selecting

const audioPaths = document.querySelectorAll(".audio-path");

audioPaths.forEach((audioPath) => {
  audioPath.addEventListener("click", () => selectPath(audioPath));
});

function selectPath(el) {
  if(isRecording()) return;
  audioPaths.forEach((audioPath) => {
    if (audioPath.classList.contains("audio-selected"))
      audioPath.classList.remove("audio-selected");
  });
  el.classList.add("audio-selected");
}

// Recording

document.addEventListener("keypress", toggleRecording);

function toggleRecording(event) {
  if (event.keyCode == 82 || event.keyCode == 114) {
    if (isRecording()) {
      stopRecording();
    } else {
      startRecording();
    }
  }
}

function isRecording() {
  return recordBtn != null && recordBtn.classList.contains("recording-started");
}

function startRecording() {
  recordBtn.classList.add("recording-started");
  recordingStartTime = Date.now();
  songNotes = [];
  countTime();
}

function stopRecording() {
  recordBtn.classList.remove("recording-started");
  clearInterval(i);
  saveSong();
  playSong(songNotes);
}

function playSong(songNotes) {
  if (songNotes.length === 0) return;

  songNotes.forEach((note) => {
    setTimeout(() => {
      playSound(note.key);
    }, note.startTime);
  });

  console.log(songNotes);
}

function saveSong() {
  let currentPath = document.querySelector(".audio-selected");
  let button = currentPath.querySelector(".audioPlay");
  let btnId = button.id;
  console.log(btnId);
  switch (btnId) {
    case "play1": AUDIO_1 = songNotes;
      break;
    case "play2": AUDIO_2 = songNotes;
      break;
    case "play3": AUDIO_3 = songNotes;
    break;
    case "play4": AUDIO_4 = songNotes;
    break;
  }
}

let audioPlayBtns = document.querySelectorAll(".audioPlay");

audioPlayBtns.forEach(playBtn => {
  playBtn.addEventListener("click", () => playSavedSound(playBtn));
});




function playSavedSound(el){

  if(el.classList.contains)

  el.classList.add("playingSong");

  if(el.id == "play1")
  {

    console.log(AUDIO_1[AUDIO_1.length-1].startTime)
    setInterval(() => {
      playSong(AUDIO_1)
    }, AUDIO_1[AUDIO_1.length - 1].startTime)
  }
  if(el.id == "play2")
    playSong(AUDIO_2);
  if(el.id == "play3")
    playSong(AUDIO_3);
  if(el.id == "play4")
    playSong(AUDIO_4);
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime,
  });
}

// Timer

function countTime() {
  minutesLabel.innerHTML =
    secondsLabel.innerHTML =
    milisecondsLabel.innerHTML =
      "00";

  totalMiliseconds = 0;
  i = setInterval(setTime, 10);
  setTime();
}

function setTime() {
  ++totalMiliseconds;
  milisecondsLabel.innerHTML = pad(totalMiliseconds % 60);
  secondsLabel.innerHTML = pad(parseInt((totalMiliseconds / 60) % 60));
  minutesLabel.innerHTML = pad(parseInt(totalMiliseconds / 3600));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Metronome

var metronome = new Metronome();
var tempo = document.getElementById("tempo");
tempo.textContent = metronome.tempo;

var playPauseIcon = document.getElementById("play-pause-icon");

var playButton = document.getElementById("play-button");
playButton.addEventListener("click", function () {
  metronome.startStop();

  if (metronome.isRunning) {
    playPauseIcon.className = "pause";
  } else {
    playPauseIcon.className = "play";
  }
});

var tempoChangeButton = document.getElementById("metronome-value");

tempoChangeButton.addEventListener("input", () => {
  metronome.tempo = tempoChangeButton.value;
  tempo.innerHTML = tempoChangeButton.value;
});
