import { NextRequest, NextResponse, userAgent } from "next/server";

export async function GET(req: NextRequest) {
  // valori nell header aka contiene valori di info del dispositivo ecc...

  const getTheHeaders = userAgent(req);

  const ipAdress = req.headers.get("x-real-ip"); // presa dell'ip

  const ipEpas = await fetch("https://ip-api.com/json/" + ipAdress); // fetch dell'ip

  const ip = await ipEpas.json();

  const time = new Date().toISOString(); // data e ora

  await console.log({ getTheHeaders, ip, time }); // log dei dati

  //redirect to homepage
  const imageUrl = new URL(
    "/immagine.png",
    "https://emailtracker-jew2-git-main-sarfdevs-projects.vercel.app/"
  );
  const imageResponse = await fetch(imageUrl);

  // Check if the image fetch was successful
  if (!imageResponse.ok) {
    return new NextResponse("Failed to fetch image", { status: 500 });
  }

  // Get the image data as a buffer
  const imageBuffer = await imageResponse.arrayBuffer();

  // Create a new response with the image data
  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": imageResponse.headers.get("Content-Type") || "image/jpeg",
    },
  });
}
