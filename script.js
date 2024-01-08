
// function loco() {
gsap.registerPlugin(ScrollTrigger);
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(`#main`),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on(`scroll`, ScrollTrigger.update);
// tell ScrollTrigger to use these proxy methods for the `#main` element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(`#main`, {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(`#main`).style.transform ? `transform` : `fixed`
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener(`refresh`, () => locoScroll.update());
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
// }
// loco();






gsap.to(`#logo,#navbar .btn`, {
  y: -100,
  scrollTrigger: {
    trigger: `#page1`,
    scroller: `#main`,
    start: `top 0%`,
    end: `top -5%`,
    scrub: 1
  }
})

gsap.timeline()
  .from("#page1 .h1 h1", {
    rotate: 30,
    y: "300%",
    duration: 1,
    stagger: .2
  })
  .from("#para", {
    width: 0
  })


flag = 0;
document.querySelector("#nav-right h3").addEventListener("click", (dets) => {
  if (flag == 0) {
    document.querySelector("#menubar").style.transform = "translateX(0)"
    document.querySelector("#nav-right h3").innerHTML = `<i class="ri-close-line"></i>`
    document.querySelector("#nav-right h3").style.backgroundColor = `#053FD5`
    flag = 1;
  } else {
    document.querySelector("#menubar").style.transform = "translateX(100%)"
    document.querySelector("#nav-right h3").innerHTML = `<i class="ri-menu-line"></i>`
    document.querySelector("#nav-right h3").style.backgroundColor = `transparent`
    flag = 0
  }
})





function percent() {
  let a = 0;
  let int = setInterval(() => {
    a++;
    if (a < 100) {
      document.querySelector(".percent").innerHTML = a + "%"
    } else {
      document.querySelector(".percent").innerHTML = a + "%"
      clearInterval(int)
    }
  }, 1);
}
percent()

function introAnimation() {
  let tm = gsap.timeline(
    {
      delay: 1
    }
  )
  tm
    .from("#starting-animation-page h1", {
      y: "300%",
      rotate: 30,
      duration: .7
    })
    .call(percent)
    .to("#starting-animation-page h1", {
      delay: 1,
      y: "-110%",
      duration: .1
    })
    .from("#starting-animation-page #white", {
      delay: 1,
      y: "-200%",
      height: "200%",
      duration: 1
    })
    .to("#starting-animation-page", {
      y: "100%",
      display: "none",
      duration: .1

    })
  locoScroll.stop()
}
introAnimation()
locoScroll.start()


function canva1() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
canva/frames00007.png
canva/frames00010.png
canva/frames00013.png
canva/frames00016.png
canva/frames00019.png
canva/frames00022.png
canva/frames00025.png
canva/frames00028.png
canva/frames00031.png
canva/frames00034.png
canva/frames00037.png
canva/frames00040.png
canva/frames00043.png
canva/frames00046.png
canva/frames00049.png
canva/frames00052.png
canva/frames00055.png
canva/frames00058.png
canva/frames00061.png
canva/frames00064.png
canva/frames00067.png
canva/frames00070.png
canva/frames00073.png
canva/frames00076.png
canva/frames00079.png
canva/frames00082.png
canva/frames00085.png
canva/frames00088.png
canva/frames00091.png
canva/frames00094.png
canva/frames00097.png
canva/frames00100.png
canva/frames00103.png
canva/frames00106.png
canva/frames00109.png
canva/frames00112.png
canva/frames00115.png
canva/frames00118.png
canva/frames00121.png
canva/frames00124.png
canva/frames00127.png
canva/frames00130.png
canva/frames00133.png
canva/frames00136.png
canva/frames00139.png
canva/frames00142.png
canva/frames00145.png
canva/frames00148.png
canva/frames00151.png
canva/frames00154.png
canva/frames00157.png
canva/frames00160.png
canva/frames00163.png
canva/frames00166.png
canva/frames00169.png
canva/frames00172.png
canva/frames00175.png
canva/frames00178.png
canva/frames00181.png
canva/frames00184.png
canva/frames00187.png
canva/frames00190.png
canva/frames00193.png
canva/frames00196.png
canva/frames00199.png
canva/frames00202.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 66;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page3>canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `300% top`,
      scroller: `#main`,

    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    // markers: true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `300% top`,
  });
}
canva1()
splitToSpan()

