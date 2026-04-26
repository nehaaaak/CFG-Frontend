// "use server";

// import { serverApi } from "@/lib/axios";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export const generateCFGAction = async (code: string) => {
//   const session = await getServerSession(authOptions);

//   const res = await serverApi.post(
//     "/cfg/generate",
//     { code, language: "python" },
//     {
//       headers: {
//         Authorization: `Bearer ${session?.accessToken}`,
//       },
//     },
//   );
//   return res.data;
// };
