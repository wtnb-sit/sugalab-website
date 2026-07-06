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
document.addEventListener("DOMContentLoaded", () => {
  const io = new IntersectionObserver(es => {
    es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: .06 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  document.querySelectorAll("nav a").forEach(a =>
    a.addEventListener("click", () => document.querySelector("nav").classList.remove("open")));
});
