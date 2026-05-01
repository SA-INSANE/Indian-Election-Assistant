// --- Data ---

const timelineData = [
    {
        title: "1. Delimitation",
        desc: "Determining the boundaries of electoral constituencies to ensure equal representation."
    },
    {
        title: "2. Electoral Rolls",
        desc: "Updating the voter list. Every eligible citizen (18+ years) is registered."
    },
    {
        title: "3. Announcement",
        desc: "The Election Commission of India (ECI) announces the election schedule. The Model Code of Conduct comes into effect."
    },
    {
        title: "4. Nominations",
        desc: "Candidates file their nomination papers, which are then scrutinized. Candidates can also withdraw."
    },
    {
        title: "5. Campaigning",
        desc: "Political parties and candidates campaign. This ends 48 hours before polling begins."
    },
    {
        title: "6. Polling Day",
        desc: "Voters cast their votes using Electronic Voting Machines (EVMs) and VVPATs."
    },
    {
        title: "7. Counting & Results",
        desc: "Votes are counted under strict supervision, and results are officially declared."
    }
];

const flashcardData = [
    { front: "ECI", back: "Election Commission of India. An autonomous constitutional authority responsible for administering election processes in India." },
    { front: "EVM", back: "Electronic Voting Machine. Used to record votes electronically instead of using ballot papers." },
    { front: "VVPAT", back: "Voter Verifiable Paper Audit Trail. An independent verification system for voting machines allowing voters to verify their vote." },
    { front: "MCC", back: "Model Code of Conduct. Guidelines issued by the ECI for the conduct of political parties and candidates during elections." },
    { front: "NOTA", back: "None Of The Above. A ballot option designed to allow the voter to indicate disapproval of all of the candidates in a voting system." },
    { front: "RO", back: "Returning Officer. The official responsible for overseeing the election in a constituency or district." },
    { front: "Manifesto", back: "A published declaration of the intentions, motives, or views of a political party." },
    { front: "Exit Poll", back: "A poll of voters taken immediately after they have exited the polling stations to predict the outcome." },
    { front: "By-election", back: "An election held to fill a political office that has become vacant between general elections." },
    { front: "FPTP", back: "First Past the Post. An electoral system where the candidate with the most votes wins, regardless of the absolute majority." }
];

const quizData = [
    {
        question: "Who conducts the general elections in India?",
        options: ["Supreme Court", "Parliament", "Election Commission of India", "President"],
        answer: 2
    },
    {
        question: "What is the minimum voting age in India?",
        options: ["16 Years", "18 Years", "21 Years", "25 Years"],
        answer: 1
    },
    {
        question: "What does VVPAT stand for?",
        options: ["Voter Verified Paper Audit Trail", "Voting Verification Paper And Tool", "Voter Verifiable Paper Audit Trail", "Verified Voting Paper Audit Trail"],
        answer: 2
    },
    {
        question: "When does the Model Code of Conduct come into effect?",
        options: ["On the day of polling", "Immediately after the announcement of the election schedule", "One week before polling", "On the day of counting"],
        answer: 1
    }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initTimeline();
    initFlashcards();
    initQuiz();
    initChat();
    setupScrollAnimations();
});

// --- Tabs ---
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabSections = document.querySelectorAll('.tab-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabSections.forEach(s => s.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// --- Timeline ---
function initTimeline() {
    const timelineContainer = document.getElementById('timeline');
    
    timelineData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        div.innerHTML = `
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <div class="timeline-details">${item.desc}</div>
            </div>
        `;
        
        // Toggle details on click
        const content = div.querySelector('.timeline-content');
        content.addEventListener('click', () => {
            content.classList.toggle('active');
        });

        timelineContainer.appendChild(div);
    });
}

function setupScrollAnimations() {
    const items = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
}

// --- Flashcards ---
function initFlashcards() {
    const container = document.getElementById('flashcards');
    
    flashcardData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'flashcard';
        card.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">${data.front}</div>
                <div class="flashcard-back">${data.back}</div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        
        container.appendChild(card);
    });
}

// --- Quiz ---
let currentQuestionIndex = 0;
let score = 0;

function initQuiz() {
    loadQuestion();
    
    document.getElementById('next-quiz-btn').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    document.getElementById('restart-quiz-btn').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        loadQuestion();
    });
}

function loadQuestion() {
    const q = quizData[currentQuestionIndex];
    document.getElementById('quiz-question').textContent = q.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-feedback').className = 'quiz-feedback';
    document.getElementById('next-quiz-btn').classList.add('hidden');

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, btnElement) {
    const q = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // Disable all options
    options.forEach(opt => opt.disabled = true);
    
    const feedbackEl = document.getElementById('quiz-feedback');

    if (selectedIndex === q.answer) {
        btnElement.classList.add('correct');
        score++;
        feedbackEl.textContent = 'Correct!';
        feedbackEl.className = 'quiz-feedback success';
    } else {
        btnElement.classList.add('wrong');
        options[q.answer].classList.add('correct'); // Show correct answer
        feedbackEl.textContent = 'Incorrect.';
        feedbackEl.className = 'quiz-feedback error';
    }
    
    document.getElementById('next-quiz-btn').classList.remove('hidden');
}

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultsContainer = document.getElementById('quiz-results');
    resultsContainer.classList.remove('hidden');
    document.getElementById('score-display').textContent = `You scored ${score} out of ${quizData.length}!`;
}