function h1move(e) {
  gsap.to(`${e} .split-text-page`, {
    y: "-110%",
    scrollTrigger: {
      trigger: `${e}`,
      // markers: true,
      scroller: `#main`,
      //   set start end according to preference
      start: `top top`,
      scrub: .15
    }
  })
  gsap.from(`${e} h1 span`, {
    opacity: .4,
    stagger: .5,
    scrollTrigger: {
      trigger: `${e} h1`,
      scroller: `#main`,
      //   set start end according to preference
      start: `top 70%`,
      end: `top -10%`,
      scrub: 1
    }
  })
}

h1move("#page3")


function canva2() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
canva1/bridges00004.png
canva1/bridges00007.png
canva1/bridges00010.png
canva1/bridges00013.png
canva1/bridges00016.png
canva1/bridges00019.png
canva1/bridges00022.png
canva1/bridges00025.png
canva1/bridges00028.png
canva1/bridges00031.png
canva1/bridges00034.png
canva1/bridges00037.png
canva1/bridges00040.png
canva1/bridges00043.png
canva1/bridges00046.png
canva1/bridges00049.png
canva1/bridges00052.png
canva1/bridges00055.png
canva1/bridges00058.png
canva1/bridges00061.png
canva1/bridges00064.png
canva1/bridges00067.png
canva1/bridges00070.png
canva1/bridges00073.png
canva1/bridges00076.png
canva1/bridges00079.png
canva1/bridges00082.png
canva1/bridges00085.png
canva1/bridges00088.png
canva1/bridges00091.png
canva1/bridges00094.png
canva1/bridges00097.png
canva1/bridges00100.png
canva1/bridges00103.png
canva1/bridges00106.png
canva1/bridges00109.png
canva1/bridges00112.png
canva1/bridges00115.png
canva1/bridges00118.png
canva1/bridges00121.png
canva1/bridges00124.png
canva1/bridges00127.png
canva1/bridges00130.png
canva1/bridges00133.png
canva1/bridges00136.png
canva1/bridges00139.png
canva1/bridges00142.png
canva1/bridges00145.png
canva1/bridges00148.png
canva1/bridges00151.png
canva1/bridges00154.png
canva1/bridges00157.png
canva1/bridges00160.png
canva1/bridges00163.png
`;
    return data.split("\n")[index];
  }

  const frameCount = 54;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page5>canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `300% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page5",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `300% top`,
  });
}
canva2()
h1move("#page5")

function canva3() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
`;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page7>canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `300% top`,
      scroller: `#main`,
      onUpdate: (d) => {
        per = Math.floor(d.progress * 100)
        if (per < 61) {
          document.querySelector(".canva-per").innerHTML = per + "%"
        }
      }

    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page7",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `300% top`,

  });
}
canva3()
h1move("#page7")


