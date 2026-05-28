const micBtn = document.getElementById("micBtn");

const stopBtn = document.getElementById("stopBtn");

const clearBtn = document.getElementById("clearBtn");

const statusText = document.getElementById("status");

const chatBox = document.getElementById("chatBox");

const historyList = document.getElementById("historyList");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";

recognition.continuous = false;

recognition.interimResults = false;

let isListening = false;

/* LOAD HISTORY */

loadHistory();

/* MIC CLICK */

micBtn.addEventListener("click", () => {

  if(isListening) return;

  recognition.start();

  isListening = true;

  micBtn.classList.add("listening");

  statusText.innerText = "Listening...";
});

/* STOP SPEAKING */

stopBtn.addEventListener("click", () => {

  window.speechSynthesis.cancel();

  recognition.stop();

  micBtn.classList.remove("listening");

  statusText.innerText = "Speech stopped";

  stopBtn.style.display = "none";

  isListening = false;
});

/* CLEAR HISTORY */

clearBtn.addEventListener("click", () => {

  localStorage.removeItem("voiceHistory");

  historyList.innerHTML = "";
});

/* SPEECH RESULT */

recognition.onresult = async (event) => {

  const transcript = event.results[0][0].transcript;

  addMessage(transcript, "user");

  saveHistory(transcript);

  statusText.innerText = "Processing...";

  micBtn.classList.remove("listening");

  try {

    const response = await fetch(
      "https://aadya22.app.n8n.cloud/webhook/voice-assistant",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: transcript
        })
      }
    );

    const data = await response.json();

    addMessage(data.reply, "bot");

    speak(data.reply);

    statusText.innerText = "AI Speaking...";

  } catch (error) {

    console.error(error);

    statusText.innerText = "Error";
  }

  isListening = false;
};

recognition.onerror = () => {

  micBtn.classList.remove("listening");

  statusText.innerText = "Mic error";

  isListening = false;
};

/* ADD MESSAGE */

function addMessage(text, sender) {

  const row = document.createElement("div");

  row.classList.add("message-row");

  if(sender === "user"){

    row.classList.add("user-row");

    row.innerHTML = `
      <div class="message user">
        ${text}
      </div>
    `;

  } else {

    row.classList.add("bot-row");

    row.innerHTML = `
      <div class="bot-wrapper">

        <div class="avatar">🤖</div>

        <div class="message bot">
          ${text}
        </div>

      </div>
    `;
  }

  chatBox.appendChild(row);

  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior:"smooth"
  });
}

/* SPEAK */

function speak(text) {

  window.speechSynthesis.cancel();

  stopBtn.style.display = "inline-flex";

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";

  speech.rate = 1;

  speech.pitch = 1;

  speech.volume = 1;

  speech.onend = () => {

    statusText.innerText = "Click microphone to speak";

    stopBtn.style.display = "none";
  };

  window.speechSynthesis.speak(speech);
}

/* SAVE HISTORY */

function saveHistory(question){

  let history =
    JSON.parse(localStorage.getItem("voiceHistory")) || [];

  history.unshift(question);

  localStorage.setItem(
    "voiceHistory",
    JSON.stringify(history)
  );

  loadHistory();
}

/* LOAD HISTORY */

function loadHistory(){

  let history =
    JSON.parse(localStorage.getItem("voiceHistory")) || [];

  historyList.innerHTML = "";

  history.forEach(item => {

    const div = document.createElement("div");

    div.classList.add("history-item");

    div.innerText = item;

    historyList.appendChild(div);
  });
}