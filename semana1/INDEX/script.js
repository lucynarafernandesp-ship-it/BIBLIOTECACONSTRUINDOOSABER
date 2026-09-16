/* ==========================================================
   Construindo o Saber — Frontend
   Funciona de forma independente com dados de demonstração
   (mesmo conteúdo do sql/seed.sql). Para conectar à API Flask
   real, defina API_BASE_URL e implemente as chamadas fetch
   indicadas nos comentários "INTEGRAÇÃO API".
   ========================================================== */

const API_BASE_URL = null; // ex: "http://localhost:5000/api" quando o backend estiver no ar

// ---------------------------------------------------------------
// GERADOR DE CAPAS
// Cada capa é uma ilustração original em SVG, gerada a partir do
// título e da categoria do livro — sem depender de fotos de banco
// de imagens nem de capas reais protegidas por direitos autorais.
// ---------------------------------------------------------------
const PALETA_CATEGORIA = {
  "Romance":            { de: "#7A2E2E", para: "#C98A87", tinta: "#FBF1EC", motivo: "ondas" },
  "Fantasia":           { de: "#332255", para: "#8C6FC9", tinta: "#F3EFFB", motivo: "estrelas" },
  "Infantil":           { de: "#E8A33D", para: "#F2D06B", tinta: "#3A2A0E", motivo: "bolhas" },
  "Técnico":            { de: "#16302B", para: "#3E8E7E", tinta: "#F1ECDE", motivo: "grade" },
  "Autoajuda":          { de: "#96771C", para: "#E7C868", tinta: "#2C2408", motivo: "arco" },
  "Suspense":           { de: "#1B1B1B", para: "#7A2E2E", tinta: "#F1ECDE", motivo: "fenda" },
  "Ficção Científica":  { de: "#0E2340", para: "#2FA6A0", tinta: "#EAF6F5", motivo: "orbita" },
  "Poesia":             { de: "#EFE3D0", para: "#C9A0AC", tinta: "#3A2E2A", motivo: "linhas" },
};

function quebrarTitulo(titulo, maxChars = 13) {
  const palavras = titulo.split(" ");
  const linhas = [];
  let atual = "";
  palavras.forEach((p) => {
    if ((atual + " " + p).trim().length > maxChars && atual) {
      linhas.push(atual.trim());
      atual = p;
    } else {
      atual = (atual + " " + p).trim();
    }
  });
  if (atual) linhas.push(atual);
  return linhas.slice(0, 4);
}

function motivoSVG(motivo, cor) {
  switch (motivo) {
    case "ondas":
      return `<path d="M0 210 Q 50 190 100 210 T 200 210 V300 H0 Z" fill="${cor}" opacity="0.25"/>`;
    case "estrelas":
      return `<g fill="${cor}" opacity="0.7">
        <circle cx="30" cy="40" r="2"/><circle cx="160" cy="70" r="1.6"/>
        <circle cx="60" cy="90" r="1.4"/><circle cx="130" cy="35" r="2"/>
        <circle cx="100" cy="60" r="1.2"/><circle cx="45" cy="130" r="1.6"/></g>`;
    case "bolhas":
      return `<g fill="${cor}" opacity="0.55">
        <circle cx="35" cy="230" r="22"/><circle cx="150" cy="250" r="16"/>
        <circle cx="90" cy="270" r="12"/></g>`;
    case "grade":
      return `<g stroke="${cor}" stroke-width="1" opacity="0.35">
        <line x1="0" y1="70" x2="200" y2="70"/><line x1="0" y1="100" x2="200" y2="100"/>
        <line x1="70" y1="40" x2="70" y2="130"/><line x1="130" y1="40" x2="130" y2="130"/></g>`;
    case "arco":
      return `<path d="M20 200 A 80 80 0 0 1 180 200" stroke="${cor}" stroke-width="3" fill="none" opacity="0.5"/>`;
    case "fenda":
      return `<path d="M100 20 L92 130 L108 150 L96 260" stroke="${cor}" stroke-width="2" fill="none" opacity="0.55"/>`;
    case "orbita":
      return `<g stroke="${cor}" fill="none" opacity="0.5">
        <ellipse cx="100" cy="90" rx="70" ry="24"/>
        <ellipse cx="100" cy="90" rx="70" ry="24" transform="rotate(60 100 90)"/>
        <circle cx="100" cy="90" r="8" fill="${cor}" stroke="none"/></g>`;
    case "linhas":
      return `<g stroke="${cor}" stroke-width="1.4" opacity="0.4">
        <path d="M20 220 Q100 210 180 225"/><path d="M25 240 Q100 232 175 244"/></g>`;
    default:
      return "";
  }
}

