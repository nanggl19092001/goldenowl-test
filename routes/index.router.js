const productRouter = require('./product.router')

function router(app){

    app.get('/', (req,res) => {
        res.render('index')
    })

    app.use('/api/v1/products', productRouter)
}

module.exports = router
