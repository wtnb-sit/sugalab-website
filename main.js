function applyLang(l){
  document.documentElement.dataset.lang = l;
  document.documentElement.lang = l;
}
(function(){
  let l = "ja";
  try { l = localStorage.getItem("sugalab-lang") || "ja"; } catch(e) {}
  applyLang(l);
})();
function toggleLang(){
  const next = document.documentElement.dataset.lang === "ja" ? "en" : "ja";
  applyLang(next);
  try { localStorage.setItem("sugalab-lang", next); } catch(e) {}
}
function toggleNews(){
  const list = document.getElementById("newsList");
  const btn = document.getElementById("newsMoreBtn");
  if (!list || !btn) return;
  list.classList.toggle("expanded");
  const open = list.classList.contains("expanded");
  btn.innerHTML = open
    ? '<span class="jp">Close \u25b4</span><span class="en">Close \u25b4</span>'
    : '<span class="jp">View More \u25be</span><span class="en">View More \u25be</span>';
}
function showTab(e, name){
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  e.currentTarget.classList.add("active");
  document.getElementById("tab-" + name).classList.add("active");
}

function initSlideshow(){
  const ss = document.getElementById("photoSlideshow");
  if (!ss) return;
  const slides = ss.querySelectorAll(".slide");
  const dotsWrap = ss.querySelector(".dots");
  let current = 0;
  let timer = null;
  const INTERVAL = 4000; // 4秒ごとに自動切替

  // ドットを生成
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "slide " + (i + 1));
    dot.addEventListener("click", () => { show(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll(".dot");

  function show(i){
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }
  function next(){ show(current + 1); }
  function restart(){ clearInterval(timer); timer = setInterval(next, INTERVAL); }

  // ホバー中は一時停止
  ss.addEventListener("mouseenter", () => clearInterval(timer));
  ss.addEventListener("mouseleave", restart);

  restart();
}

document.addEventListener("DOMContentLoaded", () => {
  initSlideshow();
  const io = new IntersectionObserver(es => {
    es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: .06 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  document.querySelectorAll("nav a").forEach(a =>
    a.addEventListener("click", () => document.querySelector("nav").classList.remove("open")));
});
