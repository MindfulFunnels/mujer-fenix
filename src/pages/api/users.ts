// /api/users.ts
import type { APIRoute } from "astro";
import { addUser } from "../../db/client";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ ok: false, error: "Faltan datos" }),
        { status: 400 }
      );
    }

    await addUser(name, email);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error: any) {
    // Si falla por UNIQUE en DB, igual confirma (porque ya está en Kit y/o DB)
    if (String(error?.message || "").includes("UNIQUE")) {
      return new Response(
        JSON.stringify({ ok: true, note: "Ya estaba registrado" }),
        { status: 200 }
      );
    }
    console.error(error);
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
      status: 500,
    });
  }
};