function canva4() {
  const canvas = document.querySelector("#page9-right>canvas");
  const context = canvas.getContext("2d");
  const squareSize = 500; // Specify your square size here

  canvas.width = squareSize;
  canvas.height = squareSize;

  window.addEventListener("resize", function () {
    canvas.width = squareSize;
    canvas.height = squareSize;
    render();
  });

  function files(index) {
    var data = `
    https://thisismagma.com/assets/home/roadmap/seq/1.jpg
    https://thisismagma.com/assets/home/roadmap/seq/2.jpg
    https://thisismagma.com/assets/home/roadmap/seq/3.jpg
    https://thisismagma.com/assets/home/roadmap/seq/4.jpg
    https://thisismagma.com/assets/home/roadmap/seq/5.jpg
    https://thisismagma.com/assets/home/roadmap/seq/6.jpg
    https://thisismagma.com/assets/home/roadmap/seq/7.jpg
    https://thisismagma.com/assets/home/roadmap/seq/8.jpg
    https://thisismagma.com/assets/home/roadmap/seq/9.jpg
    https://thisismagma.com/assets/home/roadmap/seq/10.jpg
    https://thisismagma.com/assets/home/roadmap/seq/11.jpg
    https://thisismagma.com/assets/home/roadmap/seq/12.jpg
    https://thisismagma.com/assets/home/roadmap/seq/13.jpg
    https://thisismagma.com/assets/home/roadmap/seq/14.jpg
    https://thisismagma.com/assets/home/roadmap/seq/15.jpg
    https://thisismagma.com/assets/home/roadmap/seq/16.jpg
    https://thisismagma.com/assets/home/roadmap/seq/17.jpg
    https://thisismagma.com/assets/home/roadmap/seq/18.jpg
    https://thisismagma.com/assets/home/roadmap/seq/19.jpg
    https://thisismagma.com/assets/home/roadmap/seq/20.jpg
    https://thisismagma.com/assets/home/roadmap/seq/21.jpg
    https://thisismagma.com/assets/home/roadmap/seq/22.jpg
    https://thisismagma.com/assets/home/roadmap/seq/23.jpg
    https://thisismagma.com/assets/home/roadmap/seq/24.jpg
    https://thisismagma.com/assets/home/roadmap/seq/25.jpg
    https://thisismagma.com/assets/home/roadmap/seq/26.jpg
    https://thisismagma.com/assets/home/roadmap/seq/27.jpg
    https://thisismagma.com/assets/home/roadmap/seq/28.jpg
    https://thisismagma.com/assets/home/roadmap/seq/29.jpg
    https://thisismagma.com/assets/home/roadmap/seq/30.jpg
    https://thisismagma.com/assets/home/roadmap/seq/31.jpg
    https://thisismagma.com/assets/home/roadmap/seq/32.jpg
    https://thisismagma.com/assets/home/roadmap/seq/33.jpg
    https://thisismagma.com/assets/home/roadmap/seq/34.jpg
    https://thisismagma.com/assets/home/roadmap/seq/35.jpg
    https://thisismagma.com/assets/home/roadmap/seq/36.jpg
    https://thisismagma.com/assets/home/roadmap/seq/37.jpg
    https://thisismagma.com/assets/home/roadmap/seq/38.jpg
    https://thisismagma.com/assets/home/roadmap/seq/39.jpg
    https://thisismagma.com/assets/home/roadmap/seq/40.jpg
    https://thisismagma.com/assets/home/roadmap/seq/41.jpg
    https://thisismagma.com/assets/home/roadmap/seq/42.jpg
    https://thisismagma.com/assets/home/roadmap/seq/43.jpg
    https://thisismagma.com/assets/home/roadmap/seq/44.jpg
    https://thisismagma.com/assets/home/roadmap/seq/45.jpg
    https://thisismagma.com/assets/home/roadmap/seq/46.jpg
    https://thisismagma.com/assets/home/roadmap/seq/47.jpg
    https://thisismagma.com/assets/home/roadmap/seq/48.jpg
    https://thisismagma.com/assets/home/roadmap/seq/49.jpg
    https://thisismagma.com/assets/home/roadmap/seq/50.jpg
    https://thisismagma.com/assets/home/roadmap/seq/51.jpg
    https://thisismagma.com/assets/home/roadmap/seq/52.jpg
    https://thisismagma.com/assets/home/roadmap/seq/53.jpg
    https://thisismagma.com/assets/home/roadmap/seq/54.jpg
    https://thisismagma.com/assets/home/roadmap/seq/55.jpg
    https://thisismagma.com/assets/home/roadmap/seq/56.jpg
    https://thisismagma.com/assets/home/roadmap/seq/57.jpg
    https://thisismagma.com/assets/home/roadmap/seq/58.jpg
    https://thisismagma.com/assets/home/roadmap/seq/59.jpg
    https://thisismagma.com/assets/home/roadmap/seq/60.jpg
    https://thisismagma.com/assets/home/roadmap/seq/61.jpg
    https://thisismagma.com/assets/home/roadmap/seq/62.jpg
    https://thisismagma.com/assets/home/roadmap/seq/63.jpg
    https://thisismagma.com/assets/home/roadmap/seq/64.jpg
    https://thisismagma.com/assets/home/roadmap/seq/65.jpg
    https://thisismagma.com/assets/home/roadmap/seq/66.jpg
    https://thisismagma.com/assets/home/roadmap/seq/67.jpg
    https://thisismagma.com/assets/home/roadmap/seq/68.jpg
    https://thisismagma.com/assets/home/roadmap/seq/69.jpg
    https://thisismagma.com/assets/home/roadmap/seq/70.jpg
    https://thisismagma.com/assets/home/roadmap/seq/71.jpg
    https://thisismagma.com/assets/home/roadmap/seq/72.jpg
    https://thisismagma.com/assets/home/roadmap/seq/73.jpg
    https://thisismagma.com/assets/home/roadmap/seq/74.jpg
    https://thisismagma.com/assets/home/roadmap/seq/75.jpg
    
    `;
    return data.split("\n")[index];
  }

  const frameCount = 75;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page9-right>canvas`,
      start: `top top`,
      end: `300% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context, squareSize);
  }

  function scaleImage(img, ctx, squareSize) {
    var canvas = ctx.canvas;
    var ratio = Math.min(squareSize / img.width, squareSize / img.height);
    var centerShift_x = (squareSize - img.width * ratio) / 2;
    var centerShift_y = (squareSize - img.height * ratio) / 2;
    ctx.clearRect(0, 0, squareSize, squareSize);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#page9",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `300% top`,
  });
}
canva4()

