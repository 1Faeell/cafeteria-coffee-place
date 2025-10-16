const MAX_VISIBLE = 6; // limite opcional
let cardapioData = [];
let filtroAtivo = "Todos"; // controla o filtro ativo atual

async function carregarCardapio() {
  try {
    const resp = await fetch("assets/data/mais-cardapio.json");
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    cardapioData = data.categories;
    gerarFiltros(cardapioData);
    renderizarCardapio("Todos");
  } catch (err) {
    console.error("Erro ao carregar cardápio:", err);
    const container = document.getElementById("cardapio-content");
    container.innerHTML = "<p>Não foi possível carregar o cardápio.</p>";
  }
}

// 🔹 Gera os botões de filtro dinamicamente
function gerarFiltros(categories) {
  const filtroContainer = document.getElementById("filtros");
  filtroContainer.innerHTML = "";

  const btnTodos = document.createElement("button");
  btnTodos.textContent = "Todos";
  btnTodos.dataset.filtro = "Todos";
  btnTodos.classList.add("ativo");
  filtroContainer.appendChild(btnTodos);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.dataset.filtro = cat.name;
    filtroContainer.appendChild(btn);
  });

  // Delegação de eventos (melhor performance)
  filtroContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const filtroSelecionado = btn.dataset.filtro;

    // Se clicar no mesmo filtro ativo → limpa (volta pra "Todos")
    if (filtroSelecionado === filtroAtivo && filtroAtivo !== "Todos") {
      filtroAtivo = "Todos";
    } else {
      filtroAtivo = filtroSelecionado;
    }

    // Atualiza classes de botão ativo
    document
      .querySelectorAll("#filtros button")
      .forEach((b) => b.classList.remove("ativo"));

    // Sempre deixa "Todos" ativo quando for o filtro atual
    const btnAtivo = [...document.querySelectorAll("#filtros button")].find(
      (b) => b.dataset.filtro === filtroAtivo
    );
    if (btnAtivo) btnAtivo.classList.add("ativo");

    // Renderiza com base no filtro atual
    renderizarCardapio(filtroAtivo);
  });
}

// 🔹 Renderiza o cardápio filtrado
function renderizarCardapio(filtro) {
  const container = document.getElementById("cardapio-content");
  container.innerHTML = "";

  const categoriasFiltradas =
    filtro === "Todos"
      ? cardapioData
      : cardapioData.filter((cat) => cat.name === filtro);

  categoriasFiltradas.forEach((cat) => {
    const titulo = document.createElement("h2");
    titulo.textContent = cat.name;
    container.appendChild(titulo);

    const itemsWrapper = document.createElement("div");
    itemsWrapper.className = "items-wrapper";

    cat.items.slice(0, MAX_VISIBLE).forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cardapio-infos">
          <h4>${item.name}</h4>
          <p class="descricao">${item.description}</p>
          <span class="price">${item.price}</span>
        </div>
      `;
      itemsWrapper.appendChild(div);
    });

    container.appendChild(itemsWrapper);
  });
}

document.addEventListener("DOMContentLoaded", carregarCardapio);
