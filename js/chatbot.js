/* ================= GLOBAL STATE ================= */

let chatHistory = [];
let isTyping = false;

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    setupUI();
    setupEvents();
});

/* ================= UI SETUP ================= */

function setupUI() {
    const input = document.getElementById("messageInput");
    const counter = document.getElementById("charCount");
    const sendBtn = document.getElementById("sendButton");

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
}

function setupEvents() {
    document.getElementById("sendButton").addEventListener("click", sendMessage);
}

/* ================= CHAT CORE ================= */

function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (!message || isTyping) return;

    addMessage(message, "user");
    input.value = "";
    document.getElementById("charCount").textContent = "0/1000";

    showTyping();

    setTimeout(() => {
        const reply = getSmartResponse(message);
        hideTyping();
        addMessage(reply, "bot");
    }, 800);
}

function addMessage(text, role) {
    const container = document.getElementById("chatMessages");
    const msgDiv = document.createElement("div");

    msgDiv.className = `message ${role}-message`;

    msgDiv.innerHTML = `
        <div class="message-avatar">${role === "bot" ? "🤖" : "👤"}</div>
        <div class="message-content">
            <p>${text}</p>
        </div>
        <div class="message-time">الآن</div>
    `;

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;

    chatHistory.push({ role, text });
}

/* ================= SMART RESPONSES ================= */

function getSmartResponse(message) {
    const msg = message.toLowerCase();

    if (msg.includes("تحرش") || msg.includes("ابتزاز")) {
        return `أنا آسف جدًا إنك تمر بهيك تجربة 💙  
حابب أأكد لك إن اللي بصير معك **مش غلطك أبدًا**.

نصائح مهمة:
• لا ترد على المتحرش  
• احتفظ بالأدلة (Screenshots)  
• اعمل حظر وإبلاغ فورًا  

إذا بتحب، نقدر نحكي عن خطوات عملية تناسب وضعك.`;
    }

    if (msg.includes("خوف") || msg.includes("قلق")) {
        return `مشاعرك مفهومة وطبيعية جدًا 🌿  
التجربة اللي مريت فيها صعبة، والخوف رد فعل إنساني.

خلينا نهدأ شوي:
• خذ نفس عميق  
• ذكر نفسك إنك بأمان الآن  

تحب أحكي لك تمرين بسيط يخفف القلق؟`;
    }

    if (msg.includes("كيف") || msg.includes("أحمي")) {
        return `لحماية نفسك من التحرش الإلكتروني:
1️⃣ خلي حساباتك خاصة  
2️⃣ لا تشارك معلومات شخصية  
3️⃣ استخدم الحظر فورًا  
4️⃣ اطلب مساعدة شخص موثوق  

إذا بتحب، احكي لي على أي منصة بصير معك الموضوع.`;
    }

    if (msg.includes("مساعدة") || msg.includes("طوارئ")) {
        return `إذا بتحس بخطر حقيقي أو تهديد مباشر 🚨  
من المهم تتواصل فورًا مع:
• شخص بالغ تثق به  
• جهة مختصة في بلدك  

طلب المساعدة قوة، مش ضعف 🤍`;
    }

    return `شكرًا إنك شاركتني 🤍  
أنا موجود أسمعك بدون أي حكم.

احكي لي أكثر:
شو أكتر إشي مضايقك هالفترة؟`;
}

/* ================= TYPING INDICATOR ================= */

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

window.sendQuickMessage = function(message) {
    const input = document.getElementById("messageInput");
    input.value = message;
    input.dispatchEvent(new Event("input"));
    sendMessage();
};