function splitToSpan() {
  document.querySelectorAll(".split-text-page h1").forEach(function (elem) {

    let clutter = ``
    elem.textContent.split("").forEach(function (e) {
      clutter += `<span>${e}</span>`
    })
    elem.innerHTML = clutter;
  })
}


function cursor() {
  let c = document.querySelector("#cursor")
  document.querySelector("#page10").addEventListener("mousemove", function (dets) {
    gsap.to(c, {
      x: dets.x - c.clientWidth / 2,
      y: dets.y - c.clientHeight / 2
    })
  })
  document.querySelector("#page10").addEventListener("mouseenter", function (dets) {
    gsap.to(c, {
      scale: 1
    })
  })
  document.querySelector("#page10").addEventListener("mouseleave", function (dets) {
    gsap.to(c, {
      scale: 0
    })
  })

}
cursor()


function page9LeftAnimation() {

  gsap.to("#page9-left .b1", {
    color: "white",
    scrollTrigger: {
      trigger: "#page9",
      scroller: `#main`,
      start: `top 20%`,
    }
  })


  let tm = gsap.timeline(
    {

      scrollTrigger: {
        trigger: "#page9",
        scroller: `#main`,
        start: `top top`,
        end: `300% top`,
        scrub: 2,

      }
    }
  )


  tm


    .to("#page9-left .h1-box", {
      y: "-80%"
    }, "d")
    .to(".left-box", {
      y: "-80%",
    }, "d")
    .to(".b1", {
      color: "#ffffff58"
    }, "d")
    .to(".b2", {
      color: "white"
    }, "d")


    .to(".left-box", {
      y: "-180%",
    }, "de")
    .to(".b2", {
      color: "#ffffff58"
    }, "de")
    .to(".b3", {
      color: "white"
    }, "de")


    .to(".left-box", {
      y: "-280%",
    }, "deb")
    .to(".b3", {
      color: "#ffffff58"
    }, "deb")
    .to(".b4", {
      color: "white"
    }, "deb")

    .to(".b4", {
      duration: .1,
      color: "#ffffff58"
    }, "debr")


}
page9LeftAnimation()

function page7CanvaOverlayAnimation() {

  let tm = gsap.timeline(
    {
      delay: 1,
      scrollTrigger: {

        trigger: "#page7",
        // markers:true,
        scroller: `#main`,
        //   set start end according to preference
        start: `top top`,
        end: `300% top`,
        scrub: 2,
      }
    }
  )

  tm
    .to("#text", {
      opacity: 1,
      duration: .3
    })
    .from(".circle", {
      scale: 0,
      duration: 15
    })
    .to("#text", {
      scale: .8,
      opacity: 0,
      duration: .5,
    })
    .from("#finger-scan", {
      scale: .7,
      opacity: 0,
      duration: 1,
    })
    .to(".circle,#finger-scan", {
      scale: .8,
      opacity: 0.5,
      duration: 1
    })
    .to(".circle,#finger-scan", {
      scale: .5,
      opacity: 0,
      duration: 1,
    }, "sca")
    .from("#page7 video", {
      opacity: 0,
      duration: 1,
      scale: 2
    }, "sca")
    .from("#h1-btn h1", {
      rotate: 30,
      y: "300%"
    }, "ab")
    .from("#h1-btn .btn", {
      opacity: 0
    }, "ab")
}
page7CanvaOverlayAnimation()


var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  direction: "horizontal",
  freeMode: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true
  },
});

gsap.to("#clients", {
  x: "0%",
  repeat: -1,
  ease: "linear",
  duration: 20
})


function rotateShowText(e) {
  gsap.from(`${e} .h1 h1`, {
    y: `300%`,
    rotate: 30,
    duration: .8,
    scrollTrigger: {
      trigger: `${e} .h1 h1`,
      scroller: `#main`,
      start: `top 95%`,
      end: `top 75%`,
      // markers:true,
    }
  })

}
rotateShowText("#page8")
rotateShowText("#page9-left")
rotateShowText("#page10")
rotateShowText("#page11")
rotateShowText("#page12")
rotateShowText("#footer")