function gerarCapaSVG(titulo, categoria) {
  const p = PALETA_CATEGORIA[categoria] || PALETA_CATEGORIA["Romance"];
  const linhas = quebrarTitulo(titulo);
  const inicioY = 150 - (linhas.length - 1) * 12;
  const textoSVG = linhas
    .map((l, i) => `<text x="20" y="${inicioY + i * 24}" font-family="Georgia, serif" font-size="18" font-weight="700" fill="${p.tinta}">${l}</text>`)
    .join("");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${p.de}"/>
        <stop offset="1" stop-color="${p.para}"/>
      </linearGradient>
    </defs>
    <rect width="200" height="300" fill="url(#g)"/>
    ${motivoSVG(p.motivo, p.tinta)}
    <rect x="14" y="14" width="172" height="272" fill="none" stroke="${p.tinta}" stroke-opacity="0.35" stroke-width="1"/>
    ${textoSVG}
    <text x="20" y="278" font-family="Inter, sans-serif" font-size="10" letter-spacing="1" fill="${p.tinta}" opacity="0.75">${categoria.toUpperCase()}</text>
  </svg>`;

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function capaFor(livro) {
  if (!livro._capaCache) livro._capaCache = gerarCapaSVG(livro.titulo, livro.categoria);
  return livro._capaCache;
}

// ---------------------------------------------------------------
// CATÁLOGO DE LIVROS (dados de demonstração — espelham python/seed.py)
// ---------------------------------------------------------------
const LIVROS = [
  { id: 1, titulo: "O Silêncio das Marés", autor: "Marina Alves", categoria: "Romance", faixa_etaria: "Livre (18+)", ano: 2023,
    resumo: "Uma jovem pescadora descobre segredos de família enterrados na areia de sua vila natal, enquanto uma tempestade se aproxima e ameaça revelar tudo antes que ela esteja pronta.",
    preco_venda: 39.90, preco_aluguel_dia: 3.50, nota: 4.6, em_alta: true },
  { id: 2, titulo: "A Coroa de Vidro", autor: "Ricardo Nunes", categoria: "Fantasia", faixa_etaria: "Jovem Adulto (14-17)", ano: 2022,
    resumo: "Em um reino dividido por magia proibida, uma herdeira exilada precisa reunir três fragmentos de uma coroa amaldiçoada antes que a escuridão tome o trono.",
    preco_venda: 54.90, preco_aluguel_dia: 4.90, nota: 4.8, em_alta: true },
  { id: 3, titulo: "O Dragãozinho Medroso", autor: "Clara Bittencourt", categoria: "Infantil", faixa_etaria: "Infantil (0-8)", ano: 2021,
    resumo: "Um pequeno dragão que tem medo do próprio fogo aprende, com a ajuda de seus amigos da floresta, que suas diferenças podem ser sua maior força.",
    preco_venda: 29.90, preco_aluguel_dia: null, nota: 4.9, em_alta: true },
  { id: 4, titulo: "Ciência de Dados na Prática", autor: "Felipe Souza", categoria: "Técnico", faixa_etaria: "Livre (18+)", ano: 2024,
    resumo: "Um guia direto ao ponto para quem quer sair da teoria e aplicar análise de dados em problemas reais de negócio, com exemplos em Python do primeiro ao último capítulo.",
    preco_venda: 89.90, preco_aluguel_dia: 6.90, nota: 4.7, em_alta: true },
  { id: 5, titulo: "Minutos Antes da Meia-Noite", autor: "Helena Prado", categoria: "Suspense", faixa_etaria: "Livre (18+)", ano: 2023,
    resumo: "Uma detetive aposentada é convocada para resolver um crime que ela mesma investigou décadas atrás — e que talvez nunca tenha sido realmente solucionado.",
    preco_venda: 44.90, preco_aluguel_dia: 4.50, nota: 4.5, em_alta: false },
  { id: 6, titulo: "Foco: Domine Sua Rotina", autor: "Marina Alves", categoria: "Autoajuda", faixa_etaria: "Livre (18+)", ano: 2020,
    resumo: "Estratégias simples e comprovadas para organizar tempo, energia e prioridades sem depender de força de vontade infinita.",
    preco_venda: 34.90, preco_aluguel_dia: 3.00, nota: 4.3, em_alta: false },
  { id: 7, titulo: "A Floresta dos Sussurros", autor: "Ricardo Nunes", categoria: "Fantasia", faixa_etaria: "Juvenil (9-13)", ano: 2022,
    resumo: "Três irmãos descobrem uma porta escondida no quintal de casa que leva a uma floresta onde as árvores guardam a memória de tudo o que já aconteceu ali.",
    preco_venda: 42.90, preco_aluguel_dia: 3.90, nota: 4.6, em_alta: false },
  { id: 8, titulo: "Primeiras Palavras", autor: "Clara Bittencourt", categoria: "Infantil", faixa_etaria: "Infantil (0-8)", ano: 2021,
    resumo: "Um livro cartonado com rimas simples para bebês descobrirem sons, cores e os primeiros animais da fazenda.",
    preco_venda: 24.90, preco_aluguel_dia: null, nota: 4.8, em_alta: false },
  { id: 9, titulo: "As Cartas Que Não Enviei", autor: "Marina Alves", categoria: "Romance", faixa_etaria: "Jovem Adulto (14-17)", ano: 2023,
    resumo: "Depois de uma mudança de cidade, uma adolescente encontra uma caixa de cartas nunca enviadas pela mãe e decide terminar o que ela começou.",
    preco_venda: 36.90, preco_aluguel_dia: 3.20, nota: 4.4, em_alta: false },
  { id: 10, titulo: "O Último Guardião das Estrelas", autor: "Ricardo Nunes", categoria: "Fantasia", faixa_etaria: "Livre (18+)", ano: 2024,
    resumo: "O último de uma antiga ordem de guardiões precisa treinar uma sucessora relutante antes que o céu noturno se apague para sempre.",
    preco_venda: 58.90, preco_aluguel_dia: 5.20, nota: 4.7, em_alta: true },
  { id: 11, titulo: "Bichinhos da Horta", autor: "Clara Bittencourt", categoria: "Infantil", faixa_etaria: "Infantil (0-8)", ano: 2022,
    resumo: "Uma joaninha, um caracol e uma minhoca ensinam, cada um à sua maneira, como uma horta cresce com paciência e trabalho em equipe.",
    preco_venda: 26.90, preco_aluguel_dia: null, nota: 4.7, em_alta: false },
  { id: 12, titulo: "Redes Neurais Sem Mistério", autor: "Felipe Souza", categoria: "Técnico", faixa_etaria: "Livre (18+)", ano: 2024,
    resumo: "Explica, em linguagem simples e com exemplos de negócio, como modelos de machine learning tomam decisões — sem exigir formação em matemática avançada.",
    preco_venda: 94.90, preco_aluguel_dia: 7.50, nota: 4.6, em_alta: false },
  { id: 13, titulo: "O Hóspede do Quarto 12", autor: "Helena Prado", categoria: "Suspense", faixa_etaria: "Livre (18+)", ano: 2024,
    resumo: "Um hotel de beira de estrada guarda um hóspede que nunca faz check-out — e uma recepcionista decidida a descobrir por quê.",
    preco_venda: 46.90, preco_aluguel_dia: 4.70, nota: 4.6, em_alta: true },
  { id: 14, titulo: "Hábitos Que Ficam", autor: "Marina Alves", categoria: "Autoajuda", faixa_etaria: "Livre (18+)", ano: 2021,
    resumo: "Um método prático para transformar pequenas mudanças diárias em rotinas duradouras, sem depender de motivação constante.",
    preco_venda: 32.90, preco_aluguel_dia: 2.80, nota: 4.2, em_alta: false },
  { id: 15, titulo: "Estação Kepler-9", autor: "Aline Rocha", categoria: "Ficção Científica", faixa_etaria: "Jovem Adulto (14-17)", ano: 2024,
    resumo: "Numa estação espacial isolada, uma jovem engenheira descobre um sinal vindo de dentro da própria nave — e ele parece estar respondendo às suas perguntas.",
    preco_venda: 49.90, preco_aluguel_dia: 4.30, nota: 4.7, em_alta: true },
  { id: 16, titulo: "Poemas Para Ler Devagar", autor: "João Meireles", categoria: "Poesia", faixa_etaria: "Livre (18+)", ano: 2022,
    resumo: "Uma coletânea de poemas curtos sobre o cotidiano, pensada para ser lida aos poucos, um verso por vez, entre uma tarefa e outra.",
    preco_venda: 28.90, preco_aluguel_dia: 2.50, nota: 4.5, em_alta: false },
  { id: 17, titulo: "O Circo dos Sonhos Esquecidos", autor: "Ricardo Nunes", categoria: "Fantasia", faixa_etaria: "Juvenil (9-13)", ano: 2023,
    resumo: "Um circo que só aparece durante a lua cheia guarda, em suas tendas, os sonhos que as crianças da cidade esqueceram de sonhar.",
    preco_venda: 39.90, preco_aluguel_dia: 3.60, nota: 4.5, em_alta: false },
  { id: 18, titulo: "Contando Estrelinhas", autor: "Clara Bittencourt", categoria: "Infantil", faixa_etaria: "Infantil (0-8)", ano: 2020,
    resumo: "Um livro para contar de um a dez junto com uma coruja curiosa que não consegue dormir sem antes contar todas as estrelas do céu.",
    preco_venda: 25.90, preco_aluguel_dia: null, nota: 4.8, em_alta: false },
  { id: 19, titulo: "SQL Para o Dia a Dia", autor: "Felipe Souza", categoria: "Técnico", faixa_etaria: "Livre (18+)", ano: 2023,
    resumo: "Um guia enxuto para quem precisa consultar e organizar dados no trabalho sem se perder em jargão técnico — direto ao ponto, com exemplos reais.",
    preco_venda: 79.90, preco_aluguel_dia: 6.20, nota: 4.5, em_alta: false },
  { id: 20, titulo: "A Garota Que Sumiu na Névoa", autor: "Helena Prado", categoria: "Suspense", faixa_etaria: "Jovem Adulto (14-17)", ano: 2023,
    resumo: "Numa pequena cidade cercada de neblina, o desaparecimento de uma colega de escola faz uma adolescente questionar tudo o que pensava saber sobre seus vizinhos.",
    preco_venda: 41.90, preco_aluguel_dia: 3.80, nota: 4.4, em_alta: false },
  { id: 21, titulo: "Respire: Um Guia Contra a Pressa", autor: "João Meireles", categoria: "Autoajuda", faixa_etaria: "Livre (18+)", ano: 2024,
    resumo: "Exercícios curtos e práticos para desacelerar em meio à rotina, pensados para quem tem pouco tempo e menos paciência ainda para teoria.",
    preco_venda: 31.90, preco_aluguel_dia: 2.60, nota: 4.3, em_alta: false },
  { id: 22, titulo: "Colônia Vermelha", autor: "Aline Rocha", categoria: "Ficção Científica", faixa_etaria: "Livre (18+)", ano: 2023,
    resumo: "Os primeiros colonos de Marte enfrentam um inverno que nenhum simulador havia previsto — e decisões que vão além de sobrevivência.",
    preco_venda: 52.90, preco_aluguel_dia: 4.60, nota: 4.6, em_alta: false },
];

const CATEGORIAS = ["Romance", "Fantasia", "Infantil", "Técnico", "Autoajuda", "Suspense", "Ficção Científica", "Poesia"];
const FAIXAS = ["Infantil (0-8)", "Juvenil (9-13)", "Jovem Adulto (14-17)", "Livre (18+)"];
const FORMAS_PAGAMENTO = [
  { id: "cartao_credito", nome: "Cartão de crédito" },
  { id: "cartao_debito", nome: "Cartão de débito" },
  { id: "pix", nome: "Pix" },
  { id: "boleto", nome: "Boleto" },
];

// ---------------------------------------------------------------
// ESTADO EM MEMÓRIA
// ---------------------------------------------------------------
const state = {
  usuarios: [],          // { nome, email, senha }
  usuarioAtual: null,
  carrinho: [],           // { livroId, tipo: 'venda'|'aluguel', dias, quantidade }
  filtroCategoria: null,
  filtroFaixa: null,
  busca: "",
  ordenacao: "relevancia",
  livroModalId: null,
  formaPagamentoSelecionada: null,
  recentesVistos: [],     // ids dos últimos livros abertos, mais recente primeiro
};

const formatBRL = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ---------------------------------------------------------------
// NAVEGAÇÃO
// ---------------------------------------------------------------
function mostrarView(nome) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  document.getElementById(`view-${nome}`).classList.add("active");
  document.querySelectorAll(".main-nav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.view === nome);
  });
  document.getElementById("mainNav").classList.remove("mobile-open");
  if (nome === "home") renderHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileNav() {
  document.getElementById("mainNav").classList.toggle("mobile-open");
}

function toggleSearchHeader() {
  const input = document.getElementById("searchToggleInput");
  input.classList.toggle("open");
  if (input.classList.contains("open")) input.focus();
}

function buscarDoHeader(valor) {
  if (!valor.trim()) return;
  state.busca = valor.trim();
  mostrarView("catalogo");
  document.getElementById("buscaInput").value = valor.trim();
  renderCatalogo();
}

function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

// ---------------------------------------------------------------
// RENDERIZAÇÃO — HOME (estilo streaming: hero + fileiras horizontais)
// ---------------------------------------------------------------
function renderHome() {
  const emAlta = LIVROS.filter((l) => l.em_alta);
  const destaque = emAlta[0] || LIVROS[0];

  // Hero com o livro em destaque, capa como fundo desfocado
  document.getElementById("heroBg").style.backgroundImage = `url("${capaFor(destaque)}")`;
  document.getElementById("heroTitulo").textContent = destaque.titulo;
  document.getElementById("heroResumo").textContent = destaque.resumo;
  document.getElementById("heroMeta").innerHTML =
    `<span class="mini-tag">${destaque.categoria}</span><span class="mini-tag">${destaque.faixa_etaria}</span><span class="mini-tag">&#9733; ${destaque.nota.toFixed(1)}</span>`;
  const btnComprar = document.getElementById("heroBtnComprar");
  btnComprar.textContent = "Ver detalhes e comprar";
  btnComprar.onclick = () => abrirModalLivro(destaque.id);

  document.getElementById("shelfEmAlta").innerHTML = emAlta.map(bookCardHTML).join("");
  renderTop10();
  renderRecentes();

  document.getElementById("categoriasHome").innerHTML = CATEGORIAS.map(
    (c) => `<button class="chip" onclick="irParaCategoria('${c}')">${c}</button>`
  ).join("");

  renderShelvesPorCategoria();
}

