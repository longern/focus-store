import { Product } from "@/interfaces";

export async function onRequestPost({ request, env }) {
  try {
    const body: Product = await request.json();
    if (!body.id) body.id = crypto.randomUUID();
    body.updatedAt = new Date().toISOString();
    const value = JSON.stringify(body);

    await env.NAMESPACE.put(`products:${body.id}`, value);
    await env.NAMESPACE.put(`products/Last-Modified`, new Date().toUTCString());

    return new Response(value);
  } catch (err) {
    return new Response(err.toString());
  }
}
