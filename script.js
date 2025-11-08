// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80; // Altura do header fixo
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Toggle das opções de contato
const ctaButton = document.getElementById('showContactOptions');
const contactOptions = document.getElementById('contactOptions');

if (ctaButton && contactOptions) {
  ctaButton.addEventListener('click', function() {
    contactOptions.classList.toggle('hidden');
    
    // Mudar o texto do botão
    if (contactOptions.classList.contains('hidden')) {
      this.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1.66666V4.99999" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 1.66666V4.99999" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.5 3.33334H2.5C1.83696 3.33334 1.25 3.9203 1.25 4.58334V17.5C1.25 18.163 1.83696 18.75 2.5 18.75H17.5C18.163 18.75 18.75 18.163 18.75 17.5V4.58334C18.75 3.9203 18.163 3.33334 17.5 3.33334Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.25 8.33334H18.75" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Entrar em Contato
      `;
    } else {
      this.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 7.5L10 12.5L5 7.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Ocultar Opções
      `;
    }
  });
}

// Efeito de scroll no header
let lastScroll = 0;
const header = document.querySelector('.main-header');

if (header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.getElementById('showContactOptions');
    const contactOptions = document.getElementById('contactOptions');

    // Inicialmente, as opções estão ocultas pela classe 'hidden' no CSS.
    // Este script garante a funcionalidade de alternância.
    if (ctaButton && contactOptions) {
        ctaButton.addEventListener('click', function() {
            // Alterna a classe 'hidden' para mostrar/ocultar as opções
            contactOptions.classList.toggle('hidden');

            // Opcional: Altera o texto do botão
            if (contactOptions.classList.contains('hidden')) {
                ctaButton.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      </svg>
                    Entrar em Contato
                `;
            } else {
                ctaButton.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                    Fechar Opções
                `;
            }
        });
    }
});