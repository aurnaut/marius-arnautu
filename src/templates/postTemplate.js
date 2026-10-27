import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { TypeLinks } from '../components/post-list';
import { CoverHero } from '../components/covers';

// gatsby-remark-images sizes every image for the reading column, so images that bleed out of it to the
// page's margins would load a file too small for them. Their sizes are the page's width instead.
// The divs are counted, as a bleed block can nest others, such as one image for each theme.
const sizeBleedImages = (html) => {
  let depth = 0; // How many divs deep inside a bleed block, 0 outside one
  return html.replace(/<div\b[^>]*>|<\/div>|sizes="[^"]*"/g, (tag) => {
    if (tag.startsWith('sizes')) return depth ? 'sizes="100vw"' : tag;
    if (tag === '</div>') {
      if (depth) depth -= 1;
    } else if (depth || /class="bleed[\s"]/.test(tag)) {
      depth += 1;
    }
    return tag;
  });
};

// Keyboards drawn in a post's HTML: pressing a key, or typing its letter while the keyboard is on screen, fills the
// screen with a faint copy of the letter. The large letters are only fetched once someone reaches for the keyboard.
// Returns a function that removes the listeners.
const playKeyboards = (body) => {
  const keyboards = [...body.querySelectorAll('.keyboard[data-glyphs]')];
  if (!keyboards.length) return undefined;

  const largeGlyph = (keyboard, letter) => `${keyboard.dataset.glyphs}/large/${letter}.png`;
  const preloaded = new Set();
  const preload = (keyboard) => {
    if (preloaded.has(keyboard)) return;
    preloaded.add(keyboard);
    keyboard.querySelectorAll('[data-key]').forEach((key) => {
      new Image().src = largeGlyph(keyboard, key.dataset.key);
    });
  };

  const press = (keyboard, key) => {
    preload(keyboard);
    const echo = document.createElement('div');
    echo.className = 'keyboard-echo';
    echo.setAttribute('aria-hidden', 'true');
    echo.style.setProperty('--glyph', `url(${largeGlyph(keyboard, key.dataset.key)})`);
    // Removed when its animation ends, or after a while if the browser skips the animation, as in a background tab
    echo.addEventListener('animationend', () => echo.remove());
    setTimeout(() => echo.remove(), 1500);
    document.body.append(echo);

    key.classList.add('is-pressed');
    setTimeout(() => key.classList.remove('is-pressed'), 120);
  };

  const onClick = (event) => {
    const key = event.target.closest('.keyboard__key');
    if (key) press(key.closest('.keyboard'), key);
  };

  const onScreen = (element) => {
    const { top, bottom } = element.getBoundingClientRect();
    return bottom > 0 && top < window.innerHeight;
  };
  // Shortcuts, held keys and typing into fields are left alone
  const onKeyDown = (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
    if (event.target.closest?.('input, textarea, select, [contenteditable]')) return;
    const letter = event.key.toLowerCase();
    if (!/^[a-z]$/.test(letter)) return;
    const keyboard = keyboards.find(onScreen);
    const key = keyboard?.querySelector(`[data-key="${letter}"]`);
    if (key) press(keyboard, key);
  };

  const preloaders = keyboards.map((keyboard) => {
    const handler = () => preload(keyboard);
    keyboard.addEventListener('pointerenter', handler);
    keyboard.addEventListener('focusin', handler);
    return () => {
      keyboard.removeEventListener('pointerenter', handler);
      keyboard.removeEventListener('focusin', handler);
    };
  });
  body.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
  return () => {
    preloaders.forEach((remove) => remove());
    body.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  };
};

