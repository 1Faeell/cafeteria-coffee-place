// script.js

async function carregarCardapio() {
  try {
    const resp = await fetch("assets/data/cardapio.json");
    if (!resp.ok) throw new Error(`HTTP ${resp.status} - ${resp.statusText}`);

    const data = await resp.json();
    const cardapioContent = document.getElementById("cardapio-content");
    if (!cardapioContent)
      throw new Error("Elemento #cardapio-content não encontrado no DOM.");
    cardapioContent.innerHTML = "";

    data.categories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category";

      const title = document.createElement("h3");
      title.textContent = category.name;
      categoryDiv.appendChild(title);

      const itemsContainer = document.createElement("div");
      itemsContainer.className = "items-container";

      // Cria todos os itens sem esconder nenhum
      category.items.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${escapeHtml(
          item.name
        )}" loading="lazy">
          <div class="item-content">
            <h4>${escapeHtml(item.name)}</h4>
            <p>${escapeHtml(item.description)}</p>
            <span class="price">${escapeHtml(item.price)}</span>
          </div>
        `;
        itemsContainer.appendChild(itemDiv);
      });

      categoryDiv.appendChild(itemsContainer);
      cardapioContent.appendChild(categoryDiv);
    });
  } catch (err) {
    console.error("Erro ao carregar o cardapio:", err);
    const cardapioContent = document.getElementById("cardapio-content");
    if (cardapioContent)
      cardapioContent.innerHTML = `<p class="error">Não foi possível carregar o cardápio. Veja o console do navegador.</p>`;
  }
}

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m];
  });
}

document.addEventListener("DOMContentLoaded", carregarCardapio);
