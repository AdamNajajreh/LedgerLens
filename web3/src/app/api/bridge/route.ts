import { NextResponse } from "next/server";
import pool from "../db/config";

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("select * from bridge_erc20_transfer limit 10;");
    client.release();

    return NextResponse.json({
      data: result.rows
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to retrieve data",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
