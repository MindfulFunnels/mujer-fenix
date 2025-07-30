import axios from "axios";

const API_KEY = import.meta.env.SYSTEME_API_KEY;

export async function createContact(
  nombre: string,
  email: string,
  slug = "first_name",
  tagName = "Template-landing" // Nombre de la tag a asignar
) {
  try {
    let contactoId: number;

    // 👉 Buscar contacto por email
    const buscarRes = await axios.get(
      `https://api.systeme.io/api/contacts?email=${encodeURIComponent(email)}`,
      {
        headers: {
          "X-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const existente = buscarRes.data.items?.[0];

    if (existente) {
      contactoId = existente.id;
      console.log(`🔄 Contacto ya existe con ID: ${contactoId}`);
    } else {
      // 👉 Crear contacto si no existe
      const contactoRes = await axios.post(
        "https://api.systeme.io/api/contacts",
        {
          email,
          fields: [{ slug: slug.trim(), value: nombre.trim() }],
        },
        {
          headers: {
            "X-API-Key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      contactoId = contactoRes.data.id;
      console.log(`✅ Contacto creado con ID: ${contactoId}`);
    }

    // 👉 Obtener todas las tags
    const tagsRes = await axios.get("https://api.systeme.io/api/tags", {
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    const tag = tagsRes.data.items.find((t: any) => t.name === tagName);
    if (!tag) {
      console.error(`❌ Tag "${tagName}" no encontrada.`);
      return;
    }

    const tagId = tag.id;
    console.log(`🏷️ Tag encontrada con ID: ${tagId}`);

    // 👉 Consultar el detalle del contacto
    const contactoDetalle = await axios.get(
      `https://api.systeme.io/api/contacts/${contactoId}`,
      {
        headers: {
          "X-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const yaTieneTag = contactoDetalle.data.tags.some(
      (t: any) => t.id === tagId
    );
    if (yaTieneTag) {
      console.log(`⚠️ El contacto ya tiene la tag "${tagName}".`);
      return;
    }

    // 👉 Asignar la tag
    const asignacionRes = await axios.post(
      `https://api.systeme.io/api/contacts/${contactoId}/tags`,
      { tagId },
      {
        headers: {
          "X-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🎯 Tag asignada correctamente:", asignacionRes.data);
  } catch (error: any) {
    console.error("❌ Error al crear o actualizar contacto:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error.message);
    }
  }
}
