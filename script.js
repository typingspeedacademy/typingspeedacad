// DOM Elements
const wpmDisplay = document.getElementById('wpm-display');
const accuracyDisplay = document.getElementById('accuracy-display');
const timerDisplay = document.getElementById('timer-display');
const wordsDisplay = document.querySelector('.words-display p');
const levelDisplay = document.getElementById('level-display');

// Control buttons
const punctuationBtn = document.getElementById('punctuation-btn');
const numbersBtn = document.getElementById('numbers-btn');
const timeBtn = document.getElementById('time-btn');
const wordsBtn = document.getElementById('words-btn');
const quoteBtn = document.getElementById('quote-btn');
const zenBtn = document.getElementById('zen-btn');
const customBtn = document.getElementById('custom-btn');
const timeOptions = document.querySelectorAll('.time-options-dark span');

// Mode settings

let timerInterval;
let timeLeft = 15; // Changed default to 15 seconds
let typedChars = 0;
let correctChars = 0;
let incorrectChars = 0;
let totalWords = 0;
let currentWordIndex = 0;
let currentLevel = 1;
const totalLevels = 50;
let words = [];
let currentInput = '';
    typingStarted = false;
    currentLanguage = 'en';
    typedChars = 0;
    correctChars = 0;
    incorrectChars = 0;
let currentDifficulty = 'normal';

// Mode settings (declarations moved to top)

// Control button event listeners
if (punctuationBtn) {
    punctuationBtn.addEventListener('click', () => {
        includePunctuation = !includePunctuation;
        punctuationBtn.classList.toggle('selected-time');
        resetTest();
    });
}

if (numbersBtn) {
    numbersBtn.addEventListener('click', () => {
        includeNumbers = !includeNumbers;
        numbersBtn.classList.toggle('selected-time');
        resetTest();
    });
}

if (timeOptions && timeOptions.length > 0) {
    timeOptions.forEach(option => {
        option.addEventListener('click', () => {
            timeOptions.forEach(opt => opt.classList.remove('active-time'));
            option.classList.add('active-time');
            selectedTime = parseInt(option.textContent);
            timeLeft = selectedTime;
            updateTimer();
            resetTest();
        });
    });
}

if (wordsBtn) {
    wordsBtn.addEventListener('click', () => {
        setMode('words');
    });
}

if (quoteBtn) {
    quoteBtn.addEventListener('click', () => {
        setMode('quote');
    });
}

if (zenBtn) {
    zenBtn.addEventListener('click', () => {
        setMode('zen');
    });
}

if (customBtn) {
    customBtn.addEventListener('click', () => {
        setMode('custom');
    });
}

// Mode switching function
function setMode(mode) {
    const buttons = [timeBtn, wordsBtn, quoteBtn, zenBtn, customBtn];
    buttons.forEach(btn => btn.classList.remove('selected-time'));
    
    currentMode = mode;
    switch(mode) {
        case 'time':
            timeBtn.classList.add('selected-time');
            break;
        case 'words':
            wordsBtn.classList.add('selected-time');
            break;
        case 'quote':
            quoteBtn.classList.add('selected-time');
            break;
        case 'zen':
            zenBtn.classList.add('selected-time');
            break;
        case 'custom':
            customBtn.classList.add('selected-time');
            break;
    }
    resetTest();
}