function renderTop10() {
  const top10 = [...LIVROS]
    .sort((a, b) => (b.em_alta - a.em_alta) || (b.nota - a.nota))
    .slice(0, 10);

  document.getElementById("shelfTop10").innerHTML = top10.map((livro, idx) => `
    <div class="top10-item">
      <span class="top10-rank">${idx + 1}</span>
      ${bookCardHTML(livro)}
    </div>`).join("");
}

function renderRecentes() {
  const wrap = document.getElementById("rowRecentesWrap");
  if (!state.recentesVistos.length) {
    wrap.style.display = "none";
    return;
  }
  wrap.style.display = "block";
  const livros = state.recentesVistos
    .map((id) => LIVROS.find((l) => l.id === id))
    .filter(Boolean);
  document.getElementById("shelfRecentes").innerHTML = livros.map(bookCardHTML).join("");
}

function renderShelvesPorCategoria() {
  const container = document.getElementById("shelvesPorCategoria");
  container.innerHTML = CATEGORIAS.map((categoria) => {
    const livros = LIVROS.filter((l) => l.categoria === categoria);
    if (!livros.length) return "";
    return `
      <div class="container shelf-row">
        <div class="section-heading">
          <h2>${categoria}</h2>
          <span class="hint">${livros.length} título(s)</span>
        </div>
        <div class="shelf">${livros.map(bookCardHTML).join("")}</div>
      </div>`;
  }).join("");
}

