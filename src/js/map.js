const GRID_STEP = 8.51;
const WAVE_DELAY = 60;

const REGIONS = [
  'europe', 'asie', 'asie_sud', 'asie_sud_est',
  'himalayas', 'afrique', 'afrique_central',
  'ouest_afrique', 'moyen_orient', 'bassin_mediterraneen',
  'australie_sud', 'australie_nord', 'amerique_sud', 'amerique_nord',
  'amazonie', 'foret_boreales', 'arctique'
];

function toGrid(val) {
  return Math.round(val / GRID_STEP);
}

function mouseToSVG(svgEl, mouseX, mouseY) {
  const rect = svgEl.getBoundingClientRect();
  return {
    x: (mouseX - rect.left) * (1920 / rect.width),
    y: (mouseY - rect.top)  * (1080 / rect.height)
  };
}

function createRegionHandler(regionId) {
  let waveTimeouts = [];
  let hideTimeout  = null;
  let isShowing    = false;

  function showWave(event) {
    clearTimeout(hideTimeout);
    if (isShowing) return;
    isShowing = true;

    const group = document.getElementById(regionId);
    const svg   = group.closest('svg');
    const rects = Array.from(group.querySelectorAll('rect'));

    rects.forEach(r => {
      r.style.transition = 'none';
      r.style.opacity = '0';
    });

    group.style.display = 'block';

    const gridRects = rects.map(r => ({
      el: r,
      x:  parseFloat(r.getAttribute('x')),
      y:  parseFloat(r.getAttribute('y')),
      gx: toGrid(parseFloat(r.getAttribute('x'))),
      gy: toGrid(parseFloat(r.getAttribute('y')))
    }));

    const mouse = mouseToSVG(svg, event.clientX, event.clientY);

    let closest = gridRects[0];
    let minDist  = Infinity;
    gridRects.forEach(r => {
      const d = Math.hypot(r.x - mouse.x, r.y - mouse.y);
      if (d < minDist) { minDist = d; closest = r; }
    });

    const cx = closest.gx;
    const cy = closest.gy;

    gridRects.forEach(r => {
      r.wave = Math.max(Math.abs(r.gx - cx), Math.abs(r.gy - cy));
    });

    const maxWave = Math.max(...gridRects.map(r => r.wave));

    waveTimeouts.forEach(t => clearTimeout(t));
    waveTimeouts = [];

    for (let w = 0; w <= maxWave; w++) {
      const waveRects = gridRects.filter(r => r.wave === w);
      const t = setTimeout(() => {
        waveRects.forEach(r => {
          r.el.style.transition = 'opacity 0.15s';
          r.el.style.opacity = '1';
        });
      }, w * WAVE_DELAY);
      waveTimeouts.push(t);
    }
  }

  function scheduleHide() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      isShowing = false;
      waveTimeouts.forEach(t => clearTimeout(t));
      waveTimeouts = [];

      const group = document.getElementById(regionId);
      const rects = Array.from(group.querySelectorAll('rect'));
      rects.forEach(r => {
        r.style.transition = 'none';
        r.style.opacity = '0';
      });
      group.style.display = 'none';
    }, 80);
  }

  const hit   = document.getElementById('hit_' + regionId);
  const group = document.getElementById(regionId);

  if (!hit || !group) return;

  hit.addEventListener('mouseenter',   showWave);
  group.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
  hit.addEventListener('mouseleave',   scheduleHide);
  group.addEventListener('mouseleave', scheduleHide);
}

REGIONS.forEach(createRegionHandler);
