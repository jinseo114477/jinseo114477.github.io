let focusInput, breakInput, cycleInput, startBtn;

let state = 'idle'; // 'focus' | 'break' | 'done'
let focusDuration, breakDuration;
let startTime, breakStartTime;
let threadPoints = [];
let pastCycles = []; // ← stores completed focus threads
let x, y, vx;

let totalCycles = 1;
let currentCycle = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255, 0, 0);
  strokeWeight(1.5);

  focusInput = select('#focusInput');
  breakInput = select('#breakInput');
  cycleInput = select('#cycleInput');
  startBtn = select('#startBtn');
  startBtn.mousePressed(startClock);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startClock() {
  let fm = constrain(int(focusInput.value()) || 25, 1, 50);
  let bm = constrain(int(breakInput.value()) || 5, 1, 15);
  let cc = constrain(int(cycleInput.value()) || 1, 1, 10);

  focusInput.value(fm);
  breakInput.value(bm);
  cycleInput.value(cc);

  focusDuration = fm * 60 * 1000;
  breakDuration = bm * 60 * 1000;
  totalCycles = cc;
  currentCycle = 1;
  pastCycles = []; // reset past cycles

  focusInput.attribute('disabled', '');
  breakInput.attribute('disabled', '');
  cycleInput.attribute('disabled', '');
  startBtn.attribute('disabled', '');

  prepareThread();
  state = 'focus';
  startTime = millis();
}

function prepareThread() {
  x = width / 2;
  y = 0;
  vx = random(-5, 5);
  threadPoints = [{ x, y }];
}

function draw() {
  if (state === 'focus') {
    let elapsed = millis() - startTime;
    let fraction = elapsed / focusDuration;

    y += height * (deltaTime / focusDuration);
    vx += random(-0.5, 0.5);
    vx = constrain(vx, -5, 5);
    x += vx;

    if (x < 0) {
      x = 0;
      vx *= -1;
    } else if (x > width) {
      x = width;
      vx *= -1;
    }

    let last = threadPoints[threadPoints.length - 1];
    line(last.x, last.y, x, y);
    threadPoints.push({ x, y });

    if (fraction >= 1) {
      pastCycles.push([...threadPoints]); // save current thread
      state = 'break';
      breakStartTime = millis();
    }

  } else if (state === 'break') {
    let elapsed = millis() - breakStartTime;
    let fraction = min(1, elapsed / breakDuration);

    background(255);

    // draw previous threads (faint + instantly)
    stroke(255, 0, 0, 50);
    noFill();
    for (let path of pastCycles) {
      beginShape();
      for (let pt of path) {
        vertex(pt.x, pt.y);
      }
      endShape();
    }

    // draw current thread shrinking
    stroke(255, 0, 0);
    let remaining = floor(threadPoints.length * (1 - fraction));
    if (remaining > 1) {
      beginShape();
      for (let i = 0; i < remaining; i++) {
        vertex(threadPoints[i].x, threadPoints[i].y);
      }
      endShape();
    }

    if (fraction >= 1) {
      if (currentCycle < totalCycles) {
        currentCycle++;
        prepareThread();
        state = 'focus';
        startTime = millis();
      } else {
        state = 'done';
        focusInput.removeAttribute('disabled');
        breakInput.removeAttribute('disabled');
        cycleInput.removeAttribute('disabled');
        startBtn.removeAttribute('disabled');
      }
    }
  }
}