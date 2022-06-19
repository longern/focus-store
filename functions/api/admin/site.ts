export async function onRequestPost({ request, env }) {
  try {
    await env.NAMESPACE.put("site", request.body);
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(err.toString());
  }
}
