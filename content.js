// content.js
// Envia o título atual da aba para o background.js
// Necessário para agrupar os links detectados por página
function sendTitle() {
  const cleanTitle = document.title
    .replace(/,/g, "")
    .toUpperCase()
    .trim();
  chrome.runtime.sendMessage({ type: "SET_TAB_TITLE", title: cleanTitle });
}

// Executa no carregamento da página
sendTitle();

// Observa alterações no <title> (útil para SPAs que mudam dinamicamente)
const observer = new MutationObserver(() => sendTitle());
const titleEl = document.querySelector("title");
if (titleEl) {
  observer.observe(titleEl, { childList: true });
}