const {produkView, addproductView, addproduct, upload, productDelete, editproductView, update} = require('../controller/produk-controller');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.redirect('/product');
})

router.get('/product', produkView);
router.get('/add-product', addproductView);
router.get('/edit-product/:id', editproductView);
// post
router.post('/add-product',  upload, addproduct );
// delete
router.delete('/product/:id', productDelete)
// put/update
router.post('/update/:id', upload,update)

module.exports = router