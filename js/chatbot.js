// متغيرات عامة
let chatHistory = [];
let isTyping = false;

// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
    setupEventListeners();
    loadChatHistory();
});

// تهيئة الشات بوت
function initializeChatbot() {
    const messagesContainer = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const charCount = document.getElementById('charCount');

    // تحديث عداد الأحرف
    messageInput.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length}/1000`;
        
        // تفعيل/تعطيل زر الإرسال
        sendButton.disabled = length === 0 || isTyping;
        
        // تغيير حجم النص تلقائياً
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // إرسال الرسالة عند الضغط على Enter
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendButton.disabled) {
                sendMessage();
            }
        }
    });

    // تركيز على حقل الإدخال
    messageInput.focus();
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    const sendButton = document.getElementById('sendButton');
    const clearChat = document.getElementById('clearChat');
    const saveChat = document.getElementById('saveChat');
    const confirmModal = document.getElementById('confirmModal');
    const confirmClear = document.getElementById('confirmClear');
    const cancelClear = document.getElementById('cancelClear');

    sendButton.addEventListener('click', sendMessage);
    clearChat.addEventListener('click', showClearConfirmation);
    saveChat.addEventListener('click', saveChatHistory);
    confirmClear.addEventListener('click', clearChatHistory);
    cancelClear.addEventListener('click', hideClearConfirmation);

    // إغلاق النافذة المنبثقة عند الضغط خارجها
    confirmModal.addEventListener('click', function(e) {
        if (e.target === confirmModal) {
            hideClearConfirmation();
        }
    });
}

// إرسال رسالة
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message || isTyping) return;

    // إضافة رسالة المستخدم
    addMessage(message, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';
    document.getElementById('charCount').textContent = '0/1000';
    document.getElementById('sendButton').disabled = true;

    // إظهار مؤشر الكتابة
    showTypingIndicator();

    try {
        // MODIFIED: إرسال الرسالة إلى a new function that calls the Gemini API
        const response = await sendToAIModel(message);
        
        // إخفاء مؤشر الكتابة
        hideTypingIndicator();
        
        // إضافة رد البوت
        addMessage(response, 'bot');
        
    } catch (error) {
        console.error('خطأ في إرسال الرسالة:', error);
        hideTypingIndicator();
        addMessage('عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.', 'bot');
    }
}

// إرسال رسالة سريعة
function sendQuickMessage(message) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    messageInput.dispatchEvent(new Event('input'));
    sendMessage();
}

// إضافة رسالة إلى المحادثة
function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const currentTime = new Date().toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const avatar = sender === 'bot' ? '🤖' : '👤';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${content}</p>
        </div>
        <div class="message-time">${currentTime}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // حفظ في التاريخ
    chatHistory.push({
        content: content,
        sender: sender,
        timestamp: new Date().toISOString()
    });

    // حفظ في التخزين المحلي
    saveChatToStorage();
}

// NEW: Replaced the 'sendToChatGPT' function with this new function for Gemini
async function sendToAIModel(message) {
    const systemPrompt = `أنت مرشد نفسي افتراضي متخصص في مساعدة ضحايا التحرش الإلكتروني. 
    مهمتك هي:
    1. تقديم الدعم النفسي والعاطفي
    2. تقديم نصائح عملية للحماية من التحرش الإلكتروني
    3. توجيه المستخدمين للمساعدة المتخصصة عند الحاجة
    4. الحفاظ على بيئة آمنة وداعمة
    5. عدم تقديم نصائح طبية أو قانونية متخصصة
    
    تحدث بطريقة دافئة ومتفهمة وداعمة. استخدم اللغة العربية بشكل طبيعي ومريح.`;
    
    const API_KEY = "AIzaSyC4VQ_UxOQj4QBnhDCv1PRsHWTgHUVFZZY"; // 🔑 From your newcode.js
    const MODEL = "gemini-1.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    // Convert chat history to Gemini's format
    const contents = chatHistory.slice(-10).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model', // Note: 'assistant' role is 'model' for Gemini
        parts: [{ text: msg.content }]
    }));
    // Add the current user message
    contents.push({
        role: 'user',
        parts: [{ text: message }]
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Parse Gemini's response structure safely
        const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!botReply) {
            throw new Error('Could not find a valid reply in the API response.');
        }

        return botReply;

    } catch (error) {
        console.error('خطأ في API:', error);
        return getDefaultResponse(message); // Fallback to default response on failure
    }
}


// ردود افتراضية في حالة فشل API
function getDefaultResponse(message) {
    const responses = {
        'تحرش': 'أتفهم ما تمر به، وأريد أن أؤكد لك أنك لست وحدك. التحرش الإلكتروني أمر خطير ولا يجب تجاهله. من المهم أن تحتفظ بالأدلة وتبلغ السلطات المختصة. هل تريد أن نتحدث عن خطوات عملية يمكنك اتخاذها؟',
        'خوف': 'مشاعر الخوف والقلق طبيعية جداً في مثل هذه المواقف. أنت تتعامل مع موقف صعب، ومن الطبيعي أن تشعر بهذه الطريقة. المهم هو أن تعرف أن هناك طرق للحماية والمساعدة متاحة. هل تريد أن نتحدث عن كيفية التعامل مع هذه المشاعر؟',
        'مساعدة': 'أنا هنا لمساعدتك. يمكنني تقديم الدعم النفسي والنصائح العملية. إذا كنت في خطر فوري، أنصحك بالاتصال بأرقام الطوارئ. وإذا كنت تحتاج لمساعدة متخصصة، يمكنني توجيهك للمراكز المناسبة. ما الذي تحتاج للحديث عنه؟'
    };

    // البحث عن كلمات مفتاحية
    for (const [keyword, response] of Object.entries(responses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }

    // رد عام
    return 'شكراً لك على مشاركة هذا معي. أنا هنا للاستماع ومساعدتك. يمكنك التحدث معي بحرية تامة عن أي شيء يقلقك. كيف يمكنني دعمك بشكل أفضل؟';
}

// إظهار مؤشر الكتابة
function showTypingIndicator() {
    isTyping = true;
    const typingIndicator = document.getElementById('typingIndicator');
    const sendButton = document.getElementById('sendButton');
    
    typingIndicator.style.display = 'block';
    sendButton.disabled = true;
}

// إخفاء مؤشر الكتابة
function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    
    typingIndicator.style.display = 'none';
    sendButton.disabled = messageInput.value.trim() === '';
}

// إظهار تأكيد مسح المحادثة
function showClearConfirmation() {
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'flex';
}

// إخفاء تأكيد مسح المحادثة
function hideClearConfirmation() {
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'none';
}

// مسح المحادثة
function clearChatHistory() {
    const messagesContainer = document.getElementById('chatMessages');
    
    // الاحتفاظ بالرسالة الترحيبية فقط
    const welcomeMessage = messagesContainer.querySelector('.bot-message');
    messagesContainer.innerHTML = '';
    if (welcomeMessage) {
        messagesContainer.appendChild(welcomeMessage);
    }
    
    // مسح التاريخ
    chatHistory = [];
    localStorage.removeItem('chatHistory');
    
    hideClearConfirmation();
    showNotification('تم مسح المحادثة بنجاح', 'success');
}

// حفظ المحادثة
function saveChatHistory() {
    if (chatHistory.length === 0) {
        showNotification('لا توجد رسائل لحفظها', 'warning');
        return;
    }

    const chatText = chatHistory.map(msg => {
        const sender = msg.sender === 'user' ? 'أنت' : 'المرشد';
        const time = new Date(msg.timestamp).toLocaleString('ar-SA');
        return `[${time}] ${sender}: ${msg.content}`;
    }).join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `محادثة-المرشد-النفسي-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('تم حفظ المحادثة بنجاح', 'success');
}

