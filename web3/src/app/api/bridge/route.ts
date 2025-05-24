import { NextResponse } from "next/server";
import pool from "../db/config";

export async function GET() {
  try {
    // Test the database connection
    const client = await pool.connect();
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    console.log(`debug ${JSON.stringify(result)}`);
    client.release();

    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
