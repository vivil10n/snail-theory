const trailField = document.querySelector("#trail-field");
const trailCountElement = document.querySelector("#trail-count");

let trailCount = 0;


// stuff to play around with if i want the trails to look different
const CONFIG = {
  minFontSize: 10,
  maxFontSize: 15,

  minOpacity: 0.4,
  maxOpacity: 0.82,

  snailChance: 0.4,

  animationDelayMin: 12,
  animationDelayMax: 34,

  minSegments: 2,
  maxSegments: 4,

  minSegmentLength: 55,
  maxSegmentLength: 115,

  minBend: 0.6,
  maxBend: 1.15,

  minCurveStrength: 28,
  maxCurveStrength: 78,

  minCharactersPerSegment: 7,
  maxCharactersPerSegment: 14
};


function random(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInteger(min, max) {
  return Math.floor(random(min, max + 1));
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}


// basic bezier stuff for the path
function cubicBezier(t, p0, p1, p2, p3) {
  const inverse = 1 - t;

  return {
    x:
      inverse ** 3 * p0.x +
      3 * inverse ** 2 * t * p1.x +
      3 * inverse * t ** 2 * p2.x +
      t ** 3 * p3.x,

    y:
      inverse ** 3 * p0.y +
      3 * inverse ** 2 * t * p1.y +
      3 * inverse * t ** 2 * p2.y +
      t ** 3 * p3.y
  };
}


function cubicBezierDerivative(t, p0, p1, p2, p3) {
  const inverse = 1 - t;

  return {
    x:
      3 * inverse ** 2 * (p1.x - p0.x) +
      6 * inverse * t * (p2.x - p1.x) +
      3 * t ** 2 * (p3.x - p2.x),

    y:
      3 * inverse ** 2 * (p1.y - p0.y) +
      6 * inverse * t * (p2.y - p1.y) +
      3 * t ** 2 * (p3.y - p2.y)
  };
}


// pick characters depending on which direction the trail is going
function chooseCharacter(dx, dy) {
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const absoluteAngle = Math.abs(angle);

  if (absoluteAngle < 18 || absoluteAngle > 162) {
    return randomItem(["_", "~", "-", ".", ","]);
  }

  if (angle >= 18 && angle <= 72) {
    return randomItem(["\\", "`", ",", "~"]);
  }

  if (angle <= -18 && angle >= -72) {
    return randomItem(["/", "'", "^", "~"]);
  }

  if (absoluteAngle > 72 && absoluteAngle < 108) {
    return randomItem(["/", "\\", "|", "'"]);
  }

  return randomItem([".", ",", "~", "_"]);
}


// make each path a little weird / curly
function generateSwirlyPath(startX, startY) {
  const segments = [];

  const segmentCount = randomInteger(
    CONFIG.minSegments,
    CONFIG.maxSegments
  );

  let current = {
    x: startX,
    y: startY
  };

  let angle = random(-Math.PI, Math.PI);

  let bendDirection = Math.random() > 0.5 ? 1 : -1;

  for (let i = 0; i < segmentCount; i++) {
    const length = random(
      CONFIG.minSegmentLength,
      CONFIG.maxSegmentLength
    );

    // swap direction every time so it winds back around
    bendDirection *= -1;

    angle += bendDirection * random(
      CONFIG.minBend,
      CONFIG.maxBend
    );

    // stops the curves from feeling too perfect
    angle += random(-0.18, 0.18);

    const end = {
      x: current.x + Math.cos(angle) * length,
      y: current.y + Math.sin(angle) * length
    };

    const perpendicular = angle + Math.PI / 2;

    const curveStrength =
      random(
        CONFIG.minCurveStrength,
        CONFIG.maxCurveStrength
      ) * bendDirection;

    const control1 = {
      x:
        current.x +
        Math.cos(angle) * length * random(0.18, 0.34) +
        Math.cos(perpendicular) * curveStrength,

      y:
        current.y +
        Math.sin(angle) * length * random(0.18, 0.34) +
        Math.sin(perpendicular) * curveStrength
    };

    const control2 = {
      x:
        current.x +
        Math.cos(angle) * length * random(0.62, 0.82) -
        Math.cos(perpendicular) *
          curveStrength *
          random(0.45, 0.7),

      y:
        current.y +
        Math.sin(angle) * length * random(0.62, 0.82) -
        Math.sin(perpendicular) *
          curveStrength *
          random(0.45, 0.7)
    };

    segments.push({
      start: {
        x: current.x,
        y: current.y
      },
      control1,
      control2,
      end
    });

    current = end;
  }

  return segments;
}


function drawTrail(x, y) {
  trailCount++;

  if (trailCountElement) {
    trailCountElement.textContent = trailCount;
  }

  const segments = generateSwirlyPath(x, y);

  const fontSize = random(
    CONFIG.minFontSize,
    CONFIG.maxFontSize
  );

  const opacity = random(
    CONFIG.minOpacity,
    CONFIG.maxOpacity
  );

  const characters = [];

  segments.forEach(curve => {
    const characterCount = randomInteger(
      CONFIG.minCharactersPerSegment,
      CONFIG.maxCharactersPerSegment
    );

    for (let i = 0; i < characterCount; i++) {
      const baseT =
        i / Math.max(characterCount - 1, 1);

      const t = Math.min(
        1,
        Math.max(
          0,
          baseT + random(-0.012, 0.012)
        )
      );

      const point = cubicBezier(
        t,
        curve.start,
        curve.control1,
        curve.control2,
        curve.end
      );

      const direction = cubicBezierDerivative(
        t,
        curve.start,
        curve.control1,
        curve.control2,
        curve.end
      );

      const character = document.createElement("span");

      character.className = "trail-character";

      character.textContent = chooseCharacter(
        direction.x,
        direction.y
      );

      // tiny jitter so it doesn't look computer-perfect
      character.style.left =
        `${point.x + random(-2.5, 2.5)}px`;

      character.style.top =
        `${point.y + random(-2.5, 2.5)}px`;

      character.style.fontSize =
        `${fontSize}px`;

      character.style.setProperty(
        "--trail-opacity",
        opacity
      );

      trailField.appendChild(character);
      characters.push(character);
    }
  });


  // sometimes there is actually a snail
  if (Math.random() < CONFIG.snailChance) {
    const finalCurve = segments[segments.length - 1];

    const snail = document.createElement("span");

    snail.className = "trail-character snail";
    snail.textContent = "@)";

    snail.style.left = `${finalCurve.end.x}px`;
    snail.style.top = `${finalCurve.end.y}px`;
    snail.style.fontSize = `${fontSize}px`;

    snail.style.setProperty(
      "--trail-opacity",
      opacity
    );

    trailField.appendChild(snail);
    characters.push(snail);
  }

  animateCharacters(characters);
  createMetadata(x, y, trailCount);
}


// let the trail kind of crawl out instead of appearing all at once
function animateCharacters(characters) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    characters.forEach(character => {
      character.classList.add("visible");
    });

    return;
  }

  let delay = 0;

  characters.forEach(character => {
    delay += random(
      CONFIG.animationDelayMin,
      CONFIG.animationDelayMax
    );

    window.setTimeout(() => {
      character.classList.add("visible");
    }, delay);
  });
}


// little trail number + time that disappears again
function createMetadata(x, y, number) {
  const metadata = document.createElement("span");

  metadata.className = "trail-metadata";

  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  metadata.textContent =
    `trail ${String(number).padStart(2, "0")} / ${time}`;

  metadata.style.left = `${x}px`;
  metadata.style.top = `${y - 18}px`;

  trailField.appendChild(metadata);

  requestAnimationFrame(() => {
    metadata.style.opacity = "0.42";
  });

  setTimeout(() => {
    metadata.style.opacity = "0";
  }, 1600);
}


// anywhere except links/buttons becomes ground
document.addEventListener("pointerdown", event => {
  if (event.target.closest("a, button")) {
    return;
  }

  drawTrail(event.pageX, event.pageY);
});