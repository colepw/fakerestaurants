document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const response = await fetch('http://localhost:5000/api/products');
    const products = await response.json();

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.images.edges[0].node.src}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.variants.edges[0].node.price}</p>
            </a>
        `;
        productList.appendChild(productDiv);
    });
});