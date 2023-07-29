const data = require('../app/data/shoes.json')
const serveData = Object.assign(data);
const productModel = require('../models/product.model')

class ProductController {
    async getProducts(req,res){
        try {
            const products = await productModel.find()
            
            if(products){
                return res.status(200).json({
                    shoes: products
                })
            }

            return res.status(200).json({
                shoes: []
            })
        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            })
        }
    }

    async getProduct(req,res){
        const id = req.params.id
        try {
            const product = await productModel.findOne({
                id: id
            })
            
            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            })
        }
        
    }

    async createProduct(req,res){
        const { id, image, name, description, price, color } = req.body
        try {
            if(!id | !image | name | price | color){
                return res.status(400).json({
                    message: "Missing infomation"
                })
            }

            const result = productModel.create({
                id: id,
                image: image,
                name: name,
                description: description,
                price: price,
                color: color
            })

            return res.status(200).json({
                message: "Product created"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            })
        }
    }

    async updateProduct(req,res){
        const id = req.params.id
        const { image, name, description, price, color } = req.body
        try {
            if(!id | !image | name | price | color){
                return res.status(400).json({
                    message: "Missing infomation"
                })
            }

            const result = productModel.updateOne({
                id: id
            },
            {
                image: image,
                name: name,
                description: description,
                price: price,
                color: color
            })

            return res.status(200).json({
                message: "Product updated"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            })
        }
    }

    async deleteProduct(req,res){
        const id = req.params.id
        try {
            const result = productModel.deleteOne({
                id: id
            })

            return res.status(200).json({
                message: "Product deleted"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            })
        }
    }
}

module.exports = new ProductController()