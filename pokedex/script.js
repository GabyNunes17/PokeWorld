// Selecionando elementos do HTML usando IDs
const pokemonName = document.querySelector("#pokemonName");
const pokemonNumber = document.querySelector("#pokemonNum");
const pokemonImage = document.querySelector("#pokemonImg");

// Selecionando elementos do HTML usando tags e IDs
const form = document.querySelector("form");
const input = document.querySelector("#pokemonSearch");
const buttonPrev = document.querySelector("#btnAnterior");
const buttonNext = document.querySelector("#btnProximo");

// Modal
const openModalButton = document.querySelector("#sobre");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

// Conteudo do modal
const modalPokemonName = document.querySelector("#modalPokemonName");
const modalPokemonImg = document.querySelector("#modalPokemonImg");
const modalPokemonType = document.querySelector("#modalPokemonType");

// Variável para armazenar o número do Pokémon a ser pesquisado
let searchPokemon = 1;

// Função assíncrona para fazer a chamada à API de Pokémons e retornar os dados do Pokémon especificado
const fetchPokemon = async (pokemon) => {
  // Faz uma requisição para a API usando o número ou nome do Pokémon fornecido
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  // Se a resposta da API for bem-sucedida, retorna os dados do Pokémon em formato JSON
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

// Função assíncrona para renderizar as informações do Pokémon no HTML
const renderPokemon = async (pokemon) => {
  // Define o nome do Pokémon como "Carregando..." e o número do Pokémon como vazio enquanto a API estiver sendo chamada
  pokemonName.innerHTML = "Carregando...";
  pokemonNumber.innerHTML = "";

  // Chama a função fetchPokemon para buscar os dados do Pokémon na API
  const data = await fetchPokemon(pokemon);

  if (data) {
    // Se os dados do Pokémon forem encontrados, exibe a imagem do Pokémon, seu nome e número, e atualiza a variável searchPokemon com o número do Pokémon atual
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    modalPokemonName.innerHTML = data.name.toUpperCase();
    modalPokemonImg.src = pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    modalPokemonType.innerHTML = data['types'][0]['type']['name']
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    // Se o Pokémon não for encontrado, esconde a imagem do Pokémon, define o nome do Pokémon como "Not found :c" e o número do Pokémon como vazio
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Não encontrado :c";
    pokemonNumber.innerHTML = "";
  }
};

// Adiciona um evento de envio do formulário para chamar a função renderPokemon com o nome do Pokémon digitado pelo usuário
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// Adiciona um evento de clique no botão "Anterior" para chamar a função renderPokemon com o número do Pokémon anterior
buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

// Adiciona um evento de clique no botão "Próximo" para chamar a função renderPokemon com o número do próximo Pokémon
buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// Renderiza o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);

// Modal
const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});
