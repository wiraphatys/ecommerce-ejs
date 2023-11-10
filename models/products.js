// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
const dbUrl = 'mongodb://localhost:27017/productDB';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.log(err));

// Define the Schema
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String
});

// Create the Model
const Product = mongoose.model("Product", productSchema); // Changed the collection name to singular "Product"

// Export the Model
module.exports = Product;

// Define the function to save a product
module.exports.saveProduct = function(data) {
  const product = new Product(data); // Create a new instance of the Product model
  return product.save(); // Save the instance using the save() method and return the promise
};