function irParaCategoria(categoria) {
  state.filtroCategoria = categoria;
  mostrarView("catalogo");
  renderCatalogo();
}

function bookCardHTML(livro) {
  const precoAluguelTxt = livro.preco_aluguel_dia ? ` · Alugar ${formatBRL(livro.preco_aluguel_dia)}/dia` : "";
  return `
    <div class="book-card" onclick="abrirModalLivro(${livro.id})">
      <div class="book-cover-wrap">
        <img src="${capaFor(livro)}" alt="Capa de ${livro.titulo}" loading="lazy">
        ${livro.em_alta ? '<span class="badge-alta">Em alta</span>' : ""}
        <div class="card-hover-actions">
          <div class="card-hover-tags">
            <span class="mini-tag">${livro.categoria}</span>
            <span class="mini-tag">${livro.faixa_etaria}</span>
          </div>
          <div class="card-hover-price">Comprar ${formatBRL(livro.preco_venda)}${precoAluguelTxt}</div>
        </div>
      </div>
      <div class="book-info">
        <div class="book-title">${livro.titulo}</div>
        <div class="book-author">${livro.autor}</div>
        <div class="book-meta-row">
          <span class="book-price">${formatBRL(livro.preco_venda)}</span>
          <span class="book-rating">&#9733; ${livro.nota.toFixed(1)}</span>
        </div>
      </div>
    </div>`;
}

