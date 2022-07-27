export async function onRequestGet({ env }) {
  try {
    return new Response(await env.NAMESPACE.get("site"), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.toString());
  }
}
