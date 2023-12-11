$$ = function(id){
  return document.getElementById(id);
};

$(document).ready(function () {
  $("img.lazy").lazyLoadXT();
});

$(document).ready(function(){
  let usuario = localStorage.getItem("username");
  $$("bemvindo").innerHTML = `Olá ${usuario}`;
  $$("sidebarTitle").innerHTML = `Olá ${usuario}`
});

// chaves rapid api
// 8f10c46cc4msh30c9b0ac64b9be8p142703jsn38287dc96274
// 61cc4620eamshdffb23cce454be3p1d4519jsn283cdf1e9437

function apagarListaAnimes(){
  localStorage.removeItem("dadosAnime");
  let nmrDoAnime;
  for (let i = 0; i < 10; i++) {
    nmrDoAnime = i + 1;
    document.getElementById("anime" + nmrDoAnime).textContent = "";
  };
}

function obterAnimes() {
  let nomeAnime = document.getElementById("animePesquisa").value;

  const settings = {
    async: true,
    crossDomain: true,
    url: `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=` + nomeAnime + "&sortBy=ranking&sortOrder=desc ",
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8f10c46cc4msh30c9b0ac64b9be8p142703jsn38287dc96274',
      'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    }
  };

  $.ajax(settings).done(function (response) {
	  const dadosAnime = response.data;
    localStorage.setItem("dadosAnime", JSON.stringify(dadosAnime));
  });
  
  setTimeout(listarAnimes,1800);
};

function listarAnimes() {
  let dadosAnime = JSON.parse(localStorage.getItem("dadosAnime"));
  let nome;
  let nmrDoAnime;
  for (let i = 0; i < 10; i++) {
    nome = dadosAnime[i].title;
    nmrDoAnime = i + 1;
    document.getElementById("anime" + nmrDoAnime).textContent = nome;
  };
};

function pegarInformacaoAnime(nmrAnime){
  let dadosAnime = JSON.parse(localStorage.getItem("dadosAnime"));
  dadosAnime = dadosAnime[nmrAnime - 1];

  adicionarAnime(dadosAnime);
  apagarListaAnimes();
}

let animeNmr = document.querySelectorAll(".listaAnimes");
animeNmr.forEach(function(elemeto){
  elemeto.addEventListener("click", function(event){
    let animeEscolhido = parseInt(event.target.id.replace("anime", ""));

    pegarInformacaoAnime(animeEscolhido);

  });
});


function adicionarAnime(dadosAnimeEscolhido){
  let cardPadrao = document.querySelector(".cardPadrao");
  cardPadrao.classList.remove("visually-hidden");
  let clone = cardPadrao.cloneNode(true);
  cardPadrao.classList.add("visually-hidden");

  let imagem = clone.querySelector("img");
  let nomeAnime = clone.querySelector("p.nomeAnime");
  let episodios = clone.querySelector("p.episodios");

  let episodeoArmazendo = JSON.parse(localStorage.getItem(`${dadosAnimeEscolhido}EpAtual`));
  let EpAtual;
  if(episodeoArmazendo === null){
    EpAtual = [0,dadosAnimeEscolhido.episodes];
  } else{
    episodeoArmazendo = episodeoArmazendo[0];
    EpAtual = [episodeoArmazendo,dadosAnimeEscolhido.episodes];
  }

  let qntAnimes = parseInt(localStorage.getItem("quantidadeAnimes"));
  if (isNaN(qntAnimes)) {
    qntAnimes = 0;
  }
  qntAnimes++;
  localStorage.setItem("quantidadeAnimes", qntAnimes);

  let animesListados = JSON.parse(localStorage.getItem("animesListados")) || [];

  animesListados.push(dadosAnimeEscolhido);
  
  localStorage.setItem("animesListados", JSON.stringify(animesListados));
  localStorage.setItem(`${dadosAnimeEscolhido.title}EpAtual`, JSON.stringify(EpAtual));

  imagem.setAttribute("src", dadosAnimeEscolhido.image);
  nomeAnime.textContent = dadosAnimeEscolhido.title;
  episodios.textContent = `Episódios: ${EpAtual[0]} /  ${EpAtual[1]}`;

  document.getElementById("grid").appendChild(clone);
  let eventosAnimes = document.querySelectorAll(".anime");
  eventosAnimes.forEach(function(elemeto){
    let excluir = elemeto.querySelector(".excluir");
    let addEpisodio = elemeto.querySelector(".addEpisodio");
    let nomeDoAnime = dadosAnimeEscolhido.title;

    excluir.addEventListener("click", function(){
      elemeto.remove();
      localStorage.removeItem(`${nomeDoAnime}Informacoes`);
      localStorage.removeItem(`${nomeDoAnime}EpAtual`);
      localStorage.setItem("quantidadeAnimes", qntAnimes - 1);
    });

    addEpisodio.addEventListener("click", function(event){
      let episodeos = JSON.parse(localStorage.getItem(`${nomeDoAnime}EpAtual`));
      let EpNovo = episodeos[0];
      let EpTotais = episodeos[1];
      EpNovo++;
      episodeos[0] = EpNovo;
      localStorage.setItem(`${nomeDoAnime}EpAtual`, JSON.stringify(episodeos));
      let animeEpisodios = elemeto.querySelector(".episodios");
      animeEpisodios.textContent = `Episódios : ${EpNovo} / ${EpTotais}`;
    });
  });
};

