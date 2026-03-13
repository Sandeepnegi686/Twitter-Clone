import API_BASE_URL from "@/app/_lib/api";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("access-token");

    // get formData from client
    const formData = await req.formData();

    const response = await fetch(`${API_BASE_URL}/api/v1/user/update-bio`, {
      method: "POST",
      body: formData,
      headers: {
        Cookie: `access-token=${token?.value}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
