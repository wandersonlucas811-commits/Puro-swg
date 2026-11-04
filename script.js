/* ==========================================================
   PURO SWAG - script.js
   Aqui você edita: link de afiliado, fotos do banner,
   produtos, preços e fotos dos produtos.
   ========================================================== */

/* ----- 1) LINK DE AFILIADO -----
   Troque pelo seu link da SHEIN. Todos os botões usam este link,
   a menos que o produto tenha o seu próprio campo "link". */
var LINK_AFILIADO = "{{SEU_LINK_AFILIADO_SHEIN}}";

/* ----- 2) FOTOS DO BANNER -----
   Coloque as imagens na pasta "img" e escreva o caminho aqui.
   Deixe "" (vazio) para usar o placeholder. Tamanho ideal: 1200x1500px. */
var BANNER_MASCULINO = "";   // ex.: "img/banner-masculino.jpg"
var BANNER_FEMININO  = "";   // ex.: "img/banner-feminino.jpg"

/* ----- 3) PRODUTOS -----
   nome:  nome que aparece no card
   preco: texto do preço
   img:   caminho da foto, ex.: "img/camiseta-preta.jpg" (opcional)
   link:  link de afiliado só deste produto (opcional)
   selo:  etiqueta no canto da foto, ex.: "Novo" (opcional)
   Cada produto termina com vírgula, menos o último da lista.
   Fotos ideais: em pé, proporção 3:4 (ex.: 900x1200px). */
var MASCULINO = [
  {nome:"Camiseta Oversized Preta", preco:"R$ 49,90", img:"", selo:"Novo"},
  {nome:"Calça Cargo Street",       preco:"R$ 89,90", img:""},
  {nome:"Jaqueta Corta-Vento",      preco:"R$ 119,90", img:"", selo:"Top"},
  {nome:"Bermuda Moletom",          preco:"R$ 59,90", img:""},
  {nome:"Moletom Canguru Basic",    preco:"R$ 99,90", img:""},
  {nome:"Camisa Boxy Estampada",    preco:"R$ 69,90", img:""},
  {nome:"Regata Essential",         preco:"R$ 34,90", img:""},
  {nome:"Boné Aba Curva",           preco:"R$ 39,90", img:"", selo:"Novo"}
];

var FEMININO = [
  {nome:"Cropped Canelado",         preco:"R$ 39,90", img:"", selo:"Novo"},
  {nome:"Calça Wide Leg",           preco:"R$ 89,90", img:""},
  {nome:"Vestido Slip Preto",       preco:"R$ 79,90", img:"", selo:"Top"},
  {nome:"Top Cropped Shine",        preco:"R$ 44,90", img:""},
  {nome:"Jaqueta Jeans Oversized",  preco:"R$ 129,90", img:""},
  {nome:"Saia Mini Cargo",          preco:"R$ 64,90", img:""},
  {nome:"Body Manga Longa",         preco:"R$ 49,90", img:""},
  {nome:"Conjunto Moletom Duo",     preco:"R$ 109,90", img:"", selo:"Novo"}
];

/* ==========================================================
   A PARTIR DAQUI NÃO PRECISA MEXER
   ========================================================== */

/* Imagem provisória (aparece quando "img" está vazio ou a foto não carrega) */
function placeholder(texto, cor){
  var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800">'+
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'+
    '<stop offset="0" stop-color="'+cor+'"/><stop offset="1" stop-color="#0A0A0A"/></linearGradient></defs>'+
    '<rect width="600" height="800" fill="url(#g)"/>'+
    '<path d="M330 250 240 400h60l-20 100 120-170h-60z" fill="#8FA6C4" opacity=".55"/>'+
    '<text x="300" y="640" fill="#ffffff" fill-opacity=".8" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="32" text-anchor="middle" letter-spacing="4">'+
    texto.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</text></svg>';
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}

/* Põe a foto no <img>; se o arquivo não existir, usa o placeholder */
function carregarImagem(el, caminho, textoPlaceholder, cor){
  var fallback = placeholder(textoPlaceholder, cor);
  el.onerror = function(){ el.onerror = null; el.src = fallback; };
  el.src = caminho ? caminho : fallback;
}

/* Banner */
carregarImagem(document.getElementById('img-masculino'), BANNER_MASCULINO, 'MASCULINO', '#1b2433');
carregarImagem(document.getElementById('img-feminino'),  BANNER_FEMININO,  'FEMININO',  '#222222');

/* Produtos */
function esc(s){
  return String(s).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

function renderProdutos(lista, idGrid, cor){
  var grid = document.getElementById(idGrid);
  grid.innerHTML = lista.map(function(p, i){
    var link = p.link || LINK_AFILIADO;
    return '<article class="card">'+
      '<div class="card-img">'+
        (p.selo ? '<span class="selo">'+esc(p.selo)+'</span>' : '')+
        '<img data-i="'+i+'" alt="'+esc(p.nome)+'" loading="lazy" width="600" height="800">'+
      '</div>'+
      '<div class="card-corpo">'+
        '<h3>'+esc(p.nome)+'</h3>'+
        '<span class="card-preco">'+esc(p.preco)+'</span>'+
        '<a class="btn" href="'+esc(link)+'" target="_blank" rel="noopener">Comprar na SHEIN</a>'+
      '</div>'+
    '</article>';
  }).join('');

  grid.querySelectorAll('img').forEach(function(el){
    var p = lista[+el.dataset.i];
    carregarImagem(el, p.img, p.nome.toUpperCase().slice(0,22), cor);
  });
}
renderProdutos(MASCULINO, 'grid-masculino', '#1b2433');
renderProdutos(FEMININO,  'grid-feminino',  '#2a2a2a');

/* Menu hambúrguer */
var burger = document.getElementById('burger');
var menu   = document.getElementById('menu');
function toggleMenu(abrir){
  burger.classList.toggle('aberto', abrir);
  menu.classList.toggle('aberto', abrir);
  burger.setAttribute('aria-expanded', abrir);
  burger.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
}
burger.addEventListener('click', function(){ toggleMenu(!menu.classList.contains('aberto')); });
menu.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){ toggleMenu(false); });
});
window.addEventListener('resize', function(){ if(window.innerWidth >= 768) toggleMenu(false); });
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') toggleMenu(false); });

/* Ano do rodapé */
document.getElementById('ano').textContent = new Date().getFullYear();
