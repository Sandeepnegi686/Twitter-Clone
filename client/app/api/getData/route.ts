// import API_BASE_URL from "@/lib/api";
// import { cookies } from "next/headers";

export async function GET() {
  //   const cookieStore = cookies();
  //   const cookie = (await cookieStore).get("access-token");
  //   const response = await fetch(
  //     `${API_BASE_URL}/api/v1/movies/getFavMovieByUser`,
  //     {
  //       headers: {
  //         Cookie: `access-token=${cookie?.value}`,
  //       },
  //       cache: "no-store",
  //     },
  //   );

  //   if (!response.ok) {
  //     throw new Error(`HTTP ERROR, status code: ${response.status}`);
  //   }

  //   const data = await response.json();
  return Response.json({ name: "Rahul" });
}
