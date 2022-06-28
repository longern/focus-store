export async function onRequestGet({ request, env }) {
  const lastModified = env.NAMESPACE.get("products/Last-Modified");
  const ifModifiedSince = request.headers.get("If-Modified-Since");
  if (
    lastModified &&
    ifModifiedSince &&
    new Date(ifModifiedSince) >= new Date(lastModified)
  ) {
    return new Response("Not modified", { status: 304 });
  }

  const { keys: productKeys } = await env.NAMESPACE.list({
    prefix: "products:",
  });
  const products = await Promise.all(
    productKeys.map(async (key) =>
      JSON.parse(await env.NAMESPACE.get(key.name))
    )
  );

  const response = new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