const languages = {
    en: {
        easy: [
            "A cat sat on the mat.",
            "The sun is very hot.",
            "Red and blue are colors.",
            "I like to play games.",
            "Dogs are good pets now.",
            "Books are full of knowledge and stories.",
            "The sky is blue on a clear day.",
            "Water is essential for all living things.",
            "Music can change how we feel.",
            "Exercise is good for your health.",
            "Flowers bloom in the spring season.",
            "Birds fly south for the winter.",
            "Apples grow on trees in orchards.",
            "Children learn quickly through play.",
            "Time passes faster when having fun."
        ],
        normal: [
            "The quick brown fox jumps over the lazy dog.",
            "Typing is a useful skill for everyone.",
            "Practice makes perfect in every activity.",
            "Learning new things keeps the mind sharp.",
            "JavaScript powers many interactive websites.",
            "Regular keyboard practice improves typing speed and accuracy.",
            "Cloud computing has revolutionized modern data storage solutions.",
            "Effective communication is essential in professional environments.",
            "Sustainable development balances economic growth with environmental protection.",
            "Critical thinking skills help solve complex problems efficiently.",
            "Digital literacy is becoming increasingly important in today's world.",
            "Continuous learning is necessary for career advancement opportunities.",
            "Artificial intelligence is transforming various industry sectors rapidly.",
            "Remote work options provide flexibility for many professionals today.",
            "Cybersecurity measures protect sensitive information from threats."
        ],
        hard: [
            "Ubiquitous computing facilitates daily tasks seamlessly.",
            "Philosophical inquiries often challenge conventional wisdom.",
            "The amalgamation of diverse cultures enriches society.",
            "Ephemeral moments can hold profound significance.",
            "Cryptocurrency markets exhibit volatile fluctuations.",
            "Quantum entanglement demonstrates non-locality in quantum mechanics.",
            "Neuroplasticity enables cognitive adaptation throughout human lifespan.",
            "Interdisciplinary collaboration fosters innovative problem-solving approaches.",
            "Socioeconomic disparities influence educational achievement significantly.",
            "Bioethical considerations constrain experimental medical research protocols.",
            "Geopolitical tensions exacerbate international diplomatic negotiations frequently.",
            "Anthropological studies reveal cultural universals across diverse societies.",
            "Epistemological frameworks determine scientific methodology fundamentally.",
            "Psycholinguistic research illuminates language acquisition mechanisms comprehensively.",
            "Thermodynamic equilibrium represents entropy maximization in closed systems."
        ]
    },
    es: {
        easy: [
            "El gato se sentó.",
            "El sol está caliente.",
            "Rojo y azul son colores.",
            "Me gusta jugar juegos.",
            "Los perros son mascotas.",
            "Los libros están llenos de conocimiento.",
            "El cielo es azul en un día claro.",
            "El agua es esencial para la vida.",
            "La música puede cambiar cómo nos sentimos.",
            "El ejercicio es bueno para la salud.",
            "Las flores florecen en primavera.",
            "Los pájaros vuelan hacia el sur en invierno.",
            "Las manzanas crecen en los árboles.",
            "Los niños aprenden rápidamente jugando.",
            "El tiempo pasa más rápido cuando nos divertimos."
        ],
        normal: [
            "El rápido zorro marrón salta sobre el perro perezoso.",
            "Escribir es una habilidad útil para todos.",
            "La práctica hace al maestro en toda actividad.",
            "Aprender cosas nuevas mantiene la mente aguda.",
            "JavaScript alimenta muchos sitios web interactivos.",
            "La práctica regular del teclado mejora la velocidad y precisión.",
            "La computación en la nube ha revolucionado el almacenamiento de datos.",
            "La comunicación efectiva es esencial en entornos profesionales.",
            "El desarrollo sostenible equilibra el crecimiento económico y ambiental.",
            "El pensamiento crítico ayuda a resolver problemas complejos.",
            "La alfabetización digital es cada vez más importante hoy.",
            "El aprendizaje continuo es necesario para el avance profesional.",
            "La inteligencia artificial está transformando diversos sectores.",
            "El trabajo remoto ofrece flexibilidad para muchos profesionales.",
            "Las medidas de ciberseguridad protegen información sensible."
        ],
        hard: [
            "La computación omniprésente facilita las tareas diarias.",
            "Las investigaciones filosóficas desafían la sabiduría.",
            "La amalgama de culturas diversas enriquece la sociedad.",
            "Los momentos efímeros pueden tener un significado profundo.",
            "Los mercados de criptomonedas exhiben fluctuaciones.",
            "El entrelazamiento cuántico demuestra la no-localidad en mecánica cuántica.",
            "La neuroplasticidad permite la adaptación cognitiva durante toda la vida.",
            "La colaboración interdisciplinaria fomenta enfoques innovadores.",
            "Las disparidades socioeconómicas influyen en el logro educativo.",
            "Las consideraciones bioéticas restringen los protocolos de investigación.",
            "Las tensiones geopolíticas exacerban las negociaciones diplomáticas.",
            "Los estudios antropológicos revelan universales culturales.",
            "Los marcos epistemológicos determinan la metodología científica.",
            "La investigación psicolingüística ilumina los mecanismos de adquisición.",
            "El equilibrio termodinámico representa la maximización de la entropía."
        ]
    },
    fr: {
        easy: [
            "Le chat est assis.",
            "Le soleil est chaud.",
            "Rouge et bleu.",
            "J'aime jouer.",
            "Les chiens sont gentils.",
            "Les livres sont pleins de connaissances.",
            "Le ciel est bleu par temps clair.",
            "L'eau est essentielle à la vie.",
            "La musique peut changer nos émotions.",
            "L'exercice est bon pour la santé.",
            "Les fleurs fleurissent au printemps.",
            "Les oiseaux volent vers le sud en hiver.",
            "Les pommes poussent sur les arbres.",
            "Les enfants apprennent vite en jouant.",
            "Le temps passe plus vite quand on s'amuse."
        ],
        normal: [
            "Le renard brun rapide saute par-dessus le chien paresseux.",
            "La dactylographie est une compétence utile pour tout le monde.",
            "C'est en forgeant qu'on devient forgeron.",
            "Apprendre de nouvelles choses garde l'esprit vif.",
            "JavaScript alimente de nombreux sites Web interactifs.",
            "La pratique régulière du clavier améliore la vitesse et la précision.",
            "L'informatique en nuage a révolutionné le stockage des données.",
            "Une communication efficace est essentielle dans les environnements professionnels.",
            "Le développement durable équilibre croissance économique et protection environnementale.",
            "Les compétences de pensée critique aident à résoudre efficacement des problèmes complexes.",
            "La littératie numérique devient de plus en plus importante dans le monde d'aujourd'hui.",
            "L'apprentissage continu est nécessaire pour l'avancement professionnel.",
            "L'intelligence artificielle transforme rapidement divers secteurs industriels.",
            "Les options de travail à distance offrent de la flexibilité à de nombreux professionnels.",
            "Les mesures de cybersécurité protègent les informations sensibles contre les menaces."
        ],
        hard: [
            "L'informatique omniprésente facilite les tâches quotidiennes.",
            "Les enquêtes philosophiques remettent en question la sagesse.",
            "L'amalgame de cultures diverses enrichit la société.",
            "Les moments éphémères peuvent avoir une signification.",
            "Les marchés des cryptomonnaies présentent des fluctuations.",
            "L'intrication quantique démontre la non-localité en mécanique quantique.",
            "La neuroplasticité permet l'adaptation cognitive tout au long de la vie humaine.",
            "La collaboration interdisciplinaire favorise des approches innovantes de résolution de problèmes.",
            "Les disparités socioéconomiques influencent considérablement la réussite éducative.",
            "Les considérations bioéthiques limitent les protocoles de recherche médicale expérimentale.",
            "Les tensions géopolitiques exacerbent fréquemment les négociations diplomatiques internationales.",
            "Les études anthropologiques révèlent des universaux culturels à travers diverses sociétés.",
            "Les cadres épistémologiques déterminent fondamentalement la méthodologie scientifique.",
            "La recherche psycholinguistique éclaire les mécanismes d'acquisition du langage.",
            "L'équilibre thermodynamique représente la maximisation de l'entropie dans les systèmes fermés."
        ]
    },
    de: {
        easy: [
            "Die Katze sitzt da.",
            "Die Sonne ist heiß.",
            "Rot und blau sind Farben.",
            "Ich spiele gerne Spiele.",
            "Hunde sind gute Tiere.",
            "Bücher sind voller Wissen und Geschichten.",
            "Der Himmel ist blau an einem klaren Tag.",
            "Wasser ist lebenswichtig für alle Lebewesen.",
            "Musik kann unsere Stimmung verändern.",
            "Bewegung ist gut für die Gesundheit.",
            "Blumen blühen im Frühling.",
            "Vögel fliegen im Winter nach Süden.",
            "Äpfel wachsen auf Bäumen in Obstgärten.",
            "Kinder lernen schnell durch Spielen.",
            "Die Zeit vergeht schneller, wenn man Spaß hat."
        ],
        normal: [
            "Der schnelle braune Fuchs springt über den faulen Hund.",
            "Tippen ist eine nützliche Fähigkeit für jeden.",
            "Übung macht den Meister in jeder Tätigkeit.",
            "Neues lernen hält den Geist scharf.",
            "JavaScript treibt viele interaktive Websites an.",
            "Regelmäßiges Tastaturtraining verbessert Geschwindigkeit und Genauigkeit.",
            "Cloud-Computing hat moderne Datenspeicherlösungen revolutioniert.",
            "Effektive Kommunikation ist in beruflichen Umgebungen unerlässlich.",
            "Nachhaltige Entwicklung balanciert Wirtschaftswachstum mit Umweltschutz.",
            "Kritisches Denken hilft, komplexe Probleme effizient zu lösen.",
            "Digitale Kompetenz wird in der heutigen Welt immer wichtiger.",
            "Kontinuierliches Lernen ist für berufliche Aufstiegschancen notwendig.",
            "Künstliche Intelligenz verändert verschiedene Branchen rasant.",
            "Remote-Arbeitsoptionen bieten vielen Fachleuten Flexibilität.",
            "Cybersicherheitsmaßnahmen schützen sensible Informationen vor Bedrohungen."
        ],
        hard: [
            "Allgegenwärtiges Computing erleichtert tägliche Aufgaben.",
            "Philosophische Untersuchungen stellen Weisheit in Frage.",
            "Die Verschmelzung verschiedener Kulturen bereichert die Gesellschaft.",
            "Flüchtige Momente können tiefe Bedeutung haben.",
            "Kryptowährungsmärkte zeigen volatile Schwankungen.",
            "Quantenverschränkung demonstriert Nichtlokalität in der Quantenmechanik.",
            "Neuroplastizität ermöglicht kognitive Anpassung während der gesamten Lebensdauer.",
            "Interdisziplinäre Zusammenarbeit fördert innovative Problemlösungsansätze.",
            "Socioökonomische Unterschiede beeinflussen den Bildungserfolg erheblich.",
            "Bioethische Überlegungen beschränken experimentelle medizinische Forschungsprotokolle.",
            "Geopolitische Spannungen verschärfen internationale diplomatische Verhandlungen häufig.",
            "Anthropologische Studien offenbaren kulturelle Universalien in verschiedenen Gesellschaften.",
            "Erkenntnistheoretische Rahmenbedingungen bestimmen wissenschaftliche Methodik grundlegend.",
            "Psycholinguistische Forschung beleuchtet Spracherwerbsmechanismen umfassend.",
            "Thermodynamisches Gleichgewicht repräsentiert Entropiemaximierung in geschlossenen Systemen."
        ]
    },
    zh: {
        easy: [
            "猫坐着。",
            "太阳很热。",
            "红色和蓝色。",
            "我喜欢玩。",
            "狗是好宠物。",
            "书中充满知识和故事。",
            "晴天时天空是蓝色的。",
            "水对所有生物都是必不可少的。",
            "音乐可以改变我们的感受。",
            "运动对健康有益。",
            "花朵在春季绽放。",
            "鸟儿在冬天飞往南方。",
            "苹果在果园的树上生长。",
            "孩子们通过玩耍快速学习。",
            "当我们玩得开心时，时间过得更快。"
        ],
        normal: [
            "敏捷的棕色狐狸跳过懒狗。",
            "打字对每个人来说都是一项有用的技能。",
            "熟能生巧。",
            "学习新事物能保持头脑敏锐。",
            "JavaScript驱动着许多交互式网站。",
            "定期键盘练习提高打字速度和准确性。",
            "云计算彻底改变了现代数据存储解决方案。",
            "有效沟通在专业环境中很重要。",
            "可持续发展平衡经济增长与环境保护。",
            "批判性思维技能有助于高效解决复杂问题。",
            "数字素养在当今世界变得越来越重要。",
            "持续学习对职业发展机会是必要的。",
            "人工智能正在迅速改变各个行业。",
            "远程工作选择为许多专业人士提供灵活性。",
            "网络安全措施保护敏感信息免受威胁。"
        ],
        hard: [
            "无处不在的计算无缝地促进日常工作。",
            "哲学探究常常挑战传统智慧。",
            "不同文化的融合丰富了社会。",
            "短暂的瞬间可能具有深远的意义。",
            "加密货币市场表现出剧烈的波动。",
            "量子纠缠展示了量子力学中的非局域性。",
            "神经可塑性使人类终生认知适应成为可能。",
            "跨学科合作促进创新的问题解决方法。",
            "社会经济差异显著影响教育成就。",
            "生物伦理考虑限制实验医学研究协议。",
            "地缘政治紧张局势经常加剧国际外交谈判。",
            "人类学研究揭示了不同社会的文化共性。",
            "认识论框架从根本上决定科学方法论。",
            "心理语言学研究全面阐明语言习得机制。",
            "热力学平衡代表封闭系统中的熵最大化。"
        ]
    },
    ar: {
        easy: [
            "القطة جلست على السجادة.",
            "الشمس حارة جدا.",
            "الأحمر والأزرق ألوان.",
            "أحب أن ألعب الألعاب.",
            "الكلاب حيوانات أليفة جيدة.",
            "الكتب مليئة بالمعرفة والقصص.",
            "السماء زرقاء في يوم صافٍ.",
            "الماء ضروري لكل الكائنات الحية.",
            "الموسيقى يمكن أن تغير شعورنا.",
            "التمرين مفيد لصحتك.",
            "الزهور تتفتح في موسم الربيع.",
            "الطيور تطير جنوباً في الشتاء.",
            "التفاح ينمو على الأشجار في البساتين.",
            "الأطفال يتعلمون بسرعة من خلال اللعب.",
            "الوقت يمر بسرعة أكبر عند الاستمتاع."
        ],
        normal: [
            "الثعلب البني السريع يقفز فوق الكلب الكسول.",
            "الكتابة مهارة مفيدة للجميع.",
            "التدريب يصنع الإتقان في كل نشاط.",
            "تعلم أشياء جديدة يبقي العقل حاداً.",
            "جافاسكريبت تشغل العديد من المواقع التفاعلية.",
            "التدريب المنتظم على لوحة المفاتيح يحسن سرعة ودقة الكتابة.",
            "الحوسبة السحابية أحدثت ثورة في حلول تخزين البيانات الحديثة.",
            "التواصل الفعال ضروري في البيئات المهنية.",
            "التنمية المستدامة توازن بين النمو الاقتصادي وحماية البيئة.",
            "مهارات التفكير النقدي تساعد في حل المشكلات المعقدة بكفاءة.",
            "محو الأمية الرقمية يزداد أهمية في عالم اليوم.",
            "التعلم المستمر ضروري لفرص التقدم الوظيفي.",
            "الذكاء الاصطناعي يحول قطاعات صناعية مختلفة بسرعة.",
            "خيارات العمل عن بعد توفر المرونة للعديد من المهنيين اليوم.",
            "تدابير الأمن السيبراني تحمي المعلومات الحساسة من التهديدات."
        ],
        hard: [
            "الحوسبة المنتشرة تسهل المهام اليومية بسلاسة.",
            "الاستفسارات الفلسفية غالباً ما تتحدى الحكمة التقليدية.",
            "اندماج الثقافات المتنوعة يثري المجتمع.",
            "اللحظات العابرة يمكن أن تحمل أهمية عميقة.",
            "أسواق العملات المشفرة تظهر تقلبات متقلبة.",
            "التشابك الكمي يظهر اللامحلية في ميكانيكا الكم.",
            "المرونة العصبية تمكن التكيف المعرفي طوال فترة الحياة البشرية.",
            "التعاون متعدد التخصصات يعزز نهج حل المشكلات المبتكرة.",
            "التفاوتات الاجتماعية والاقتصادية تؤثر بشكل كبير على التحصيل التعليمي.",
            "الاعتبارات الأخلاقية البيولوجية تقيد بروتوكولات البحث الطبي التجريبي.",
            "التوترات الجيوسياسية تفاقم المفاوضات الدبلوماسية الدولية بشكل متكرر.",
            "الدراسات الأنثروبولوجية تكشف عن العموميات الثقافية عبر المجتمعات المتنوعة.",
            "الأطر المعرفية تحدد المنهجية العلمية بشكل أساسي.",
            "البحث النفسي اللغوي يوضح آليات اكتساب اللغة بشكل شامل.",
            "التوازن الديناميكي الحراري يمثل تعظيم الإنتروبيا في الأنظمة المغلقة."
        ]
    }
};

