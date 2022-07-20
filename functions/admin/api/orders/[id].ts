import { Order } from "@/interfaces";

export async function onRequestPost({ request, env }) {
  try {
    const url = new URL(request.url);
    const orderId = url.pathname.split("/").pop();

    const value = await env.NAMESPACE.get(`orders:${orderId}`);
    if (value === null) {
      return new Response("Not found", { status: 404 });
    }
    const order: Order = JSON.parse(value);

    const body = await request.json();
    order.status = body.status;
    const newValue = JSON.stringify(order);

    await env.NAMESPACE.put(`orders:${orderId}`, newValue);
    await env.NAMESPACE.put(`orders/Last-Modified`, new Date().toUTCString());

    return new Response(newValue, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.toString());
  }
}
