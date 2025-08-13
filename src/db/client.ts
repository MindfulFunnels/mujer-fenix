import { createClient } from "@libsql/client";
import {
  kitUpsertSubscriber,
  kitTag,
  kitSubscribeToForm,
} from "../lib/kitClient";

const client = createClient({
  url: import.meta.env.DATABASE_URL ?? "",
  authToken: import.meta.env.DATABASE_TOKEN ?? "",
});
const KIT_TAG_ID =
  import.meta.env.KIT_TAG_ID ?? import.meta.env.KIT_SOURCE_TAG_ID;
const KIT_FORM_ID = import.meta.env.KIT_FORM_ID;
export const addUser = async (name: string, email: string) => {
  try {
    const lower = email.toLowerCase();

    // 1) Upsert en Kit (V4 usando email_address)
    await kitUpsertSubscriber(lower, name);

    // 2) Tag de fuente (para tus Broadcasts)
    if (KIT_TAG_ID) {
      await kitTag(KIT_TAG_ID, lower);
    }

    // 3) Form técnico para disparar el welcome (auto‑confirm)
    if (KIT_FORM_ID) {
      await kitSubscribeToForm(KIT_FORM_ID, lower, name);
    }

    // 4) Guardar en Turso
    await client.execute({
      sql: "INSERT INTO Usuarios (name, email) VALUES (?, ?)",
      args: [name, lower],
    });
  } catch (error) {
    console.error("❌ Error en addUser:", error);
    throw error;
  }
};
