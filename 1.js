
const chatbotButton = document.getElementById('chatbotButton');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotNotification = document.getElementById('chatbotNotification');
const autocompleteList = document.getElementById('autocompleteList');
const suggestionChips = document.getElementById('suggestionChips');

let chatbotOpened = false;


chatbotButton.addEventListener('click', () => {
    chatbotContainer.classList.toggle('open');
    if (chatbotContainer.classList.contains('open')) {
        chatbotOpened = true;
        if (chatbotNotification) {
            chatbotNotification.classList.add('hidden');
        }
        generateRandomSuggestions();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('open');
});


const predefinedQuestions = [
        {
            question: "C'est quoi la formation de Salem ?",
            answer: "Salem étudie actuellement l'Analyse Statistique à l'ENSEA d'Abidjan. L'Analyse Statistique est une formation universitaire de niveau BAC + 3 qui vise à former des cadres capables de concevoir, collecter, analyser et interpréter des données socioéconomiques. Elle combine des enseignements théoriques et pratiques en statistique, économétrie, économie, informatique et data science, ainsi que des stages de terrain. Cette formation permet de répondre aux besoins d'analyse et d'aide à la décision dans les domaines économiques et sociaux, notamment dans le contexte africain.\n\nLa formation est accessible uniquement par voie de concours dans les trois écoles de statistiques : l'ENSAE de Dakar, l'ISSEA de Yaoundé et l'ENSEA d'Abidjan. Elle s'étend sur trois années universitaires (BAC + 3) et comprend à la fois des cours théoriques et pratiques, des travaux dirigés, et deux (02) stages pratiques sur le terrain (un stage d'immersion et un stage académique de fin de formation).\n\n📚 Plus d'informations sur le site de l'ENSEA : <a href='https://ensea.edu.ci' target='_blank' style='color: #007bff; text-decoration: underline;'>https://ensea.edu.ci</a>\n\n📖 Page de la formation AS : <a href='https://ensea.edu.ci/formation-initiale/as/' target='_blank' style='color: #007bff; text-decoration: underline;'>https://ensea.edu.ci/formation-initiale/as/</a>",
            hasInteractive: true
        },
        {
            question: "Quelle est la maquette de la formation suivie par Salem ?",
            answer: "La maquette de la formation en Analyse Statistique suivie par Salem présente l'organisation des enseignements, les unités d'enseignement, les compétences visées ainsi que les stages pratiques prévus au cours du cursus.\n\n👉 Lien vers le syllabus : <a href='https://drive.google.com/file/d/1hC5YHECL-sTNm-WerfdOsDH9xqpUqxqX/view?usp=sharing' target='_blank' style='color: #007bff; text-decoration: underline;'>Consulter la maquette complète</a>"
        },
        {
            question: "Quelle est le parcours de Salem ?",
            answer: "Salem a intégré l'ENSEA d'Abidjan en passant le concours CAPESA alors qu'il était en Terminale C à Horizon International, une école privée turque très renommée au Burkina Faso. Il est actuellement en troisième année de formation Analyste Statisticien option Data Science à l'ENSEA d'Abidjan. Il a obtenu son baccalauréat en 2023 mention bien. Fait intéressant, Salem ne connaissait pas les statistiques avant de venir à l'ENSEA, mais il a commencé à les aimer dès la première année."
        },
        {
            question: "Quelles sont ses compétences techniques ?",
            answer: "Salem maîtrise plusieurs outils techniques. En bureautique, il utilise Excel, Word et PowerPoint. Pour la collecte de données, il travaille avec CsPro et Survey Solutions. En analyse et visualisation de données, il utilise R, Power BI, Python et Excel. Il a également des compétences en gestion de bases de données avec MySQL et ACCESS, ainsi qu'en gestion de projet avec MS Project."
        },
        {
            question: "Quels projets a-t-il réalisés ?",
            answer: "Salem a réalisé plusieurs projets académiques et pratiques durant sa formation à l'ENSEA. Parmi ses projets figurent une plateforme Python d'évaluation des performances des enquêteurs, des analyses spatiales avec QGIS sur la démographie de Cocody à Abidjan, des tableaux de bord interactifs avec RShiny, Power BI et Excel dans le domaine agricole, des projets d'analyse multidimensionnelle avec R utilisant l'ACP et l'ACM, et une application VBA Excel de gestion de tâches automatisée avec synchronisation Outlook. Cette liste n'est pas exhaustive, car d'autres projets ont été réalisés en statistique et en SIG avancé."
        },
        {
            question: "Quel est son domaine d’intérêt académique principal ?",
            answer: "Salem s’intéresse aux statistiques avancées, à la modélisation mathématique et à l’analyse des données appliquées à des problématiques réelles, notamment en économie, assurance et finance. Son parcours en analyse statistique lui a permis de développer une forte rigueur quantitative et une approche analytique des phénomènes complexes."
        },
      
        {
            question: "Quelles sont ses ambitions professionnelles ?",
            answer: "À moyen terme, Salem ambitionne de poursuivre une formation de niveau master ou ingénieur dans un domaine quantitatif exigeant, afin de renforcer ses compétences en statistiques avancées, modélisation et analyse de données. À long terme, il souhaite mettre cette expertise au service de projets à fort impact et créer sa propre entreprise, spécialisée dans l’exploitation des données et l’aide à la décision."
        },
        {
            question: "Comment peut-on le contacter ?",
            answer: "Vous pouvez contacter Salem par email à salemflorentinouedraogo@gmail.com ou florentin.ouedraogo@ensea.edu.ci. Il est également joignable sur WhatsApp au (+226) 60 05 10 01. Salem est originaire du Burkina Faso mais étudie actuellement à Abidjan en Côte d'Ivoire."
        },
        {
            question: "Qui est Salem Florentin ?",
            answer: "OUEDRAOGO Salem Florentin est étudiant en statistique spécialité data science. Il est de nationalité burkinabè et poursuit actuellement ses études à Abidjan. Son profil est orienté mathématiques appliquées, statistique et analyse de données. C'est une personne disciplinée, adaptable et avec un bon esprit d'équipe."
        },
        {
            question: "Quelles sont ses expériences professionnelles ?",
            answer: "Salem a effectué un stage d'immersion à l'ENSEA. Il a participé à la mise en place d'une plateforme d'évaluation des performances des agents de collecte. Il a travaillé avec Python Dash pour développer une interface fonctionnelle. Il a également participé à une enquête de terrain à Abengourou comme agent de collecte."
        },
        {
            question: "Quels logiciels maîtrise-t-il ?",
            answer: "Salem utilise des logiciels statistiques comme R, Stata, SPSS et Python. Il maîtrise des outils de visualisation comme Power BI, Excel et Tableau Public. Il travaille aussi avec QGIS pour la cartographie et MySQL pour les bases de données. Il a également de l'expérience avec VBA pour l'automatisation."
        },
        {
            question: "Qu'est-ce que l'ENSEA ?",
            answer: "L'ENSEA est l'École Nationale Supérieure de Statistique et d'Économie Appliquée, située à Abidjan. C'est une école d'excellence qui forme des statisticiens, économistes et data scientists pour l'Afrique. Salem y suit actuellement une formation exigeante en analyse statistique."
        },
        {
            question: "Qui sont ses amis à l'ENSEA ?",
            answer: "À l'ENSEA, Salem s'est fait de très bons amis. Parmi eux, Diallo Issiaga, ancien étudiant de l'INP-HB, avec qui il partage une forte passion pour l'actuariat et la data science. Il est aussi proche de Traoré Clayéré, passionné de data science, de Sawadogo Loukoumane, amateur de football, de Balté et d'autres camarades."
        },
        {
            question: "Quelles langues parle-t-il ?",
            answer: "Salem parle couramment le français. Il a également un bon niveau en anglais, utile pour les études et la documentation scientifique."
        },
        {
            question: "Est-il impliqué dans des associations ?",
            answer: "Oui, Salem est membre de plusieurs associations et clubs à l'ENSEA. Il est impliqué dans des associations comme AES, DAS et AMEB. Il participe activement à l'accueil et à l'intégration des nouveaux étudiants burkinabè."
        },
        {
            question: "Quelles sont ses qualités personnelles ?",
            answer: "Salem est reconnu pour sa discipline. Il est très adaptable et capable de s'intégrer rapidement dans de nouveaux environnements. Il a un bon esprit d'équipe et un sens des responsabilités. Ces qualités font de lui un collaborateur apprécié et un étudiant sérieux."
        }
    ];


function generateRandomSuggestions() {
    suggestionChips.innerHTML = '';
    
 
    const fixedQuestions = [
        "Qui est Salem Florentin ?",
        "C'est quoi la formation de Salem ?",
        "Quelle est la maquette de la formation suivie par Salem ?",
        "Quelles sont ses ambitions professionnelles ?"
    ];
    
    fixedQuestions.forEach(questionText => {
        const item = predefinedQuestions.find(q => q.question === questionText);
        if (item) {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = item.question;
            chip.onclick = () => selectQuestion(item.question);
            suggestionChips.appendChild(chip);
        }
    });
}


function normalizeText(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}


chatbotInput.addEventListener('focus', showAllQuestions);
chatbotInput.addEventListener('mouseenter', showAllQuestions);

function showAllQuestions() {
    autocompleteList.innerHTML = '';
    predefinedQuestions.forEach(item => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.textContent = item.question;
        div.onclick = () => selectQuestion(item.question);
        autocompleteList.appendChild(div);
    });
    autocompleteList.style.display = 'block';
    lockInput();
}


