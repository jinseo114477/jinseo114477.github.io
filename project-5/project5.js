let focusInput, breakInput, cycleInput, startBtn;

let state = 'idle';        // 'focus' | 'break' | 'done'
let focusDuration, breakDuration;
let startTime, breakStartTime;
let threadPoints = [];
let x, y, vx;

let totalCycles = 1;
let currentCycle = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255, 0, 0);
  strokeWeight(1.5);

  focusInput  = select('#focusInput');
  breakInput  = select('#breakInput');
  cycleInput  = select('#cycleInput');
  startBtn    = select('#startBtn');
  startBtn.mousePressed(startClock);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startClock() {
  // clamp inputs
  let fm = constrain(int(focusInput.value()) || 25, 1, 50);
  let bm = constrain(int(breakInput.value()) || 1, 1, 15);
  let cc = constrain(int(cycleInput.value()) || 1, 1, 10);

  focusInput.value(fm);
  breakInput.value(bm);
  cycleInput.value(cc);

  focusDuration = fm * 60 * 1000;
  breakDuration = bm * 60 * 1000;
  totalCycles   = cc;
  currentCycle  = 1;

  // disable inputs while running
  focusInput.attribute('disabled', '');
  breakInput.attribute('disabled', '');
  cycleInput.attribute('disabled', '');
  startBtn.attribute('disabled', '');

  prepareThread();
  state = 'focus';
  startTime = millis();
}

function prepareThread() {
  background(255);
  x = width / 2;
  y = 0;
  vx = random(-5, 5);
  threadPoints = [{ x, y }];
}

function draw() {
  if (state === 'focus') {
    let elapsed  = millis() - startTime;
    let fraction = elapsed / focusDuration;

    // move downward
    y += height * (deltaTime / focusDuration);

    // random horizontal jitter
    vx += random(-0.5, 0.5);
    vx = constrain(vx, -5, 5);
    x += vx;

    // bounce at edges
    if (x < 0) {
      x = 0;
      vx *= -1;
    } else if (x > width) {
      x = width;
      vx *= -1;
    }

    // draw segment
    let last = threadPoints[threadPoints.length - 1];
    line(last.x, last.y, x, y);
    threadPoints.push({ x, y });

    // transition to break
    if (fraction >= 1) {
      state = 'break';
      breakStartTime = millis();
    }

  } else if (state === 'break') {
    let elapsed  = millis() - breakStartTime;
    let fraction = min(1, elapsed / breakDuration);

    background(255);
    let remaining = floor(threadPoints.length * (1 - fraction));
    if (remaining > 1) {
      beginShape();
      for (let i = 0; i < remaining; i++) {
        vertex(threadPoints[i].x, threadPoints[i].y);
      }
      endShape();
    }

    // end break
    if (fraction >= 1) {
      if (currentCycle < totalCycles) {
        currentCycle++;
        prepareThread();
        state = 'focus';
        startTime = millis();
      } else {
        // all cycles done → re‑enable inputs
        state = 'done';
        focusInput.removeAttribute('disabled');
        breakInput.removeAttribute('disabled');
        cycleInput.removeAttribute('disabled');
        startBtn.removeAttribute('disabled');
      }
    }
  }
}