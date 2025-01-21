import { NextResponse } from "'next/server'"
import furnitureData from "'./db.json'"

export async function GET() {
  return NextResponse.json(furnitureData)
}

