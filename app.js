// =======================
// ArtnaDesigner App Logic
// =======================

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const emptyState = document.getElementById("empty");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalCat = document.getElementById("modalCat");
const modalClose = document.getElementById("modalClose");

let worksData = [];

// =======================
// Fetch JSON Data
// =======================
fetch("works.json")
  .then(res => res.json())
  .then(data => {
    worksData = data;
    populateCategories(data);
    renderWorks(data);
  })
  .catch(err => console.error("JSON yüklənmədi:", err));

// =======================
// Render Works
// =======================
function renderWorks(data) {
  grid.innerHTML = "";

  if (data.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "grid-item";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="grid-info">
        <h4>${item.title}</h4>
        <p>${item.price}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });
}

// =======================
// Categories
// =======================
function populateCategories(data) {
  const categories = [...new Set(data.map(item => item.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// =======================
// Filter Logic
// =======================
function filterWorks() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = worksData.filter(item => {
    const matchSearch =
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue) ||
      item.tags.join(" ").toLowerCase().includes(searchValue);

    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  renderWorks(filtered);
}

searchInput.addEventListener("input", filterWorks);
categorySelect.addEventListener("change", filterWorks);

// =======================
// Modal
// =======================
function openModal(item) {
  modalImg.src = item.image;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.description;
  modalPrice.textContent = item.price;
  modalCat.textContent = item.category;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target.dataset.close) closeModal();
});

// =======================
// Dynamic Year
// =======================
document.getElementById("year").textContent = new Date().getFullYear();

// =======================
// Contact Links
// =======================
document.getElementById("igLink").href =
  "https://instagram.com/artna_desinger";

document.getElementById("waLink").href =
  "https://wa.me/994554417423?text=Salam%20ArtnaDesigner%20sifariş%20üçün%20yazıram";
