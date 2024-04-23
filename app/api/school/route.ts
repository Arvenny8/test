import { NextResponse } from "next/server";

export async function GET() {
  const externalApiResponse = await fetch(
    "https://testfirebaseconnect-xhceranm2a-uc.a.run.app"
  );
  const data = await externalApiResponse.json();

  return NextResponse.json({
    data,
  });
}