// Hovering the Happykid logo makes it blink twice every few seconds: each eye's arc flattens into a line, bows down the
// other way, flattens again and comes back up. The arc's points move rather than the arc being squashed, so the line keeps
// its weight when it's straight. A double blink that's started finishes after the pointer leaves. Returns a function that stops it.
const blinkHappykid = (svg) => {
  const item = svg.closest('.logo-wall__item');
  const eyes = [...svg.querySelectorAll('.happykid-eye')];
  if (!item || !eyes.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  const blink = 0.22; // Seconds a blink takes
  const pause = 0.06; // Seconds between the two blinks of a double blink
  const every = 2.5; // Seconds from one double blink to the next
  const blinking = blink * 2 + pause;

  // Each eye is one arc of absolute M and C commands, so its numbers alternate x and y. Its ends sit on the baseline.
  const arcs = eyes.map((path) => {
    const d = path.getAttribute('d');
    const numbers = d.match(/[\d.]+/g).map(Number);
    return { path, d, text: d.split(/[\d.]+/), numbers, baseline: numbers[1] };
  });

  let frame = null;
  let hovered = false;
  let start = 0;

  const draw = (now) => {
    const time = ((now - start) / 1000) % every;
    if (!hovered && time >= blinking) {
      arcs.forEach(({ path, d }) => path.setAttribute('d', d));
      frame = null;
      return;
    }
    // 1 is the arc as drawn, 0 a straight line and -1 the arc turned over
    const into = time < blink ? time : time - blink - pause;
    const bow = into >= 0 && into < blink ? Math.cos((2 * Math.PI * into) / blink) : 1;
    arcs.forEach(({ path, text, numbers, baseline }) => {
      let d = text[0];
      for (let i = 0; i < numbers.length; i += 2) {
        d += numbers[i].toFixed(2) + text[i + 1] + (baseline + (numbers[i + 1] - baseline) * bow).toFixed(2) + text[i + 2];
      }
      path.setAttribute('d', d);
    });
    frame = requestAnimationFrame(draw);
  };

  const onEnter = () => {
    hovered = true;
    if (frame) return;
    start = performance.now();
    frame = requestAnimationFrame(draw);
  };
  const onLeave = () => {
    hovered = false;
  };
  item.addEventListener('logo-play', onEnter);
  item.addEventListener('logo-stop', onLeave);
  return () => {
    cancelAnimationFrame(frame);
    item.removeEventListener('logo-play', onEnter);
    item.removeEventListener('logo-stop', onLeave);
  };
};

// Hovering the Hollins & Finn logo swings its trail of ampersands up along its slant, then down past where it started,
// then up and down again in shorter trips until it comes to rest where it was drawn. Each ampersand follows the one
// above it a moment late, so the trail stretches as it sets off and bunches up as it turns. A run that's started
// finishes after the pointer leaves. Returns a function that stops it.
const springHollins = (svg) => {
  const item = svg.closest('.logo-wall__item');
  const amps = [...svg.querySelectorAll('.hollins-amp')];
  if (!item || amps.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  const reach = 24; // How far the first trip goes, in steps between ampersands
  const speed = 8; // How fast it swings, in radians a second
  const damping = 0.12; // Lower makes more trips
  const lag = 0.2; // Seconds the first ampersand is behind the last
  const length = 3.6; // Seconds until the swing has died away

  // Each ampersand is the first one moved the same step further up and to the right
  const end = amps.length - 1;
  const first = amps[0].getAttribute('d').match(/[\d.]+/g).map(Number);
  const last = amps[end].getAttribute('d').match(/[\d.]+/g).map(Number);
  const stepX = (last[0] - first[0]) / end;
  const stepY = (last[1] - first[1]) / end;

  let frame = null;
  let start = 0;

  // How far the trail is from where it was drawn, in steps up its slant
  const swing = (t) => (t > 0 ? reach * Math.exp(-damping * speed * t) * Math.sin(speed * t) : 0);

  const draw = (now) => {
    const time = (now - start) / 1000;
    if (time >= length + lag) {
      amps.forEach((path) => path.removeAttribute('transform'));
      svg.style.overflow = '';
      frame = null;
      return;
    }
    amps.forEach((path, i) => {
      const steps = swing(time - (lag * (end - i)) / end);
      path.setAttribute('transform', `translate(${(steps * stepX).toFixed(2)} ${(steps * stepY).toFixed(2)})`);
    });
    frame = requestAnimationFrame(draw);
  };

  const onEnter = () => {
    if (frame) return;
    start = performance.now();
    // The swing carries the ends of the trail past the edge of the drawing
    svg.style.overflow = 'visible';
    frame = requestAnimationFrame(draw);
  };
  item.addEventListener('logo-play', onEnter);
  return () => {
    cancelAnimationFrame(frame);
    item.removeEventListener('logo-play', onEnter);
  };
};

// Hovering the brushed C whirls its loose wisps, the thin strokes that fly off the main C, while the C itself stays put.
// Each wisp sets off at its own moment and goes once round the middle of the C, not in a circle but along an ellipse
// as wide and tilted as the C, so it carries on along the curve it's already drawn on. Each wisp's ellipse, speed
// and pull towards the middle are a little different, and it lands back where it was drawn. The SVG tags the wisps.
// A run that's started finishes after the pointer leaves. Returns a function that stops it.
const twistBrushc = (svg) => {
  const item = svg.closest('.logo-wall__item');
  const wisps = [...svg.querySelectorAll('.brushc-wisp')];
  if (!item || !wisps.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  const spin = 1.8; // Seconds a wisp takes to go round, give or take a quarter
  const stagger = 0.8; // Seconds between the first wisp setting off and the last
  const tilt = -8; // How the C's ellipse is tilted, in degrees, give or take 5
  const pull = 0.12; // How far towards the middle a wisp is drawn halfway round, give or take half

  // The ellipse is as much wider than tall as the C, give or take a little. Each wisp sets off at a moment spread by
  // the golden ratio, so neighbours don't go together
  const box = svg.getBBox();
  const eyeX = box.x + box.width / 2;
  const eyeY = box.y + box.height / 2;
  const wide = box.width / box.height;
  const jitter = (amount) => (Math.random() * 2 - 1) * amount;
  const orbits = wisps.map((path, i) => ({
    path,
    delay: ((i * 0.618) % 1) * stagger,
    time: spin * (1 + jitter(0.25)),
    tilt: tilt + jitter(5),
    wide: wide * (1 + jitter(0.1)),
    pull: pull * (1 + jitter(0.5)),
  }));
  const length = stagger + spin * 1.25;

  let frame = null;
  let start = 0;

  // How far round a wisp is, from 0 to 1, slow to start and slow to stop
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

  const draw = (now) => {
    const time = (now - start) / 1000;
    if (time >= length) {
      wisps.forEach((path) => path.removeAttribute('transform'));
      svg.style.overflow = '';
      frame = null;
      return;
    }
    orbits.forEach((orbit) => {
      const round = ease(Math.max(0, Math.min(1, (time - orbit.delay) / orbit.time)));
      // Squashing the ellipse into a circle, turning and stretching it back moves the wisp along the ellipse
      const toCircle = `scale(${(1 / orbit.wide).toFixed(3)} 1) rotate(${(-orbit.tilt).toFixed(1)})`;
      const toEllipse = `rotate(${orbit.tilt.toFixed(1)}) scale(${orbit.wide.toFixed(3)} 1)`;
      orbit.path.setAttribute(
        'transform',
        `translate(${eyeX.toFixed(2)} ${eyeY.toFixed(2)}) scale(${(1 - orbit.pull * Math.sin(Math.PI * round)).toFixed(3)})` +
          ` ${toEllipse} rotate(${(360 * round).toFixed(1)}) ${toCircle} translate(${(-eyeX).toFixed(2)} ${(-eyeY).toFixed(2)})`,
      );
    });
    frame = requestAnimationFrame(draw);
  };

  const onEnter = () => {
    if (frame) return;
    start = performance.now();
    // The wisps swing past the edge of the drawing as they go round
    svg.style.overflow = 'visible';
    frame = requestAnimationFrame(draw);
  };
  item.addEventListener('logo-play', onEnter);
  return () => {
    cancelAnimationFrame(frame);
    item.removeEventListener('logo-play', onEnter);
  };
};

// Hovering the Giurgiulmeu logo zooms in on the clock at the foot of the tower, as through a lens the size of the
// tower's circle, while the spire above the circle fades away, leaving just the circle. The walls run on down to the
// circle rather than stopping where the circle was drawn. Hands grow from the middle of the clock, set to the time it
// is, and sweep a few hours on before the view zooms back out and they're gone. A run that's started finishes after
// the pointer leaves. Returns a function that stops it.
const zoomGiurgiu = (svg) => {
  const item = svg.closest('.logo-wall__item');
  const tower = svg.querySelector('.giurgiu-tower');
  if (!item || !tower || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  const zoom = 2.2; // How much bigger the clock is drawn at the closest
  const into = 0.8; // Seconds zooming in, and again zooming out
  const stay = 1.6; // Seconds held at the closest
  const hours = 3; // Hours the hands sweep on
  const length = into * 2 + stay;

  // The middle of the clock and of the tower's circle, and the inside edge of the circle, in the drawing's units
  const clockX = 159.11;
  const clockY = 110.33;
  const lensX = 157.01;
  const lensY = 87.5;
  const lens = 27.63;
  const rim = 29.6; // The outside edge of the circle

  const ns = 'http://www.w3.org/2000/svg';
  const make = (name, attributes) => {
    const element = document.createElementNS(ns, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };
  const round = (r, x = lensX, y = lensY) => `M${x - r} ${y} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0 Z`;
  const circle = round(lens);
  // The tower as drawn keeps what's outside the circle, fading as it zooms, and a copy that zooms fills what's inside it.
  // The spire's inside breaks the circle's line, so the line is drawn whole on its own while the spire is faded.
  const ring = make('path', {
    class: 'giurgiu',
    fill: tower.getAttribute('fill'),
    'fill-rule': 'evenodd',
    d: `${round(rim)} ${circle}`,
  });
  const inside = make('clipPath', { id: 'giurgiu-inside' });
  inside.append(make('path', { d: circle }));
  // A little inside the circle, so the soft inside edge of the circle drawn smaller doesn't show as a faint line
  const within = make('clipPath', { id: 'giurgiu-within' });
  within.append(make('path', { d: round(lens - 0.25) }));
  const outside = make('clipPath', { id: 'giurgiu-outside' });
  outside.append(make('path', { d: `M100 20 H220 V140 H100 Z ${circle}`, 'clip-rule': 'evenodd' }));
  const defs = make('defs', {});
  defs.append(inside, within, outside);
  svg.prepend(defs);

  const view = make('g', { 'clip-path': `url(#${inside.id})` });
  const zoomed = make('g', {});
  // The copy stops at the inside of the circle, so the circle drawn smaller doesn't round off the foot of the tower
  const copy = tower.cloneNode();
  copy.classList.remove('giurgiu-tower');
  copy.setAttribute('clip-path', `url(#${within.id})`);
  const solid = (d = '', rule = 'nonzero') =>
    make('path', { class: 'giurgiu', fill: tower.getAttribute('fill'), 'fill-rule': rule, d });
  // Each of the four walls carried on down, between the edges of the spaces either side of it, from above the circle
  // to well below where the lens ends
  const walls = [
    [139.48, 100.79, 138.59, 108.06, 140.98, 102.39, 140.13, 109.34],
    [150.82, 101.81, 149.69, 114.13, 152.52, 101.77, 151.34, 114.54],
    [166.87, 103.72, 166.14, 113.57, 168.51, 104.4, 167.88, 112.89],
    [171.12, 105.92, 170.78, 111.43, 172.83, 105.5, 172.54, 110.33],
  ].map(([x1, y1, x2, y2, x3, y3, x4, y4]) => {
    const along = (ax, ay, bx, by, y) => (ax + ((bx - ax) * (y - ay)) / (by - ay)).toFixed(2);
    const left = (y) => along(x1, y1, x2, y2, y);
    const right = (y) => along(x3, y3, x4, y4, y);
    return solid(`M${left(106)} 106 L${left(140)} 140 L${right(140)} 140 L${right(106)} 106 Z`);
  });
  // The foot of the clock's own ring is lost with the circle, so the ring is drawn again
  const face = solid(`${round(6.07, clockX, clockY)} ${round(4.6, clockX, clockY)}`, 'evenodd');
  const hourHand = solid();
  const minuteHand = solid();
  zoomed.append(copy, ...walls, face, hourHand, minuteHand);
  view.append(zoomed);

  // A hand is a bar with round ends standing up from the middle of the clock, turned to its angle. It grows from
  // nothing as the view zooms in, in width as well as reach, so there's no dot left on the clock as drawn.
  const shape = (path, reach, width, angle) => {
    const top = clockY - reach;
    path.setAttribute(
      'd',
      `M${clockX - width} ${clockY} L${clockX - width} ${top} A${width} ${width} 0 0 1 ${clockX + width} ${top}` +
        ` L${clockX + width} ${clockY} A${width} ${width} 0 0 1 ${clockX - width} ${clockY} Z`,
    );
    path.setAttribute('transform', `rotate(${angle.toFixed(1)} ${clockX} ${clockY})`);
  };

  let frame = null;
  let start = 0;
  let from = 0; // The time it was when the run started, in hours on the clock's face

  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

  const draw = (now) => {
    const time = (now - start) / 1000;
    if (time >= length) {
      view.remove();
      ring.remove();
      tower.removeAttribute('clip-path');
      tower.removeAttribute('opacity');
      frame = null;
      return;
    }
    // How far in it is, from 0 as drawn to 1 at the closest, and the clock drawn in the middle of the circle there
    const near = ease(Math.min(1, time / into, (length - time) / into));
    const scale = 1 + (zoom - 1) * near;
    tower.setAttribute('opacity', (1 - near).toFixed(3));
    const x = clockX + (lensX - clockX) * near;
    const y = clockY + (lensY - clockY) * near;
    zoomed.setAttribute(
      'transform',
      `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(3)}) translate(${-clockX} ${-clockY})`,
    );
    const hour = from + hours * ease(time / length);
    shape(hourHand, 2.4 * near, 0.4 * near, hour * 30);
    shape(minuteHand, 3.6 * near, 0.4 * near, (hour % 1) * 360);
    frame = requestAnimationFrame(draw);
  };

  const onEnter = () => {
    if (frame) return;
    start = performance.now();
    const date = new Date();
    from = (date.getHours() % 12) + date.getMinutes() / 60;
    tower.setAttribute('clip-path', `url(#${outside.id})`);
    tower.after(ring, view);
    frame = requestAnimationFrame(draw);
  };
  item.addEventListener('logo-play', onEnter);
  return () => {
    cancelAnimationFrame(frame);
    item.removeEventListener('logo-play', onEnter);
  };
};

// Hovering the Sure logo makes its face smile and wink: the line over the u curves up at its ends into a smile and stays
// curved while the pointer is on it, and as the smile forms the right one of the two lines above shuts and opens again.
// The line's points move rather than the line being bent, so it keeps its weight. Leaving, the smile relaxes back
// into a line. Returns a function that stops it.
const smileSure = (svg) => {
  const item = svg.closest('.logo-wall__item');
  const mouth = svg.querySelector('.sure-smile');
  const eye = svg.querySelector('.sure-wink');
  if (!item || !mouth || !eye || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  const rise = 6; // How far the ends of the smile curve up, in the SVG's own units
  const turn = 0.3; // Seconds the smile takes to form, and to relax
  const wink = 0.3; // Seconds the wink takes, shut and open again
  const delay = 0.15; // Seconds into the smile the wink starts

  // The line is absolute M and C commands, so its numbers alternate x and y. Each point rises by a parabola across the
  // line, scaled so that a cubic's control points a third of the way in drop as far as is needed to keep its middle in place
  const d = mouth.getAttribute('d');
  const text = d.split(/[\d.]+/);
  const numbers = d.match(/[\d.]+/g).map(Number);
  const xs = numbers.filter((_, i) => i % 2 === 0);
  const middle = (Math.min(...xs) + Math.max(...xs)) / 2;
  const half = (Math.max(...xs) - Math.min(...xs)) / 2;
  const box = eye.getBBox();
  const eyeY = box.y + box.height / 2;

  let frame = null;
  let hovered = false;
  let smile = 0; // 0 a straight line, 1 the full smile
  let last = 0;
  let start = 0;

  const ease = (x) => x * x * (3 - 2 * x);

  const draw = (now) => {
    const step = (now - last) / 1000;
    last = now;
    smile = Math.max(0, Math.min(1, smile + (hovered ? step : -step) / turn));
    const into = (now - start) / 1000 - delay;
    const winking = into >= 0 && into < wink;
    if (!hovered && !smile && !winking) {
      mouth.setAttribute('d', d);
      eye.removeAttribute('transform');
      frame = null;
      return;
    }
    const up = rise * ease(smile);
    let curved = text[0];
    for (let i = 0; i < numbers.length; i += 2) {
      const u = (numbers[i] - middle) / half;
      curved += numbers[i].toFixed(2) + text[i + 1] + (numbers[i + 1] - (up * (3 * u * u - 1)) / 2).toFixed(2) + text[i + 2];
    }
    mouth.setAttribute('d', curved);
    // The eye shuts to a dot around its middle and opens again
    const open = winking ? 1 - 0.88 * Math.sin((Math.PI * into) / wink) : 1;
    eye.setAttribute('transform', `translate(0 ${eyeY.toFixed(2)}) scale(1 ${open.toFixed(3)}) translate(0 ${(-eyeY).toFixed(2)})`);
    frame = requestAnimationFrame(draw);
  };

  const onEnter = () => {
    hovered = true;
    start = performance.now();
    if (frame) return;
    last = start;
    frame = requestAnimationFrame(draw);
  };
  const onLeave = () => {
    hovered = false;
  };
  item.addEventListener('logo-play', onEnter);
  item.addEventListener('logo-stop', onLeave);
  return () => {
    cancelAnimationFrame(frame);
    item.removeEventListener('logo-play', onEnter);
    item.removeEventListener('logo-stop', onLeave);
  };
};

// Hovering the MINIM logo spins its letters as if blown on: each one turns on its own upright axis, set off a moment
// apart, at its own speed and for its own number of turns, and slows to a stop facing the way it was drawn. The frame
// around them stays put. The turn is drawn by squashing each letter across its middle, so a half turn shows it mirrored.
// A run that's started finishes after the pointer leaves. Returns a function that stops it.
const spinMinim = (svg) => {
  const item = svg.closest('.logo-wall__item');
  const letters = [...svg.querySelectorAll('.minim-letter')];
  if (!item || !letters.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  const spin = 1.8; // Seconds a letter takes to come to rest, give or take a third
  const stagger = 0.3; // Seconds between the first letter setting off and the last
  const turns = [2, 4]; // The fewest and most whole turns a letter makes

  let frame = null;
  let start = 0;
  let runs = [];

  // How far round a letter is, from 0 to 1, fast at first like a gust and slowing to a stop
  const ease = (x) => 1 - (1 - x) ** 3;

  const draw = (now) => {
    const time = (now - start) / 1000;
    if (runs.every((run) => time >= run.delay + run.time)) {
      letters.forEach((path) => path.removeAttribute('transform'));
      frame = null;
      return;
    }
    runs.forEach((run) => {
      const round = ease(Math.max(0, Math.min(1, (time - run.delay) / run.time)));
      const across = Math.cos(2 * Math.PI * run.turns * round);
      run.path.setAttribute(
        'transform',
        `translate(${run.x.toFixed(2)} 0) scale(${across.toFixed(3)} 1) translate(${(-run.x).toFixed(2)} 0)`,
      );
    });
    frame = requestAnimationFrame(draw);
  };

  // Each run is blown afresh, so the letters don't go the same way twice
  const onEnter = () => {
    if (frame) return;
    runs = letters.map((path) => {
      const box = path.getBBox();
      return {
        path,
        x: box.x + box.width / 2,
        delay: Math.random() * stagger,
        time: spin * (1 + (Math.random() * 2 - 1) / 3),
        turns: turns[0] + Math.floor(Math.random() * (turns[1] - turns[0] + 1)),
      };
    });
    start = performance.now();
    frame = requestAnimationFrame(draw);
  };
  item.addEventListener('logo-play', onEnter);
  return () => {
    cancelAnimationFrame(frame);
    item.removeEventListener('logo-play', onEnter);
  };
};

// Hovering the Save logo turns the two marks above the a into a tick, as if it had just been saved: the left mark
// shortens and leans out into the tick's short stroke, the right one lengthens and leans the other way into its long
// stroke, and their feet meet at the tick's point. It snaps in with a little overshoot, stays while the pointer is on it,
// and turns back into the two marks when it leaves. Each mark's points move along it rather than the mark being
// stretched, so its round ends keep their shape. The sticker's edge follows: the SVG gives its outline a second shape that
// hugs the tick, with the same points, and the outline moves between the two with the marks. Returns a function that stops it.
const tickSave = (svg) => {
  const item = svg.closest('.logo-wall__item');
  const marks = [...svg.querySelectorAll('.save-mark')];
  const borders = [...svg.querySelectorAll('.save-border')].map((path) => {
    const d = path.getAttribute('d');
    return {
      path,
      d,
      text: d.split(/[\d.]+/),
      from: d.match(/[\d.]+/g).map(Number),
      to: path.dataset.tick.match(/[\d.]+/g).map(Number),
    };
  });
  if (!item || marks.length !== 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  const turn = 0.45; // Seconds the tick takes to form, and to turn back
  // Where the tick's strokes meet, and for the short stroke then the long one its lean from upright in degrees and its
  // length between the middles of its round ends, in the SVG's own units
  const point = [360, 326];
  const strokes = [
    { lean: -42, length: 26 },
    { lean: 20, length: 70 },
  ];

  // Each mark is a rounded stroke of absolute M and C commands, so its numbers alternate x and y. Its axis runs from
  // its lowest point to its highest, and its round ends are half its width. Each point is kept as how far along the
  // axis it is from the middle of the bottom end, its foot, and how far to the side
  const shapes = marks.map((path, i) => {
    const d = path.getAttribute('d');
    const total = path.getTotalLength();
    const samples = Array.from({ length: 100 }, (_, k) => path.getPointAtLength((total * k) / 99));
    const low = samples.reduce((a, b) => (b.y > a.y ? b : a));
    const high = samples.reduce((a, b) => (b.y < a.y ? b : a));
    const reach = Math.hypot(high.x - low.x, high.y - low.y);
    const ax = (high.x - low.x) / reach;
    const ay = (high.y - low.y) / reach;
    const sides = samples.map(({ x, y }) => (y - low.y) * ax - (x - low.x) * ay);
    const end = (Math.max(...sides) - Math.min(...sides)) / 2;
    const footX = low.x + ax * end;
    const footY = low.y + ay * end;
    const numbers = d.match(/[\d.]+/g).map(Number);
    const along = [];
    const side = [];
    for (let j = 0; j < numbers.length; j += 2) {
      const x = numbers[j] - footX;
      const y = numbers[j + 1] - footY;
      along.push(x * ax + y * ay);
      side.push(y * ax - x * ay);
    }
    return {
      path,
      d,
      text: d.split(/[\d.]+/),
      along,
      side,
      end,
      foot: [footX, footY],
      length: reach - 2 * end,
      lean: Math.atan2(ax, -ay),
      to: { lean: (Math.PI * strokes[i].lean) / 180, length: strokes[i].length },
    };
  });

  let frame = null;
  let hovered = false;
  let tick = 0; // 0 the two marks, 1 the tick
  let last = 0;

  // Quick to set off, with a small overshoot as the tick lands, and the same in reverse on the way back
  const snap = (x) => 1 + 2.2 * (x - 1) ** 3 + 1.2 * (x - 1) ** 2;

  const draw = (now) => {
    const step = (now - last) / 1000;
    last = now;
    tick = Math.max(0, Math.min(1, tick + (hovered ? step : -step) / turn));
    if (!hovered && !tick) {
      [...shapes, ...borders].forEach(({ path, d }) => path.setAttribute('d', d));
      frame = null;
      return;
    }
    const k = snap(tick);
    shapes.forEach((shape) => {
      const lean = shape.lean + (shape.to.lean - shape.lean) * k;
      const grow = (shape.to.length - shape.length) * k;
      const footX = shape.foot[0] + (point[0] - shape.foot[0]) * k;
      const footY = shape.foot[1] + (point[1] - shape.foot[1]) * k;
      const ux = Math.sin(lean);
      const uy = -Math.cos(lean);
      // The top end moves the whole way, the bottom end stays and the points between them share it out
      let d = shape.text[0];
      shape.along.forEach((along, j) => {
        const out = along + grow * Math.max(0, Math.min(1, (along - shape.end) / (shape.length - 2 * shape.end)));
        const x = footX + out * ux - shape.side[j] * uy;
        const y = footY + out * uy + shape.side[j] * ux;
        d += x.toFixed(2) + shape.text[2 * j + 1] + y.toFixed(2) + shape.text[2 * j + 2];
      });
      shape.path.setAttribute('d', d);
    });
    borders.forEach(({ path, text, from, to }) => {
      path.setAttribute('d', from.reduce((d, n, j) => d + (n + (to[j] - n) * k).toFixed(2) + text[j + 1], text[0]));
    });
    frame = requestAnimationFrame(draw);
  };

  const onEnter = () => {
    hovered = true;
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(draw);
  };
  const onLeave = () => {
    hovered = false;
  };
  item.addEventListener('logo-play', onEnter);
  item.addEventListener('logo-stop', onLeave);
  return () => {
    cancelAnimationFrame(frame);
    item.removeEventListener('logo-play', onEnter);
    item.removeEventListener('logo-stop', onLeave);
  };
};

// Hovering the Widehair logo draws its hair in close around the head, so it can be tied up into a ponytail: the SVG gives
// the hair's outline a second shape, with the same points, and the outline moves between the two. The tie and the
// ponytail are left to CSS, timed to come in as the hair arrives. Leaving, the hair waits for the ponytail to go before
// it springs back out. Returns a function that stops it.
const tieWidehair = (svg) => {
  const item = svg.closest('.logo-wall__item');
  const hair = svg.querySelector('.widehair-hair');
  if (!item || !hair || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

  const turn = 0.35; // Seconds the hair takes to draw in, and to spring back out
  const wait = 0.15; // Seconds the hair waits after the pointer leaves, while the ponytail goes

  const d = hair.getAttribute('d');
  const text = d.split(/[\d.]+/);
  const from = d.match(/[\d.]+/g).map(Number);
  const to = hair.dataset.tied.match(/[\d.]+/g).map(Number);

  let frame = null;
  let hovered = false;
  let tied = 0; // 0 the wide hair, 1 drawn in for the ponytail
  let last = 0;
  let left = 0;

  const ease = (x) => x * x * (3 - 2 * x);

  const draw = (now) => {
    const step = (now - last) / 1000;
    last = now;
    if (hovered) tied = Math.min(1, tied + step / turn);
    else if ((now - left) / 1000 >= wait) tied = Math.max(0, tied - step / turn);
    if (!hovered && !tied) {
      hair.setAttribute('d', d);
      frame = null;
      return;
    }
    const k = ease(tied);
    hair.setAttribute('d', from.reduce((path, n, j) => path + (n + (to[j] - n) * k).toFixed(2) + text[j + 1], text[0]));
    frame = requestAnimationFrame(draw);
  };

  const onEnter = () => {
    hovered = true;
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(draw);
  };
  const onLeave = () => {
    hovered = false;
    left = performance.now();
  };
  item.addEventListener('logo-play', onEnter);
  item.addEventListener('logo-stop', onLeave);
  return () => {
    cancelAnimationFrame(frame);
    item.removeEventListener('logo-play', onEnter);
    item.removeEventListener('logo-stop', onLeave);
  };
};

// A logo plays while the mouse is over it, and for a few seconds when it's tapped, as a touch screen has no hover.
// Tapping it again while it plays stops it. Playing marks the item is-playing for the CSS animations and sends it
// logo-play and logo-stop events for the scripted ones. Returns a function that removes the listeners.
const playLogos = (body) => {
  const tapped = 3000; // Milliseconds a tapped logo plays for
  const removers = [...body.querySelectorAll('.logo-wall__item')].map((item) => {
    let timer = null;
    let touch = false;
    const play = () => {
      clearTimeout(timer);
      if (item.classList.contains('is-playing')) return;
      item.classList.add('is-playing');
      item.dispatchEvent(new Event('logo-play'));
    };
    const stop = () => {
      clearTimeout(timer);
      if (!item.classList.contains('is-playing')) return;
      item.classList.remove('is-playing');
      item.dispatchEvent(new Event('logo-stop'));
    };
    const onEnter = (event) => {
      if (event.pointerType === 'mouse') play();
    };
    const onLeave = (event) => {
      if (event.pointerType === 'mouse') stop();
    };
    const onDown = (event) => {
      touch = event.pointerType !== 'mouse';
    };
    const onClick = () => {
      if (!touch) return;
      if (item.classList.contains('is-playing')) {
        stop();
        return;
      }
      play();
      timer = setTimeout(stop, tapped);
    };
    item.addEventListener('pointerenter', onEnter);
    item.addEventListener('pointerleave', onLeave);
    item.addEventListener('pointerdown', onDown);
    item.addEventListener('click', onClick);
    return () => {
      clearTimeout(timer);
      item.removeEventListener('pointerenter', onEnter);
      item.removeEventListener('pointerleave', onLeave);
      item.removeEventListener('pointerdown', onDown);
      item.removeEventListener('click', onClick);
    };
  });
  return () => removers.forEach((remove) => remove());
};

// Logo walls list each logo as an image, so they show without JavaScript. SVGs are swapped for their markup,
// so CSS can reach the shapes inside. An image's classes, such as only-dark for a version drawn for one theme, carry over.
const inlineLogos = (body) => {
  let cancelled = false;
  const stoppers = [];
  body.querySelectorAll('.logo-wall img[src$=".svg"]').forEach(async (img) => {
    const text = await fetch(img.src).then((response) => response.text());
    if (cancelled || !img.isConnected) return;
    const svg = new DOMParser().parseFromString(text, 'image/svg+xml').documentElement;
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', img.alt);
    if (img.className) svg.setAttribute('class', img.className);
    img.replaceWith(svg);
    stoppers.push(
      blinkHappykid(svg),
      springHollins(svg),
      twistBrushc(svg),
      zoomGiurgiu(svg),
      smileSure(svg),
      spinMinim(svg),
      tickSave(svg),
      tieWidehair(svg),
    );
  });
  return () => {
    cancelled = true;
    stoppers.forEach((stop) => stop?.());
  };
};

const PostTemplate = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark;
  const bodyRef = useRef(null);
  useEffect(() => playKeyboards(bodyRef.current), [html]);
  useEffect(() => inlineLogos(bodyRef.current), [html]);
  useEffect(() => playLogos(bodyRef.current), [html]);
  // When it was is shown with its types, as on the post lists
  const meta = [
    ['Role', frontmatter.role],
    ['Team', frontmatter.team],
    ['Tools', frontmatter.tools],
  ].filter(([, value]) => value);

  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.summary} />
      <article className="case-study">
        <header className="case-study__header">
          <CoverHero slug={pageContext.slug} title={frontmatter.title} />
          <div className="post-list__meta">
            <TypeLinks types={frontmatter.type} />
            <span className="post-list__separator" aria-hidden="true">·</span>
            <span className="post-list__date">{frontmatter.period || frontmatter.date}</span>
          </div>
          <h1>{frontmatter.title}</h1>
          {frontmatter.summary && <p className="case-study__summary">{frontmatter.summary}</p>}
          {meta.length > 0 && (
            <dl className="case-study__meta">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>
        <div className="case-study__body" ref={bodyRef} dangerouslySetInnerHTML={{ __html: sizeBleedImages(html) }} />
      </article>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        type
        title
        summary
        role
        period
        team
        tools
      }
    }
  }
`;
