import {HTTP} from './Api'

export default {
    fetchProducts() {
        return HTTP.get('/')
    },
    addProduct(item = {}) {
        return HTTP.post('/add', item)
    },
    deleteProduct(id) {
        return HTTP.delete(`/delete/${id}`)
    }
}