// ---------------------------------------------------------------
// RENDERIZAÇÃO — CATÁLOGO
// ---------------------------------------------------------------
function renderFiltros() {
  document.getElementById("filtroCategorias").innerHTML = CATEGORIAS.map(
    (c) => `<button class="chip ${state.filtroCategoria === c ? "active" : ""}" onclick="alternarFiltroCategoria('${c}')">${c}</button>`
  ).join("");

  document.getElementById("filtroFaixas").innerHTML = FAIXAS.map(
    (f) => `<button class="chip ${state.filtroFaixa === f ? "active" : ""}" onclick="alternarFiltroFaixa('${f}')">${f}</button>`
  ).join("");
}

function alternarFiltroCategoria(c) {
  state.filtroCategoria = state.filtroCategoria === c ? null : c;
  renderCatalogo();
}
function alternarFiltroFaixa(f) {
  state.filtroFaixa = state.filtroFaixa === f ? null : f;
  renderCatalogo();
}
function limparFiltros() {
  state.filtroCategoria = null;
  state.filtroFaixa = null;
  state.busca = "";
  state.ordenacao = "relevancia";
  document.getElementById("buscaInput").value = "";
  document.getElementById("ordenacaoSelect").value = "relevancia";
  renderCatalogo();
}

function livrosFiltrados() {
  const resultado = LIVROS.filter((l) => {
    if (state.filtroCategoria && l.categoria !== state.filtroCategoria) return false;
    if (state.filtroFaixa && l.faixa_etaria !== state.filtroFaixa) return false;
    if (state.busca && !l.titulo.toLowerCase().includes(state.busca.toLowerCase())) return false;
    return true;
  });

  switch (state.ordenacao) {
    case "preco_asc":
      resultado.sort((a, b) => a.preco_venda - b.preco_venda);
      break;
    case "preco_desc":
      resultado.sort((a, b) => b.preco_venda - a.preco_venda);
      break;
    case "nota_desc":
      resultado.sort((a, b) => b.nota - a.nota);
      break;
    case "ano_desc":
      resultado.sort((a, b) => b.ano - a.ano);
      break;
    default:
      // relevância: livros em alta primeiro, depois por nota
      resultado.sort((a, b) => (b.em_alta - a.em_alta) || (b.nota - a.nota));
  }

  return resultado;
}