// DOM Elements for language and difficulty selectors (to be added in HTML)
const languageSelector = document.getElementById('language-selector');
const difficultySelector = document.getElementById('difficulty-selector'); // Assuming an ID for the select element

function initializeWords() {
    const langData = languages[currentLanguage] || languages['en'];
    const difficultySentences = langData[currentDifficulty] || langData['normal'];

    if (!difficultySentences || difficultySentences.length === 0) {
        console.error(`No sentences found for language: ${currentLanguage}, difficulty: ${currentDifficulty}. Falling back.`);
        // Fallback to normal difficulty of current language, or English normal if that also fails
        const fallbackSentences = langData['normal'] || (languages['en'] ? languages['en']['normal'] : []);
        if (!fallbackSentences || fallbackSentences.length === 0) {
            words = ["Error:", "No", "sentences", "available."]; // Ultimate fallback
        } else {
            sentences = fallbackSentences;
        }
    } else {
        sentences = difficultySentences;
    }

    // currentLevel will now be an index for the sentences array
    if (currentLevel < 1 || currentLevel > sentences.length) {
        currentLevel = 1; // Reset to first sentence if out of bounds
    }
    let sentence = sentences[currentLevel - 1];
    words = sentence.split(' ');
    currentWordIndex = 0;
    currentInput = '';
    renderWords();

    // Handle RTL for Arabic
    if (wordsDisplay) {
        if (currentLanguage === 'ar') {
            wordsDisplay.setAttribute('dir', 'rtl');
            wordsDisplay.classList.add('rtl-text');
        } else {
            wordsDisplay.setAttribute('dir', 'ltr');
            wordsDisplay.classList.remove('rtl-text');
        }
    }
}

