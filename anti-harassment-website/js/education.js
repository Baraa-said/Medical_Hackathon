// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeEducationPage();
    setupSmoothScrolling();
    setupLazyLoading();
    setupReadingProgress();
    setupInteractiveElements();
});

// تهيئة صفحة التثقيف
function initializeEducationPage() {
    // إضافة تأثيرات التحميل المتدرجة
    const cards = document.querySelectorAll('.article-card, .infographic-card, .video-card, .tip-card, .resource-card');
    
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

    // إضافة عداد للمقالات والموارد
    updateContentCounters();
}

// إعداد التمرير السلس
function setupSmoothScrolling() {
    const tocLinks = document.querySelectorAll('.toc-item');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // إضافة تأثير بصري للرابط المضغوط
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // التمرير السلس إلى القسم المطلوب
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // تمييز القسم المستهدف مؤقتاً
                highlightSection(targetElement);
            }
        });
    });
}

// تمييز القسم المستهدف
function highlightSection(element) {
    element.style.background = 'rgba(52, 152, 219, 0.1)';
    element.style.borderRadius = '10px';
    element.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        element.style.background = '';
        element.style.borderRadius = '';
    }, 2000);
}

// إعداد التحميل الكسول للصور
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// إعداد مؤشر تقدم القراءة
function setupReadingProgress() {
    // إنشاء شريط التقدم
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    
    // إضافة الأنماط
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    const progressFill = progressBar.querySelector('.reading-progress-fill');
    progressFill.style.cssText = `
        height: 100%;
        background: linear-gradient(45deg, #3498db, #27ae60);
        width: 0%;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // تحديث التقدم عند التمرير
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// إعداد العناصر التفاعلية
function setupInteractiveElements() {
    // تأثيرات الهوفر للبطاقات
    const cards = document.querySelectorAll('.article-card, .infographic-card, .video-card, .tip-card, .resource-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثيرات للروابط الخارجية
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // إضافة تأكيد للروابط الخارجية
            if (!confirm('ستتم إعادة توجيهك إلى موقع خارجي. هل تريد المتابعة؟')) {
                e.preventDefault();
            }
        });
    });
    
    // إضافة وظيفة البحث في المحتوى
    addSearchFunctionality();
    
    // إضافة وظيفة طباعة المقالات
    addPrintFunctionality();
}

// إضافة وظيفة البحث
function addSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="contentSearch" placeholder="ابحث في المحتوى..." />
            <button id="searchBtn">🔍</button>
            <button id="clearSearch" style="display: none;">✖️</button>
        </div>
        <div id="searchResults" class="search-results" style="display: none;"></div>
    `;
    
    // إضافة الأنماط
    searchContainer.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 999;
        background: rgba(255, 255, 255, 0.95);
        padding: 1rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(searchContainer);
    
    // إضافة زر لإظهار/إخفاء البحث
    const searchToggle = document.createElement('button');
    searchToggle.innerHTML = '🔍';
    searchToggle.className = 'search-toggle';
    searchToggle.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
        background: #3498db;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(searchToggle);
    
    let searchVisible = false;
    
    searchToggle.addEventListener('click', function() {
        searchVisible = !searchVisible;
        if (searchVisible) {
            searchContainer.style.transform = 'translateX(-70px)';
            searchToggle.style.transform = 'translateX(-320px)';
            document.getElementById('contentSearch').focus();
        } else {
            searchContainer.style.transform = 'translateX(100%)';
            searchToggle.style.transform = 'translateX(0)';
        }
    });
    
    // وظيفة البحث
    const searchInput = document.getElementById('contentSearch');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearSearch');
    const resultsDiv = document.getElementById('searchResults');
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length < 2) {
            resultsDiv.style.display = 'none';
            clearBtn.style.display = 'none';
            return;
        }
        
        const results = [];
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach((article, index) => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('.article-content').textContent.toLowerCase();
            
            if (title.includes(query) || content.includes(query)) {
                results.push({
                    title: article.querySelector('h3').textContent,
                    element: article,
                    index: index
                });
            }
        });
        
        displaySearchResults(results, query);
        clearBtn.style.display = 'block';
    }
    
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p style="color: #7f8c8d; font-size: 0.9rem;">لا توجد نتائج</p>';
        } else {
            resultsDiv.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="scrollToElement(this)" data-element="${result.index}">
                    <strong>${highlightText(result.title, query)}</strong>
                </div>
            `).join('');
        }
        resultsDiv.style.display = 'block';
    }
    
    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: #f39c12; color: white; padding: 0.1rem 0.3rem; border-radius: 3px;">$1</mark>');
    }
    
    // إضافة الوظيفة العامة للتمرير
    window.scrollToElement = function(element) {
        const index = element.getAttribute('data-element');
        const targetElement = document.querySelectorAll('.article-card')[index];
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightSection(targetElement);
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        resultsDiv.style.display = 'none';
        this.style.display = 'none';
    });
}

// إضافة وظيفة الطباعة
function addPrintFunctionality() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️';
    printBtn.className = 'print-btn';
    printBtn.title = 'طباعة الصفحة';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 1000;
        background: #27ae60;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
        transition: all 0.3s ease;
    `;
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(printBtn);
}

