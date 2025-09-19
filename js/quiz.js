// بيانات الأسئلة
const quizQuestions = [
    {
        id: 1,
        question: "هل يُعتبر إرسال رسائل مسيئة عبر وسائل التواصل الاجتماعي نوعاً من التحرش الإلكتروني؟",
        correctAnswer: "نعم",
        explanation: "إرسال الرسائل المسيئة أو التهديدية عبر الإنترنت يُعتبر تحرشاً إلكترونياً ويمكن أن يكون له عواقب قانونية."
    },
    {
        id: 2,
        question: "هل يجب عليك الرد على المتحرش لإيقافه؟",
        correctAnswer: "لا",
        explanation: "الرد على المتحرش قد يشجعه على الاستمرار. من الأفضل تجاهله وحظره والإبلاغ عنه."
    },
    {
        id: 3,
        question: "هل يُنصح بحفظ الأدلة (لقطات الشاشة) عند التعرض للتحرش الإلكتروني؟",
        correctAnswer: "نعم",
        explanation: "حفظ الأدلة مثل لقطات الشاشة والرسائل مهم جداً للإبلاغ عن التحرش واتخاذ الإجراءات القانونية."
    },
    {
        id: 4,
        question: "هل يمكن للتحرش الإلكتروني أن يحدث فقط بين الغرباء؟",
        correctAnswer: "لا",
        explanation: "التحرش الإلكتروني يمكن أن يحدث من أشخاص معروفين أيضاً، بما في ذلك الأصدقاء أو الزملاء أو أفراد العائلة."
    },
    {
        id: 5,
        question: "هل تُعتبر مشاركة الصور الشخصية دون إذن نوعاً من التحرش الإلكتروني؟",
        correctAnswer: "نعم",
        explanation: "مشاركة الصور الشخصية دون موافقة صاحبها يُعتبر انتهاكاً للخصوصية وشكلاً من أشكال التحرش الإلكتروني."
    },
    {
        id: 6,
        question: "هل يجب تغيير كلمات المرور بانتظام لحماية الحسابات؟",
        correctAnswer: "نعم",
        explanation: "تغيير كلمات المرور بانتظام واستخدام كلمات مرور قوية يساعد في حماية الحسابات من الاختراق."
    },
    {
        id: 7,
        question: "هل يُعتبر التتبع المستمر لشخص عبر الإنترنت (Stalking) تحرشاً إلكترونياً؟",
        correctAnswer: "نعم",
        explanation: "التتبع المستمر أو المراقبة غير المرغوب فيها عبر الإنترنت يُعتبر شكلاً خطيراً من التحرش الإلكتروني."
    },
    {
        id: 8,
        question: "هل يمكن للأطفال والمراهقين فقط أن يكونوا ضحايا للتحرش الإلكتروني؟",
        correctAnswer: "لا",
        explanation: "التحرش الإلكتروني يمكن أن يؤثر على الأشخاص من جميع الأعمار، وليس فقط الأطفال والمراهقين."
    },
    {
        id: 9,
        question: "هل يُنصح بقبول طلبات الصداقة من أشخاص غير معروفين؟",
        correctAnswer: "لا",
        explanation: "قبول طلبات الصداقة من الغرباء يمكن أن يعرضك للتحرش أو المحتوى غير المرغوب فيه. من الأفضل قبول الأشخاص المعروفين فقط."
    },
    {
        id: 10,
        question: "هل تُعتبر المصادقة الثنائية (2FA) وسيلة فعالة لحماية الحسابات؟",
        correctAnswer: "نعم",
        explanation: "المصادقة الثنائية تضيف طبقة حماية إضافية وتجعل من الصعب على المتطفلين الوصول إلى حساباتك."
    },
    {
        id: 11,
        question: "هل يجب الإبلاغ عن التحرش الإلكتروني للسلطات المختصة؟",
        correctAnswer: "نعم",
        explanation: "الإبلاغ عن التحرش الإلكتروني للسلطات المختصة مهم لحماية نفسك والآخرين ومحاسبة المتحرشين."
    },
    {
        id: 12,
        question: "هل يُعتبر التنمر الإلكتروني أقل ضرراً من التنمر الجسدي؟",
        correctAnswer: "لا",
        explanation: "التنمر الإلكتروني يمكن أن يكون له تأثير نفسي مدمر مثل التنمر الجسدي، وأحياناً أكثر لأنه يمكن أن يستمر على مدار الساعة."
    },
    {
        id: 13,
        question: "هل يُنصح بمشاركة المعلومات الشخصية (مثل العنوان أو رقم الهاتف) على وسائل التواصل الاجتماعي؟",
        correctAnswer: "لا",
        explanation: "مشاركة المعلومات الشخصية علناً يمكن أن تعرضك للتحرش أو الاستغلال. يجب الحفاظ على خصوصية هذه المعلومات."
    },
    {
        id: 14,
        question: "هل يمكن للتحرش الإلكتروني أن يؤثر على الصحة النفسية للضحية؟",
        correctAnswer: "نعم",
        explanation: "التحرش الإلكتروني يمكن أن يسبب القلق والاكتئاب ومشاكل نفسية أخرى. من المهم طلب الدعم النفسي عند الحاجة."
    },
    {
        id: 15,
        question: "هل يُعتبر حظر المتحرش وسيلة فعالة للحماية؟",
        correctAnswer: "نعم",
        explanation: "حظر المتحرش على جميع المنصات يمنعه من التواصل معك مباشرة، لكن يجب أيضاً الإبلاغ عنه للسلطات المختصة."
    }
];