function changeLanguage(langCode) {
    if (languages[langCode]) {
        currentLanguage = langCode;
        localStorage.setItem('selectedLanguage', currentLanguage);
        // currentLevel = 1; // Reset to the first sentence of the new language/difficulty
        resetExerciseState(); // This will call initializeWords with the new language and current difficulty
        if (languageSelector && languageSelector.value !== langCode) {
            languageSelector.value = langCode;
        }
    } else {
        console.error("Language not found:", langCode);
    }
}

function changeDifficulty(difficulty) {
    if (languages[currentLanguage] && languages[currentLanguage][difficulty]) {
        currentDifficulty = difficulty;
        localStorage.setItem('selectedDifficulty', currentDifficulty);
        // currentLevel = 1; // Reset to the first sentence of the new difficulty
        resetExerciseState(); // This will re-initialize words with the new difficulty
        if (difficultySelector && difficultySelector.value !== difficulty) {
            difficultySelector.value = difficulty;
        }
    } else {
        console.error("Difficulty not found for current language:", difficulty);
    }
}

function renderWords() {
    if (!wordsDisplay) return;
    wordsDisplay.innerHTML = words.map((word, index) => {
        let className = '';
        let innerHTML = '';
        if (index < currentWordIndex) {
            className = 'typed-correct';
            innerHTML = word.split('').map(char => `<span class='typed-correct-char typed-underline'>${char}</span>`).join('');
        } else if (index === currentWordIndex) {
            className = 'current-word';
            let chars = word.split('');
            let typed = currentInput.split('');
            innerHTML = '';
            for (let i = 0; i < chars.length; i++) {
                if (i < typed.length) {
                    if (typed[i] === chars[i]) {
                        innerHTML += `<span class='typed-correct-char typed-underline-anim'>${chars[i]}</span>`;
                    } else {
                        innerHTML += `<span class='typed-incorrect-char typed-underline-anim'>${chars[i]}</span>`;
                    }
                } else {
                    innerHTML += `<span class='untyped-char typed-underline'>${chars[i]}</span>`;
                }
            }
            // Place the cursor after the last typed character
            let cursorPos = typed.length;
            if (cursorPos === 0) {
                innerHTML = `<span class="inline-cursor">|</span>` + innerHTML;
            } else if (cursorPos >= chars.length) {
                innerHTML += '<span class="inline-cursor">|</span>';
            } else {
                let charSpans = innerHTML.match(/<span[^>]*>.*?<\/span>/g) || [];
                charSpans.splice(cursorPos, 0, '<span class="inline-cursor">|</span>');
                innerHTML = charSpans.join('');
            }
        } else {
            innerHTML = word.split('').map(char => `<span class='untyped-char typed-underline'>${char}</span>`).join('');
        }
        return `<span class="${className}">${innerHTML}</span>`;
    }).join(' ');
}

