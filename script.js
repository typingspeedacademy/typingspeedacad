// DOM Elements
const wpmDisplay = document.getElementById('wpm-display');
const accuracyDisplay = document.getElementById('accuracy-display');
const timerDisplay = document.getElementById('timer-display');
const wordsDisplay = document.querySelector('.words-display p');
const levelDisplay = document.getElementById('level-display');
const siteLanguageSelector = document.getElementById('site-language-selector');

// Website translations
const translations = {
    english: {
        // Navigation
        'home': 'Home',
        'free_exercises': 'Free Exercises',
        'premium_course': 'Premium Course',
        'login': 'Login',
        'signup': 'Sign Up',
        
        // Index page
        'master_fast_typing': 'Master Fast Typing',
        'improve_typing_speed': 'Improve your typing speed and accuracy with our free exercises.',
        'start_free_exercises': 'Start Free Exercises',
        'explore_premium_course': 'Explore Premium Course',
        'type_faster': 'Type Faster',
        'why_choose': 'Why Choose Us',
        'increase_speed': 'Increase Speed',
        'double_typing_speed': 'Double your typing speed with our structured exercises.',
        'improve_accuracy': 'Improve Accuracy',
        'reduce_errors': 'Reduce typing errors while maintaining speed.',
        'track_progress': 'Track Progress',
        'monitor_improvement': 'Monitor your improvement with detailed progress tracking.',
        'choose_plan': 'Choose Your Plan',
        'free_version': 'Free Version',
        'premium_version': 'Premium Version',
        'coming_soon': 'Coming Soon',
        'start_free': 'Start Free',
        'get_notified': 'Get Notified',
        'what_users_say': 'What Our Users Say',
        
        // Auth pages
        'login_account': 'Login to Your Account',
        'welcome_back': 'Welcome back! Please enter your credentials to continue.',
        'email': 'Email',
        'password': 'Password',
        'dont_have_account': 'Don\'t have an account? <button onclick="window.location.href=\'signup.html\'" class="auth-switch-btn">Sign Up</button>',
        'forgot_password': 'Forgot password?',
        'create_account': 'Create Your Account',
        'join_today': 'Join Typing Speed Academy today and start improving your typing skills!',
        'full_name': 'Full Name',
        'confirm_password': 'Confirm Password',
        'create_account_btn': 'Create Account',
        'already_have_account': 'Already have an account? <button onclick="window.location.href=\'login.html\'" class="auth-switch-btn">Login</button>',
        
        // Typing exercise
        'typing_exercises': 'Typing Exercises',
        'start_exercise': 'Start Exercise',
        'start_typing': 'Start typing...',
        'free_typing_exercises': 'Free Typing Exercises',
        'proper_hand': 'Proper Hand Position',
        'foundation': 'The foundation of good typing starts with proper hand position and posture.',
        'premium_title': 'Premium Course',
        'premium_subtitle': 'Elevate your typing skills to the next level with our comprehensive premium course',
        'premium_features': 'Premium Features',
        'speed_drills': 'Speed Drills',
        'speed_drills_desc': 'Specialized exercises designed to gradually increase your typing speed',
        'accuracy_training': 'Accuracy Training',
        'accuracy_training_desc': 'Techniques to reduce errors while maintaining speed',
        'keyboard_mastery': 'Keyboard Mastery',
        'keyboard_mastery_desc': 'Advanced lessons on keyboard shortcuts and efficient typing patterns',
        'personalized_feedback': 'Personalized Feedback',
        'personalized_feedback_desc': 'Detailed analysis of your typing patterns with customized improvement suggestions'
    },
};

// Current site language
let currentSiteLanguage = localStorage.getItem('siteLanguage') || 'english';

// Function to change site language
function changeSiteLanguage(language) {
    if (translations[language]) {
        currentSiteLanguage = language;
        localStorage.setItem('siteLanguage', language);
        updatePageLanguage();
        if (siteLanguageSelector && siteLanguageSelector.value !== language) {
            siteLanguageSelector.value = language;
        }
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl-layout');
    } else {
        console.error("Language not found:", language);
    }
}

