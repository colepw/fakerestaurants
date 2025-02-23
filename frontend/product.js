document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        window.location.href = 'index.html'; // Redirect if no product ID is provided
        return;
    }

    const response = await fetch('http://localhost:5000/api/products');
    const products = await response.json();
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert('Product not found!');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('product-image').src = product.images.edges[0].node.src;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = `$${product.variants.edges[0].node.price}`;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ productId, price: product.variants.edges[0].node.price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    });
});