// app/api/products/route.js
import dbConnect from "@/db/index";
import Product from "@/models/Product";

export async function GET(request) {
  await dbConnect();

  try {
    const products = await Product.find({}).populate("creator");
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch products", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  await dbConnect();

  const body = await request.json(); // Get the JSON body from the request

  try {
    const { name, description, price, category, image, stock, creatorId } =
      body;

    if (!creatorId) {
      return new Response(
        JSON.stringify({ message: "Creator ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
      creator: creatorId,
    });

    await product.save();
    return new Response(JSON.stringify(product), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to create product", error }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
