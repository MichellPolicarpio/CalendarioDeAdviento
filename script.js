document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const calendarContainer = document.getElementById('calendar-container');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Modales
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('#modal .close-button');
    const notYetModal = document.getElementById('not-yet-modal');
    const notYetCloseButton = document.querySelector('#not-yet-modal .close-button');

    // Botones de control
    const lockToggleButton = document.getElementById('lock-toggle-button');
    const soundToggleButton = document.getElementById('sound-toggle');
    const backgroundMusic = document.getElementById('background-music');

    // --- ESTADO DE LA APLICACIÓN ---
    let allDaysUnlocked = false;
    let isSoundOn = false;

    // --- CONTENIDO ---
    const messages = [
        /* 1 - Muñeco de nieve */ "¡Construyamos recuerdos juntos! Este cupón es válido para una tarde de películas navideñas y chocolate caliente.",
        /* 2 - Calcetines */ "¡Válido por un par de *ugly socks* navideños! Para mantener tus pies calentitos, te aprecio mucho, Alejandro.",
        /* 3 - Reno */ "¡Que la magia te guíe! Este cupón es válido para una salida nocturna a ver las luces de Navidad de la ciudad.",
        /* 4 - Corazón de chocolate */ "¡Un dulce para mi dulce! Válido por unos 'borrachitos', dulce típico de Puebla. ¡Espero que te encanten!",
        /* 5 - Árbol pino */ "¡Para decorar nuestro nido! Este cupón es válido para elegir juntos un nuevo adorno especial para nuestro árbol.",
        /* 6 - Santa */ "¡Ho, ho, ho! Santa dice que te has portado muy bien. Este cupón es válido por un deseo que yo te cumpliré.",
        /* 7 - Copo de nieve */ "No hay dos como tú. Este cupón es válido para una tarde de no hacer absolutamente nada, solo relajarnos juntos.",
        /* 8 - Pancake */ "¡Un postre para ti! Válido para invitarte a comer tu postre favorito en una cafetería. Yo invito.",
        /* 9 - Luces navideñas */ "¡Que la noche brille! Este cupón es válido para una pijamada con maratón de tu saga de películas favorita. ¡Yo pongo las palomitas!",
        /* 10 - Galleta jengibre */ "¡Eres tan dulce como una galleta! Válido para una tarde de hornear galletas navideñas juntos (¡o comprarlas!).",
        /* 11 - Campanas */ "¡Que suene el amor! Este cupón es válido para que pongas nuestra canción y bailemos juntos, sin importar dónde estemos.",
        /* 12 - Regalo especial */ "Tú eres mi mejor regalo. Este cupón es válido por un regalo sorpresa muy especial que tengo para ti. ¡La intriga es parte de la diversión!",
        /* 13 - Dulce de caramelo */ "¡Para endulzar tu día! Este cupón es válido por tu dulce o snack favorito. ¡Solo pídelo y aparecerá!",
        /* 14 - Duende con regalo */ "¡Un ayudante de Santa te trae esto! Este cupón es válido para que yo me encargue de una tarea o pendiente que no quieras hacer.",
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
    const aboutContent = "Este Calendario de Adviento es un proyecto web creado con mucho cariño por Michell Alexis Policarpio Morán.\n\nEl hermoso diseño y las ilustraciones son obra de Alejandra Marín.\n\nPuedes encontrar el código de este proyecto en GitHub: MichellPolicarpio.";
    const howToContent = "¡Bienvenido a este calendario de adviento digital!\n\nCada día, desde el 1 hasta el 24 de diciembre, se desbloqueará una nueva sorpresa. Simplemente haz clic en el número del día correspondiente para revelar un mensaje especial.\n\n¡Pero cuidado! No podrás abrir los días futuros antes de tiempo. ¡Disfruta de la cuenta atrás para la Navidad!";
    const victorContent = "Alejandro, este calendario es más que un proyecto: es un pedacito de mi corazón hecho regalo para ti. Quiero que cada día te haga sentir tan especial como tú me haces sentir a mí. Felices fiestas, mi amor. ✨🎅";

    // --- FUNCIONES ---
    const openModalWithMessage = (content) => {
        modalMessage.innerText = content;
        modal.style.display = 'flex';
        navMenu.classList.remove('active'); // Cierra el menú hamburguesa si está abierto
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
        openModalWithMessage(aboutContent);
    });

    document.getElementById('how-to-link').addEventListener('click', (e) => {
        e.preventDefault();
        openModalWithMessage(howToContent);
    });

    document.getElementById('victor-link').addEventListener('click', (e) => {
        e.preventDefault();
        openModalWithMessage(victorContent);
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
                openModalWithMessage(messages[day - 1]);
            } else {
                notYetModal.style.display = 'flex';
            }
        });
    }
}); 