// --- Chat Assistant ---
function initChat() {
    const header = document.getElementById('chat-header');
    const body = document.getElementById('chat-body');
    const toggleBtn = document.getElementById('toggle-chat-btn');
    const sendBtn = document.getElementById('send-chat-btn');
    const input = document.getElementById('chat-input');

    header.addEventListener('click', () => {
        body.classList.toggle('hidden');
        toggleBtn.textContent = body.classList.contains('hidden') ? '+' : '_';
    });

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

function handleSend() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // Simulate AI thinking and response
    setTimeout(() => {
        const response = generateBotResponse(text.toLowerCase());
        addMessage(response, 'bot');
    }, 600);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(input) {
    if (input.includes('process') || input.includes('steps')) {
        return "The election process generally involves: Delimitation, Electoral Rolls update, Announcement of Schedule, Nominations, Campaigning, Polling, and finally Counting & Results. You can check the Timeline section above for details!";
    }
    if (input.includes('last 10 prime ministers') || input.includes('last 10 pm')) {
        return "The last 10 Prime Ministers of India are:\n1. Narendra Modi\n2. Manmohan Singh\n3. Atal Bihari Vajpayee\n4. I. K. Gujral\n5. H. D. Deve Gowda\n6. P. V. Narasimha Rao\n7. Chandra Shekhar\n8. V. P. Singh\n9. Rajiv Gandhi\n10. Indira Gandhi";
    }
    if (input.includes('current prime minister') || input.includes('current pm') || input.includes('who is the prime minister')) {
        return "Narendra Modi is the current Prime Minister of India. He represents the Bharatiya Janata Party (BJP) and has been serving since 2014.";
    }
    if (input.includes('president') || input.includes('current president')) {
        return "The current President of India is Droupadi Murmu. The President is the ceremonial head of state and the Commander-in-Chief of the Indian Armed Forces. They are elected indirectly by an electoral college.";
    }
    if (input.includes('chief minister') || input.includes('cm')) {
        return "A Chief Minister (CM) is the elected head of government of a state in India. While the Prime Minister heads the national government, the CM leads the state government.";
    }
    if (input.includes('evm')) {
        return "EVM stands for Electronic Voting Machine. It's used in Indian elections to securely record and count votes, replacing traditional paper ballots.";
    }
    if (input.includes('vvpat')) {
        return "VVPAT stands for Voter Verifiable Paper Audit Trail. It prints a slip with the candidate's name and symbol you voted for, visible for 7 seconds behind a glass screen, ensuring your vote is cast correctly.";
    }
    if (input.includes('mcc') || input.includes('code of conduct')) {
        return "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI to regulate political parties and candidates prior to elections to ensure free and fair elections.";
    }
    if (input.includes('who') || input.includes('eci')) {
        return "The Election Commission of India (ECI) is the autonomous body responsible for administering all elections in India.";
    }
    if (input.includes('modi')) {
        return "Narendra Modi is a prominent Indian politician serving as the Prime Minister of India. He represents the Bharatiya Janata Party (BJP) and was re-elected in the 2014, 2019, and 2024 general elections.";
    }
    if (input.includes('rahul') || input.includes('gandhi')) {
        return "Rahul Gandhi is a prominent Indian politician and a leader of the Indian National Congress (INC) party, often serving as a key opposition figure in Indian politics.";
    }
    if (input.includes('bjp')) {
        return "The Bharatiya Janata Party (BJP) is one of the two major political parties in India, along with the Indian National Congress. It is currently the ruling party at the national level.";
    }
    if (input.includes('congress') || input.includes('inc')) {
        return "The Indian National Congress (INC) is one of the major political parties in India and is a prominent part of the opposition alliance in national politics.";
    }
    if (input.includes('nota')) {
        return "NOTA stands for 'None Of The Above'. It is an option on the voting machine that allows a voter to officially register a vote of rejection for all the candidates running in the election.";
    }
    if (input.includes('pm') || input.includes('prime minister')) {
        return "The Prime Minister of India is the head of the government. In the Indian parliamentary system, the leader of the party or coalition with a majority in the Lok Sabha (lower house) is usually appointed as the Prime Minister by the President.";
    }
    if (input.includes('hello') || input.includes('hi')) {
        return "Hello! How can I help you understand the Indian election system today?";
    }
    return "That's an interesting question! While my knowledge is focused on the core election process, EVMs, and key figures, you can learn a lot from the Timeline, Flashcards, and Quiz sections on this page!";
}
