// const loader = document.getElementById("loader");
const productContainer = document.getElementById("product-container")

function showSkeletons(count = 6) {
    productContainer.innerHTML = "";

    for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton-card";

    skeleton.innerHTML = `
    <div class="skeleton skeleton-img"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text short"></div>
    `;

    productContainer.appendChild(skeleton);
    }
} 



async function fetchProducts(){
    showSkeletons(); 
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data =   await response.json();
        
        productContainer.innerHTML = ""; //remove the skeleton
        // loader.style.display = "none";  //hide the loader
        showProducts(data);   // show products

    }catch(error) {
        // loader.textContent = "Failed to load products";  //if something is wrong
        productContainer.innerHTML = "<p>Failed to load products ❌</p>";
    }

    
} 

function showProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h4>${product.title}</h4>
        <p class="price">₹ ${product.price}</p>
        `;
        productContainer.appendChild(card);
    });
}
fetchProducts()