function selectQuestion(question) {
    chatbotInput.value = question;
    autocompleteList.style.display = 'none';
    unlockInput();
    sendMessage(question);
}


function addMessage(content, role, hasInteractive = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content;
    messageDiv.appendChild(contentDiv);
    

    if (hasInteractive && role === 'assistant') {
        const interactiveDiv = document.createElement('div');
        interactiveDiv.style.marginTop = '10px';
        interactiveDiv.innerHTML = `
            <p style="margin-bottom: 8px; font-weight: 500;">Voulez-vous consulter la maquette de la formation suivie par Salem ?</p>
            <button class="interactive-btn" data-action="yes" style="background: #007bff; color: white; border: none; padding: 8px 16px; margin-right: 8px; border-radius: 5px; cursor: pointer; font-size: 14px;">Oui</button>
            <button class="interactive-btn" data-action="no" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">Non</button>
        `;
        contentDiv.appendChild(interactiveDiv);
        
      
        setTimeout(() => {
            const yesBtn = contentDiv.querySelector('[data-action="yes"]');
            const noBtn = contentDiv.querySelector('[data-action="no"]');
            
            yesBtn.addEventListener('click', () => {
                interactiveDiv.remove();
                const maquetteQuestion = predefinedQuestions.find(q => q.question === "Quelle est la maquette de la formation suivie par Salem ?");
                if (maquetteQuestion) {
                    addMessage(maquetteQuestion.answer, 'assistant');
                }
            });
            
            noBtn.addEventListener('click', () => {
                interactiveDiv.remove();
                addMessage("D'accord ! N'hésitez pas si vous avez d'autres questions.", 'assistant');
            });
        }, 100);
    }
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}