// Function to update page content based on selected language
function updatePageLanguage() {
    const trans = translations[currentSiteLanguage];
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-links li a');
    if (navLinks.length >= 3) {
        // Home link
        navLinks[0].textContent = trans.home;
        // Free Exercises link
        navLinks[1].textContent = trans.free_exercises;
        // Premium Course link
        navLinks[2].textContent = trans.premium_course;
    }
    
    // Update auth buttons
    const authButtons = document.querySelectorAll('.auth-buttons a');
    if (authButtons.length >= 2) {
        // Login button
        authButtons[0].textContent = trans.login;
        // Sign Up button
        authButtons[1].textContent = trans.signup;
    }
    
    // Update page-specific content based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        // Update index page content
        updateElement('h1', trans.master_fast_typing);
        updateElement('.hero-content p', trans.improve_typing_speed);
        updateElement('.cta-buttons a:first-child', trans.start_free_exercises);
        updateElement('.cta-buttons a:last-child', trans.explore_premium_course);
        updateElement('.typing-text', trans.type_faster);
        updateElement('section.features h2', trans.why_choose);
        updateElement('.feature-card:nth-child(1) h3', trans.increase_speed);
        updateElement('.feature-card:nth-child(1) p', trans.double_typing_speed);
        updateElement('.feature-card:nth-child(2) h3', trans.improve_accuracy);
        updateElement('.feature-card:nth-child(2) p', trans.reduce_errors);
        updateElement('.feature-card:nth-child(3) h3', trans.track_progress);
        updateElement('.feature-card:nth-child(3) p', trans.monitor_improvement);
        updateElement('section.pricing h2', trans.choose_plan);
        updateElement('.pricing-card.free h3', trans.free_version);
        updateElement('.pricing-card.premium h3', trans.premium_version);
        updateElement('.coming-soon', trans.coming_soon);
        updateElement('.pricing-card.free .btn', trans.start_free);
        updateElement('.pricing-card.premium .btn', trans.get_notified);
        updateElement('section.testimonials h2', trans.what_users_say);
    } else if (currentPage === 'login.html') {
        // Update login page content
        updateElement('.auth-header h2', trans.login_account);
        updateElement('.auth-header p', trans.welcome_back);
        updateElement('label[for="email"]', trans.email);
        updateElement('label[for="password"]', trans.password);
        updateElement('.auth-form button', trans.login);
        
        // Update auth switch message
        const authSwitchMessageLogin = document.getElementById('auth-switch-message');
        if (authSwitchMessageLogin) {
            authSwitchMessageLogin.innerHTML = trans.dont_have_account;
        }
        
        updateElement('.auth-footer p:last-child a', trans.forgot_password);
    } else if (currentPage === 'signup.html') {
        // Update signup page content
        updateElement('.auth-header h2', trans.create_account);
        updateElement('.auth-header p', trans.join_today);
        updateElement('label[for="name"]', trans.full_name);
        updateElement('label[for="email"]', trans.email);
        updateElement('label[for="password"]', trans.password);
        updateElement('label[for="confirm-password"]', trans.confirm_password);
        updateElement('.auth-form button', trans.create_account_btn);
        
        // Update auth switch message
        const authSwitchMessageSignup = document.getElementById('auth-switch-message');
        if (authSwitchMessageSignup) {
            authSwitchMessageSignup.innerHTML = trans.already_have_account;
        }
    } else if (currentPage === 'typing-exercise.html') {
        // Update typing exercise page content
        updateElement('.section-title', trans.typing_exercises);
        updateElement('#start-button', trans.start_exercise);
        updateElement('#user-input', trans.start_typing, 'placeholder');
    } else if (currentPage === 'free-exercises.html') {
        // Update free exercises page content
        updateElement('.section-title', trans.free_typing_exercises);
        updateElement('.hand-position h3', trans.proper_hand);
        updateElement('.hand-position p', trans.foundation);
    } else if (currentPage === 'premium.html') {
        // Update premium page content
        updateElement('.premium-header h1', trans.premium_title);
        updateElement('.premium-header p', trans.premium_subtitle);
        updateElement('.premium-features h2', trans.premium_features);
        updateElement('.premium-feature-item:nth-child(1) h4', trans.speed_drills);
        updateElement('.premium-feature-item:nth-child(1) p', trans.speed_drills_desc);
        updateElement('.premium-feature-item:nth-child(2) h4', trans.accuracy_training);
        updateElement('.premium-feature-item:nth-child(2) p', trans.accuracy_training_desc);
        updateElement('.premium-feature-item:nth-child(3) h4', trans.keyboard_mastery);
        updateElement('.premium-feature-item:nth-child(3) p', trans.keyboard_mastery_desc);
        updateElement('.premium-feature-item:nth-child(4) h4', trans.personalized_feedback);
        updateElement('.premium-feature-item:nth-child(4) p', trans.personalized_feedback_desc);
    }
}

// Helper function to update element text content
function updateElement(selector, text, attribute = 'textContent') {
    const element = document.querySelector(selector);
    if (element) {
        if (attribute === 'textContent') {
            element.textContent = text;
        } else {
            element.setAttribute(attribute, text);
        }
    }
}

// Initialize language selector and page content when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set language selector to current language
    if (siteLanguageSelector) {
        siteLanguageSelector.value = currentSiteLanguage;
    }
    
    // Update page content based on current language
    updatePageLanguage();
    
    // Set text direction based on language
    if (currentSiteLanguage === 'arabic') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl-layout');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl-layout');
    }
});

// Auth Forms
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Mock user database
let users = JSON.parse(localStorage.getItem('users')) || [];