// حفظ المحادثة في التخزين المحلي
function saveChatToStorage() {
    try {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } catch (error) {
        console.error('خطأ في حفظ المحادثة:', error);
    }
}

// تحميل المحادثة من التخزين المحلي
function loadChatHistory() {
    try {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            chatHistory = JSON.parse(saved);
            // You can uncomment the line below if you want to show the old chat on page load
            // rebuildChatFromHistory();
        }
    } catch (error) {
        console.error('خطأ في تحميل المحادثة:', error);
        chatHistory = [];
    }
}

// إعادة بناء المحادثة من التاريخ
function rebuildChatFromHistory() {
    const messagesContainer = document.getElementById('chatMessages');
    
    chatHistory.forEach(msg => {
        if (msg.sender !== 'bot' || msg.content !== 'مرحباً بك!') {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender}-message`;
            
            const time = new Date(msg.timestamp).toLocaleTimeString('ar-SA', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const avatar = msg.sender === 'bot' ? '🤖' : '👤';
            
            messageDiv.innerHTML = `
                <div class="message-avatar">${avatar}</div>
                <div class="message-content">
                    <p>${msg.content}</p>
                </div>
                <div class="message-time">${time}</div>
            `;

            messagesContainer.appendChild(messageDiv);
        }
    });
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// دالة عرض الإشعارات
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        'success': '#27ae60',
        'error': '#e74c3c',
        'warning': '#f39c12',
        'info': '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        font-family: 'Cairo', sans-serif;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// التعامل مع الأخطاء العامة
window.addEventListener('error', function(e) {
    console.error('خطأ في التطبيق:', e.error);
    showNotification('حدث خطأ غير متوقع', 'error');
});

// التعامل مع الأخطاء غير المعالجة في الوعود
window.addEventListener('unhandledrejection', function(e) {
    console.error('خطأ في الوعد:', e.reason);
    showNotification('حدث خطأ في الاتصال', 'error');
});
