function displayModal() {
  const modal = document.getElementById("contact_modal");
  document.body.classList.add("dimmed");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  document.body.classList.remove("dimmed");
  modal.style.display = "none";
}
