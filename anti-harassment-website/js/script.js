// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على الأزرار
    const sosBtn = document.getElementById('sosBtn');
    const chatbotBtn = document.getElementById('chatbotBtn');
    const quizBtn = document.getElementById('quizBtn');
    const educationBtn = document.getElementById('educationBtn');

    // إضافة مستمعي الأحداث للأزرار
    if (sosBtn) {
        sosBtn.addEventListener('click', function() {
            // إضافة تأثير بصري عند الضغط
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // التوجه إلى صفحة الطوارئ
                window.location.href = 'emergency.html';
            }, 150);
        });
    }

    if (chatbotBtn) {
        chatbotBtn.addEventListener('click', function() {
            // إضافة تأثير بصري عند الضغط
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // التوجه إلى صفحة المرشد النفسي
                window.location.href = 'chatbot.html';
            }, 150);
        });
    }

    if (quizBtn) {
        quizBtn.addEventListener('click', function() {
            // إضافة تأثير بصري عند الضغط
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // التوجه إلى صفحة الاختبار
                window.location.href = 'quiz.html';
            }, 150);
        });
    }

    if (educationBtn) {
        educationBtn.addEventListener('click', function() {
            // إضافة تأثير بصري عند الضغط
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // التوجه إلى صفحة التثقيف
                window.location.href = 'education.html';
            }, 150);
        });
    }

    // إضافة تأثيرات تفاعلية إضافية
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        // تأثير الهوفر
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // تأثير الضغط
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // إضافة تأثير التمرير السلس
    const cards = document.querySelectorAll('.button-card, .main-question, .support-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // تأثير الكتابة المتحركة للسؤال الرئيسي
    const questionText = document.querySelector('.question-text');
    if (questionText) {
        const text = questionText.textContent;
        questionText.textContent = '';
        questionText.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                questionText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});

// دالة للتحقق من حالة الاتصال
function checkConnection() {
    if (!navigator.onLine) {
        showNotification('لا يوجد اتصال بالإنترنت. بعض الميزات قد لا تعمل بشكل صحيح.', 'warning');
    }
}

// دالة لعرض الإشعارات
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-family: 'Cairo', sans-serif;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
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
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// التحقق من الاتصال عند تحميل الصفحة
window.addEventListener('load', checkConnection);
window.addEventListener('online', () => showNotification('تم استعادة الاتصال بالإنترنت', 'info'));
window.addEventListener('offline', () => showNotification('انقطع الاتصال بالإنترنت', 'warning'));