function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span><span></span><span></span>
        </div>`;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}


function sendMessage(userMessage) {
    if (!userMessage.trim()) return;
    addMessage(userMessage, 'user');
    chatbotInput.value = '';
    chatbotSend.disabled = true;
    showTyping();

    const normalizedMsg = normalizeText(userMessage);
    const match = predefinedQuestions.find(item => normalizeText(item.question) === normalizedMsg);

    setTimeout(() => {
        removeTyping();
        if (match) {
            addMessage(match.answer, 'assistant', match.hasInteractive || false);
        } else {
            addMessage("Je n'ai pas cette information précise. Contactez Salem : salemflorentinouedraogo@gmail.com", 'assistant');
        }
        chatbotSend.disabled = false;
        generateRandomSuggestions();
    }, 1000 + Math.random() * 1000);
}


chatbotSend.addEventListener('click', () => sendMessage(chatbotInput.value));
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        autocompleteList.style.display = 'none';
        sendMessage(chatbotInput.value);
    }
});


document.addEventListener('click', (e) => {
    if (!chatbotInput.contains(e.target) && !autocompleteList.contains(e.target)) {
        autocompleteList.style.display = 'none';
        unlockInput();
    }
});


function lockInput() {
    chatbotInput.readOnly = true;
    chatbotInput.classList.add('locked');
}
function unlockInput() {
    chatbotInput.readOnly = false;
    chatbotInput.classList.remove('locked');
}


generateRandomSuggestions();



     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    
  const toggle = document.getElementById("toggle-about");
  const content = document.getElementById("about-content");

  toggle.addEventListener("click", () => {
    content.classList.toggle("hidden");
    if (content.classList.contains("hidden")) {
      toggle.textContent = "Cliquez ici pour en savoir plus sur moi  ⮟";
    } else {
      toggle.textContent = "À PROPOS DE MOI  ⮝";
    }
  });


document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const sidePanel = document.querySelector(".side-panel");
  const closeBtn = document.querySelector(".panel-close");
  menuBtn.addEventListener("click", () => {
    sidePanel.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () => {
    sidePanel.classList.remove("open");
  });

  document.querySelectorAll(".panel-nav a").forEach(link => {
    link.addEventListener("click", () => {
      sidePanel.classList.remove("open");
    });
  });

 
  document.addEventListener("click", (e) => {
    if (!sidePanel.contains(e.target) && !menuBtn.contains(e.target)) {
      sidePanel.classList.remove("open");
    }
  });
});