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

// Scroll Reveal com Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Seletores que queremos animar automaticamente
  const autoSelectors = [
    // Seções principais
    '.section', '.section2', '.section3', '.section4', '.section5', '.section6',
    // Títulos
    '.heading-1', '.heading-2', '.heading-22', '.heading-3', '.heading-4',
    '.como-funciona-o-atendimento', '.vamos-conversar', '.o-que-dizem-meus-pacientes',
    // Cards principais
    '.card', '.card2', '.card3', '.card4', '.card5', '.card6', '.card7',
    // Containers de etapas e conteúdo
    '.container12', '.container14', '.container16', '.container18',
    // Container de áreas (se quiser animar a seção inteira, não os cards individuais)
    '.container2 > .card', '.container2 > .card2', '.container2 > .card3',
    // Container de depoimentos
    '.container49 > .card5', '.container49 > .card6', '.container49 > .card7'
  ];

  // Coleta elementos já marcados explicitamente no HTML
  const explicit = Array.from(document.querySelectorAll('.scroll-reveal'));

  // Coleta elementos baseados nos seletores automáticos
  const autos = autoSelectors
    .flatMap(sel => {
      try {
        return Array.from(document.querySelectorAll(sel));
      } catch (e) {
        console.warn('Seletor inválido:', sel);
        return [];
      }
    })
    .filter(el => !el.classList.contains('scroll-reveal'))
    .filter((el, index, self) => self.indexOf(el) === index); // Remove duplicatas

  const allTargets = [...explicit, ...autos];
  
  // Debug: mostra quantos elementos serão animados
  console.log(`Scroll Reveal: ${allTargets.length} elementos serão animados`);
  
  if (!allTargets.length) {
    console.warn('Nenhum elemento encontrado para scroll reveal');
    return;
  }

  // Se o usuário prefere movimento reduzido, mostra tudo imediatamente
  if (prefersReduce) {
    allTargets.forEach(el => el.classList.add('revealed'));
    console.log('Prefers-reduced-motion ativo: elementos revelados sem animação');
    return;
  }

  // Adiciona a classe base aos elementos automáticos
  autos.forEach(el => el.classList.add('scroll-reveal'));

  // Configura o observer
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Suporte a delay via atributo data-reveal-delay
        const delay = el.getAttribute('data-reveal-delay');
        if (delay) {
          el.style.transitionDelay = delay;
        }
        
        // Adiciona a classe revealed para ativar a animação
        el.classList.add('revealed');
        
        // Para de observar este elemento (anima apenas uma vez)
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.1, // 10% do elemento visível
    rootMargin: '0px 0px -50px 0px' // Começa a animar um pouco antes
  });

  // Observa todos os elementos
  allTargets.forEach(el => observer.observe(el));
  
  console.log('Scroll Reveal ativado! Role a página para ver o efeito.');
});