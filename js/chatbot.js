/* ================= IMPORT ================= */

// ❗ هذه الصيغة الجديدة الرسمية
import { GoogleGenAI } from "https://esm.run/@google/genai";

/* ================= CONFIG ================= */

// 🔴 ضع API KEY هنا
const ai = new GoogleGenAI({
    apiKey: "AIzaSyC4VQ_UxOQj4QBnhDCv1PRsHWTgHUVFZZY"
});

// الموديل
const MODEL_NAME = "gemini-3-pro-preview";

let isTyping = false;

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    setupUI();
});

/* ================= UI ================= */

function setupUI() {
    const input = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendButton");
    const counter = document.getElementById("charCount");

    input.addEventListener("input", () => {
        counter.textContent = `${input.value.length}/1000`;
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

    sendBtn.addEventListener("click", sendMessage);
}

/* ================= CHAT ================= */

async function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    if (!message || isTyping) return;

    addMessage(message, "user");
    input.value = "";
    document.getElementById("charCount").textContent = "0/1000";

    showTyping();

    try {
        const reply = await sendToGemini(message);
        hideTyping();
        addMessage(reply, "bot");
    } catch (err) {
        hideTyping();
        console.error(err);
        addMessage(
            "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.",
            "bot"
        );
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
}

/* ================= GEMINI (NEW SDK) ================= */

async function sendToGemini(userMessage) {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: [
            {
                role: "user",
                parts: [{ text: userMessage }]
            }
        ]
    });

    return response.text || "لم يتم استلام رد من النموذج.";
}

/* ================= TYPING ================= */

function showTyping() {
    isTyping = true;
    document.getElementById("typingIndicator").style.display = "inline";
    document.getElementById("sendButton").disabled = true;
}

function hideTyping() {
    isTyping = false;
    document.getElementById("typingIndicator").style.display = "none";
    document.getElementById("sendButton").disabled = false;
}

/* ================= QUICK BUTTONS ================= */

window.sendQuickMessage = function (msg) {
    const input = document.getElementById("messageInput");
    input.value = msg;
    input.dispatchEvent(new Event("input"));
    sendMessage();
};
