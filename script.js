



        window.addEventListener("scroll", () => {
            const btn = document.getElementById("btnSubir");
            if (window.scrollY > 300) {
            btn.classList.add("visible");
            } else {
            btn.classList.remove("visible");
            }
        });

        // Hacer scroll suave hacia arriba
        document.getElementById("btnSubir").addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });



        document.addEventListener('DOMContentLoaded', () => {
            
            // --- Configuración de la Cuenta Regresiva ---
            const partyDate = new Date("feb 21, 2026 21:00:00").getTime(); 

            const countdownFunction = setInterval(() => {
                const now = new Date().getTime();
                const distance = partyDate - now;

                const daysEl = document.getElementById("days");
                const hoursEl = document.getElementById("hours");
                const minutesEl = document.getElementById("minutes");
                const secondsEl = document.getElementById("seconds");
                const timerEl = document.getElementById("timer");

                if (distance >= 0) {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
                    if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
                    if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
                    if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
                } else {
                    clearInterval(countdownFunction);
                    if (timerEl) {
                        timerEl.innerHTML = "<div class='time-block' style='width:100%; background-color: var(--primary-color); color: var(--text-color-hero); padding: 30px; border-radius:10px;'><h3 style='color: var(--text-color-hero); font-size:1.8rem; font-family: var(--font-display);'>¡La noche mágica ha llegado!</h3></div>";
                    }
                }
            }, 1000);

            // --- Configuración del Carrusel ---
            const carouselInner = document.querySelector('.carousel-inner');
            const items = document.querySelectorAll('.carousel-item');
            let currentIndex = 0;
            const totalItems = items.length;
            let autoPlayInterval;

            window.updateCarousel = function() { // Added 'window.'
                if (carouselInner && items.length > 0) {
                    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
                    items.forEach((item, index) => {
                        item.classList.toggle('active', index === currentIndex);
                    });
                }
            }

            window.moveSlide = function(direction) {
                if (items.length === 0) return;
                currentIndex = (currentIndex + direction + totalItems) % totalItems;
                updateCarousel();
            }

            function startAutoPlay() {
                if (items.length > 0) {
                   autoPlayInterval = setInterval(() => moveSlide(1), 5000);
                }
            }
            function stopAutoPlay() { clearInterval(autoPlayInterval); }

            const carousel = document.querySelector('.carousel');
            if (carousel) {
                carousel.addEventListener('mouseenter', stopAutoPlay);
                carousel.addEventListener('mouseleave', startAutoPlay);
                if (items.length > 0) updateCarousel(); 
                startAutoPlay(); 
            }

            // --- Efecto de aparición ---
            const sections = document.querySelectorAll('.section');
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            sections.forEach(section => sectionObserver.observe(section));

            // --- Footer Year ---
            const yearEl = document.getElementById('year');
            if (yearEl) yearEl.textContent = new Date().getFullYear();

            // --- Scroll suave ---
            const scrollArrow = document.querySelector('.scroll-down-arrow');
            if (scrollArrow) {
                scrollArrow.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        });

        // --- Modal Logic ---
        const modal = document.getElementById("myModal");
        const modalMessage = document.getElementById("modalMessage");
        const WAPP_NUMBER = "59892050749"; // <-- CAMBIA ESTE NÚMERO
        const QUINCEANERA_NAME = "Mili"; 
        const PARTY_DATE_LIMIT = "31 de Enero, 2025"; 

        function showModal(message) {
            if (modal && modalMessage) {
              modalMessage.innerHTML = message; 
              modal.style.display = "block";
            }
        }

        window.hideModal = function() { 
            if (modal) {
              modal.style.display = "none";
            }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                hideModal();
            }
        }

        // --- Replace Alert Functions ---
        function mensajeAgendar() {
            showModal(`¡Qué bien que quieras agendarlo! <br><strong>21 de Febrero, 2026 a las 21:00 hs</strong>. <br><br> ¡Asegúrate de marcarlo en tu calendario! <br> <a title="Add to Calendar" style="color:#ad833c; class="addeventatc mi-btn" data-id="yh27071423" href="https://www.addevent.com/event/z3nhpk4v273x" target="_blank">Agendar</a>`);
           
        }
        
       function mensajeRegalos() {
        showModal(`
            ¡Tu presencia es mi mayor regalo!<br><br>
            Si de todas formas querés tener un detalle, podés hacerlo por estos medios:<br><br>

            <strong>Meli</strong><br>
            <strong>Cuenta:</strong> <br>
            <strong>Cédula:</strong><br><br>

            ¡Muchas gracias por tu cariño!
        `);
    }


      function mensajeAsistencia() {
            const formularioURL = "#";

            showModal(`¡Me encantaría que vinieras! Por favor, haz clic para confirmar tu asistencia antes del <strong>${PARTY_DATE_LIMIT}</strong>.<br><br>
            <a href='${formularioURL}' target='_blank' class='btn btn-primary'>Confirmar asistencia</a>`);
        }


        // --- Prevent Default & Attach Modals ---
        document.querySelectorAll('a[onclick^="mensaje"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
        
        // --- Get Close Button and Add Listener ---
        const span = document.querySelector(".close-button");
         if (span) {
           span.onclick = hideModal;
        }

          const audio = document.getElementById('musicaFondo');
            const boton = document.getElementById('btnMusica');

            boton.addEventListener('click', () => {
                audio.play();
                boton.style.display = 'none'; // Oculta el botón una vez que suena
    });

    function abrirModal() {
  document.getElementById("menuModal").style.display = "block";
}

function cerrarModal() {
  document.getElementById("menuModal").style.display = "none";
}

// Cierra el modal al hacer clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById("menuModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

 