// Show notification function - without displaying any notifications
function showNotification(message, type, actionLink = '') {
    // Silently handle the notification without displaying anything
    // This function is intentionally empty to prevent notifications from showing
    
    // If it's a success notification, proceed with redirection
    if (type === 'success') {
        if (message.includes('Login successful')) {
            window.location.href = 'typing-exercise.html';
        } else if (message.includes('Account created')) {
            window.location.href = 'login.html';
        }
    }
}

// Handle signup form
// Ensure supabaseClient.js exposes 'supabase' globally, e.g., by adding 'window.supabase = supabase;' at its end.

// Email Exists Modal Functions
function closeEmailExistsModal() {
    const modal = document.getElementById('emailExistsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Event listener for the signup form
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const notification = document.getElementById('notification');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Display notification function
        function showNotification(message, isError = false) {
            notification.textContent = message;
            notification.style.display = 'block';
            notification.style.backgroundColor = isError ? '#e74c3c' : '#2ecc71';
        }

        // --- Client-side Validations ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', true);
            return;
        }

        if (password.length < 6) {
            showNotification('Password should be at least 6 characters long', true);
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match. Please re-enter', true);
            return;
        }

        try {
            // First check if user exists
            const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (existingUser?.user) {
                const modal = document.getElementById('emailExistsModal');
                modal.style.display = 'flex';
                return;
            }

            // Proceed with signup if user doesn't exist
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) {
                if (error.message.includes('User already registered')) {
                    const modal = document.getElementById('emailExistsModal');
                    modal.style.display = 'flex';
                } else {
                    showNotification(error.message || 'Failed to create account', true);
                }
                return;
            }

            // Signup successful
            showNotification('Signup successful! Please check your email to verify your account');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } catch (err) {
            console.error('Signup error:', err);
            showNotification('An unexpected error occurred. Please try again', true);
        }
    });
}

// Handle login form
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const notification = document.getElementById('notification');

        // Display notification function
        function showNotification(message, isError = false) {
            notification.textContent = message;
            notification.style.display = 'block';
            notification.style.backgroundColor = isError ? '#e74c3c' : '#2ecc71';
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', true);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                showNotification(error.message || 'Invalid email or password', true);
                return;
            }

            // Login successful
            showNotification('Login successful! Redirecting...');
            
            // Redirect to typing exercise page after 1 second
            setTimeout(() => {
                window.location.href = 'typing-exercise.html';
            }, 1000);

        } catch (err) {
            console.error('Login error:', err);
            showNotification('An unexpected error occurred. Please try again', true);
        }
    });
}

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

        // Replace auth buttons with profile link and user's name
        const userName = currentUser.name || currentUser.user_metadata?.full_name || 'User';
        authButtons.innerHTML = `
            <div class="profile-section">
                <span>Welcome, ${userName}!</span>
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
    : 'https://your-production-api-url.com/api';

document.addEventListener('DOMContentLoaded', () => {
    // Login Form Handling
    const loginForm = document.querySelector('.auth-form');
    if (loginForm && document.title.includes('Login')) {
        // ... (login form handling code remains the same)
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
                    alert('Passwords do not match');
                    return;
                }

                if (password.length < 6) {
                    alert('Password should be at least 6 characters long.');
                    return;
                }

                try {
                    // First check if email exists
                    const { data: existingUser, error: checkError } = await supabase.auth.admin.getUserByEmail(email);
                    
                    if (!checkError && existingUser) {
                        // Create a custom notification container
                        const notificationContainer = document.createElement('div');
                        notificationContainer.className = 'existing-user-notification';
                        notificationContainer.innerHTML = `
                            <div class="notification-content">
                                <h3>Email Already Registered</h3>
                                <p>You have already registered with this email address.</p>
                                <button onclick="window.location.href='login.html'" class="btn btn-primary">Go to Login</button>
                            </div>
                        `;

                        // Show the notification
                        const notification = document.getElementById('notification');
                        notification.innerHTML = '';
                        notification.appendChild(notificationContainer);
                        notification.style.display = 'block';
                        
                        // Auto-hide after 5 seconds
                        setTimeout(() => {
                            notification.style.display = 'none';
                        }, 5000);
                        
                        return;
                    }

                    // If email doesn't exist, proceed with signup
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
    } else {
        console.error('Signup form not found');
    }
});

// Remove this duplicate signup form handler
// This was causing the duplicate declaration error
// The signup form handling is already properly implemented above


// Hero Section Typing Animation
// Typing animation functionality
function typeText() {
    const typingText = document.querySelector('.hero-typing-text');
    if (!typingText) return;

    const text = "Type faster, work smarter";
    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(eraseText, 2000);
        }
    }

    type();
}

function eraseText() {
    const typingText = document.querySelector('.hero-typing-text');
    if (!typingText) return;

    let text = typingText.textContent;
    let charIndex = text.length;

    function erase() {
        if (charIndex > 0) {
            typingText.textContent = text.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            setTimeout(typeText, 500);
        }
    }

    erase();
}

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});