async function fetchProducts() {
    const response = await fetch('http://localhost:5000/products');
    return await response.json();
}

async function addToCartAPI(productId, price, quantity = 1) {
    await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, price, quantity })
    });
}

async function fetchCart() {
    const response = await fetch('http://localhost:5000/cart');
    return await response.json();
}

async function clearCartAPI() {
    await fetch('http://localhost:5000/cart/clear', { method: 'POST' });
}