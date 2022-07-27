export async function onRequestGet({ params, env }) {
  const value = await env.NAMESPACE.get(`products:${params.id}`);
  if (value === null) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(value, {
    headers: { "Content-Type": "application/json" },
  });
}
