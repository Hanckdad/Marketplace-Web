import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path ke file JSON
const dataFilePath = path.join(process.cwd(), "data", "products.json");

// Helper untuk membaca data
function getProducts() {
  if (!fs.existsSync(dataFilePath)) return [];
  const fileData = fs.readFileSync(dataFilePath);
  return JSON.parse(fileData);
}

// Helper untuk menulis data
function saveProducts(products) {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
}

// GET: Ambil semua produk
export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

// POST: Tambah produk baru
export async function POST(req) {
  try {
    const body = await req.json();
    const products = getProducts();
    
    const newProduct = {
      id: Date.now().toString(), // Simple ID generation
      image: body.image,
      title: body.title,
      caption: body.caption,
      price: body.price
    };

    products.push(newProduct);
    saveProducts(products);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Hapus produk
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    
    saveProducts(products);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
