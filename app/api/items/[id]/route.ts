import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const element = await db.element.findUnique({
      where: { id },
    });
    if (!element) {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.json(element);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      typeElement,
      isFavourite,
      name,
      directory,
      username,
      password,
      urlWebsite,
      notes,
    } = body;

    const element = await db.element.update({
      where: { id },
      data: {
        ...(typeElement != null && { typeElement }),
        ...(typeof isFavourite === "boolean" && { isFavourite }),
        ...(name != null && { name }),
        ...(directory != null && { directory }),
        ...(username != null && { username }),
        ...(password != null && { password }),
        ...(urlWebsite != null && { urlWebsite }),
        ...(notes != null && { notes }),
      },
    });

    return NextResponse.json(element);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
