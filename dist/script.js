/* Native range inputs keep comparisons touch, mouse and keyboard accessible. */
document.querySelectorAll('[data-comparison]').forEach((comparison) => {
  const input = comparison.querySelector('input[type="range"]');
  const frame = comparison.querySelector('.comparison-frame');
  const update = () => {
    const value = Math.min(100, Math.max(0, Number(input.value)));
    comparison.style.setProperty('--position', `${value}%`);
    input.setAttribute('aria-valuetext', `${value} % avant, ${100 - value} % après`);
    frame.classList.toggle('at-start', value < 12);
    frame.classList.toggle('at-end', value > 88);
  };
  input.addEventListener('input', update);
  let activePointer = null;
  const move = (event) => {
    const rect = frame.getBoundingClientRect();
    input.value = String(Math.round(Math.min(100, Math.max(0, (event.clientX - rect.left) / rect.width * 100))));
    update();
  };
  frame.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    activePointer = event.pointerId;
    frame.setPointerCapture(event.pointerId);
    input.focus({ preventScroll: true });
    move(event);
  });
  frame.addEventListener('pointermove', (event) => {
    if (event.pointerId === activePointer) move(event);
  });
  const end = (event) => {
    if (event.pointerId !== activePointer) return;
    if (frame.hasPointerCapture(event.pointerId)) frame.releasePointerCapture(event.pointerId);
    activePointer = null;
  };
  frame.addEventListener('pointerup', end);
  frame.addEventListener('pointercancel', end);
  update();
});
document.getElementById('year').textContent = String(new Date().getFullYear());

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-heading, .intro, .solution, .steps article').forEach((element) => observer.observe(element));
}
