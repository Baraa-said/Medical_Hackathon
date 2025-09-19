// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثيرات التحميل
    const cards = document.querySelectorAll('.number-card, .help-card, .tip-card, .center-card');
    
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

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // إضافة تأثيرات الهوفر للأزرار
    const buttons = document.querySelectorAll('.call-btn, .help-btn, .location-btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// دالة إجراء المكالمة
function makeCall(phoneNumber) {
    // إضافة تأثير بصري
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);

    // محاولة إجراء المكالمة
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        // للأجهزة المحمولة
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = `tel:${phoneNumber}`;
        } else {
            // للحاسوب - عرض الرقم للنسخ
            copyToClipboard(phoneNumber);
            showNotification(`تم نسخ الرقم ${phoneNumber} إلى الحافظة`, 'success');
        }
    }
}

// دالة فتح الخريطة
function openMap(locationName) {
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);

    // فتح خرائط جوجل
    const encodedLocation = encodeURIComponent(locationName);
    const googleMapsUrl = `https://www.google.com/maps/search/${encodedLocation}`;
    
    if (confirm(`هل تريد فتح الموقع في خرائط جوجل؟`)) {
        window.open(googleMapsUrl, '_blank');
    }
}

// دالة العودة للصفحة الرئيسية
function goBack() {
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        window.location.href = 'index.html';
    }, 150);
}

// دالة نسخ النص إلى الحافظة
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // استخدام Clipboard API الحديث
        navigator.clipboard.writeText(text).then(() => {
            console.log('تم نسخ النص بنجاح');
        }).catch(err => {
            console.error('فشل في نسخ النص: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // استخدام الطريقة التقليدية
        fallbackCopyTextToClipboard(text);
    }
}

// دالة النسخ التقليدية
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // تجنب التمرير إلى الأسفل
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('تم نسخ النص بنجاح');
        } else {
            console.error('فشل في نسخ النص');
        }
    } catch (err) {
        console.error('فشل في نسخ النص: ', err);
    }

    document.body.removeChild(textArea);
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
        z-index: 1000;
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

// دالة للتحقق من الموقع الجغرافي (اختيارية)
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // يمكن استخدام هذه المعلومات لإيجاد أقرب مراكز المساعدة
                console.log(`الموقع الحالي: ${lat}, ${lng}`);
                
                // هنا يمكن إضافة منطق لإيجاد أقرب مراكز المساعدة
                findNearestHelpCenters(lat, lng);
            },
            function(error) {
                console.error('خطأ في الحصول على الموقع:', error);
                showNotification('لا يمكن الحصول على موقعك الحالي', 'warning');
            }
        );
    } else {
        showNotification('المتصفح لا يدعم خدمات الموقع', 'warning');
    }
}

// دالة إيجاد أقرب مراكز المساعدة (مثال)
function findNearestHelpCenters(lat, lng) {
    // هذه دالة مثال - في التطبيق الحقيقي ستحتاج إلى API خاص
    // لقاعدة بيانات مراكز المساعدة
    
    const helpCenters = [
        {
            name: 'مركز الدعم النفسي',
            lat: 24.7136,
            lng: 46.6753,
            phone: '011-234-5678'
        },
        {
            name: 'مركز المساعدة القانونية',
            lat: 24.7000,
            lng: 46.6800,
            phone: '011-345-6789'
        }
        // يمكن إضافة المزيد من المراكز
    ];
    
    // حساب المسافة وترتيب المراكز حسب القرب
    const centersWithDistance = helpCenters.map(center => {
        const distance = calculateDistance(lat, lng, center.lat, center.lng);
        return { ...center, distance };
    });
    
    centersWithDistance.sort((a, b) => a.distance - b.distance);
    
    console.log('أقرب مراكز المساعدة:', centersWithDistance);
}

// دالة حساب المسافة بين نقطتين
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

// إضافة مستمع للضغط على مفتاح الهروب للعودة
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        goBack();
    }
});

// تحديث الوقت كل ثانية (لإظهار أن الخدمة متاحة 24/7)
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // يمكن إضافة عنصر لعرض الوقت الحالي
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// تحديث الوقت كل ثانية
setInterval(updateTime, 1000);

