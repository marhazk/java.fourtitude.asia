import Config from "../Config";
import axios from "axios";
const SPRING_URL = 'http://localhost:8123/api/products';

class ProductService {
    getProductPageable(page, pageSize) {
        return axios.get(SPRING_URL + '?page=' + page + '&pageSize=' + pageSize);
    }
    createProduct(product) {
        return axios.post(SPRING_URL, product);
    }
    getProductById(id) {
        return axios.get(SPRING_URL + '/' + id);
    }
    getFirstProduct() {
        return axios.get(SPRING_URL + '/'+Config.pFirst);
    }
    getLastProduct() {
        return axios.get(SPRING_URL + '/'+Config.pLast);
    }
    generateNewProduct(id) {
        return axios.get(SPRING_URL + '/'+Config.pNewParam);
    }
    updateProduct(product, id) {
        return axios.put(SPRING_URL + '/' + id, product);
    }
    deleteProduct(id) {
        return axios.delete(SPRING_URL + '/' + id);
    }
}
export default new ProductService()