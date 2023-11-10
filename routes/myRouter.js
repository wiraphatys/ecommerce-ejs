// จัดการระบบ routing
const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// call Multer module + save file to storage location
const multer = require('multer');
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/images/products')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+".jpg")
  }
})

const upload = multer({
  storage:storage
})

// router.get('/',(req,res)=>{
//   Product.find().exec((err,doc)=>{
//     res.render('index.ejs',{products:doc});
//   })
// })

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.render('index.ejs', { products });
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // Internal Server Error
  }
});

router.get('/product/:id',async (req,res)=>{
  try {
    const productID = req.params.id;   
    const product = await Product.findOne({_id:productID}).exec(); 
    console.log(product);
    res.render('product.ejs', { product })
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/add-product',(req,res)=>{
    res.render('form.ejs');
})

router.post('/insert',upload.single("image") , async (req, res) => {
  try {
    const data = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
      description: req.body.description
    });
    console.log(data)
    await data.save(); // Save the product to the database
    res.render('form.ejs');
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // Internal Server Error
  }
});

router.get('/manage', async (req,res)=>{
  try {
    const products = await Product.find().exec();
    res.render('manage.ejs', { products });
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // Internal Server Error
  }
})


// router.get('/delete/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec();
//     res.redirect('/manage');
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

const fs = require('fs');

router.get('/delete/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId, { useFindAndModify: false }).exec();
    
    // Delete the associated image file
    const imagePath = `./public/images/products/${product.image}`;
    fs.unlinkSync(imagePath);

    res.redirect('/manage');
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/edit', async (req, res) => {
  try {
    const edit_id = req.body.edit_id;
    const product = await Product.findOne({_id:edit_id}).exec(); 
    console.log(product);
    res.render('edit.ejs', {product});
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // Internal Server Error
  }
});

router.post('/update', async (req, res) => {
  try {
    const update_id = req.body.update_id;
    const newData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };
    console.log("product id", update_id);
    console.log("updated data", newData);

    const product = await Product.findByIdAndUpdate(update_id, newData, {useFindAndModify:false}).exec();
    res.redirect('/manage');
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // Internal Server Error
  }
});


// router.get('/insert',(req,res)=>{
//     console.log(req.query);
//     res.render('form.ejs');
// })

// router.post('/insert',(req,res)=>{
//     console.log(req.body);
//     let data = new Product({
//         name: req.body.name,
//         price: req.body.price,
//         image: req.body.image,
//         description: req.body.description
//     });
//     console.log(data);
//     Product.saveProduct(data,(err)=>{
//         if(err) console.log(err)
//         res.render('form.ejs');
//     });
// })


// // อ้างอิงตำแหน่งไฟล์
// const indexPage = path.join(__dirname,"../templates/index.html");
// const productPage1 = path.join(__dirname,"../templates/product1.html");
// const productPage2 = path.join(__dirname,"../templates/product2.html");
// const productPage3 = path.join(__dirname,"../templates/product3.html");

// router.get("/",(req,res)=>{
//     res.sendFile(indexPage);
//     res.status(200);
//     res.type('text/html');
// })

// router.get("/product/:id",(req,res)=>{
//     const productID = req.params.id
//     if (productID === "1") {
//         res.sendFile(productPage1);
//     } else if (productID == "2") {
//         res.sendFile(productPage2);
//     } else if (productID == "3") {
//         res.sendFile(productPage3);
//     } else {
//         res.redirect('/');
//     }
// })

module.exports = router;