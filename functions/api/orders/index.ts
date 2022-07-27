import { viewList } from "@/plugins/functions/restful";
import { Order } from "@/interfaces";

export const onRequestGet = viewList;

export async function onRequestPut({ request, env }) {
  try {
    const body: Order = await request.json();
    body.id = crypto.randomUUID();
    body.createdAt = new Date().toISOString();
    body.status = "pendingPayment";
    const value = JSON.stringify(body);

    await env.NAMESPACE.put(`orders:${body.id}`, value);
    await env.NAMESPACE.put(`orders/Last-Modified`, new Date().toUTCString());

    return new Response(value);
  } catch (err) {
    return new Response(err.toString());
  }
}
