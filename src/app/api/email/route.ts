import { NextRequest, NextResponse, userAgent } from "next/server";

export async function GET(req: NextRequest) {
  // valori nell header aka contiene valori di info del dispositivo ecc...

  const getTheHeaders = userAgent(req);

  const ipAdress = req.headers.get("x-real-ip"); // presa dell'ip

  let informazioniInBaseIp;
  try {
    const apiResponse = await fetch(`http://ip-api.com/json/${ipAdress}`);

    if (!apiResponse.ok) {
      throw new Error("Network response was not ok: " + apiResponse.statusText);
    }

    informazioniInBaseIp = await apiResponse.json(); // Parse the JSON data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    informazioniInBaseIp = { error: "Could not retrieve information" }; // Handle error gracefully
  }

  const time = new Date().toISOString(); // data e ora

  await console.log({ getTheHeaders, informazioniInBaseIp, time }); // log dei dati

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
