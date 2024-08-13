// pages/api/products/[id].js
import dbConnect from "../../../../db/index" ;
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    // Get product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } else if (req.method === 'PUT') {
    // Update product by ID
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update product', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete product by ID
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete product', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