function updateTimerDisplay() {
    if (timerDisplay) timerDisplay.textContent = `${timeLeft}s`;
}

function updateWPMDisplay() {
    if (wpmDisplay) {
        const minutes = (30 - timeLeft) / 60;
        const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
        wpmDisplay.textContent = wpm;
    }
}

function updateAccuracyDisplay() {
    if (accuracyDisplay) {
        const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;
        accuracyDisplay.textContent = `${accuracy}%`;
    }
}

function startTimer() {
    clearInterval(timerInterval);
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        updateWPMDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endExercise();
        }
    }, 1000);
}



// Add authentication check function
function checkAuthStatus() {
    const authToken = localStorage.getItem('authToken');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.querySelector('.auth-buttons');
    const navLinks = document.querySelector('.nav-links');

    if (authToken && currentUser && authButtons && navLinks) {
        // Remove 'About' link if it exists
        const aboutLink = navLinks.querySelector('a[href="#"]');
        if (aboutLink && aboutLink.parentElement) {
            aboutLink.parentElement.remove();
        }

        // Replace auth buttons with profile link
        authButtons.innerHTML = `
            <div class="profile-section">
                <span>Welcome, ${currentUser.user_metadata?.full_name || 'User'}!</span>
                <button onclick="logout()" class="btn btn-outline">Logout</button>
            </div>
        `;
    }
}