// تحديث عدادات المحتوى
function updateContentCounters() {
    const articlesCount = document.querySelectorAll('.article-card').length;
    const infographicsCount = document.querySelectorAll('.infographic-card').length;
    const videosCount = document.querySelectorAll('.video-card').length;
    const tipsCount = document.querySelectorAll('.tip-card').length;
    
    // إضافة العدادات إلى قائمة المحتويات
    const tocItems = document.querySelectorAll('.toc-item');
    if (tocItems.length >= 4) {
        tocItems[0].querySelector('.toc-text').textContent += ` (${articlesCount})`;
        tocItems[1].querySelector('.toc-text').textContent += ` (${infographicsCount})`;
        tocItems[2].querySelector('.toc-text').textContent += ` (${videosCount})`;
        tocItems[3].querySelector('.toc-text').textContent += ` (${tipsCount})`;
    }
}

// إضافة وظيفة مشاركة المحتوى
function addSocialSharing() {
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = '📤';
    shareBtn.className = 'share-btn';
    shareBtn.title = 'مشاركة الصفحة';
    shareBtn.style.cssText = `
        position: fixed;
        bottom: 140px;
        right: 20px;
        z-index: 1000;
        background: #f39c12;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
        transition: all 0.3s ease;
    `;
    
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'ثقف نفسك - مكافحة التحرش الإلكتروني',
                text: 'تعلم كيفية الحماية من التحرش الإلكتروني والبقاء آمناً على الإنترنت',
                url: window.location.href
            });
        } else {
            // نسخ الرابط إلى الحافظة
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('تم نسخ رابط الصفحة', 'success');
            });
        }
    });
    
    document.body.appendChild(shareBtn);
}

// إضافة زر العودة إلى الأعلى
function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '⬆️';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.title = 'العودة إلى الأعلى';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: #95a5a6;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(149, 165, 166, 0.4);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(100px);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // إظهار/إخفاء الزر حسب موضع التمرير
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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

// تهيئة الوظائف الإضافية
setTimeout(() => {
    addSocialSharing();
    addBackToTopButton();
}, 1000);

// إضافة أنماط الطباعة
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .search-container,
        .search-toggle,
        .print-btn,
        .share-btn,
        .back-to-top,
        .reading-progress {
            display: none !important;
        }
        
        .article-card,
        .infographic-card,
        .video-card,
        .tip-card,
        .resource-card {
            break-inside: avoid;
            margin-bottom: 1rem;
        }
        
        body {
            background: white !important;
        }
        
        .video-thumbnail iframe {
            display: none;
        }
        
        .video-thumbnail::after {
            content: "فيديو تعليمي - يرجى زيارة الموقع لمشاهدته";
            display: block;
            padding: 2rem;
            text-align: center;
            background: #f8f9fa;
            color: #7f8c8d;
        }
    }
`;
document.head.appendChild(printStyles);

// التعامل مع الأخطاء
window.addEventListener('error', function(e) {
    console.error('خطأ في صفحة التثقيف:', e.error);
    showNotification('حدث خطأ غير متوقع', 'error');
});

