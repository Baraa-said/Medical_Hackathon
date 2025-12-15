/* ================= CONFIG ================= */

// 🔴 ضع API KEY هنا
const GEMINI_API_KEY = "AIzaSyC4VQ_UxOQj4QBnhDCv1PRsHWTgHUVFZZY";

// اختر الموديل
const GEMINI_MODEL = "gemini-1.5-flash";

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
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!sendBtn.disabled) sendMessage();
        }
    });

    sendBtn.onclick = sendMessage;
}

/* ================= CHAT ================= */

async function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    if (!message || isTyping) return;

    addMessage(message, "user");
    input.value = "";
    showTyping();

    try {
        const reply = await sendGeminiRequest(message);
        hideTyping();
        addMessage(reply, "bot");
    } catch (err) {
        hideTyping();
        addMessage("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.", "bot");
        console.error(err);
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

/* ================= GEMINI REQUEST ================= */

async function sendGeminiRequest(userMessage) {
    // 🔴 هذا هو الريكويست اللي طلبته
    const url =
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
        contents: [
            {
                role: "user",
                parts: [{ text: userMessage }]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500
        }
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    // 🔴 معالجة الأخطاء
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini Error ${response.status}: ${errText}`);
    }

    const data = await response.json();

    // استخراج الرد
    return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "لم يتم استلام رد من النموذج."
    );
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

/* ================= QUICK BUTTON ================= */

window.sendQuickMessage = function (msg) {
    const input = document.getElementById("messageInput");
    input.value = msg;
    input.dispatchEvent(new Event("input"));
    sendMessage();
};