// Add logout function
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Add to DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    initializeWords();
    resetExerciseState();
    setupInlineTyping();

    loadSavedSettings(); // Load saved language and difficulty
    setupSelectors(); // Setup language and difficulty selector event listeners
    // initializeWords(); // Called by resetExerciseState
    resetExerciseState(); // Ensure the state is correct on initial load
});

function loadSavedSettings() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    if (languageSelector) languageSelector.value = currentLanguage;

    const savedDifficulty = localStorage.getItem('selectedDifficulty');
    if (savedDifficulty && languages[currentLanguage] && languages[currentLanguage][savedDifficulty]) {
        currentDifficulty = savedDifficulty;
    }
    if (difficultySelector) difficultySelector.value = currentDifficulty;
}

function setupSelectors() {
    if (languageSelector) {
        if (languageSelector.tagName === 'SELECT') {
            Object.keys(languages).forEach(langCode => {
                const option = document.createElement('option');
                option.value = langCode;
                let langName = langCode;
                if(langCode === 'en') langName = 'English';
                if(langCode === 'es') langName = 'Español';
                if(langCode === 'fr') langName = 'Français';
                if(langCode === 'de') langName = 'Deutsch';
                if(langCode === 'zh') langName = '中文';
                if(langCode === 'ar') langName = 'العربية';
                option.textContent = langName;
                languageSelector.appendChild(option);
            });
            languageSelector.value = currentLanguage; // Set initial value after populating
        }
        languageSelector.addEventListener('change', (event) => {
            changeLanguage(event.target.value);
        });
    }

    if (difficultySelector) {
        if (difficultySelector.tagName === 'SELECT') {
            const difficulties = ['easy', 'normal', 'hard']; // Define available difficulties
            difficulties.forEach(diff => {
                const option = document.createElement('option');
                option.value = diff;
                option.textContent = diff.charAt(0).toUpperCase() + diff.slice(1); // Capitalize
                difficultySelector.appendChild(option);
            });
            difficultySelector.value = currentDifficulty; // Set initial value after populating
        }
        difficultySelector.addEventListener('change', (event) => {
            changeDifficulty(event.target.value);
        });
    }
}

// Remove old language setup functions if they exist to avoid conflicts
// function loadSavedLanguage() { ... } // Now part of loadSavedSettings
// function setupLanguageSelector() { ... } // Now part of setupSelectors