// متغيرات الاختبار
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStartTime = null;
let quizEndTime = null;

// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    setupEventListeners();
});

// تهيئة الاختبار
function initializeQuiz() {
    // تحديث عدد الأسئلة في الواجهة
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    document.getElementById('totalQuestionsDisplay').textContent = quizQuestions.length;
    
    // بدء الاختبار
    quizStartTime = new Date();
    displayQuestion(0);
    updateProgress();
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    submitBtn.addEventListener('click', submitQuiz);
}

// عرض السؤال
function displayQuestion(index) {
    const question = quizQuestions[index];
    const questionContainer = document.getElementById('questionContainer');
    
    questionContainer.innerHTML = `
        <div class="question-card">
            <div class="question-number">السؤال ${index + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="answer-options">
                <button class="answer-btn" data-answer="نعم" onclick="selectAnswer('نعم')">نعم</button>
                <button class="answer-btn" data-answer="لا" onclick="selectAnswer('لا')">لا</button>
            </div>
        </div>
    `;

    // إظهار الإجابة المحفوظة إن وجدت
    if (userAnswers[index]) {
        const selectedBtn = questionContainer.querySelector(`[data-answer="${userAnswers[index]}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
    }

    // تحديث عداد السؤال الحالي
    document.getElementById('currentQuestion').textContent = index + 1;
    
    // تحديث حالة الأزرار
    updateNavigationButtons();
}

// اختيار إجابة
function selectAnswer(answer) {
    // إزالة التحديد من جميع الأزرار
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => btn.classList.remove('selected'));
    
    // تحديد الإجابة المختارة
    const selectedBtn = document.querySelector(`[data-answer="${answer}"]`);
    selectedBtn.classList.add('selected');
    
    // حفظ الإجابة
    userAnswers[currentQuestionIndex] = answer;
    
    // تحديث حالة الأزرار
    updateNavigationButtons();
}

// السؤال السابق
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
        updateProgress();
    }
}

// السؤال التالي
function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        updateProgress();
    }
}

// تحديث شريط التقدم
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// تحديث حالة أزرار التنقل
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // زر السابق
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // زر التالي
    const hasAnswer = userAnswers[currentQuestionIndex] !== undefined;
    nextBtn.disabled = !hasAnswer;
    
    // زر الإنهاء
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = hasAnswer ? 'block' : 'none';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// إنهاء الاختبار
function submitQuiz() {
    // التحقق من الإجابة على جميع الأسئلة
    if (userAnswers.length < quizQuestions.length || userAnswers.includes(undefined)) {
        showNotification('يرجى الإجابة على جميع الأسئلة قبل إنهاء الاختبار', 'warning');
        return;
    }
    
    quizEndTime = new Date();
    calculateResults();
    showResults();
}

// حساب النتائج
function calculateResults() {
    let correctCount = 0;
    let incorrectCount = 0;
    
    for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === quizQuestions[i].correctAnswer) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    }
    
    const percentage = Math.round((correctCount / quizQuestions.length) * 100);
    
    // حفظ النتائج
    window.quizResults = {
        correct: correctCount,
        incorrect: incorrectCount,
        total: quizQuestions.length,
        percentage: percentage,
        timeTaken: Math.round((quizEndTime - quizStartTime) / 1000 / 60), // بالدقائق
        answers: userAnswers.map((answer, index) => ({
            question: quizQuestions[index].question,
            userAnswer: answer,
            correctAnswer: quizQuestions[index].correctAnswer,
            isCorrect: answer === quizQuestions[index].correctAnswer,
            explanation: quizQuestions[index].explanation
        }))
    };
}

// عرض النتائج
function showResults() {
    const results = window.quizResults;
    
    // إخفاء قسم الاختبار وإظهار النتائج
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    // تحديث النتائج الأساسية
    document.getElementById('scorePercentage').textContent = results.percentage + '%';
    document.getElementById('correctAnswers').textContent = results.correct;
    document.getElementById('incorrectAnswers').textContent = results.incorrect;
    document.getElementById('totalAnswered').textContent = results.total;
    
    // رسالة الأداء
    const performanceMessage = getPerformanceMessage(results.percentage);
    const messageElement = document.getElementById('performanceMessage');
    messageElement.innerHTML = performanceMessage.message;
    messageElement.className = `performance-message ${performanceMessage.class}`;
    
    // النتائج التفصيلية
    displayDetailedResults(results.answers);
    
    // تحديث لون دائرة النتيجة
    updateScoreCircleColor(results.percentage);
    
    // التمرير إلى أعلى النتائج
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

// الحصول على رسالة الأداء
function getPerformanceMessage(percentage) {
    if (percentage >= 90) {
        return {
            message: '🎉 ممتاز! لديك معرفة ممتازة بالتحرش الإلكتروني وطرق الحماية. استمر في نشر الوعي!',
            class: 'excellent'
        };
    } else if (percentage >= 75) {
        return {
            message: '👍 جيد جداً! لديك معرفة جيدة بالموضوع، لكن يمكنك تحسين معلوماتك أكثر.',
            class: 'good'
        };
    } else if (percentage >= 60) {
        return {
            message: '📚 يحتاج تحسين. لديك معرفة أساسية، لكن ننصحك بقراءة المزيد عن الحماية من التحرش الإلكتروني.',
            class: 'needs-improvement'
        };
    } else {
        return {
            message: '⚠️ يحتاج اهتمام عاجل. ننصحك بشدة بتعلم المزيد عن التحرش الإلكتروني وطرق الحماية.',
            class: 'poor'
        };
    }
}

// عرض النتائج التفصيلية
function displayDetailedResults(answers) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    
    answers.forEach((answer, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        resultItem.innerHTML = `
            <div class="result-question">
                <strong>السؤال ${index + 1}:</strong> ${answer.question}
            </div>
            <div class="result-answer">
                <div class="user-answer">
                    <strong>إجابتك:</strong> ${answer.userAnswer}
                </div>
                <div class="result-status">
                    ${answer.isCorrect ? '✅' : '❌'}
                </div>
            </div>
            ${!answer.isCorrect ? `
                <div class="correct-answer">
                    <strong>الإجابة الصحيحة:</strong> ${answer.correctAnswer}
                </div>
            ` : ''}
            <div class="explanation">
                <strong>التوضيح:</strong> ${answer.explanation}
            </div>
        `;
        
        resultsList.appendChild(resultItem);
    });
}

// تحديث لون دائرة النتيجة
function updateScoreCircleColor(percentage) {
    const scoreCircle = document.querySelector('.score-circle');
    
    if (percentage >= 90) {
        scoreCircle.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
    } else if (percentage >= 75) {
        scoreCircle.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    } else if (percentage >= 60) {
        scoreCircle.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
    } else {
        scoreCircle.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    }
}

// إعادة تشغيل الاختبار
function restartQuiz() {
    // إعادة تعيين المتغيرات
    currentQuestionIndex = 0;
    userAnswers = [];
    quizStartTime = null;
    quizEndTime = null;
    
    // إخفاء النتائج وإظهار الاختبار
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    
    // إعادة تهيئة الاختبار
    initializeQuiz();
    
    // التمرير إلى أعلى الاختبار
    document.getElementById('quizSection').scrollIntoView({ behavior: 'smooth' });
    
    showNotification('تم إعادة تشغيل الاختبار', 'info');
}

// مشاركة النتائج
function shareResults() {
    const results = window.quizResults;
    
    if (!results) {
        showNotification('لا توجد نتائج لمشاركتها', 'warning');
        return;
    }
    
    const shareText = `حصلت على ${results.percentage}% في اختبار معلومات التحرش الإلكتروني!\n` +
                     `الإجابات الصحيحة: ${results.correct}/${results.total}\n` +
                     `اختبر معلوماتك أيضاً على موقع مكافحة التحرش الإلكتروني`;
    
    if (navigator.share) {
        // استخدام Web Share API إذا كان متاحاً
        navigator.share({
            title: 'نتيجة اختبار التحرش الإلكتروني',
            text: shareText,
            url: window.location.href
        }).then(() => {
            showNotification('تم مشاركة النتيجة بنجاح', 'success');
        }).catch((error) => {
            console.error('خطأ في المشاركة:', error);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

// مشاركة احتياطية
function fallbackShare(text) {
    // نسخ النص إلى الحافظة
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('تم نسخ النتيجة إلى الحافظة', 'success');
        }).catch(() => {
            showShareModal(text);
        });
    } else {
        showShareModal(text);
    }
}

// عرض نافذة المشاركة
function showShareModal(text) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>مشاركة النتيجة</h3>
            <textarea readonly class="share-text">${text}</textarea>
            <div class="modal-buttons">
                <button onclick="copyShareText()" class="btn btn-primary">نسخ النص</button>
                <button onclick="closeShareModal()" class="btn btn-secondary">إغلاق</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(modal);
    
    // إضافة الوظائف العامة
    window.copyShareText = function() {
        const textarea = modal.querySelector('.share-text');
        textarea.select();
        document.execCommand('copy');
        showNotification('تم نسخ النص', 'success');
        closeShareModal();
    };
    
    window.closeShareModal = function() {
        document.body.removeChild(modal);
        delete window.copyShareText;
        delete window.closeShareModal;
    };
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

// حفظ النتائج في التخزين المحلي
function saveResultsToStorage() {
    const results = window.quizResults;
    if (results) {
        const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
        savedResults.push({
            ...results,
            date: new Date().toISOString()
        });
        
        // الاحتفاظ بآخر 10 نتائج فقط
        if (savedResults.length > 10) {
            savedResults.splice(0, savedResults.length - 10);
        }
        
        localStorage.setItem('quizResults', JSON.stringify(savedResults));
    }
}

// تحميل النتائج السابقة
function loadPreviousResults() {
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    return savedResults;
}

// إضافة مستمع لحفظ النتائج عند إنهاء الاختبار
window.addEventListener('beforeunload', function() {
    if (window.quizResults) {
        saveResultsToStorage();
    }
});

// التعامل مع الأخطاء
window.addEventListener('error', function(e) {
    console.error('خطأ في الاختبار:', e.error);
    showNotification('حدث خطأ غير متوقع', 'error');
});

