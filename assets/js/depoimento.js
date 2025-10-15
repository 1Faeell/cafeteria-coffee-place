// =============================
// 💬 Depoimentos com Scroll Responsivo
// =============================
async function carregarDepoimentos() {
  try {
    const response = await fetch("assets/data/depoimentos.json");
    if (!response.ok) throw new Error("Erro ao carregar depoimentos.");
    const data = await response.json();

    const wrapper = document.getElementById("depoimentos-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = ""; // limpa antes

    data.depoimentos.forEach((dep) => {
      const div = document.createElement("div");
      div.classList.add("depoimento");
      div.innerHTML = `
        <img src="${dep.imagem}" alt="${dep.nome}" class="foto-depoimento">
        <p><i class="bi bi-quote"></i>"${dep.mensagem}"</p>
        <h4>— ${dep.nome}</h4>
        <span>${dep.profissao}</span>
      `;
      wrapper.appendChild(div);
    });
  } catch (err) {
    console.error("Erro ao carregar depoimentos:", err);
  }
}

document.addEventListener("DOMContentLoaded", carregarDepoimentos);
