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
const modalPokemonDescription = document.querySelector(
  "#modalPokemonDescription"
);
const modalPokemonHeight = document.querySelector("#modalPokemonHeight");
const modalPokemonWeight = document.querySelector("#modalPokemonWeight");
const modalPokemonAbilities = document.querySelector("#modalPokemonAttributes");
const modalPokemonStats = document.querySelector("#modalPokemonStats");
const modalPokemonTypes = document.querySelector("#modalPokemonTypes");
const modalPokemonNum = document.querySelector("#modalPokemonNum");

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
    pokemonNumber.innerHTML = data.id;
    if (data.id < 650) {
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
    } else {
      pokemonImage.src = data["sprites"]["front_default"];
    }
    input.value = "";
    searchPokemon = data.id;

    // Modal
    modalPokemonName.innerHTML = data.name.toUpperCase();
    modalPokemonNum.innerHTML = "#" + data.id;
    modalPokemonImg.src = data["sprites"]["front_default"];
    modalPokemonType.innerHTML =
      data["types"][0]["type"]["name"][0].toUpperCase() +
      data["types"][0]["type"]["name"].slice(1);

    switch (data["types"][0]["type"]["name"]) {
      case "fire":
        modal.style.color = "#F08030";
        break;
      case "water":
        modal.style.color = "#6890F0";
        break;
      case "grass":
        modal.style.color = "#78C850";
        break;
      case "electric":
        modal.style.color = "#F8D030";
        break;
      case "ice":
        modal.style.color = "#98D8D8";
        break;
      case "fighting":
        modal.style.color = "#C03028";
        break;
      case "poison":
        modal.style.color = "#A040A0";
        break;
      case "ground":
        modal.style.color = "#E0C068";
        break;
      case "flying":
        modal.style.color = "#A890F0";
        break;
      case "psychic":
        modal.style.color = "#F85888";
        break;
      case "bug":
        modal.style.color = "#A8B820";
        break;
      case "rock":
        modal.style.color = "#B8A038";
        break;
      case "ghost":
        modal.style.color = "#705898";
        break;
      case "dragon":
        modal.style.color = "#7038F8";
        break;
      case "dark":
        modal.style.color = "#705848";
        break;
      case "steel":
        modal.style.color = "#B8B8D0";
        break;
      case "fairy":
        modal.style.color = "#EE99AC";
        break;
      case "normal":
        modal.style.color = "#A8A878";
        break;
      default:
        modal.style.color = "#000";
    }

    modalPokemonHeight.innerHTML = data["height"] / 10 + " m";
    modalPokemonWeight.innerHTML = data["weight"] / 10 + " Kg";
    modalPokemonAttributes.innerHTML = data["abilities"]
      .map((ability) => `${ability["ability"]["name"]}`)
      .join("<br />");
    modalPokemonTypes.innerHTML = data["types"].map(
      (type) =>
        `${
          type["type"]["name"][0].toUpperCase() + type["type"]["name"].slice(1)
        }`
    );
    modalPokemonStats.innerHTML = data["stats"].map(
      (stat) =>
        `<div class="stat">
          <div class="stat-name">${stat["stat"]["name"]}</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" style="width: ${stat["base_stat"]}%"></div>
          </div>
          <div class="stat-value">${stat["base_stat"]}</div>
        </div>`
    );
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

console.log(modalPokemonType);
