# 🎙️ AI Voice Assistant

An interactive AI-powered Voice Assistant built using **HTML, CSS, JavaScript, n8n, and OpenAI API**.  
This project allows users to communicate naturally with an AI assistant using real-time **Speech-to-Text** and **Text-to-Speech** capabilities.

---

## 🚀 Features

- 🎤 Real-time Voice Input
- 🤖 AI-generated Responses using OpenAI
- 🔊 Text-to-Speech Output
- 💬 Conversational Interaction
- 📜 Chat History Sidebar
- ⏹️ Stop Speaking Feature
- 🌙 Modern Dark Green UI
- ⚡ n8n Workflow Integration
- 📱 Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend / Automation
- n8n Workflow Automation

### AI & APIs
- OpenAI Chat Model API
- Web Speech API
- SpeechSynthesis API

---

## 📂 Project Structure

```bash
AI-VOICE-ASSISTANT/
│
├── index.html
├── style.css
├── script.js
├── frontend.png
├── n8nworkflow.png
└── .gitignore

⚙️ How It Works
User clicks the microphone button.
Browser converts speech into text.
Text is sent to the n8n webhook.
OpenAI generates a response.
Response appears inside the chat UI.
AI speaks the response using Text-to-Speech.
🔄 Workflow Architecture
User Voice
   ↓
Speech Recognition
   ↓
Frontend (JavaScript)
   ↓
n8n Webhook
   ↓
OpenAI Chat Model
   ↓
AI Response
   ↓
Frontend UI + Voice Output
🧠 Key Concepts Used
Speech-to-Text (STT)
Text-to-Speech (TTS)
Prompt-based AI Interaction
API Communication
Webhooks
Conversational AI
Voice Interface Design
📸 Screenshots
Frontend UI

n8n Workflow

▶️ Run Locally

Clone the repository:

git clone https://github.com/AadyaMishra2805/Voice-assistant.git

Open project folder:

cd Voice-assistant

Run the project using Live Server in VS Code.

📌 Future Improvements
Multi-language Support
Voice Customization
AI Memory Support
Wake Word Detection
Mobile App Version
👩‍💻 Author

Aadya Mishra