function setupInlineTyping() {
    // Remove the input box if it exists
    const typingInput = document.getElementById('typing-input');
    if (typingInput) typingInput.remove();
    
    // Only proceed if wordsDisplay exists
    if (wordsDisplay && wordsDisplay instanceof HTMLElement) {
        wordsDisplay.setAttribute('tabindex', '0');
        wordsDisplay.focus();
        document.addEventListener('keydown', handleTypingKeydown);
    }
}

function handleTypingKeydown(e) {
    if (!words || words.length === 0) return;
    // Start timer only if it hasn't started and it's at the initial timeLeft value
    // This prevents restarting the timer if the user pauses and resumes by clicking out/in
    if (!typingStarted && timeLeft === parseInt(document.querySelector('.time-options-dark span.active-time')?.textContent || '30')) {
        typingStarted = true;
        startTimer();
    }
    if (e.key === ' ') {
        e.preventDefault();
        const expected = words[currentWordIndex] || '';
        if (currentInput.trim() === expected) {
            correctChars += expected.length;
        }
        typedChars += currentInput.trim().length;
        currentWordIndex++;
        currentInput = '';
        if (currentWordIndex >= words.length) {
            // Sentence finished, move to next sentence
            currentLevel++;
            const langData = languages[currentLanguage] || languages['en'];
            const difficultySentences = langData[currentDifficulty] || langData['normal'];
            if (currentLevel > difficultySentences.length) {
                currentLevel = 1; // Loop back to the first sentence
            }
            resetExerciseState(false); // Soft reset: keep time, WPM, accuracy, just load new sentence
            return;
        }
        renderWords();
        updateWPMDisplay();
        updateAccuracyDisplay();
        return;
    }
    if (e.key === 'Backspace') {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
        }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        currentInput += e.key;
    }
    const expected = words[currentWordIndex] || '';
    let isCorrectSoFar = expected.startsWith(currentInput);
    let isWordComplete = currentInput === expected;
    typedChars++;
    if (isCorrectSoFar) {
        correctChars++;
    } else {
        incorrectChars++;
    }
    renderWords();
    updateAccuracyDisplay();
    updateWPMDisplay();
}

console.log('Script loaded. Inline typing functions are being set up.');
// Add minimal CSS for cursor and feedback
const style = document.createElement('style');
style.innerHTML = `
.inline-cursor { display: inline-block; width: 1ch; color: #8be9fd; animation: blink 1s steps(1) infinite; vertical-align: bottom; }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
.typed-correct-char { color: #50fa7b; font-weight: bold; }
.typed-incorrect-char { color: #ff5555; font-weight: bold; text-decoration: underline; }
.untyped-char { color: #bfbfbf; }
.current-word { background: rgba(139,233,253,0.08); border-radius: 4px; padding: 0 2px; }
.typed-underline { border-bottom: 2px solid #44475a; padding-bottom: 2px; }
.words-display-dark.rtl-text { direction: rtl; text-align: right; }
.words-display-dark.rtl-text .current-word .inline-cursor:first-child { margin-left: 0; margin-right: -1ch; } /* Adjust cursor for RTL */
.words-display-dark.rtl-text .current-word .inline-cursor:last-child { margin-left: -1ch; margin-right: 0; } /* Adjust cursor for RTL */
.typed-underline-anim { border-bottom: 2px solid #bd93f9; padding-bottom: 2px; animation: underlinePop 0.2s cubic-bezier(.68,-0.55,.27,1.55); }
@keyframes underlinePop { 0% { border-bottom-width: 0; } 100% { border-bottom-width: 2px; } }
`;
document.head.appendChild(style);



// Modify resetExerciseState to correctly reset timeLeft based on selection
document.addEventListener('DOMContentLoaded', () => {
    initializeWords();
    resetExerciseState(); // Call reset before setting up time options
    setupInlineTyping();


    const startButton = document.querySelector('.exercise-main-dark button');
    if (startButton) startButton.remove();

    const timeOptionButtons = document.querySelectorAll('.time-options-dark span');
    timeOptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeOptionButtons.forEach(btn => btn.classList.remove('active-time'));
            button.classList.add('active-time');
            // timeLeft = parseInt(button.textContent);
            // resetExerciseState(); // This was causing issues, reset should re-read active time
            // Instead of directly setting timeLeft, let resetExerciseState handle it.
            resetExerciseState(); // This will now pick up the new active time
            if(startButton) startButton.disabled = false;
            clearInterval(timerInterval);
            updateTimerDisplay(); // Update display immediately after time change
        });
    });

    // Set initial active time and timeLeft
    const initialActiveTimeButton = document.querySelector('.time-options-dark span.active-time') || document.querySelector('.time-options-dark span');
    if (initialActiveTimeButton) {
        initialActiveTimeButton.classList.add('active-time');
        timeLeft = parseInt(initialActiveTimeButton.textContent);
    } else {
        timeLeft = 30; // Default if no time options found
    }
    updateTimerDisplay(); // Initial timer display based on selected/default time
});

