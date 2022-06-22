export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    if (!body.id) body.id = crypto.randomUUID();
    const value = JSON.stringify(body);
    await env.NAMESPACE.put(`thumbnails:${body.id}`, value);
    return new Response(value);
  } catch (err) {
    return new Response(err.toString());
  }
}