function mudarOrdenacao(valor) {
  state.ordenacao = valor;
  renderCatalogo();
}

function renderCategoryHighlights() {
  const container = document.getElementById("categoryHighlights");
  container.innerHTML = CATEGORIAS.map((c) => {
    const total = LIVROS.filter((l) => l.categoria === c).length;
    const p = PALETA_CATEGORIA[c];
    const ativo = state.filtroCategoria === c;
    return `
      <div class="cat-highlight-card ${ativo ? "active" : ""}"
           style="background: linear-gradient(135deg, ${p.de}, ${p.para});"
           onclick="alternarFiltroCategoria('${c}')">
        <div class="cat-highlight-name">${c}</div>
        <div class="cat-highlight-count">${total} título${total === 1 ? "" : "s"}</div>
      </div>`;
  }).join("");
}

function renderCatalogo() {
  renderFiltros();
  renderCategoryHighlights();
  const livros = livrosFiltrados();
  document.getElementById("catalogoContagem").textContent = `${livros.length} título(s) encontrado(s)`;
  document.getElementById("catalogoGrid").innerHTML = livros.length
    ? livros.map(bookCardHTML).join("")
    : `<div class="empty-state">Nenhum livro encontrado com esses filtros. Tente limpar a busca.</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderCatalogo();
  document.getElementById("buscaInput").addEventListener("input", (e) => {
    state.busca = e.target.value;
    renderCatalogo();
  });
});

// ---------------------------------------------------------------
// MODAL — RESUMO DO LIVRO
// ---------------------------------------------------------------
function abrirModalLivro(id) {
  const livro = LIVROS.find((l) => l.id === id);
  if (!livro) return;
  state.livroModalId = id;

  // Atualiza a fileira "Continue explorando" (mais recente primeiro, sem duplicar, máx. 8)
  state.recentesVistos = [id, ...state.recentesVistos.filter((rid) => rid !== id)].slice(0, 8);

  document.getElementById("modalCapa").src = capaFor(livro);
  document.getElementById("modalTitulo").textContent = livro.titulo;
  document.getElementById("modalAutor").textContent = `por ${livro.autor}`;
  document.getElementById("modalResumo").textContent = livro.resumo;
  document.getElementById("modalTags").innerHTML =
    `<span class="tag">${livro.categoria}</span><span class="tag">${livro.faixa_etaria}</span><span class="tag">&#9733; ${livro.nota.toFixed(1)}</span>`;
  document.getElementById("modalPrecoVenda").textContent = `Comprar: ${formatBRL(livro.preco_venda)}`;

  const opcaoAluguel = document.getElementById("opcaoAluguel");
  if (livro.preco_aluguel_dia) {
    opcaoAluguel.style.display = "flex";
    document.getElementById("modalPrecoAluguel").textContent = `Alugar: ${formatBRL(livro.preco_aluguel_dia)}/dia`;
  } else {
    opcaoAluguel.style.display = "none";
  }

  document.getElementById("bookOverlay").classList.add("active");
}

