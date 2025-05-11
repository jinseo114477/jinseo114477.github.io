let focusInput, breakInput, cycleInput, startBtn, pauseOverlay;
let continueBtn, resetBtn;
let hasCompletedRound = false;

let state = 'idle'; 
let focusDuration, breakDuration;
let startTime, breakStartTime;
let threadPoints = [];
let pastCycles = []; 
let x, y, vx;

let totalCycles = 1;
let currentCycle = 1;
let paused = false;
let pauseOffset = 0;
let topControls;

function moveResetToTopControls() {
  const topControls = select('#topControls');
  const pauseBtn = select('#pauseOverlay');
  const resetBtnEl = select('#resetBtn');
  if (topControls && pauseBtn && resetBtnEl) {
    topControls.elt.insertBefore(resetBtnEl.elt, pauseBtn.elt);
  }
}

function moveResetToControlPanel() {
  const controlPanel = select('#controlPanel');
  const continueBtn = select('#continueBtn');
  const resetBtnEl = select('#resetBtn');
  if (controlPanel && continueBtn && resetBtnEl) {
    controlPanel.elt.insertBefore(resetBtnEl.elt, continueBtn.elt.nextSibling);
  }
}

function setup() {
  topControls = select('#topControls');
  pauseOverlay = select('#pauseOverlay');
  
  focusInput = select('#focusInput');
  breakInput = select('#breakInput');
  cycleInput = select('#cycleInput');
  startBtn = select('#startBtn');
  continueBtn = select('#continueBtn');
  resetBtn = select('#resetBtn');

  resetBtn.mousePressed(() => {
    state = 'idle';
    paused = false;
    hasCompletedRound = false;
    threadPoints = [];
    pastCycles = [];
    clear();
  
    select('.controls').removeClass('hidden');
    focusInput.removeAttribute('disabled');
    breakInput.removeAttribute('disabled');
    cycleInput.removeAttribute('disabled');
    startBtn.removeAttribute('disabled');
    startBtn.removeClass('hidden');
  
    continueBtn.addClass('hidden');
    resetBtn.addClass('hidden');
    resetBtn.removeClass('running');
    pauseOverlay.addClass('hidden');
    topControls.addClass('hidden');
  });

  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255, 0, 0);
  strokeWeight(1.5);

  startBtn.mousePressed(() => startClock(false));
  continueBtn.mousePressed(() => startClock(false));
  pauseOverlay.mousePressed(togglePause);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startClock(isRestart) {
  let fm = constrain(int(focusInput.value()) || 25, 1, 50);
  let bm = constrain(int(breakInput.value()) || 5, 1, 15);
  let cc = constrain(int(cycleInput.value()) || 1, 1, 10);

  focusInput.value(fm);
  breakInput.value(bm);
  cycleInput.value(cc);

  if (isRestart) {
    clear();
    pastCycles = [];
  }

  focusDuration = fm * 60 * 1000;
  breakDuration = bm * 60 * 1000;
  totalCycles = cc;
  currentCycle = 1;
  threadPoints = [];

  pauseOffset = 0;
  paused = false;

  select('.controls').addClass('hidden');
  pauseOverlay.removeClass('hidden');
  topControls.removeClass('hidden');
  pauseOverlay.html('Pause');   

  focusInput.attribute('disabled', '');
  breakInput.attribute('disabled', '');
  cycleInput.attribute('disabled', '');
  startBtn.attribute('disabled', '');
  continueBtn.addClass('hidden');
  moveResetToTopControls();
  resetBtn.removeClass('hidden');
  

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

function togglePause() {
  if (paused) {
    if (state === 'focus') {
      startTime += millis() - pauseOffset;
    } else if (state === 'break') {
      breakStartTime += millis() - pauseOffset;
    }
    pauseOverlay.html('Pause');
    pauseOverlay.removeClass('resume-mode');
  } else {
    pauseOffset = millis();
    pauseOverlay.html('Resume');
    pauseOverlay.addClass('resume-mode');
  }
  paused = !paused;
}

function draw() {
  if (paused || state === 'idle' || state === 'done') return;

  if (state === 'focus') {
    stroke(255, 0, 0); 
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
      pastCycles.push([...threadPoints]);
      state = 'break';
      breakStartTime = millis();
    }

  } else if (state === 'break') {
    let elapsed = millis() - breakStartTime;
    let fraction = min(1, elapsed / breakDuration);

    background(255);

    stroke(255, 0, 0, 30);
    noFill();
    for (let path of pastCycles) {
      beginShape();
      for (let pt of path) {
        vertex(pt.x, pt.y);
      }
      endShape();
    }

    let traceAlpha = 30 * (1 - fraction);
    stroke(255, 0, 0, traceAlpha);
    beginShape();
    for (let pt of threadPoints) {
      vertex(pt.x, pt.y);
    }
    endShape();

    let remaining = floor(threadPoints.length * (1 - fraction));
    if (remaining > 1) {
      stroke(255, 0, 0); 
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
        pauseOverlay.addClass('hidden');
        select('.controls').removeClass('hidden');
        focusInput.removeAttribute('disabled');
        breakInput.removeAttribute('disabled');
        cycleInput.removeAttribute('disabled');
        startBtn.attribute('disabled', ''); 
        startBtn.addClass('hidden');

        continueBtn.removeClass('hidden');
        moveResetToControlPanel();
        resetBtn.removeClass('hidden');
        hasCompletedRound = true;
      }
    }
  }
}