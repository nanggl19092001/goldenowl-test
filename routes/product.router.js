const productRouter = require("express").Router()
const productController = require("../controllers/product.controller") 


productRouter.get('/', productController.getProducts)

productRouter.get('/:id', productController.getProduct)

productRouter.post('/', productController.createProduct)

productRouter.put('/:id', productController.updateProduct)

productRouter.delete('/:id', productController.deleteProduct)

module.exports = productRouter