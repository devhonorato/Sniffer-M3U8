// popup.js
const ul = document.getElementById("links");
const clearBtn = document.getElementById("clearBtn");
const exportBtn = document.getElementById("exportBtn");

function copyURL(url, button) {
  navigator.clipboard.writeText(url).then(() => {
    const old = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => (button.textContent = old), 1500);
  });
}

// Extrai a resolução de uma URL M3U8
function getResolution(url) {
  const match = url.match(/\/(\d{3,4}p)\//i);
  if (match) return match[1];
  if (/playlist\.m3u8$/i.test(url)) return "Playlist";
  return "Desconhecida";
}

function render() {
  ul.innerHTML = "";

  // carregar links
  chrome.storage.local.get("videos", (data) => {
    const videos = data.videos || [];
    if (videos.length === 0) {
      ul.innerHTML = "<li>Nenhum vídeo detectado.</li>";
      return;
    }

    const grouped = {};
    videos.forEach((v) => {
      const t = v.title || "SEM_TITULO";
      if (!grouped[t]) grouped[t] = [];
      grouped[t].push(v.url);
    });

    Object.entries(grouped).forEach(([title, urls]) => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="title">${title}</div>`;
      const sub = document.createElement("ul");
      sub.className = "url-box";

      urls.forEach((url) => {
        const subLi = document.createElement("li");
        subLi.className = "url-item";

        const resSpan = document.createElement("span");
        resSpan.className = "url-text";
        resSpan.textContent = getResolution(url);

        const btn = document.createElement("button");
        btn.textContent = "Copy";
        btn.onclick = () => copyURL(url, btn);

        subLi.appendChild(resSpan);
        subLi.appendChild(btn);
        sub.appendChild(subLi);
      });

      li.appendChild(sub);
      ul.appendChild(li);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  render();

  // limpar links
  clearBtn.addEventListener("click", () => {
    chrome.storage.local.set({ videos: [] }, () => {
      ul.innerHTML = "<li>Nenhum vídeo detectado.</li>";
    });
  });
});

// Atualiza se o storage mudar
chrome.storage.onChanged.addListener((c, area) => {
  if (area === "local" && c.videos) render();
});

exportBtn.addEventListener("click", () => {
  chrome.storage.local.get("videos", (data) => {
    const videos = data.videos || [];
    const exportData = {
      videos: videos.map((v, i) => ({
        url: v.url,
        resolucao: getResolution(v.url),
        name: `${i + 1} - ${v.title || "SEM_TITULO"}`
      }))
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "videos.json";
    a.click();
    URL.revokeObjectURL(url);
  });
});