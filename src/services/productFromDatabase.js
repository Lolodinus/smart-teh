export class ProductService {
    _apiBase = "http://localhost:3000"

    async getResource(url) {
        const result = await fetch(`${this._apiBase}${url}`);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${result.status}`);
        }
        const products = await result.json()
        return this.formatData(products);
    }

    formatData(products) {
        return products.map(product => ({
            "id": product.id,
            "title": product.title,
            "price": product.price,
            "img": product.img,
        }))
    }

    async getProducts() {
        return await this.getResource("/product");
    }
}