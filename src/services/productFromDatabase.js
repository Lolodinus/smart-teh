export class ProductService {
    _apiBase = "http://localhost:3000"

    async getResource(url) {
        const result = await fetch(`${this._apiBase}${url}`);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${result.status}`);
        }

        return await result.json()
    }

    _transformData(product) {
        return {
            "id": product.id,
            "title": product.title,
            "price": product.price,
            "img": product.img,
            "category": product.category,
            "description": product.description,
        }
    }

    async getProducts() {
        const products = await this.getResource("/product");
        return products.map(this._transformData);
    }

    getSelectedProduct = async (id) => {
        const product = await this.getResource(`/product/${id}`);
        return this._transformData(product);
    }
}