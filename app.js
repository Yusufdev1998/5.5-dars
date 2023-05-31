const formEl = document.querySelector(".grocery-form");
const inpEl = document.getElementById("grocery");

const listEl = document.querySelector(".grocery-list");

const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

// status
let isEdit = false;
let editEl;

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = inpEl.value;
  if (value !== "" && !isEdit) {
    addItem(value);
  } else if (value !== "" && isEdit) {
    editItem(value);
  }
});

function addItem(value) {
  const articleEl = document.createElement("article");
  articleEl.classList.add("grocery-item");

  articleEl.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
  const delBtn = articleEl.querySelector(".delete-btn");
  delBtn.addEventListener("click", function () {
    articleEl.remove();
  });

  const editBtn = articleEl.querySelector(".edit-btn");
  editBtn.addEventListener("click", function () {
    const cur_val = articleEl.querySelector(".title").textContent;
    inpEl.value = cur_val;
    isEdit = true;
    editEl = articleEl;
    submitBtn.textContent = "Edit";
  });
  listEl.append(articleEl);

  inpEl.value = null;
}

function editItem(value) {
  if (editEl) {
    const title = editEl.querySelector(".title");
    title.textContent = value;
    inpEl.value = null;
    submitBtn.textContent = "Submit";
    isEdit = false;
    editEl = null;
  }
}
clearBtn.addEventListener("click", function () {
  const childs = listEl.querySelectorAll(".grocery-item");
  childs.forEach(function (child) {
    child.remove();
  });
});
