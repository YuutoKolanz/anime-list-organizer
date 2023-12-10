$$ = function(id){
  return document.getElementById(id);
};

// chaves rapid api
// 8f10c46cc4msh30c9b0ac64b9be8p142703jsn38287dc96274
// 61cc4620eamshdffb23cce454be3p1d4519jsn283cdf1e9437

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

window.onload = function(){

  let usuario = localStorage.getItem("username");
  $$("bemvindo").innerHTML = `Olá ${usuario}`;
  $$("sidebarTitle").innerHTML = `Olá ${usuario}`
};

function pegarInformacaoAnime(nmrAnime){
  let dadosAnime = JSON.parse(localStorage.getItem("dadosAnime"));
  dadosAnime = dadosAnime[nmrAnime - 1];
  console.log(dadosAnime);

  adicionarAnime(dadosAnime)
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

  let EpAtual = 0;

  localStorage.setItem(`${dadosAnimeEscolhido.title}Informacoes`, JSON.stringify(dadosAnimeEscolhido));
  localStorage.setItem(`${dadosAnimeEscolhido.title}EpAtual`, EpAtual);

  imagem.setAttribute("src", dadosAnimeEscolhido.image);
  nomeAnime.textContent = dadosAnimeEscolhido.title;
  episodios.textContent = `Episódios: ${EpAtual} /  ${dadosAnimeEscolhido.episodes}`;

  document.getElementById("grid").appendChild(clone);
  let eventosAnimes = document.querySelectorAll(".anime");
  eventosAnimes.forEach(function(elemeto){
    let excluir = elemeto.querySelector(".excluir");
    let addEpisodio = elemeto.querySelector(".addEpisodio");
    let nomeDoAnime = dadosAnimeEscolhido.title;

    excluir.addEventListener("click", function(){
      elemeto.remove();
      console.log(nomeDoAnime);
      localStorage.removeItem(`${nomeDoAnime}Informacoes`);
      localStorage.removeItem(`${nomeDoAnime}EpAtual`);
    });

    addEpisodio.addEventListener("click", function(){
      let EpNovo = parseInt(localStorage.getItem(`${nomeDoAnime}EpAtual`)) + 1;
      localStorage.setItem(`${nomeDoAnime}EpAtual`, EpNovo)
      let EpTotais = JSON.parse(localStorage.getItem(`${nomeDoAnime}Informacoes`));
      episodios.textContent = `Episódios : ${EpNovo} / ${EpTotais.episodes}`
    });
  });
};