function resetExerciseState(hardReset = true) {
    const activeTimeButton = document.querySelector('.time-options-dark span.active-time');
    if (activeTimeButton) {
        timeLeft = parseInt(activeTimeButton.textContent);
    } else {
        timeLeft = 30; // Default if somehow no active button is found
    }

    typedChars = 0;
    correctChars = 0;
    currentWordIndex = 0;
    currentInput = '';
    typingStarted = false;
    if (hardReset) {
        typedChars = 0;
        correctChars = 0;
        typingStarted = false;
        clearInterval(timerInterval); // Clear any existing timer

        const activeTimeButton = document.querySelector('.time-options-dark span.active-time');
        if (activeTimeButton) {
            timeLeft = parseInt(activeTimeButton.textContent);
        } else {
            timeLeft = 30; // Default if somehow no active button is found
        }
        updateWPMDisplay();
        updateAccuracyDisplay();
        updateTimerDisplay();
    }
    // For both hard and soft reset (sentence change), re-initialize words and level display
    initializeWords(); // This will use currentLanguage, currentDifficulty, and currentLevel
    updateLevelDisplay();
    if (wordsDisplay) wordsDisplay.focus(); // Refocus after reset
}

function endExercise() { // This function is called when the timer runs out
    const wpm = wpmDisplay.textContent;
    const accuracy = accuracyDisplay.textContent;
    const time = 30 - timeLeft; // Assuming initial time is 30 seconds
    showResults(wpm, accuracy, time, incorrectChars);
    resetExerciseState(true); // Hard reset: reset time, WPM, accuracy, and load new sentence (or first of current set)
}

function updateLevelDisplay() {
    if (levelDisplay) {
        const langData = languages[currentLanguage] || languages['en'];
        const difficultySentences = langData[currentDifficulty] || langData['normal'] || [];
        const numSentencesInSet = difficultySentences.length;
        levelDisplay.textContent = `Sentence: ${currentLevel}/${numSentencesInSet} (${currentDifficulty})`;
    }
}

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:10000/api'
    : 'https://typingspeedacademy.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
    // Login Form Handling
    const loginForm = document.querySelector('.auth-form');
    if (loginForm && document.title.includes('Login')) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = loginForm.querySelector('#email');
            const passwordInput = loginForm.querySelector('#password');
            
            if (emailInput && passwordInput) {
                const email = emailInput.value.trim();
                const password = passwordInput.value;

                if (!email || !password) {
                    alert('Please fill in all fields');
                    return;
                }

                try {
                    const response = await fetch(`${API_BASE_URL}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    // Check if response is JSON before parsing
                    const contentType = response.headers.get('content-type');
                    if (!contentType || !contentType.includes('application/json')) {
                        throw new Error(`Server returned non-JSON response: ${await response.text()}`);
                    }

                    const data = await response.json();

                    if (!response.ok) {
                        const errorMsg = data.error && data.error.message ? data.error.message :
                            (data.message || `Login failed. Status: ${response.status}`);
                        throw new Error(errorMsg);
                    }

                    if (data.session && data.session.access_token) {
                        localStorage.setItem('authToken', data.session.access_token);
                        localStorage.setItem('currentUser', JSON.stringify(data.user));
                        loginForm.reset();
                        window.location.href = 'index.html';
                    } else {
                        throw new Error('Login successful but no session token received');
                    }
                } catch (error) {
                    alert('Login Error: ' + error.message);
                    console.error('Login error details:', error);
                }
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Signup Form Handling
    const signupForm = document.querySelector('.auth-form');
    if (signupForm && document.title.includes('Sign Up')) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nameInput = signupForm.querySelector('#name');
            const emailInput = signupForm.querySelector('#email');
            const passwordInput = signupForm.querySelector('#password');
            const confirmPasswordInput = signupForm.querySelector('#confirm-password');

            if (nameInput && emailInput && passwordInput && confirmPasswordInput) {
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;

                if (!name || !email || !password || !confirmPassword) {
                    alert('Please fill in all fields');
                    return;
                }

                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }

                if (password.length < 6) {
                    alert('Password should be at least 6 characters long.');
                    return;
                }

                try {
                    const response = await fetch(`${API_BASE_URL}/signup`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, email, password }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        const errorMsg = data.error && data.error.message ? data.error.message :
                            (data.message || `Signup failed. Status: ${response.status}`);
                        throw new Error(errorMsg);
                    }

                    alert(data.message || 'Signup successful! Please check your email for confirmation.');
                    signupForm.reset();
                    window.location.href = 'login.html';
                } catch (error) {
                    alert('Signup Error: ' + error.message);
                    console.error('Signup error details:', error);
                }
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});