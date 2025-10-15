// Seleciona o botão de voltar ao topo
const backToTopBtn = document.querySelector("#back-to-top");

// Função que faz o scroll suave até o topo
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Quando clicar no botão, chama a função scrollToTop
backToTopBtn.addEventListener("click", scrollToTop);

// Opcional: mostrar ou esconder o botão quando rolar a página
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
