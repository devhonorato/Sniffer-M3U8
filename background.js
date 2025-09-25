// background.js
// Mantém um mapa de títulos de aba por tabId
const tabTitles = {};

// Recebe mensagens do content.js com o título da aba
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "SET_TAB_TITLE" && sender.tab) {
    // Armazena o título limpo para associar às URLs detectadas
    tabTitles[sender.tab.id] = msg.title || "SEM_TITULO";
  }
});

// Monitora todas as requisições de rede
// Se encontrar um arquivo .m3u8, salva no storage
chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (/\.m3u8(\?|$)/.test(details.url)) {
      const title = tabTitles[details.tabId] || "SEM_TITULO";

      // Recupera lista atual e adiciona nova URL (evitando duplicatas)
      chrome.storage.local.get("videos", (data) => {
        const videos = data.videos || [];
        const exists = videos.find(v => v.url === details.url);
        if (exists) {
          exists.title = title; // Atualiza título se necessário
        } else {
          videos.push({ url: details.url, title });
        }
        chrome.storage.local.set({ videos });
      });
    }
  },
  { urls: ["<all_urls>"] }
);