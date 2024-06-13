document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        alert('You are not authorized to view this page. Please log in.');
        window.location.href = 'auth.html';
        return;
    }

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakeapi.platzi.com/en/rest/products');
            if (!response.ok) {
                throw new Error('Xatolik');
            }
            const products = await response.json();
            return products;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function renderMainProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `Title: ${product.title}, Price: $${product.price}, Description: ${product.description}`;
            productList.appendChild(li);
        });
    }

    function renderNewProduct(product) {
        const newProductList = document.getElementById('new-product-list');

        const li = document.createElement('li');
        li.textContent = `Title: ${product.title}, Price: $${product.price}, Description: ${product.description}`;
        newProductList.appendChild(li);
        li.classList.add('list');
    }

    const products = await fetchProducts();
    renderMainProducts(products);

    document.getElementById('product-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;

        const newProduct = {
            title: title,
            price: parseFloat(price),
            description: description
        };

        try {
            renderNewProduct(newProduct);
            document.getElementById('product-form').reset();
        } catch (error) {
            console.error("Mahsulot qo'shishda xatolik bor:", error);
        }
    });
});
