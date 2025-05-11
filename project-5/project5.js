let focusInput, breakInput, cycleInput, startBtn, pauseOverlay;
let continueBtn, restartBtn;
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
let topControls, topRestartBtn;

function setup() {
  topControls = select('#topControls');
  topRestartBtn = select('#topRestartBtn');

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
  });

  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255, 0, 0);
  strokeWeight(1.5);

  focusInput = select('#focusInput');
  breakInput = select('#breakInput');
  cycleInput = select('#cycleInput');
  startBtn = select('#startBtn');
  pauseOverlay = select('#pauseOverlay');
  continueBtn = select('#continueBtn');
  resetBtn = select('#resetBtn');

  startBtn.mousePressed(() => startClock(false));
  continueBtn.mousePressed(() => startClock(false));
  restartBtn.mousePressed(() => startClock(true));

  pauseOverlay.mousePressed(togglePause);
}

function windowResized() {
  resizing = true;

  if (state !== 'idle' && !paused) {
    let newX = windowWidth / 2;
    let deltaX = newX - x;
    x = newX;
    for (let pt of threadPoints) {
      pt.x += deltaX;
    }
  }

  resizeCanvas(windowWidth, windowHeight);

  setTimeout(() => resizing = false, 200); 
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
  resetBtn.removeClass('hidden');
  resetBtn.addClass('running'); 
  

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
        resetBtn.removeClass('hidden');
        resetBtn.removeClass('running');
        hasCompletedRound = true;
        
      }
    }
  }
}
// let focusInput, breakInput, cycleInput, startBtn;

// let state = 'idle'; 
// let focusDuration, breakDuration;
// let startTime, breakStartTime;
// let threadPoints = [];
// let pastCycles = []; 
// let x, y, vx;

// let totalCycles = 1;
// let currentCycle = 1;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   noFill();
//   stroke(255, 0, 0);
//   strokeWeight(1.5);

//   focusInput = select('#focusInput');
//   breakInput = select('#breakInput');
//   cycleInput = select('#cycleInput');
//   startBtn = select('#startBtn');
//   startBtn.mousePressed(startClock);
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// function startClock() {
//   let fm = constrain(int(focusInput.value()) || 25, 1, 50);
//   let bm = constrain(int(breakInput.value()) || 5, 1, 15);
//   let cc = constrain(int(cycleInput.value()) || 1, 1, 10);

//   focusInput.value(fm);
//   breakInput.value(bm);
//   cycleInput.value(cc);

//   focusDuration = fm * 60 * 1000;
//   breakDuration = bm * 60 * 1000;
//   totalCycles = cc;
//   currentCycle = 1;
//   pastCycles = []; 

//   focusInput.attribute('disabled', '');
//   breakInput.attribute('disabled', '');
//   cycleInput.attribute('disabled', '');
//   startBtn.attribute('disabled', '');

//   prepareThread();
//   state = 'focus';
//   startTime = millis();
// }

// function prepareThread() {
//   x = width / 2;
//   y = 0;
//   vx = random(-5, 5);
//   threadPoints = [{ x, y }];
// }

// function draw() {
//   if (state === 'focus') {
//     let elapsed = millis() - startTime;
//     let fraction = elapsed / focusDuration;

//     y += height * (deltaTime / focusDuration);
//     vx += random(-0.5, 0.5);
//     vx = constrain(vx, -5, 5);
//     x += vx;

//     if (x < 0) {
//       x = 0;
//       vx *= -1;
//     } else if (x > width) {
//       x = width;
//       vx *= -1;
//     }

//     let last = threadPoints[threadPoints.length - 1];
//     line(last.x, last.y, x, y);
//     threadPoints.push({ x, y });

//     if (fraction >= 1) {
//       pastCycles.push([...threadPoints]); 
//       state = 'break';
//       breakStartTime = millis();
//     }

//   } else if (state === 'break') {
//     let elapsed = millis() - breakStartTime;
//     let fraction = min(1, elapsed / breakDuration);

//     background(255);

  
//     stroke(255, 0, 0, 50);
//     noFill();
//     for (let path of pastCycles) {
//       beginShape();
//       for (let pt of path) {
//         vertex(pt.x, pt.y);
//       }
//       endShape();
//     }


//     stroke(255, 0, 0);
//     let remaining = floor(threadPoints.length * (1 - fraction));
//     if (remaining > 1) {
//       beginShape();
//       for (let i = 0; i < remaining; i++) {
//         vertex(threadPoints[i].x, threadPoints[i].y);
//       }
//       endShape();
//     }

//     if (fraction >= 1) {
//       if (currentCycle < totalCycles) {
//         currentCycle++;
//         prepareThread();
//         state = 'focus';
//         startTime = millis();
//       } else {
//         state = 'done';
//         focusInput.removeAttribute('disabled');
//         breakInput.removeAttribute('disabled');
//         cycleInput.removeAttribute('disabled');
//         startBtn.removeAttribute('disabled');
//       }
//     }
//   }
// }