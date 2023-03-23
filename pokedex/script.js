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

function setModalColor(type) {
  let color;
  switch (type) {
    case "fire":
      color = "#F08030";
      break;
    case "water":
      color = "#6890F0";
      break;
    case "grass":
      color = "#78C850";
      break;
    case "electric":
      color = "#F8D030";
      break;
    case "ice":
      color = "#98D8D8";
      break;
    case "fighting":
      color = "#C03028";
      break;
    case "poison":
      color = "#A040A0";
      break;
    case "ground":
      color = "#E0C068";
      break;
    case "flying":
      color = "#A890F0";
      break;
    case "psychic":
      color = "#F85888";
      break;
    case "bug":
      color = "#A8B820";
      break;
    case "rock":
      color = "#B8A038";
      break;
    case "ghost":
      color = "#705898";
      break;
    case "dragon":
      color = "#7038F8";
      break;
    case "dark":
      color = "#705848";
      break;
    case "steel":
      color = "#B8B8D0";
      break;
    case "fairy":
      color = "#EE99AC";
      break;
    case "normal":
      color = "#A8A878";
      break;
    default:
      color = "#000";
  }
  return color;
}

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
    const modalPokemonType = data["types"][0]["type"]["name"];
    modalPokemonName.innerHTML = data.name.toUpperCase();
    modalPokemonName.style.color = setModalColor(modalPokemonType);
    modalPokemonNum.innerHTML = "<span class='textBold'>ID</span> #" + data.id;
    modalPokemonImg.src =
      data["sprites"]["other"]["official-artwork"]["front_default"];
    modalPokemonType.innerHTML =
      data["types"][0]["type"]["name"][0].toUpperCase() +
      data["types"][0]["type"]["name"].slice(1);

    // modal.style.color = setModalColor(modalPokemonType);
    modal.style.color = "#505050";

    modalPokemonHeight.innerHTML =
      "<span class='textBold'>Altura</span> " + data["height"] / 10 + " m";
    modalPokemonWeight.innerHTML = "<span class='textBold'>Peso</span> " + data["weight"] / 10 + " Kg";
    modalPokemonAbilities.innerHTML =
      "<span class='textBold'>Habilidades</span> " +
      data["abilities"]
        .map(
          (ability) => `
          <div class="ability" style="background-color:${setModalColor(
            modalPokemonType
          )}; color:
            #fff; border-radius: 5px; padding: 8px; margin: 2.5px; display: inline-block; text-transform: uppercase; font-weight: bold; font-size: 16px;"">
            ${ability["ability"]["name"].toUpperCase()}
            </div>
            
        `
        )
        .join("");
    modalPokemonTypes.innerHTML =
      "<span class='textBold'>Tipo</span> " +
      data["types"]
        .map(
          (type) =>
            `<div class="type" style="background-color:${setModalColor(
              type["type"]["name"]
            )}; color:
            #fff; border-radius: 5px; padding: 10px; margin: 5px; display: inline-block; text-transform: uppercase; font-weight: bold; font-size: 16px;"">
            ${type["type"]["name"].toUpperCase()}
            </div>`
        )
        .join(""); 
    const modalPokemonTypesIcon = (modalPokemonStats.innerHTML = data["stats"]
      .map(
        (stat) =>
          `<div class="stat">
            <div class="stat-name">${
              stat["stat"]["name"] === "hp"
                ? stat["stat"]["name"].toUpperCase()
                : stat["stat"]["name"][0].toUpperCase() +
                  stat["stat"]["name"].slice(1)
            } - ${stat["base_stat"]}</div>
            <div class="progress">
              <div class="stat-bar" style="width:${
                stat["base_stat"] > 100 ? 100 : stat["base_stat"]
              }%; background-color:${setModalColor(modalPokemonType)}">
              </div>
            </div>
          </div>`
      )
      .join(""));
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
