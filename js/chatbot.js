import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

/* ================= CONFIG ================= */

const API_KEY = "PUT_YOUR_API_KEY_HERE"; // ⚠️ للتجارب فقط
const genAI = new GoogleGenerativeAI(API_KEY);

let chatHistory = [];
let isTyping = false;

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    setupUI();
    setupEvents();
});

/* ================= UI ================= */

function setupUI() {
    const input = document.getElementById("messageInput");
    const count = document.getElementById("charCount");
    const sendBtn = document.getElementById("sendButton");

    input.addEventListener("input", () => {
        count.textContent = `${input.value.length}/1000`;
        sendBtn.disabled = !input.value.trim() || isTyping;
        input.style.height = "auto";
        input.style.height = Math.min(input.scrollHeight, 120) + "px";
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!sendBtn.disabled) sendMessage();
        }
    });
}

function setupEvents() {
    document.getElementById("sendButton").onclick = sendMessage;
}

/* ================= CHAT ================= */

async function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text || isTyping) return;

    addMessage(text, "user");
    input.value = "";
    showTyping();

    try {
        const reply = await askGemini(text);
        hideTyping();
        addMessage(reply, "bot");
    } catch {
        hideTyping();
        addMessage("حدث خطأ، حاول مرة أخرى.", "bot");
    }
}

function addMessage(text, role) {
    const box = document.getElementById("chatMessages");
    const div = document.createElement("div");
    div.className = `message ${role}-message`;

    div.innerHTML = `
        <div class="message-avatar">${role === "bot" ? "🤖" : "👤"}</div>
        <div class="message-content"><p>${text}</p></div>
        <div class="message-time">الآن</div>
    `;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;

    chatHistory.push({
        role: role === "user" ? "user" : "model",
        parts: [{ text }]
    });
}

/* ================= GEMINI ================= */

async function askGemini(message) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `
أنت مرشد نفسي داعم لضحايا التحرش الإلكتروني.
كن متفهمًا، داعمًا، غير حاكم، ولا تقدم استشارات طبية أو قانونية.
`
    });

    const chat = model.startChat({
        history: chatHistory.slice(0, -1),
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500
        }
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
}

/* ================= HELPERS ================= */

function showTyping() {
    isTyping = true;
    document.getElementById("typingIndicator").style.display = "inline";
}

function hideTyping() {
    isTyping = false;
    document.getElementById("typingIndicator").style.display = "none";
}

/* ================= QUICK BUTTON ================= */

window.sendQuickMessage = msg => {
    const input = document.getElementById("messageInput");
    input.value = msg;
    input.dispatchEvent(new Event("input"));
    sendMessage();
};
