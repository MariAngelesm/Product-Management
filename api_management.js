// DOM references

const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const stockInput = document.getElementById("stock");
const typeInput = document.getElementById("type");
const message = document.getElementById('message');
const productTable = document.getElementById('product-table');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('product-modal');
const submitBtn = document.getElementById('submit-btn');

let isEditing = false;
let editingProductId = null;


// Display message
function showMessage(text, selectedClass) {
  message.setAttribute("class", selectedClass);
  message.textContent = text;
}

// Open modal
openModalBtn.addEventListener('click', () => {
  isEditing = false;
  editingProductId = null;
  form.reset();
  submitBtn.textContent = 'Add Product';
  modal.style.display = 'block';
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Display available products from the API

function getProducts() {
  const tableBody = document.getElementById('product-table-body');
  tableBody.innerHTML = '';

  fetch('http://localhost:5000/products')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.stock}</td>
          <td>${product.type}</td>
          <td>${product.price.toFixed(2)}</td>
          <td>
            <button onclick="deleteProduct('${product.id}')">Delete</button>
            <button onclick="startEditProduct('${product.id}')">Update</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      showMessage("Error loading products.","modal-error");
      console.error(error);
    });
}
    
// Delete a product by ID

function deleteProduct(id) {
  fetch(`http://localhost:5000/products/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      showMessage(`Product with ID ${id} removed.`, "modal-success");
      setTimeout(() => {
        getProducts();
      }, 600);
    })
    .catch(error => {
      showMessage("Error deleting product.", "modal-error");
      console.error(error);
    });
}

// Add new products or update them by form submission
    
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const stock = parseInt(stockInput.value);
  const type = typeInput.value.trim();

  if (!name || isNaN(price) || isNaN(stock) || !type) {
    showMessage("Please fill in all fields correctly.", "modal-error");
    return;
  }
  const productData = { name, price, stock, type };

  if (isEditing) {
    fetch(`http://localhost:5000/products/${editingProductId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(() => {
        showMessage(`Product with ID ${editingProductId} updated`, "modal-success");
        form.reset();
        modal.style.display = 'none';
        isEditing = false;
        editingProductId = null;
        getProducts();
      })
      .catch(error => {
        showMessage("Error updating product.", "modal-error");
        console.error(error);
      });
  } else {
    fetch('http://localhost:5000/products', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(data => {
        showMessage(`Product added (ID: ${data.id})`, "modal-success");
        form.reset();
        modal.style.display = 'none';
        getProducts();
      })
      .catch(error => {
        showMessage("Error adding product.", "modal-error");
        console.error(error);
      });
  }
});

function startEditProduct(id) {
  fetch(`http://localhost:5000/products/${id}`)
    .then(response => response.json())
    .then(product => {
      nameInput.value = product.name;
      priceInput.value = product.price;
      stockInput.value = product.stock;
      typeInput.value = product.type;

      isEditing = true;
      editingProductId = id;
      submitBtn.textContent = "Update Product";
      modal.style.display = 'block';
    })
    .catch(error => {
      showMessage("Error loading product for editing.", "modal-error");
      console.error(error);
    });
}


// Load products on page load
getProducts()

