document.addEventListener('DOMContentLoaded', () => {
    // --- CREACIÓN DE ESTRELLAS DE FONDO ---
    const createStars = () => {
        const starsContainer = document.getElementById('stars-container');
        const starCount = 50; // Número de estrellas

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Tamaño aleatorio
            const sizes = ['small', 'medium', 'large'];
            const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
            star.classList.add(randomSize);

            // Posición aleatoria
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.left = x + '%';
            star.style.top = y + '%';

            // Algunas estrellas se mueven
            if (Math.random() > 0.7) {
                star.classList.add('moving');
            }

            // Retraso aleatorio para el parpadeo
            star.style.animationDelay = Math.random() * 3 + 's';

            starsContainer.appendChild(star);
        }
    };

    // Crear estrellas al cargar
    createStars();

    // --- GUIRNALDA BAJO LA NAVBAR ---
    const createGarland = () => {
        const garland = document.getElementById('garland');
        if (!garland) return;
        const colors = ['#FF5A5A', '#FFD166', '#7AE582', '#6EC6FF', '#C792EA'];
        const bulbs = 24;
        for (let i = 0; i < bulbs; i++) {
            const b = document.createElement('div');
            b.className = 'bulb';
            b.style.background = colors[i % colors.length];
            b.style.animationDelay = (Math.random() * 1.2).toFixed(2) + 's';
            garland.appendChild(b);
        }
    };
    createGarland();

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
    let unlockedDays = new Set();

    // --- CURSOR TRAIL (chispas) - SOLO DESKTOP ---
    (function cursorTrail() {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        const container = document.getElementById('confetti-container');
        if (!container || prefersReduced || isMobile) return; // Desactivar en móviles

        const colors = ['#FFFFFF', '#FFD166', '#FF5A5A', '#7AE582', '#6EC6FF', '#C792EA'];
        let last = 0;
        const minDeltaMs = 30; // más lento para mejor performance
        const maxSparks = 80; // reducido para performance

        const spawnSpark = (x, y) => {
            const s = document.createElement('div');
            s.className = 'cursor-spark';
            const size = 3 + Math.random() * 4; // 3-7px
            s.style.width = size + 'px';
            s.style.height = size + 'px';
            s.style.background = colors[Math.floor(Math.random() * colors.length)];
            // desplazamiento aleatorio hacia arriba
            const dx = (Math.random() - 0.5) * 28; // -14..14
            const dy = -18 - Math.random() * 22;   // -18..-40
            s.style.setProperty('--dx', dx.toFixed(1) + 'px');
            s.style.setProperty('--dy', dy.toFixed(1) + 'px');
            s.style.left = x + 'px';
            s.style.top = y + 'px';
            container.appendChild(s);
            setTimeout(() => s.remove(), 800);
        };

        const handler = (ev) => {
            const now = performance.now();
            if (now - last < minDeltaMs) return;
            last = now;
            // limpiar si hay demasiadas
            if (container.children.length > maxSparks) {
                const excess = container.children.length - maxSparks;
                for (let i = 0; i < excess; i++) container.firstChild?.remove();
            }
            const x = ev.clientX;
            const y = ev.clientY;
            spawnSpark(x, y);
        };

        window.addEventListener('mousemove', handler, { passive: true });
    })();

    // --- CLICK BURST (estallido al hacer clic) ---
    (function clickBurst() {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const container = document.getElementById('confetti-container');
        if (!container || prefersReduced) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        const colors = ['#FFFFFF', '#FFD166', '#FF5A5A', '#7AE582', '#6EC6FF', '#C792EA'];
        const maxNodes = isMobile ? 60 : 220; // Menos en móviles
        const burstCount = isMobile ? 8 : 18; // Menos partículas en móviles

        const spawnBurst = (x, y, n = burstCount) => {
            const radiusMin = 24, radiusMax = isMobile ? 40 : 60;
            for (let i = 0; i < n; i++) {
                const el = document.createElement('div');
                el.className = 'cursor-burst';
                const size = 4 + Math.random() * 6; // 4-10px
                el.style.width = size + 'px';
                el.style.height = size + 'px';
                el.style.background = colors[Math.floor(Math.random() * colors.length)];
                const angle = (Math.PI * 2 * i / n) + (Math.random() * 0.5 - 0.25);
                const r = radiusMin + Math.random() * (radiusMax - radiusMin);
                const dx = Math.cos(angle) * r;
                const dy = Math.sin(angle) * r;
                el.style.setProperty('--dx', dx.toFixed(1) + 'px');
                el.style.setProperty('--dy', dy.toFixed(1) + 'px');
                el.style.left = x + 'px';
                el.style.top = y + 'px';
                container.appendChild(el);
                setTimeout(() => el.remove(), 1100);
            }
            // Mantener el contenedor en un tamaño razonable
            const excess = container.children.length - maxNodes;
            if (excess > 0) {
                for (let i = 0; i < excess; i++) container.firstChild?.remove();
            }
        };

        window.addEventListener('click', (e) => {
            const count = isMobile ? burstCount : (burstCount + Math.floor(Math.random() * 8));
            spawnBurst(e.clientX, e.clientY, count);
        }, { passive: true });
    })();

    // --- PARALLAX SUAVE DE FONDO ---
    const parallaxTargets = {
        overlay: document.querySelector('.background-overlay'),
        stars: document.getElementById('stars-container')
    };
    const onParallax = (e) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const x = (e.clientX ?? w / 2) / w - 0.5;
        const y = (e.clientY ?? h / 2) / h - 0.5;
        if (parallaxTargets.overlay) {
            parallaxTargets.overlay.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
        }
        if (parallaxTargets.stars) {
            parallaxTargets.stars.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
        }
    };
    window.addEventListener('mousemove', onParallax);

    // --- FUNCIONES DE PROGRESO ---
    const updateProgressCounter = () => {
        const counter = document.getElementById('days-unlocked');
        const count = allDaysUnlocked ? 24 : unlockedDays.size;
        counter.textContent = count;

        // Animación del contador
        counter.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 200);
    };

    const unlockDay = (day) => {
        if (!unlockedDays.has(day)) {
            unlockedDays.add(day);
            updateProgressCounter();
        }
    };

    // --- EFECTOS DE SONIDO ---
    const createSoundEffect = (frequency, duration, type = 'sine') => {
        // Los efectos de sonido siempre funcionan, independiente de la música
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    };

    const playCardClickSound = () => {
        // Sonido de clic - siempre suena
        createSoundEffect(800, 0.1, 'sine');
        setTimeout(() => createSoundEffect(1000, 0.15, 'sine'), 50);
    };

    const playUnlockSound = () => {
        // Sonido de desbloqueo - siempre suena
        createSoundEffect(600, 0.2, 'sine');
        setTimeout(() => createSoundEffect(800, 0.2, 'sine'), 100);
        setTimeout(() => createSoundEffect(1000, 0.3, 'sine'), 200);
    };

    const playButtonClickSound = () => {
        // Sonido para botones de navegación
        createSoundEffect(400, 0.1, 'square');
        setTimeout(() => createSoundEffect(600, 0.15, 'square'), 50);
    };

    const playToggleSound = () => {
        // Sonido para botones de toggle (candado, sonido)
        createSoundEffect(300, 0.1, 'triangle');
        setTimeout(() => createSoundEffect(500, 0.1, 'triangle'), 100);
    };

    const playMenuSound = () => {
        // Sonido para menú hamburguesa
        createSoundEffect(200, 0.1, 'sawtooth');
        setTimeout(() => createSoundEffect(400, 0.1, 'sawtooth'), 50);
    };

    // --- CONTENIDO ---
    const messages = [
        /* 1 - Muñeco de nieve */ "¡Construyamos recuerdos juntos! Este cupón es válido para una tarde de películas navideñas y chocolate caliente.",
        /* 2 - Calcetines */ { type: 'image', src: 'Regalo_Cupones/Dia2.png' },
        /* 3 - Reno */ "¡Que la magia te guíe! Este cupón es válido para una salida nocturna a ver las luces de Navidad de la ciudad.",
        /* 4 - Corazón de chocolate */ "¡Un dulce para mi dulce! Válido por unos 'borrachitos', dulce típico de Puebla. ¡Espero que te encanten!",
        /* 5 - Árbol pino */ "¡Para decorar nuestro nido! Este cupón es válido para elegir juntos un nuevo adorno especial para nuestro árbol.",
        /* 6 - Santa */ "¡Ho, ho, ho! Santa dice que te has portado muy bien. Este cupón es válido por un deseo que yo te cumpliré.",
        /* 7 - Copo de nieve */ `<div class="poem-container">
            <h3 class="poem-title">POR ALGO</h3>
            <div class="poem-content">
                <div class="verse">Por algo nos encontramos,</div>
                <div class="verse">por algo coincidimos,</div>
                <div class="verse">por algo es que entre tantas personas</div>
                <div class="verse">decidí acercarme a tí,</div>
                <div class="verse">por algo es que mis ojos te buscan,</div>
                <div class="verse">por algo es que mis latidos te nombran,</div>
                <div class="verse">por algo es que mi piel te anhela,</div>
                <div class="verse">por algo es que mi lealtad te pertenece,</div>
                <div class="verse">algo hemos de tener,</div>
                <div class="verse">algo hermoso,</div>
                <div class="verse">algo has de ser en mi vida,</div>
                <div class="verse">algo o quizás todo.</div>
            </div>
            <div class="poem-signature">Te quiero, Vic.</div>
        </div>`,
        /* 8 - Pancake */ { type: 'image', src: 'Regalo_Cupones/Dia8.png', size: 'large' },
        /* 9 - Luces navideñas */ "¡Que la noche brille! Este cupón es válido para una pijamada con maratón de tu saga de películas favorita. ¡Yo pongo las palomitas!",
        /* 10 - Acertijo Galaxy Watch */ {
            type: 'html', html: `
            <div class="poem-container theme-blue">
                <h3 class="poem-title">DÍA 10</h3>
                <div class="poem-content">
                    <div class="verse" style="font-size: 1.15em; color: #FFD700; margin-bottom: 15px;">¿Qué soy?</div>
                    <div class="verse">Soy un recordatorio constante</div>
                    <div class="verse">de que pensé en ti al elegir este regalo.</div>
                    <div class="verse" style="margin-top: 15px;">Cuando veas las 11:11,</div>
                    <div class="verse">sabrás que estoy pensando en ti.</div>
                    <div class="verse" style="margin-top: 15px;">Vivo en tu muñeca,</div>
                    <div class="verse">y cada hora te recuerdo</div>
                    <div class="verse">que eres mi deseo cumplido.</div>
                    <div class="verse" style="margin-top: 20px; font-size: 1.2em; color: #C792EA;">✨ Cuando me abras, lo sabrás ✨</div>
                </div>
                <div class="poem-signature">La respuesta está en el regalo...</div>
            </div>
        ` },
        /* 11 - Campanas */ { type: 'image', src: 'Regalo_Cupones/Dia11.png' },
        /* 12 - Duendes Victor */ { type: 'image', src: 'Regalo_Cupones/Dia12.png', size: 'large' },
        /* 13 - Dulce de caramelo */ "¡Para endulzar tu día! Este cupón es válido por tu dulce o snack favorito. ¡Solo pídelo y aparecerá!",
        /* 14 - Duende con regalo */ { type: 'image', src: 'Regalo_Cupones/Dia14.png', size: 'large' },
        /* 15 - Oso para oficina */ {
            type: 'html', html: `
            <div class="poem-container theme-orange">
                <h3 class="poem-title">🧸 DÍA 15 🧸</h3>
                <div class="poem-content">
                    <picture>
                        <source type="image/webp" srcset="Regalo_Cupones/Dia15.webp">
                        <img src="Regalo_Cupones/Dia15.png" alt="Osito de regalo" style="max-width: 250px; margin: 15px auto; display: block; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    </picture>
                    <div class="verse" style="margin-top: 20px; font-size: 1.1em;">Este osito es para tu oficina 🏢</div>
                    <div class="verse">Un detallito que te conecte conmigo</div>
                    <div class="verse">cada vez que lo veas.</div>
                    <div class="verse" style="margin-top: 15px; font-style: italic; color: #FFD700;">¡Prométeme que le pondrás un nombre! 💕</div>
                </div>
                <div class="poem-signature">Con todo mi amor 🧸❤️</div>
            </div>
        ` },
        /* 16 - Cupón imagen */ { type: 'image', src: 'Regalo_Cupones/Dia16.png' },
        /* 17 - Cupón imagen */ { type: 'image', src: 'Regalo_Cupones/Dia17.png' },
        /* 18 - Acertijo misterioso */ {
            type: 'html', html: `
            <div class="poem-container theme-purple">
                <h3 class="poem-title">🔮 ACERTIJO DEL DÍA 18 🔮</h3>
                <div class="poem-content">
                    <div class="verse" style="font-size: 1.15em; color: #FFD700; margin-bottom: 15px;">¿Qué soy?</div>
                    <div class="verse">Soy dulce, pero no soy miel.</div>
                    <div class="verse">Vengo envuelto en papel brillante.</div>
                    <div class="verse">Me derrito con el calor de tus manos,</div>
                    <div class="verse">y con tu sonrisa también.</div>
                    <div class="verse" style="margin-top: 15px;">Nací de un grano que crece en tierras cálidas,</div>
                    <div class="verse">soy el favorito de muchos corazones,</div>
                    <div class="verse">y los enamorados me regalan con ilusiones.</div>
                    <div class="verse" style="margin-top: 20px; font-size: 1.2em; color: #C792EA;">🎁 El día 21 descubrirás el secreto... 🎁</div>
                </div>
                <div class="poem-signature">Guarda este acertijo en tu mente...</div>
            </div>
        ` },
        /* 19 - Guantes */ "Para tus manos, que siempre cuidan las mías. Este cupón es válido para un paseo largo, agarrados de la mano.",
        /* 20 - Revelación del acertijo */ {
            type: 'html', html: `
            <div class="poem-container theme-purple">
                <h3 class="poem-title">🍫 ¡RESPUESTA DEL ACERTIJO! 🍫</h3>
                <div class="poem-content">
                    <div class="verse" style="font-size: 1.2em; color: #FFD700; margin-bottom: 15px;">¿Recuerdas el acertijo del día 18?</div>
                    <div class="verse">Soy dulce, pero no soy miel...</div>
                    <div class="verse">Vengo envuelto en papel brillante...</div>
                    <div class="verse">Me derrito con el calor de tus manos...</div>
                    <div class="verse" style="margin-top: 20px; font-size: 1.3em; color: #C792EA;">✨ ¡La respuesta es: CHOCOLATES! ✨</div>
                    <div class="verse" style="margin-top: 15px;">Hoy te regalo una caja de chocolates,</div>
                    <div class="verse">porque tú endulzas mi vida cada día.</div>
                </div>
                <div class="poem-signature">Con todo mi amor... 🎁💝</div>
            </div>
        ` },
        /* 21 - Regalo 11 meses */ {
            type: 'html', html: `
            <div class="poem-container theme-teal">
                <h3 class="poem-title">💝 11 MESES JUNTOS 💝</h3>
                <div class="poem-content">
                    <div class="verse" style="font-size: 1.15em; color: #FFD700; margin-bottom: 15px;">Hoy celebramos 11 meses de amor...</div>
                    <div class="verse">Y para ti tengo algo especial:</div>
                    <picture>
                        <source type="image/webp" srcset="Regalo_Cupones/Dia21.webp">
                        <img src="Regalo_Cupones/Dia21.png" alt="Regalo misterioso" style="max-width: 200px; margin: 20px auto; display: block; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    </picture>
                    <div class="verse" style="margin-top: 15px; font-style: italic;">En su interior habitan criaturas</div>
                    <div class="verse" style="font-style: italic;">que ronronean bajo la luna,</div>
                    <div class="verse" style="font-style: italic;">con bigotes curiosos y ojos brillantes,</div>
                    <div class="verse" style="font-style: italic;">te llevarán a sueños encantados.</div>
                    <div class="verse" style="margin-top: 20px; font-size: 1.1em; color: #7AE582;">🎁 Desenvuélvelo y descubre el misterio... 🎁</div>
                </div>
                <div class="poem-signature">Felices 11 meses, mi amor 🐱🌙</div>
            </div>
        ` },
        /* 22 - Taza Quimixto */ {
            type: 'html', html: `
            <div class="poem-container theme-blue">
                <h3 class="poem-title">🥥 DÍA 22 🥥</h3>
                <div class="poem-content">
                    <picture>
                        <source type="image/webp" srcset="Regalo_Cupones/Dia22.webp">
                        <img src="Regalo_Cupones/Dia22.png" alt="Taza con recuerdo" style="max-width: 280px; margin: 15px auto; display: block; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    </picture>
                    <div class="verse" style="margin-top: 20px; font-size: 1.1em;">Una taza con nuestro recuerdo especial 💙</div>
                    <div class="verse" style="margin-top: 10px;">La cascada de Quimixto, Jalisco</div>
                    <div class="verse" style="font-style: italic;">Hace exactamente un mes vivimos esa aventura juntos.</div>
                    <div class="verse" style="margin-top: 15px;">Cada café que tomes, recuerda ese día mágico.</div>
                </div>
                <div class="poem-signature">Un recuerdo para siempre 🥥💧</div>
            </div>
        ` },
        /* 23 - Arbolito tabasqueño */ {
            type: 'html', html: `
            <div class="poem-container theme-green">
                <h3 class="poem-title">🌱 DÍA 23 🌱</h3>
                <div class="poem-content">
                    <picture>
                        <source type="image/webp" srcset="Regalo_Cupones/Dia23.webp">
                        <img src="Regalo_Cupones/Dia23.png" alt="Arbolito tabasqueño" style="max-width: 280px; margin: 15px auto; display: block; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    </picture>
                    <div class="verse" style="margin-top: 20px; font-size: 1.1em;">Te regalo con mucho amor y dedicación</div>
                    <div class="verse">este arbolito tabasqueño 🌳</div>
                    <div class="verse" style="margin-top: 15px; font-style: italic;">Ojalá brote vida en tus terrenos</div>
                    <div class="verse" style="font-style: italic;">y crezca tan fuerte como nuestro amor.</div>
                </div>
                <div class="poem-signature">Con todo mi corazón 💚</div>
            </div>
        ` },
        /* 24 - Bolsa misteriosa */ { type: 'mystery-bag', message: "🎁 ¡FELIZ NOCHEBUENA! 🎁\n\nHas llegado al final del calendario, mi amor. Hoy te espera algo muy especial: una bolsa misteriosa que guarda un regalo pensado especialmente para ti.\n\nPero esta bolsa tiene sus propias reglas... tiene un momento mágico para abrirse. Solo cuando el reloj marque las 11:42 PM podrás descubrir qué hay dentro.\n\nLa paciencia es parte del misterio. ¡Espera el momento perfecto!" }
    ];

    // Selector de mensaje (permite override creativo sin tocar el array original)
    const getMessage = (day) => {
        const arr = (window && window.__overrideMessages) ? window.__overrideMessages : messages;
        return arr[day - 1];
    };
    const aboutContent = `
        <div class="about-modal">
            <h2>✨ Acerca de este calendario ✨</h2>
            <div class="about-author">Hecho por: Michell Policarpio</div>
            <div class="about-desc">
                Este calendario de adviento fue creado con mucho amor y dedicación como un regalo especial. 
                Cada día guarda una sorpresa pensada especialmente para ti.
            </div>
            <div class="about-desc" style="margin-top: 20px;">
                Es más que un proyecto: es un pedacito de mi corazón convertido en 24 días de magia, 
                poemas, cupones y momentos especiales que quiero compartir contigo.
            </div>
            <div class="about-desc" style="margin-top: 20px; font-style: italic; color: #FFD700;">
                Espero que cada día te traiga una sonrisa y te recuerde lo especial que eres para mí. 💝
            </div>
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

    // Ventisca breve: configurable en duración e intensidad
    function launchBlizzard(durationMs = 3000, opts = {}) {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;
        const container = document.getElementById('confetti-container');
        if (!container) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        // Valores reducidos para móviles
        const mobileMultiplier = isMobile ? 0.4 : 1;

        // Rango de parámetros (con valores por defecto, reducidos en móviles)
        const countMin = Math.floor(((opts.countRange && opts.countRange[0]) ?? 16) * mobileMultiplier);
        const countMax = Math.floor(((opts.countRange && opts.countRange[1]) ?? 31) * mobileMultiplier);
        const nextMin = ((opts.burstIntervalRange && opts.burstIntervalRange[0]) ?? 140) * (isMobile ? 2 : 1); // Más lento en móviles
        const nextMax = ((opts.burstIntervalRange && opts.burstIntervalRange[1]) ?? 300) * (isMobile ? 2 : 1);
        const sizeMin = (opts.sizeRange && opts.sizeRange[0]) ?? 3; // px
        const sizeMax = (opts.sizeRange && opts.sizeRange[1]) ?? 8; // px
        const driftMin = (opts.driftRange && opts.driftRange[0]) ?? -40; // px
        const driftMax = (opts.driftRange && opts.driftRange[1]) ?? 40; // px
        const durMin = (opts.durRange && opts.durRange[0]) ?? 1200; // ms
        const durMax = (opts.durRange && opts.durRange[1]) ?? 2600; // ms

        const start = performance.now();
        const spawn = () => {
            const now = performance.now();
            if (now - start > durationMs) return; // cortar spawns

            // Cantidad por ráfaga (aleatoria dentro de un rango)
            const count = countMin + Math.floor(Math.random() * Math.max(1, (countMax - countMin + 1)));
            for (let i = 0; i < count; i++) {
                const flake = document.createElement('div');
                flake.className = 'blizzard';
                const xvw = Math.random() * 100; // posición inicial horizontal
                const size = sizeMin + Math.random() * Math.max(0.1, (sizeMax - sizeMin));
                const drift = driftMin + Math.random() * Math.max(0.1, (driftMax - driftMin));
                const dur = durMin + Math.random() * Math.max(0.1, (durMax - durMin));
                flake.style.left = xvw + 'vw';
                flake.style.width = size + 'px';
                flake.style.height = size + 'px';
                flake.style.setProperty('--sx', drift.toFixed(1) + 'px');
                flake.style.setProperty('--dur', dur.toFixed(0) + 'ms');
                container.appendChild(flake);
                setTimeout(() => flake.remove(), dur + 200);
            }
            // Programar próxima ráfaga con pequeño jitter
            const nextIn = nextMin + Math.random() * Math.max(1, (nextMax - nextMin));
            setTimeout(spawn, nextIn);
        };
        spawn();
    }

    // Día seleccionado (para extras LDR)
    let lastOpenedDay = null;

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
            const webpSrc = content.src.replace(/\.png$/i, '.webp');
            modalBody.innerHTML = `
                <picture>
                    <source type="image/webp" srcset="${webpSrc}">
                    <img src="${content.src}" alt="Cupón del día" loading="lazy" decoding="async" fetchpriority="low">
                </picture>`;
            modal.classList.add('image-modal');
            if (content.size === 'large') {
                modal.classList.add('large-image');
            }
        } else if (typeof content === 'object' && content !== null && content.type === 'html') {
            modalBody.innerHTML = content.html;
        } else if (typeof content === 'object' && content !== null && content.type === 'mystery-bag') {
            modalBody.innerHTML = `<p>${content.message}</p>`;
        } else {
            modalBody.innerHTML = `<p>${content}</p>`;
        }
        // Aplicar un tema de color distinto por día a las tarjetas de mensaje
        if (isDay) {
            const poemThemes = [
                'theme-red',
                'theme-green',
                'theme-blue',
                'theme-purple',
                'theme-teal',
                'theme-orange',
                'theme-pink',
                'theme-indigo',
                'theme-emerald',
                'theme-rose'
            ];
            const themeIndex = typeof lastOpenedDay === 'number' && lastOpenedDay > 0
                ? (lastOpenedDay - 1) % poemThemes.length
                : 0;
            const themeClass = poemThemes[themeIndex];
            const poemContainers = modalBody.querySelectorAll('.poem-container');
            poemContainers.forEach(pc => pc.classList.add(themeClass));
        }
        // Extras para relación a distancia y guiños en polaco
        if (isDay && typeof lastOpenedDay === 'number' && modalType === null) {
            const extras = {
                3: ["Si estamos lejos hoy:", "paseo virtual por Cracovia."],
                9: ["Si estamos lejos:", "verla en simultáneo por videollamada."],
                16: ["📺 Pendiente:", "¡Ver juntos la 5ta temporada de Stranger Things!"],
                18: ["Pista extra:", "Es un regalo que se puede compartir... "],
                19: ["Si estamos lejos:", "paseo en llamada, cada uno en su ciudad."],
                20: ["Frase en polaco:", "Kocham Cię (Te amo)."],
                24: ["Wesołych Świąt! (¡Felices Fiestas!)"]
            };
            const lines = extras[lastOpenedDay];
            if (lines) {
                const extraBlock = document.createElement('div');
                extraBlock.className = 'poem-content';
                extraBlock.innerHTML = lines.map(t => `<div class="verse">${t}</div>`).join('');
                modalBody.appendChild(extraBlock);
            }
        }
        // Optimiza carga/decodificación si el modal contiene imagen
        const _modalImg = modalBody.querySelector('img');
        if (_modalImg) {
            _modalImg.loading = 'lazy';
            _modalImg.decoding = 'async';
            _modalImg.setAttribute('fetchpriority', 'low');
        }
        modal.style.display = 'flex';
        navMenu.classList.remove('active'); // Cierra el menú hamburguesa si está abierto
        if (isDay) {
            launchConfetti();
            if (lastOpenedDay === 24) {
                launchBlizzard(3000);
            }
        }
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
        playMenuSound();
        navMenu.classList.toggle('active');
    });

    document.getElementById('about-link').addEventListener('click', (e) => {
        e.preventDefault();
        playButtonClickSound();
        openModalWithMessage(aboutContent, false, 'about');
    });

    document.getElementById('how-to-link').addEventListener('click', (e) => {
        e.preventDefault();
        playButtonClickSound();
        openModalWithMessage(howToContent, false, 'howto');
    });

    document.getElementById('victor-link').addEventListener('click', (e) => {
        e.preventDefault();
        playButtonClickSound();
        openModalWithMessage(victorContent, false, 'victor');
    });

    soundToggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        playToggleSound();
        isSoundOn = !isSoundOn;
        if (isSoundOn) {
            backgroundMusic.play();
            soundToggleButton.innerText = '🔊';
        } else {
            backgroundMusic.pause();
            soundToggleButton.innerText = '🔇';
        }
        navMenu.classList.remove('active');
        // Nota: Los efectos de sonido siempre funcionan, solo la música se controla aquí
    });

    // Botón de bloqueo
    lockToggleButton.addEventListener('click', () => {
        playToggleSound();

        // Si ya está desbloqueado, simplemente bloquearlo
        if (allDaysUnlocked) {
            allDaysUnlocked = false;
            lockToggleButton.innerText = '🔓';
            return;
        }

        // Si está bloqueado, pedir código para desbloquear
        const code = prompt('🔐 Ingresa el código para previsualizar todos los días:');

        if (code === '6276') {
            allDaysUnlocked = true;
            lockToggleButton.innerText = '🔒';
            playUnlockSound();
        } else if (code !== null) {
            // Solo mostrar error si el usuario ingresó algo (no si canceló)
            alert('❌ Código incorrecto. Intenta de nuevo.');
            playButtonClickSound();
        }
    });

    // Cierre de modales
    closeButton.addEventListener('click', closeModal);
    notYetCloseButton.addEventListener('click', closeNotYetModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) closeModal();
        if (event.target == notYetModal) closeNotYetModal();
    });

    // Cierre de modales con tecla Escape
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            try {
                const modalVisible = modal && getComputedStyle(modal).display !== 'none';
                const notYetVisible = notYetModal && getComputedStyle(notYetModal).display !== 'none';
                if (modalVisible) closeModal();
                if (notYetVisible) closeNotYetModal();
            } catch (_) {
                // Si getComputedStyle falla por algún motivo, intentar por fallback
                if (modal && modal.style.display === 'flex') closeModal();
                if (notYetModal && notYetModal.style.display === 'flex') closeNotYetModal();
            }
        }
    });

    // --- GENERACIÓN DEL CALENDARIO ---
    const totalDays = 24;
    for (let i = 1; i <= totalDays; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day-square');
        daySquare.dataset.day = i;

        // Aplicar retraso escalonado para la animación (más rápido)
        daySquare.style.animationDelay = `${i * 0.05}s`;

        const dayImage = document.createElement('img');
        dayImage.alt = `Día ${i}`;
        dayImage.loading = 'lazy'; // Lazy loading para mejor performance
        dayImage.decoding = 'async';
        dayImage.setAttribute('fetchpriority', 'low');
        dayImage.src = `Iconos_gif_dias/${i}.gif`;

        daySquare.appendChild(dayImage);
        calendarContainer.appendChild(daySquare);

        // Efecto tilt 3D sutil por tarjeta
        const maxTilt = 8; // grados
        const onMove = (ev) => {
            const rect = daySquare.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const px = (ev.clientX - cx) / (rect.width / 2);
            const py = (ev.clientY - cy) / (rect.height / 2);
            const rx = (-py * maxTilt).toFixed(2);
            const ry = (px * maxTilt).toFixed(2);
            daySquare.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
        };
        const onLeave = () => {
            daySquare.style.transform = '';
        };
        daySquare.addEventListener('mousemove', onMove);
        daySquare.addEventListener('mouseleave', onLeave);

        // Marcar días disponibles visualmente
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth();

        // Desbloqueo por días de diciembre (mes 11 en JS)
        if (currentMonth === 11 && currentDay >= i) {
            daySquare.classList.add('available');
        }

        daySquare.addEventListener('click', () => {
            const day = parseInt(daySquare.dataset.day);
            lastOpenedDay = day;
            const today = new Date();
            const currentDay = today.getDate();
            const currentMonth = today.getMonth();

            // Desbloqueo activo para diciembre (mes 11 en JS)
            if (allDaysUnlocked || (currentMonth === 11 && currentDay >= day)) {
                // Lógica especial para el día 24 (bolsa misteriosa)
                if (day === 24) {
                    const now = new Date();
                    const currentHour = now.getHours();
                    const currentMinute = now.getMinutes();
                    const targetHour = 23; // 11 PM
                    const targetMinute = 42; // 42 minutos

                    // Verificar si es 11:42 PM o después (o si todos los días están desbloqueados)
                    const isTimeToOpen = allDaysUnlocked ||
                        (currentHour > targetHour || (currentHour === targetHour && currentMinute >= targetMinute));

                    if (isTimeToOpen) {
                        playUnlockSound();
                        unlockDay(day);
                        openModalWithMessage(getMessage(day), true);
                    } else {
                        // Mostrar mensaje de espera misterioso
                        playCardClickSound();
                        navMenu.classList.remove('active');
                        const waitMessage = {
                            type: 'html',
                            html: `
                                <div class="poem-container theme-purple">
                                    <h3 class="poem-title">⏰ BOLSA MISTERIOSA ⏰</h3>
                                    <div class="poem-content">
                                        <div class="verse">Esta bolsa guarda un secreto especial,</div>
                                        <div class="verse">pero tiene su momento mágico para abrirse.</div>
                                        <div class="verse">Debes esperar hasta las 11:42 PM</div>
                                        <div class="verse">para descubrir qué hay dentro.</div>
                                        <div class="verse" style="margin-top: 15px; font-size: 1.2em;">⏳ La paciencia es parte del misterio ⏳</div>
                                        <div class="verse" style="margin-top: 10px; color: #FFD700;">Hora actual: ${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}</div>
                                    </div>
                                    <div class="poem-signature">El tiempo lo es todo...</div>
                                </div>
                            `
                        };
                        openModalWithMessage(waitMessage, true);
                    }
                } else {
                    playUnlockSound();
                    unlockDay(day);
                    openModalWithMessage(getMessage(day), true);
                }
            } else {
                playCardClickSound();
                // Asegura que el menú no quede sobre el modal
                navMenu.classList.remove('active');
                notYetModal.style.display = 'flex';
            }
        });
    }

    // --- PREFETCH DEL DÍA SIGUIENTE (warming de caché) ---
    try {
        const today = new Date();
        const month = today.getMonth(); // 0-11
        const isSeason = (month === 10 || month === 11); // nov o dic (útil para pruebas previas)
        const day = today.getDate();
        const next = Math.min(24, day + 1);
        const linkPrefetch = (href) => {
            try {
                const l = document.createElement('link');
                l.rel = 'prefetch';
                l.as = 'image';
                l.href = href;
                document.head.appendChild(l);
            } catch (_) { }
        };
        if (day >= 1 && day <= 24 && isSeason) {
            linkPrefetch(`Iconos_gif_dias/${day}.gif`);
            linkPrefetch(`Iconos_gif_dias/${next}.gif`);
            const couponImages = { 2: 'Regalo_Cupones/Dia2.png', 8: 'Regalo_Cupones/Dia8.png', 11: 'Regalo_Cupones/Dia11.png', 14: 'Regalo_Cupones/Dia14.png' };
            if (couponImages[day]) linkPrefetch(couponImages[day]);
            if (couponImages[next]) linkPrefetch(couponImages[next]);
        }
    } catch (_) { /* no-op */ }

    // --- Service Worker: registro para cachear estáticos ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => { });
        });
    }

    // Al cargar la página, activar la música y el icono
    backgroundMusic.volume = 0.5;
    backgroundMusic.preload = 'metadata'; // Solo precarga los metadatos, no todo el archivo
    backgroundMusic.play().then(() => {
        soundToggleButton.innerText = '🔊';
    }).catch(() => {
        // Si el navegador bloquea el autoplay, el usuario podrá activarlo manualmente
        soundToggleButton.innerText = '🔇';
        isSoundOn = false;
    });

    // Optimización: reemplazar GIFs por video WebM con fallback y lazy-init
    (function optimizeDayMedia() {
        const squares = document.querySelectorAll('.day-square');
        squares.forEach((sq, idx) => {
            const img = sq.querySelector('img');
            if (!img) return;
            // Optimiza el <img> existente por si se mantiene como fallback
            img.loading = 'lazy';
            img.decoding = 'async';
            const match = (img.getAttribute('src') || '').match(/Iconos_gif_dias\/(\d+)\.gif$/);
            const index = match ? parseInt(match[1], 10) : (idx + 1);

            const video = document.createElement('video');
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'metadata';
            video.width = 150;
            video.height = 150;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'contain';

            const source = document.createElement('source');
            source.type = 'video/webm';
            source.src = `Iconos_gif_dias/${index}.webm`;
            video.appendChild(source);

            const useFallback = () => {
                if (!sq.contains(img)) {
                    // reinsert fallback if video was there
                    sq.innerHTML = '';
                    img.loading = 'lazy';
                    img.decoding = 'async';
                    img.width = 150;
                    img.height = 150;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'contain';
                    sq.appendChild(img);
                }
            };
            source.addEventListener('error', useFallback);
            video.addEventListener('error', useFallback);

            // Lazy-init cuando el card es visible
            if ('IntersectionObserver' in window) {
                const io = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.load();
                            video.play().catch(() => { });
                            obs.unobserve(entry.target);
                        }
                    });
                }, { rootMargin: '200px' });
                io.observe(sq);
            }

            try {
                sq.replaceChild(video, img);
            } catch (_) {
                // si no se puede reemplazar, añádelo al final
                sq.appendChild(video);
            }
        });
    })();

    // Override creativo de mensajes (dedicatorias y tarjetas animadas)
    window.__overrideMessages = [
        {
            type: 'html', html: `
            <div class="poem-container">
                <h3 class="poem-title">DÍA 1 — Comienzo</h3>
                <div class="poem-content">
                    <div class="verse">Empieza diciembre y contigo,</div>
                    <div class="verse">empieza también mi sonrisa.</div>
                    <div class="verse">Cada día a tu lado</div>
                    <div class="verse">es un pequeño milagro.</div>
                    <div class="verse">Hoy te regalo presencia,</div>
                    <div class="verse">cariño y ganas de verte.</div>
                </div>
                <div class="poem-signature">Con amor, de mí para ti.</div>
            </div>
        ` },
        { type: 'image', src: 'Regalo_Cupones/Dia2.png' },
        {
            type: 'html', html: `
            <div class="poem-container">
                <h3 class="poem-title">DÍA 3 — Luces</h3>
                <div class="poem-content">
                    <div class="verse">Cuando se encienden las luces,</div>
                    <div class="verse">brilla tu risa también.</div>
                    <div class="verse">Si caminas a mi lado,</div>
                    <div class="verse">la ciudad parece un cuento.</div>
                    <div class="verse">Cupón válido por paseo nocturno</div>
                    <div class="verse">y fotos abrazados.</div>
                </div>
                <div class="poem-signature">¿Vamos a ver luces?</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container">
                <h3 class="poem-title">DÍA 4 — Dulzura</h3>
                <div class="poem-content">
                    <div class="verse">Un detalle de azúcar,</div>
                    <div class="verse">y otro de canela.</div>
                    <div class="verse">Para un corazón dulce,</div>
                    <div class="verse">mi mejor receta: quererte.</div>
                    <div class="verse">Cupón: tu postre favorito,</div>
                    <div class="verse">hecho o comprado, pero contigo.</div>
                </div>
                <div class="poem-signature">Tú eliges el antojo.</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container">
                <h3 class="poem-title">DÍA 5 — Nuestro rincón</h3>
                <div class="poem-content">
                    <div class="verse">Decoremos un recuerdo,</div>
                    <div class="verse">un detalle para nosotros.</div>
                    <div class="verse">Cupón: elegir un adorno</div>
                    <div class="verse">que cuente nuestra historia.</div>
                </div>
                <div class="poem-signature">Lo guardamos cada año.</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container">
                <h3 class="poem-title">DÍA 6 — Deseo</h3>
                <div class="poem-content">
                    <div class="verse">Pide algo en secreto,</div>
                    <div class="verse">yo pongo el corazón.</div>
                    <div class="verse">Cupón: un deseo tuyo,</div>
                    <div class="verse">y todo mi empeño.</div>
                </div>
                <div class="poem-signature">Hecho con cariño.</div>
            </div>
        ` },
        // 7 — Poema original (se mantiene)
        `<div class="poem-container">
            <h3 class="poem-title">POR ALGO</h3>
            <div class="poem-content">
                <div class="verse">Por algo nos encontramos,</div>
                <div class="verse">por algo coincidimos,</div>
                <div class="verse">por algo es que entre tantas personas</div>
                <div class="verse">decidí acercarme a ti,</div>
                <div class="verse">por algo es que mis ojos te buscan,</div>
                <div class="verse">por algo es que mis latidos te nombran,</div>
                <div class="verse">por algo es que mi piel te anhela,</div>
                <div class="verse">por algo es que mi lealtad te pertenece,</div>
                <div class="verse">algo hemos de tener,</div>
                <div class="verse">algo hermoso,</div>
                <div class="verse">algo has de ser en mi vida,</div>
                <div class="verse">algo o quizá todo.</div>
            </div>
            <div class="poem-signature">Te quiero, Vic.</div>
        </div>`,
        { type: 'image', src: 'Regalo_Cupones/Dia8.png', size: 'large' },
        {
            type: 'html', html: `
            <div class="poem-container">
                <h3 class="poem-title">DÍA 9 — Pijamada</h3>
                <div class="poem-content">
                    <div class="verse">Pijama, cobija y palomitas,</div>
                    <div class="verse">tu saga favorita en loop.</div>
                    <div class="verse">Cupón: maratón contigo,</div>
                    <div class="verse">pausas para besos.</div>
                </div>
                <div class="poem-signature">Yo llevo las ganas.</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container theme-blue">
                <h3 class="poem-title">DÍA 10</h3>
                <div class="poem-content">
                    <div class="verse" style="font-size: 1.15em; color: #FFD700; margin-bottom: 15px;">¿Qué soy?</div>
                    <div class="verse">Soy un recordatorio constante</div>
                    <div class="verse">de que pensé en ti al elegir este regalo.</div>
                    <div class="verse" style="margin-top: 15px;">Cuando veas las 11:11,</div>
                    <div class="verse">sabrás que estoy pensando en ti.</div>
                    <div class="verse" style="margin-top: 15px;">Vivo en tu muñeca,</div>
                    <div class="verse">y cada hora te recuerdo</div>
                    <div class="verse">que eres mi deseo cumplido.</div>
                    <div class="verse" style="margin-top: 20px; font-size: 1.2em; color: #C792EA;">✨ Cuando me abras, lo sabrás ✨</div>
                </div>
                <div class="poem-signature">La respuesta está en el regalo...</div>
            </div>
        ` },
        { type: 'image', src: 'Regalo_Cupones/Dia11.png' },
        { type: 'image', src: 'Regalo_Cupones/Dia12.png', size: 'large' },
        {
            type: 'html', html: `
            <div class="poem-container">
                <h3 class="poem-title">DÍA 13 — Detalle</h3>
                <div class="poem-content">
                    <div class="verse">Un antojo tuyo hoy,</div>
                    <div class="verse">sin preguntas ni peros.</div>
                    <div class="verse">Cupón: tu snack favorito,</div>
                    <div class="verse">y una mirada cómplice.</div>
                </div>
                <div class="poem-signature">Yo invito.</div>
            </div>
        ` },
        { type: 'image', src: 'Regalo_Cupones/Dia14.png', size: 'large' },
        {
            type: 'html', html: `
            <div class="poem-container theme-orange">
                <h3 class="poem-title">🧸 DÍA 15 🧸</h3>
                <div class="poem-content">
                    <picture>
                        <source type="image/webp" srcset="Regalo_Cupones/Dia15.webp">
                        <img src="Regalo_Cupones/Dia15.png" alt="Osito" style="max-width: 200px; margin: 12px auto; display: block; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                    </picture>
                    <div class="verse" style="margin-top: 15px;">Para tu oficina 🏢</div>
                    <div class="verse">Un detallito que te conecte conmigo.</div>
                    <div class="verse" style="font-style: italic; color: #FFD700;">¡Prométeme ponerle nombre! 💕</div>
                </div>
                <div class="poem-signature">🧸❤️</div>
            </div>
        ` },
        { type: 'image', src: 'Regalo_Cupones/Dia16.png' },
        { type: 'image', src: 'Regalo_Cupones/Dia17.png' },
        {
            type: 'html', html: `
            <div class="poem-container theme-purple">
                <h3 class="poem-title">🔮 DÍA 18 — Acertijo 🔮</h3>
                <div class="poem-content">
                    <div class="verse">Un misterio dulce te espera,</div>
                    <div class="verse">envuelto y escondido.</div>
                    <div class="verse">Resuelve el acertijo,</div>
                    <div class="verse">y el 21 será revelado.</div>
                </div>
                <div class="poem-signature">Paciencia, mi amor...</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container">
                <h3 class="poem-title">DÍA 19 — Paseo</h3>
                <div class="poem-content">
                    <div class="verse">Tus manos en las mías,</div>
                    <div class="verse">el mundo se calma.</div>
                    <div class="verse">Cupón: caminata larga,</div>
                    <div class="verse">y hablar de nosotros.</div>
                </div>
                <div class="poem-signature">Sin prisa.</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container theme-purple">
                <h3 class="poem-title">🍫 DÍA 20 — ¡Revelación! 🍫</h3>
                <div class="poem-content">
                    <div class="verse">El acertijo tenía respuesta,</div>
                    <div class="verse">y hoy te la revelo:</div>
                    <div class="verse">¡CHOCOLATES para ti!</div>
                    <div class="verse">Porque endulzas mi vida.</div>
                </div>
                <div class="poem-signature">Con amor... 💝</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container theme-teal">
                <h3 class="poem-title">💝 DÍA 21 — 11 Meses 💝</h3>
                <div class="poem-content">
                    <div class="verse">Hoy celebramos 11 meses juntos,</div>
                    <div class="verse">y hay algo envuelto para ti.</div>
                    <picture>
                        <source type="image/webp" srcset="Regalo_Cupones/Dia21.webp">
                        <img src="Regalo_Cupones/Dia21.png" alt="Regalo misterioso" style="max-width: 180px; margin: 15px auto; display: block; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                    </picture>
                    <div class="verse">Criaturas que ronronean</div>
                    <div class="verse">te esperan en su interior...</div>
                </div>
                <div class="poem-signature">¿Qué será? 🎁🐱</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container theme-blue">
                <h3 class="poem-title">🥥 DÍA 22 🥥</h3>
                <div class="poem-content">
                    <picture>
                        <source type="image/webp" srcset="Regalo_Cupones/Dia22.webp">
                        <img src="Regalo_Cupones/Dia22.png" alt="Taza con recuerdo" style="max-width: 250px; margin: 15px auto; display: block; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                    </picture>
                    <div class="verse" style="margin-top: 15px;">Taza con nuestro recuerdo 💙</div>
                    <div class="verse">Quimixto, Jalisco - hace un mes</div>
                </div>
                <div class="poem-signature">🥥💧</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container theme-green">
                <h3 class="poem-title">🌱 DÍA 23 🌱</h3>
                <div class="poem-content">
                    <picture>
                        <source type="image/webp" srcset="Regalo_Cupones/Dia23.webp">
                        <img src="Regalo_Cupones/Dia23.png" alt="Arbolito tabasqueño" style="max-width: 250px; margin: 15px auto; display: block; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                    </picture>
                    <div class="verse" style="margin-top: 15px;">Con amor y dedicación,</div>
                    <div class="verse">este arbolito tabasqueño 🌳</div>
                    <div class="verse" style="font-style: italic;">Que brote vida en tus terrenos.</div>
                </div>
                <div class="poem-signature">💚</div>
            </div>
        ` },
        {
            type: 'html', html: `
            <div class="poem-container theme-purple">
                <h3 class="poem-title">🎁 DÍA 24 — BOLSA MISTERIOSA 🎁</h3>
                <div class="poem-content">
                    <div class="verse">¡Feliz Nochebuena, mi amor!</div>
                    <div class="verse">Has llegado al final del calendario.</div>
                    <div class="verse" style="margin-top: 15px; font-size: 1.2em; color: #FFD700;">✨ ¡Es hora de abrir tu bolsa misteriosa! ✨</div>
                    <div class="verse" style="margin-top: 15px;">Dentro encontrarás algo especial</div>
                    <div class="verse">que elegí pensando en ti.</div>
                    <div class="verse" style="margin-top: 15px; font-size: 1.1em;">Espero que te guste tanto</div>
                    <div class="verse">como me gusta verte sonreír.</div>
                </div>
                <div class="poem-signature">Con todo mi amor, siempre. 💝</div>
            </div>
        ` }
    ];

    // Inicializar contador de progreso
    updateProgressCounter();
}); 
