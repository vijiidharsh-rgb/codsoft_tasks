
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const sunPath = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>';
  const moonPath = '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"></path>';
  themeToggle.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    themeIcon.innerHTML = next === 'dark' ? sunPath : moonPath;
  });

  
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const menuBtn = document.getElementById('menuBtn');
  function closeSidebar(){ sidebar.classList.remove('open'); overlay.classList.remove('show'); }
  menuBtn.addEventListener('click', () => { sidebar.classList.toggle('open'); overlay.classList.toggle('show'); });
  overlay.addEventListener('click', closeSidebar);

  
  document.querySelectorAll('.tab, .tree-item').forEach(el => {
    el.addEventListener('click', () => {
      const target = document.getElementById(el.dataset.target);
      if(target){ target.scrollIntoView({behavior:'smooth'}); }
      closeSidebar();
    });
  });

  // Scroll spy
  const sections = document.querySelectorAll('main .section, .hero');
  const tabs = document.querySelectorAll('.tab');
  const treeItems = document.querySelectorAll('.tree-item');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
        treeItems.forEach(t => t.classList.toggle('active', t.dataset.target === id));
      }
    });
  }, {rootMargin:'-40% 0px -50% 0px'});
  sections.forEach(s => spy.observe(s));

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal, .chip');
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if(entry.isIntersecting){
        setTimeout(() => entry.target.classList.add('in'), i * 40);
        revealer.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el => revealer.observe(el));

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 500);
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Contact form -> mailto
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cname').value;
    const email = document.getElementById('cemail').value;
    const msg = document.getElementById('cmsg').value;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
    window.location.href = `mailto:vijiidharsh@gmail.com?subject=${subject}&body=${body}`;
  });