function adicionarAnimesAoRecarregar(dadosAnimeEscolhido) {
  let cardPadrao = document.querySelector(".cardPadrao");
  cardPadrao.classList.remove("visually-hidden");
  let clone = cardPadrao.cloneNode(true);
  cardPadrao.classList.add("visually-hidden");

  let imagem = clone.querySelector("img");
  let nomeAnime = clone.querySelector("p.nomeAnime");
  let episodios = clone.querySelector("p.episodios");

  let episodeoArmazendo = JSON.parse(localStorage.getItem(`${dadosAnimeEscolhido}EpAtual`));
  let EpAtual;
  if(episodeoArmazendo === null){
    EpAtual = [0,dadosAnimeEscolhido.episodes];
  } else{
    episodeoArmazendo = episodeoArmazendo[0];
    EpAtual = [episodeoArmazendo,dadosAnimeEscolhido.episodes];
  }

  let animesListados = JSON.parse(localStorage.getItem("animesListados")) || [];

  animesListados.push(dadosAnimeEscolhido);
  
  localStorage.setItem("animesListados", JSON.stringify(animesListados));
  localStorage.setItem(`${dadosAnimeEscolhido.title}EpAtual`, JSON.stringify(EpAtual));

  imagem.setAttribute("src", dadosAnimeEscolhido.image);
  nomeAnime.textContent = dadosAnimeEscolhido.title;
  episodios.textContent = `Episódios: ${EpAtual[0]} /  ${EpAtual[1]}`;

  document.getElementById("grid").appendChild(clone);
  let eventosAnimes = document.querySelectorAll(".anime");
  eventosAnimes.forEach(function(elemeto){
    let excluir = elemeto.querySelector(".excluir");
    let addEpisodio = elemeto.querySelector(".addEpisodio");
    let nomeDoAnime = dadosAnimeEscolhido.title;

    excluir.addEventListener("click", function(){
      elemeto.remove();
      localStorage.removeItem(`${nomeDoAnime}Informacoes`);
      localStorage.removeItem(`${nomeDoAnime}EpAtual`);
      localStorage.setItem("quantidadeAnimes", qntAnimes - 1);
    });

    addEpisodio.addEventListener("click", function(event){
      let episodeos = JSON.parse(localStorage.getItem(`${nomeDoAnime}EpAtual`));
      let EpNovo = episodeos[0];
      let EpTotais = episodeos[1];
      EpNovo++;
      episodeos[0] = EpNovo;
      localStorage.setItem(`${nomeDoAnime}EpAtual`, JSON.stringify(episodeos));
      let animeEpisodios = elemeto.querySelector(".episodios");
      console.log(animeEpisodios);
      animeEpisodios.textContent = `Episódios : ${EpNovo} / ${EpTotais}`;
    });
  });
}

function listaAnimesArmazenados(){
    let quantidadeAnimes = parseInt(localStorage.getItem("quantidadeAnimes"));
    quantidadeAnimes--;
    let animesListados = JSON.parse(localStorage.getItem("animesListados"));
    let animeAtual;
    for (let i = 0; i <= quantidadeAnimes; i++) {
      animeAtual = animesListados[i]
      adicionarAnimesAoRecarregar(animeAtual);
  };
};

let qntAnimes = parseInt(localStorage.getItem("quantidadeAnimes"));
  
if(qntAnimes > 0){
  window.addEventListener("load", listaAnimesArmazenados);
}
