export async function onRequestGet({ env }) {
  const { keys: productKeys } = await env.NAMESPACE.list({
    prefix: "products:",
  });
  const products = await Promise.all(
    productKeys.map(async (key) =>
      JSON.parse(await env.NAMESPACE.get(key.name))
    )
  );

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}