function fecharModalLivro() {
  document.getElementById("bookOverlay").classList.remove("active");
}

function adicionarAoCarrinhoModal(tipo) {
  const livro = LIVROS.find((l) => l.id === state.livroModalId);
  if (!livro) return;
  const dias = tipo === "aluguel" ? parseInt(document.getElementById("diasAluguel").value, 10) : null;

  const existente = state.carrinho.find(
    (i) => i.livroId === livro.id && i.tipo === tipo && i.dias === dias
  );
  if (existente) {
    existente.quantidade += 1;
  } else {
    state.carrinho.push({ livroId: livro.id, tipo, dias, quantidade: 1 });
  }

  // INTEGRAÇÃO API: POST `${API_BASE_URL}/carrinho` com { id_cliente, id_livro, tipo_operacao, dias_aluguel }

  atualizarContadorCarrinho();
  mostrarToast(tipo === "venda" ? "Livro adicionado ao carrinho." : "Aluguel adicionado ao carrinho.");
  fecharModalLivro();
}

// ---------------------------------------------------------------
// CARRINHO
// ---------------------------------------------------------------
function calcularSubtotal(item) {
  const livro = LIVROS.find((l) => l.id === item.livroId);
  const precoUnit = item.tipo === "venda" ? livro.preco_venda : livro.preco_aluguel_dia * item.dias;
  return precoUnit * item.quantidade;
}

function calcularTotalCarrinho() {
  return state.carrinho.reduce((soma, item) => soma + calcularSubtotal(item), 0);
}

function atualizarContadorCarrinho() {
  const total = state.carrinho.reduce((s, i) => s + i.quantidade, 0);
  document.getElementById("cartCount").textContent = total;
}

function abrirCarrinho() {
  renderCarrinho();
  document.getElementById("cartOverlay").classList.add("active");
  document.getElementById("cartDrawer").classList.add("active");
}

function fecharCarrinho() {
  document.getElementById("cartOverlay").classList.remove("active");
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("paymentBlock").style.display = "none";
  document.getElementById("btnIrPagamento").style.display = "block";
}

function renderCarrinho() {
  const lista = document.getElementById("cartItemsList");

  if (!state.carrinho.length) {
    lista.innerHTML = `<div class="empty-state">Seu carrinho está vazio. Que tal dar uma olhada no catálogo?</div>`;
  } else {
    lista.innerHTML = state.carrinho
      .map((item, idx) => {
        const livro = LIVROS.find((l) => l.id === item.livroId);
        const meta = item.tipo === "venda" ? "Compra" : `Aluguel · ${item.dias} dias`;
        return `
        <div class="cart-line">
          <img src="${capaFor(livro)}" alt="">
          <div class="cart-line-info">
            <div class="cart-line-title">${livro.titulo}</div>
            <div class="cart-line-meta">${meta} · Qtd: ${item.quantidade}</div>
            <div class="cart-line-actions">
              <strong>${formatBRL(calcularSubtotal(item))}</strong>
              <button class="remove-link" onclick="removerDoCarrinho(${idx})">remover</button>
            </div>
          </div>
        </div>`;
      })
      .join("");
  }

  document.getElementById("cartTotal").textContent = formatBRL(calcularTotalCarrinho());
}

