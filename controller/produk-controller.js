
const multer = require('multer');
const Product = require('../model/multer-model');
const fs = require('fs');



// Multer 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    }
});

const upload = multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*3,
    }
}).single('image')

// view
const produkView = async (req, res) => {
    const products = await Product.find()
    res.render('product', {
        layout: 'layout/product-layout',
        products,
        msg: req.flash('msg')
       
    })
};

const addproductView = (req, res) => {
    res.render('add-product', {
        layout: 'layout/product-layout'
    })
} 

// delete
const productDelete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  req.flash('msg', 'success delete data')
  res.redirect('/product')
    
}

// post add
const addproduct = async (req, res)=> {
let product = new Product({
    productName: req.body.productName,
    description: req.body.description,
    img: req.file.filename
});

try {
    product = await product.save();
    req.flash('msg', 'success add data products')
    res.redirect('/product')
} catch (error) {
    console.log(error)
}

}

// view edit
const editproductView = async (req, res) => {
    let product = await Product.findById(req.params.id);
        res.render('edit-product', {
            layout: 'layout/product-layout',
            product
        })
    }
    // put
    const update = (req, res) => {        
        let id = req.params.id;
        let new_image = '';
        
        if(req.file){
            new_image = req.file.filename;
            try {
           fs.unlinkSync('./uploads/'+ req.body.old_image);
            } catch (error) {
                console.log(error)
            }
        } else {
            new_image = req.body.old_image;
        }
        
         Product.findByIdAndUpdate(id, {
            productName: req.body.productName,
            description: req.body.description,
            img: new_image,
        },
         (err, data) => {
            if(err){
                console.log(err)
            } else {
                req.flash('msg', 'Success edit data')
            }
            res.redirect('/product')
        })
        
        }
      
    


// put versi 2

module.exports = {
    produkView,
    addproductView,
    addproduct,
    upload,
    productDelete,
    editproductView,
    update
}