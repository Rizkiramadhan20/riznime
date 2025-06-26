import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract share parameters
    const title = searchParams.get("title") || "";
    const text = searchParams.get("text") || "";
    const url = searchParams.get("url") || "";

    // Log the shared content for debugging
    console.log("Shared content received:", { title, text, url });

    // Validate if we have any content to process
    if (!title && !text && !url) {
      return NextResponse.json(
        { error: "No content provided to share" },
        { status: 400 }
      );
    }

    // Process the shared content based on the URL or content type
    let redirectUrl = "/";

    // If it's a URL, try to determine the appropriate section
    if (url) {
      const urlObj = new URL(url);

      // Check if it's from our supported domains
      if (
        urlObj.hostname.includes("riznime.vercel.app") ||
        urlObj.hostname.includes("riznime.vercel.app")
      ) {
        // Extract path and redirect accordingly
        const path = urlObj.pathname;

        if (path.includes("/anime")) {
          redirectUrl = "/anime";
        } else if (path.includes("/manga")) {
          redirectUrl = "/manga";
        } else if (path.includes("/donghua")) {
          redirectUrl = "/donghua";
        } else {
          // Default to home page with shared content
          redirectUrl = `/?shared=${encodeURIComponent(url)}`;
        }
      } else {
        // External URL - redirect to home with shared content
        redirectUrl = `/?shared=${encodeURIComponent(url)}`;
      }
    } else if (title || text) {
      // If no URL but we have title/text, redirect to search
      const searchQuery = title || text;
      redirectUrl = `/?search=${encodeURIComponent(searchQuery)}`;
    }

    // Return a redirect response
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error("Error processing share:", error);

    // Fallback to home page on error
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle POST requests for more complex sharing
    const { title, text, url } = body;

    console.log("POST share received:", { title, text, url });

    // Process similar to GET but with more flexibility
    let redirectUrl = "/";

    if (url) {
      redirectUrl = `/?shared=${encodeURIComponent(url)}`;
    } else if (title || text) {
      const searchQuery = title || text;
      redirectUrl = `/?search=${encodeURIComponent(searchQuery)}`;
    }

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error("Error processing POST share:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
