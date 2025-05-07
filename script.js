document.addEventListener("DOMContentLoaded", () => {
  let stickyTop = 0;
  let scrollTarget = false;

  const timeline = document.querySelector('.timeline__nav');
  const items = timeline.querySelectorAll('li');
  const milestones = document.querySelectorAll('.timeline__section .milestone');
  const offsetTop = parseInt(getComputedStyle(timeline).top) || 0;

  const TIMELINE_VALUES = {
    start: 190,
    step: 30
  };

  function updateStickyTop() {
    timeline.classList.remove('fixed');
    const rect = timeline.getBoundingClientRect();
    stickyTop = window.scrollY + rect.top - offsetTop;
    handleScroll();
  }

  function handleScroll() {
    if (window.scrollY > stickyTop) {
      timeline.classList.add('fixed');
    } else {
      timeline.classList.remove('fixed');
    }

    let viewLine = window.scrollY + window.innerHeight / 3;
    let active = -1;

    if (scrollTarget === false) {
      milestones.forEach((milestone, index) => {
        if (milestone.offsetTop - viewLine > 0) return;
        active = index;
      });
    } else {
      active = scrollTarget;
    }

    timeline.style.top = `${-1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start}px`;

    items.forEach(item => item.classList.remove('active'));
    if (active !== -1 && items[active]) {
      items[active].classList.add('active');
    } else {
      items[0]?.classList.add('active');
    }
  }

  function handleClick(event) {
    const span = event.target.closest('span');
    if (!span) return;

    const li = span.parentElement;
    const index = Array.from(items).indexOf(li);
    const milestone = milestones[index];

    if (!li.classList.contains('active') && milestone) {
      scrollTarget = index;
      const scrollTargetTop = milestone.offsetTop - 80;
      window.scrollTo({ top: scrollTargetTop, behavior: 'smooth' });
      setTimeout(() => { scrollTarget = false; }, 500);
    }
  }

  window.addEventListener('resize', updateStickyTop);
  window.addEventListener('scroll', handleScroll);
  timeline.addEventListener('click', handleClick);
  updateStickyTop();
});
