import { NextResponse, NextRequest } from "next/server";
import fetchArecaData from "../fetchArecaData";
import parseArecaData from "../parseArecaData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const branch = searchParams.get("branch");

  if (!branch) {
    return NextResponse.json(
      { error: "Branch parameter is required" },
      { status: 400 }
    );
  }

  const response = await fetchArecaData(branch);

  if (response.status !== 200) {
    return NextResponse.json(
      { error: response.error },
      { status: response.status }
    );
  }

  try {
    const data = parseArecaData(response.data!);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error parsing data" }, { status: 500 });
  }
}
