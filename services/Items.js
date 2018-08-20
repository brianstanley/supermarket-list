import {HTTP} from './Api'

export default {
    fetchProducts() {
        return HTTP.get('/products/')
    },
    addProduct(item = {}) {
        return HTTP.post('/products/add', item)
    },
    deleteProduct(id) {
        return HTTP.delete(`/products/delete/${id}`)
    }
}