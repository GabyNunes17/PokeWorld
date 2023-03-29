function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

const form = document.querySelector("#formulario");
const postsUser = document.querySelector(".postsUser");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const coment = document.querySelector("#comentario").value;
  alert("Comentário enviado com sucesso!")

  const ul = document.createElement("ul");
  ul.classList.add("posts");

  const li = document.createElement("li");
  li.classList.add("post");
  
  const div = document.createElement("div");
  div.classList.add("infouserpost");

  const img = document.createElement("img");
  img.classList.add("imguserpost");
  img.src = "https://fdp-rpg.weebly.com/uploads/9/7/5/2/9752418/93320.jpg?415";

  const nameandhour = document.createElement("div");
  nameandhour.classList.add("nameandhour");

  const strong = document.createElement("strong");
  strong.innerHTML = "Treinador";

  const p = document.createElement("p");
  const hora = new Date();
  p.innerHTML = `${hora.getHours()}h`;

  const comentario = document.createElement("p");
  comentario.innerHTML = coment;

  postsUser.appendChild(ul);
  ul.appendChild(li);
  li.appendChild(div);
  div.appendChild(img);
  div.appendChild(nameandhour);
  nameandhour.appendChild(strong);
  nameandhour.appendChild(p);
  div.appendChild(comentario);

  form.reset();
});
