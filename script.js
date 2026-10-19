(() => {
  const PHONE = '919824006198';
  const ADDR = '26, Sunrise Tenaments, Opp. Drive-in Cinema, Near Soham Tower, Bodakdev, Ahmedabad, Gujarat 380054';
  const q = encodeURIComponent('Anand Patel Pest Control Services, ' + ADDR);
  const wa = t => `https://wa.me/${PHONE}?text=${encodeURIComponent(t)}`;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const SERVICES = [
    ['Termite Control', 'bug-off', 'Inspection-led advice to help protect wood and structures from termite damage.', true],
    ['Cockroach Control', 'bug', 'Targeted treatment for kitchens, bathrooms and the hidden spots pests favour.'],
    ['Rodent Control', 'rat', 'Practical steps to address rodents and the entry points that invite them.'],
    ['Ant Control', 'bug-play', 'Find the source of the trail and treat the problem, not just what you see.'],
    ['General Pest Control', 'shield-check', 'Everyday protection for homes and workplaces against common pests.'],
    ['Pest Inspection & Prevention', 'search', 'A careful look at your property with guidance to help keep pests away.']
  ];
  const PESTS = {
    Termites: ['Termite Control', 'Termites can damage wood and structures quietly. Reviewers mention helpful termite treatment advice.', 'Share photos or the affected area and arrange an inspection.'],
    Cockroaches: ['Cockroach Control', 'Cockroaches tend to hide in kitchens, drains and warm corners. Treatment depends on the property and extent.', 'Tell us where you see them most, and the property type.'],
    Rodents: ['Rodent Control', 'Rodents need entry points and food. Addressing both helps, so the approach depends on your space.', 'Describe where you hear or see activity and any damage.'],
    Ants: ['Ant Control', 'Ant trails usually lead to a nest or food source. Finding it shapes the right treatment.', 'Mention the ant type or size and where the trails appear.'],
    'Not Sure': ['Pest Inspection & Prevention', 'If you are unsure what you are dealing with, an inspection can identify the pest and the right next step.', 'Describe what you have noticed and we will help you work it out.']
  };
  const FAQ = [
    ['Which pests can you help with?', 'Anand Patel Pest Control Services handles termites, cockroaches, rodents, ants and general pests. Please contact us to confirm whether your specific pest is covered.'],
    ['How do I arrange a pest inspection?', 'Call +91 98240 06198 or message on WhatsApp with your pest concern and property type, and an inspection can be arranged if needed.'],
    ['Is termite treatment available?', 'Termite control is one of our services and customers mention helpful termite advice. The right treatment depends on your property, so please enquire for details.'],
    ['How should I prepare my home before treatment?', 'Preparation depends on the pest, the property and the products chosen. You will be given instructions before any treatment begins.'],
    ['Are treatments safe around children and pets?', 'Safety precautions depend on the treatment and products used. Tell us about children, pets or health concerns at the start, and confirm precautions and when it is safe to re-enter treated areas.'],
    ['How much does pest control cost?', 'Pricing depends on the pest, the area and the treatment. Contact Anand Patel for a confirmed quote after discussing your requirements.'],
    ['Do you serve my area in Ahmedabad?', 'We are based in Bodakdev, Ahmedabad. Please call or message with your location to confirm whether we can serve your area.']
  ];

  $('#yr').textContent = new Date().getFullYear();
  $('#map').src = `https://www.google.com/maps?q=${q}&output=embed`;
  ['#dir', '#dir2'].forEach(s => $(s).href = `https://www.google.com/maps/dir/?api=1&destination=${q}`);
  // TODO: replace with the verified Google Business Profile URL once the owner confirms it.
  $('#gmaps-rev').href = `https://www.google.com/maps/search/?api=1&query=${q}`;

  $('#svc-grid').innerHTML = SERVICES.map(([n, , d, star]) => `
    <article class="card${star ? ' star' : ''}"><i data-lucide="${star ? 'bug-off' : ''}"></i>
      <h3>${n}${star ? '<span class="tag">MOST MENTIONED</span>' : ''}</h3><p>${d}</p>
      <a href="${wa(`Hello, I'd like to request ${n}.`)}" target="_blank" rel="noopener">Request Service →</a></article>`).join('');
  const ICONS = ['bug-off', 'bug', 'rat', 'bug-play', 'shield-check', 'search'];
  $$('#svc-grid .card').forEach((c, i) => { $('i', c).setAttribute('data-lucide', ICONS[i]); });
  $('#foot-svc').innerHTML = SERVICES.map(s => `<li><a href="#services">${s[0]}</a></li>`).join('');

  $$('[data-wa]').forEach(a => { a.href = wa(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });

  // Pest selector
  const chips = $('#chips');
  let cur = 'Termites';
  const render = k => {
    cur = k; const [t, d, n] = PESTS[k];
    $('#sel-title').textContent = t; $('#sel-text').textContent = d; $('#sel-next').textContent = n;
    $('#sel-cta').href = wa(`Hello, I'd like to discuss a pest problem: ${k === 'Not Sure' ? 'I am not sure which pest I have' : k}. Could you advise on the next step?`);
    $$('.chip', chips).forEach(b => b.setAttribute('aria-checked', b.dataset.k === k));
  };
  chips.innerHTML = Object.keys(PESTS).map(k => `<button class="chip" role="radio" data-k="${k}">${k}</button>`).join('');
  $('#sel-cta').target = '_blank'; $('#sel-cta').rel = 'noopener';
  chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) render(b.dataset.k); });
  render(cur);

  // FAQ
  $('#faq-list').innerHTML = FAQ.map(([qu, a], i) => `<div class="item"><button class="q" aria-expanded="false" aria-controls="a${i}" id="q${i}">${qu}</button><div class="a" id="a${i}" role="region" aria-labelledby="q${i}"><div><p>${a}</p></div></div></div>`).join('');
  $('#faq-list').addEventListener('click', e => {
    const b = e.target.closest('.q'); if (!b) return;
    const open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', !open); $('#' + b.getAttribute('aria-controls')).classList.toggle('open', !open);
  });

  // Nav
  const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const setMenu = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => e.target.closest('a') && setMenu(false));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); } });

  if (window.lucide) lucide.createIcons();

  // Animation (content stays visible if GSAP fails or motion is reduced)
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('[data-h]', { y: 28, opacity: 0, duration: .9, ease: 'power3.out', stagger: .12 });
  gsap.from('.hero-art', { opacity: 0, scale: .94, duration: 1.2, ease: 'power3.out', delay: .2 });
  gsap.to('.float', { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: .5 });
  addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    gsap.to('.parallax', { x: x * 14, y: y * 10, duration: .8 });
  });
  $$('.sec h2, .card, .panel, .ticks li, .score').forEach(el =>
    gsap.from(el, { y: 36, opacity: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
  const steps = $$('#steps li');
  gsap.set('#steps', { '--p': 0 });
  gsap.from(steps, { opacity: 0, y: 24, stagger: .25, scrollTrigger: { trigger: '#steps', start: 'top 80%', once: true } });
  gsap.to('#steps', { '--p': 1, duration: 1.4, ease: 'power2.inOut', scrollTrigger: { trigger: '#steps', start: 'top 80%', once: true } });
})();