function removerDoCarrinho(idx) {
  state.carrinho.splice(idx, 1);
  renderCarrinho();
  atualizarContadorCarrinho();
}

// ---------------------------------------------------------------
// CHECKOUT / PAGAMENTO
// ---------------------------------------------------------------
function mostrarPagamento() {
  if (!state.carrinho.length) {
    mostrarToast("Adicione ao menos um livro antes de finalizar.");
    return;
  }
  if (!state.usuarioAtual) {
    fecharCarrinho();
    mostrarView("cadastro");
    mostrarToast("Crie sua conta ou faça login para concluir a compra.");
    return;
  }

  document.getElementById("paymentOptions").innerHTML = FORMAS_PAGAMENTO.map(
    (f) => `<button type="button" class="payment-option ${state.formaPagamentoSelecionada === f.id ? "active" : ""}" onclick="selecionarPagamento('${f.id}')">${f.nome}</button>`
  ).join("");

  document.getElementById("paymentBlock").style.display = "block";
  document.getElementById("btnIrPagamento").style.display = "none";
}

function selecionarPagamento(id) {
  state.formaPagamentoSelecionada = id;
  mostrarPagamento();
}

function finalizarCompra() {
  if (!state.formaPagamentoSelecionada) {
    document.getElementById("checkoutFeedback").textContent = "Escolha uma forma de pagamento.";
    document.getElementById("checkoutFeedback").className = "form-feedback err";
    return;
  }

  // INTEGRAÇÃO API: POST `${API_BASE_URL}/checkout` com { id_cliente, forma_pagamento }
  const totalPago = calcularTotalCarrinho();

  state.carrinho = [];
  state.formaPagamentoSelecionada = null;
  atualizarContadorCarrinho();
  fecharCarrinho();
  mostrarToast(`Compra confirmada! Total pago: ${formatBRL(totalPago)}`);
}

// ---------------------------------------------------------------
// CADASTRO / LOGIN
// ---------------------------------------------------------------
function alternarAba(aba) {
  const isCadastro = aba === "cadastro";
  document.getElementById("tabCadastro").classList.toggle("active", isCadastro);
  document.getElementById("tabLogin").classList.toggle("active", !isCadastro);
  document.getElementById("formCadastro").style.display = isCadastro ? "block" : "none";
  document.getElementById("formLogin").style.display = isCadastro ? "none" : "block";
}

function handleCadastro(evt) {
  evt.preventDefault();
  const nome = document.getElementById("cadNome").value.trim();
  const email = document.getElementById("cadEmail").value.trim().toLowerCase();
  const senha = document.getElementById("cadSenha").value;
  const telefone = document.getElementById("cadTelefone").value.trim();
  const feedback = document.getElementById("cadastroFeedback");

  if (state.usuarios.some((u) => u.email === email)) {
    feedback.textContent = "Já existe uma conta com este e-mail.";
    feedback.className = "form-feedback err";
    return;
  }

  // INTEGRAÇÃO API: POST `${API_BASE_URL}/clientes` com { nome, email, senha, telefone }
  const usuario = { nome, email, senha, telefone };
  state.usuarios.push(usuario);
  state.usuarioAtual = usuario;

  feedback.textContent = `Conta criada! Bem-vindo(a), ${nome.split(" ")[0]}.`;
  feedback.className = "form-feedback ok";
  atualizarChipUsuario();
  evt.target.reset();
}

function handleLogin(evt) {
  evt.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const senha = document.getElementById("loginSenha").value;
  const feedback = document.getElementById("loginFeedback");

  // INTEGRAÇÃO API: POST `${API_BASE_URL}/login` com { email, senha }
  const usuario = state.usuarios.find((u) => u.email === email && u.senha === senha);
  if (!usuario) {
    feedback.textContent = "E-mail ou senha inválidos.";
    feedback.className = "form-feedback err";
    return;
  }

  state.usuarioAtual = usuario;
  feedback.textContent = `Login realizado. Olá, ${usuario.nome.split(" ")[0]}!`;
  feedback.className = "form-feedback ok";
  atualizarChipUsuario();
}

function atualizarChipUsuario() {
  const chip = document.getElementById("userChip");
  chip.textContent = state.usuarioAtual ? `Olá, ${state.usuarioAtual.nome.split(" ")[0]}` : "";
}
