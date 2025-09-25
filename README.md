# Sniffer-M3U8

Uma extensão para Google Chrome que detecta e lista **URLs de vídeo M3U8 (HLS)** carregadas em qualquer aba.  
Ideal para desenvolvedores, testers ou quem precisa inspecionar e exportar links de streaming.

---

## ✨ Funcionalidades
- Detecta automaticamente **requisições `.m3u8`** em qualquer site.
- Exibe os links detectados em uma popup organizada por título da aba.
- Mostra a **resolução** do vídeo (quando disponível).
- Permite **copiar** rapidamente cada URL.
- Exporta todos os links em um arquivo **JSON**.

---

## 🚀 Instalação para Desenvolvedores
1. Baixe ou clone este repositório:
```
git clone https://github.com/devhonorato/Sniffer-M3U8.git
```

2. No Chrome, acesse `chrome://extensions/`.

3. Ative o ***Modo do desenvolvedor*** (canto superior direito).

4. Clique em ***Carregar sem compactação*** e selecione a pasta do projeto.

## 🛠️ Estrutura
```
Sniffer-M3U8/
├─ manifest.json      # Configuração da extensão (Manifest V3)
├─ background.js      # Captura das URLs M3U8 e gerenciamento do storage
├─ content.js         # Envia o título da aba para o background
├─ popup.html         # Interface principal da extensão
├─ popup.js           # Lógica da interface e exportação
└─ README.md          # Esta documentação
```
## Como Funciona

- O `background.js` monitora as requisições da aba via `chrome.webRequest`.

- Quando encontra uma URL terminando em `.m3u8`, armazena a URL e o título da aba em `chrome.storage.local`.

- O `popup.html` exibe a lista de vídeos detectados, com botões para copiar e exportar em JSON.

- O `content.js` envia continuamente o título da aba para manter os links organizados.

## ⚠️ Aviso Legal

Este projeto é para ***uso educacional*** e de ***desenvolvimento***.

Não utilize para violar direitos autorais ou termos de serviço de terceiros.