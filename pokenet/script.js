function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

 function mostrarComentario() {
  const form = document.querySelector("#formulario");

  form.addEventListener("click", (event) => {
    event.preventDefault();
    let coment = document.querySelector("#comentario").value;
    alert(coment)
  });
 }