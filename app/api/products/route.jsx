// pages/api/products/index.js
import dbConnect from '@/db/index';
import Product from '@/models/Product';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Get all products
    const products = await Product.find({}).populate('creator');
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    // Create a new product
    try {
      // Assuming the creatorId is sent in the request body or through authentication
      const { name, description, price, category, image, stock, creatorId } = req.body;

      if (!creatorId) {
        return res.status(400).json({ message: 'Creator ID is required' });
      }

      const product = new Product({
        name,
        description,
        price,
        category,
        image,
        stock,
        creator: creatorId
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create product', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
