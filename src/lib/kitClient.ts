// src/lib/kitClient.ts
const KIT_BASE = "https://api.kit.com/v4";
const API_KEY = import.meta.env.KIT_V4_API_KEY!;

async function kpost<T>(path: string, body: Record<string, any>): Promise<T> {
  const res = await fetch(`${KIT_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": API_KEY,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Kit API ${path} ${res.status}: ${text}`);
  }
  return res.json();
}

// ✅ Crea/actualiza subscriber (V4)
export async function kitUpsertSubscriber(email: string, first_name?: string) {
  return kpost("/subscribers", {
    email_address: email, // <-- CAMBIO clave
    first_name, // opcional
    // state: 'active',       // opcional; si lo omites igual crea/actualiza
  });
}

// ✅ Suscribir a Form por email (V4)
export async function kitSubscribeToForm(
  formId: string,
  email: string,
  first_name?: string
) {
  return kpost(`/forms/${formId}/subscribers`, {
    email_address: email, // <-- CAMBIO clave
    first_name,
  });
}

// ✅ Etiquetar por email (V4)
export async function kitTag(tagId: string, email: string) {
  return kpost(`/tags/${tagId}/subscribers`, {
    email_address: email, // <-- CAMBIO clave
  });
}

// (Si algún día usas sequences V4, es similar: /v4/sequences/{id}/subscribers con email_address)
