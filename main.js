(() => {
  let yOffset = 0; // window.pageYOffset;
  let prevScrollHeight = 0; // summ of past scenes scroll height
  let currentScene = 0;
  let enterNewScene = false;

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d')
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.2, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.4, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.6, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_translateY_out: [0, -20, { start: 0.2, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.4, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.6, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.8, end: 0.9 }]
      }
    },
    {
      // 1
      type: 'normal',
      heightNum: 5, //브라우저 높이의 5배
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values[2]) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    console.log(rv);

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        if (scrollRatio <= 0.2) {
          // in
          const messageA_translateY_in = calcValues(
            values.messageA_translateY_in,
            currentYOffset
          );
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else if (scrollRatio <= 0.3) {
          // out
          const messageA_translateY_out = calcValues(
            values.messageA_translateY_out,
            currentYOffset
          );
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        } else if (scrollRatio <= 0.4) {
          // in
          const messageB_translateY_in = calcValues(
            values.messageB_translateY_in,
            currentYOffset
          );
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.messageB.style.transform = `translateY(${messageB_translateY_in}%)`;
        } else if (scrollRatio <= 0.5) {
          // out
          const messageB_translateY_out = calcValues(
            values.messageB_translateY_out,
            currentYOffset
          );
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          objs.messageB.style.transform = `translateY(${messageB_translateY_out}%)`;
        } else if (scrollRatio <= 0.6) {
          // in
          const messageC_translateY_in = calcValues(
            values.messageC_translateY_in,
            currentYOffset
          );
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.messageC.style.transform = `translateY(${messageC_translateY_in}%)`;
        } else if (scrollRatio <= 0.7) {
          // out
          const messageC_translateY_out = calcValues(
            values.messageC_translateY_out,
            currentYOffset
          );
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.messageC.style.transform = `translateY(${messageC_translateY_out}%)`;
        } else if (scrollRatio <= 0.8) {
          // in
          const messageD_translateY_in = calcValues(
            values.messageD_translateY_in,
            currentYOffset
          );
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_in,
            currentYOffset
          );
          objs.messageD.style.transform = `translateY(${messageD_translateY_in}%)`;
        } else if (scrollRatio <= 0.9) {
          // out
          const messageD_translateY_out = calcValues(
            values.messageD_translateY_out,
            currentYOffset
          );
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_out,
            currentYOffset
          );
          objs.messageD.style.transform = `translateY(${messageD_translateY_out}%)`;
        }

        break;

      case 1:
        console.log('1 Play');
        break;

      case 2:
        if (scrollRatio <= 0.2) {
          // in
          const messageA_translateY_in = calcValues(
            values.messageA_translateY_in,
            currentYOffset
          );
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else if (scrollRatio <= 0.3) {
          // out
          const messageA_translateY_out = calcValues(
            values.messageA_translateY_out,
            currentYOffset
          );
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        } 
        console.log('2 Play');
        break;

      case 3:
        console.log('3 Play');
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      enterNewScene = true;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener('resize', setLayout);
  window.addEventListener('load', setLayout);
})();
