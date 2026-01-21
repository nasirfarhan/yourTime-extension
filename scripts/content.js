function renderReadingTime(article) {
  if (!article) return;

  const text = article.innerText;
  if (!text || text.length < 200) return;

  const words = text.match(/[^\s]+/g);
  if (!words) return;

  const wordCount = words.length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const badge = document.createElement("p");
  badge.classList.add("reading-time-badge");

  badge.textContent = `⏱️ ${readingTime} min read`;
  badge.style.fontSize = "14px";
  badge.style.opacity = "0.7";
  badge.style.marginTop = "8px";

  const heading =
    document.querySelector("h1") ||
    document.querySelector("h2") ||
    article.firstElementChild;

  if (heading) {
    heading.insertAdjacentElement("afterend", badge);
  }
}

const article =
  document.querySelector("article") ||
  document.querySelector("main") ||
  document.body;

renderReadingTime(article);


const observer = new MutationObserver(() => {
  const article =
    document.querySelector("article") ||
    document.querySelector("main") ||
    document.body;

  if (!document.querySelector(".reading-time-badge")) {
    renderReadingTime(article);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
