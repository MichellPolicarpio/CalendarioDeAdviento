document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const calendarContainer = document.getElementById('calendar-container');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Modales
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('#modal .close-button');
    const notYetModal = document.getElementById('not-yet-modal');
    const notYetCloseButton = document.querySelector('#not-yet-modal .close-button');

    // Botones de control
    const lockToggleButton = document.getElementById('lock-toggle-button');
    const soundToggleButton = document.getElementById('sound-toggle');
    const backgroundMusic = document.getElementById('background-music');

    // --- ESTADO DE LA APLICACIÓN ---
    let allDaysUnlocked = false;
    let isSoundOn = true;

    // --- CONTENIDO ---
    const messages = [
        /* 1 - Muñeco de nieve */ "¡Construyamos recuerdos juntos! Este cupón es válido para una tarde de películas navideñas y chocolate caliente.",
        /* 2 - Calcetines */ { type: 'image', src: 'Regalo_Cupones/Dia2.png' },
        /* 3 - Reno */ "¡Que la magia te guíe! Este cupón es válido para una salida nocturna a ver las luces de Navidad de la ciudad.",
        /* 4 - Corazón de chocolate */ "¡Un dulce para mi dulce! Válido por unos 'borrachitos', dulce típico de Puebla. ¡Espero que te encanten!",
        /* 5 - Árbol pino */ "¡Para decorar nuestro nido! Este cupón es válido para elegir juntos un nuevo adorno especial para nuestro árbol.",
        /* 6 - Santa */ "¡Ho, ho, ho! Santa dice que te has portado muy bien. Este cupón es válido por un deseo que yo te cumpliré.",
        /* 7 - Copo de nieve */ "No hay dos como tú. Este cupón es válido para una tarde de no hacer absolutamente nada, solo relajarnos juntos.",
        /* 8 - Pancake */ { type: 'image', src: 'Regalo_Cupones/Dia8.png', size: 'large' },
        /* 9 - Luces navideñas */ "¡Que la noche brille! Este cupón es válido para una pijamada con maratón de tu saga de películas favorita. ¡Yo pongo las palomitas!",
        /* 10 - Galleta jengibre */ "¡Eres tan dulce como una galleta! Válido para una tarde de hornear galletas navideñas juntos (¡o comprarlas!).",
        /* 11 - Campanas */ { type: 'image', src: 'Regalo_Cupones/Dia11.png' },
        /* 12 - Regalo especial */ "Tú eres mi mejor regalo. Este cupón es válido por un regalo sorpresa muy especial que tengo para ti. ¡La intriga es parte de la diversión!",
        /* 13 - Dulce de caramelo */ "¡Para endulzar tu día! Este cupón es válido por tu dulce o snack favorito. ¡Solo pídelo y aparecerá!",
        /* 14 - Duende con regalo */ { type: 'image', src: 'Regalo_Cupones/Dia14.png', size: 'large' },
        /* 15 - Corona de puerta */ "¡Bienvenido a nuestro hogar! Válido para una cena romántica en casa, preparada por mí con mucho amor.",
        /* 16 - Estrella fugaz */ "Pide un deseo. Este cupón es válido para una noche de mirar las estrellas, con mantas y una bebida caliente.",
        /* 17 - Vela navideña */ "Para iluminar nuestras noches. Este cupón es válido para una noche de juegos de mesa, solo tú y yo.",
        /* 18 - Churros y chocolate */ "La combinación perfecta, como tú y yo. Válido por una salida a comer churros con chocolate.",
        /* 19 - Guantes */ "Para tus manos, que siempre cuidan las mías. Este cupón es válido para un paseo largo, agarrados de la mano.",
        /* 20 - Música */ "Esta melodía me hace pensar en ti. Te regalo esta canción: [Nombre de la canción o enlace].",
        /* 21 - Postre con canela */ "Un toque de especia para nuestra vida. Válido para que probemos juntos una receta nueva de algún postre exótico.",
        /* 22 - Esfera de nieve */ "Nuestro pequeño mundo en una esfera. Este cupón es válido para una tarde de ver nuestras fotos favoritas del año.",
        /* 23 - Muffin */ "¡Casi, casi es Navidad! Válido por un desayuno especial en la cama, preparado por mí.",
        /* 24 - Navidad */ "¡Feliz Nochebuena, mi amor! Hoy no hay cupones, solo mi amor incondicional y la alegría de pasar esta noche mágica contigo. Eres mi mejor regalo. ¡Te amo!"
    ];
    const aboutContent = `
        <div class="about-modal">
            <h2>Acerca de</h2>
            <div class="about-author">Michell Policarpio</div>
            <div class="about-desc">Proyecto web personal hecho con dedicación y cariño.</div>
            <strong style="color:#bfa14a;">Tecnologías utilizadas:</strong>
            <ul class="about-tech-list">
                <li><span class="tech-icon">🔵</span> HTML5</li>
                <li><span class="tech-icon">🎨</span> CSS3</li>
                <li><span class="tech-icon">✨</span> JavaScript (ES6+)</li>
            </ul>
        </div>
    `;
    const howToContent = `
        <div class="howto-modal">
            <h2>¿Cómo funciona esto?</h2>
            <ol>
                <li><span class="step-emoji">📅</span> Cada día de diciembre, haz clic en el número correspondiente del calendario.</li>
                <li><span class="step-emoji">🎁</span> Descubre una sorpresa, dedicatoria o cupón especial.</li>
                <li><span class="step-emoji">🔒</span> Solo puedes abrir los días que ya han llegado (o usa el candado para previsualizar).</li>
                <li><span class="step-emoji">🎶</span> ¡Activa la música de fondo para una experiencia más mágica!</li>
            </ol>
        </div>
    `;
    const victorContent = `
        <div class="victor-modal">
            <span style="font-size:1.1em;">✨</span> <span class="victor-underline">Alejandro</span> ✨<br>
            <span style="font-size:1.1em;">Este calendario es más que un proyecto:<br>
            es un pedacito de mi corazón hecho regalo para ti.</span><br><br>
            <span style="font-size:1.2em;">Quiero que cada día te haga sentir tan especial<br>como tú me haces sentir a mí.</span><br><br>
            <span style="font-size:1.3em;">Felices fiestas, mi amor. 🎄❤️</span>
        </div>
    `;

    // --- FUNCIONES ---
    function launchConfetti() {
        const confettiColors = ['#FFD700', '#fffbe6', '#ffb347', '#ff6961', '#b4e7d9', '#f7cac9'];
        const confettiContainer = document.getElementById('confetti-container');
        for (let i = 0; i < 32; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 1800);
        }
    }

    const openModalWithMessage = (content, isDay = false, modalType = null) => {
        // Limpiar clases anteriores
        modal.classList.remove('image-modal', 'large-image');
        modalBody.className = '';

        if (modalType === 'about') {
            modalBody.classList.add('about-modal');
            modalBody.innerHTML = content;
        } else if (modalType === 'howto') {
            modalBody.classList.add('howto-modal');
            modalBody.innerHTML = content;
        } else if (modalType === 'victor') {
            modalBody.classList.add('victor-modal');
            modalBody.innerHTML = content;
            // Animar el subrayado después de renderizar
            setTimeout(() => {
                const underline = modalBody.querySelector('.victor-underline');
                if (underline) underline.classList.add('animated');
            }, 50);
        } else if (typeof content === 'object' && content !== null && content.type === 'image') {
            modalBody.innerHTML = `<img src="${content.src}" alt="Cupón del día">`;
            modal.classList.add('image-modal');
            if (content.size === 'large') {
                modal.classList.add('large-image');
            }
        } else {
            modalBody.innerHTML = `<p>${content}</p>`;
        }
        modal.style.display = 'flex';
        navMenu.classList.remove('active'); // Cierra el menú hamburguesa si está abierto
        if (isDay) launchConfetti();
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    const closeNotYetModal = () => {
        notYetModal.style.display = 'none';
    };

    // --- EVENT LISTENERS ---
    
    // Menú de navegación
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.getElementById('about-link').addEventListener('click', (e) => {
        e.preventDefault();
        openModalWithMessage(aboutContent, false, 'about');
    });

    document.getElementById('how-to-link').addEventListener('click', (e) => {
        e.preventDefault();
        openModalWithMessage(howToContent, false, 'howto');
    });

    document.getElementById('victor-link').addEventListener('click', (e) => {
        e.preventDefault();
        openModalWithMessage(victorContent, false, 'victor');
    });

    soundToggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        isSoundOn = !isSoundOn;
        if (isSoundOn) {
            backgroundMusic.play();
            soundToggleButton.innerText = '🔊';
        } else {
            backgroundMusic.pause();
            soundToggleButton.innerText = '🔇';
        }
        navMenu.classList.remove('active');
    });

    // Botón de bloqueo
    lockToggleButton.addEventListener('click', () => {
        allDaysUnlocked = !allDaysUnlocked;
        lockToggleButton.innerText = allDaysUnlocked ? '🔒' : '🔓';
    });

    // Cierre de modales
    closeButton.addEventListener('click', closeModal);
    notYetCloseButton.addEventListener('click', closeNotYetModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) closeModal();
        if (event.target == notYetModal) closeNotYetModal();
    });

    // --- GENERACIÓN DEL CALENDARIO ---
    const totalDays = 24;
    for (let i = 1; i <= totalDays; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day-square');
        daySquare.dataset.day = i;

        const dayImage = document.createElement('img');
        dayImage.src = `Iconos_gif_dias/${i}.gif`;
        dayImage.alt = `Día ${i}`;
        
        daySquare.appendChild(dayImage);
        calendarContainer.appendChild(daySquare);

        daySquare.addEventListener('click', () => {
            const day = parseInt(daySquare.dataset.day);
            const today = new Date();
            const currentDay = today.getDate();
            const currentMonth = today.getMonth();

            if (allDaysUnlocked || (currentMonth === 11 && currentDay >= day)) {
                openModalWithMessage(messages[day - 1], true);
            } else {
                notYetModal.style.display = 'flex';
            }
        });
    }

    // Al cargar la página, activar la música y el icono
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().then(() => {
        soundToggleButton.innerText = '🔊';
    }).catch(() => {
        // Si el navegador bloquea el autoplay, el usuario podrá activarlo manualmente
        soundToggleButton.innerText = '🔇';
        isSoundOn = false;
    });
}); 