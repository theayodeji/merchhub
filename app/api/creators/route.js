// app/api/creators/route.js
import dbConnect from "@/db/index";
import Creator from "@/models/Creator";

export async function GET(request) {
  await dbConnect();

  try {
    const creators = await Creator.find({});
    return new Response(JSON.stringify(creators), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch creators", error }),
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
    const creator = new Creator(body);
    await creator.save();
    return new Response(JSON.stringify(creator), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to create creator", error }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
