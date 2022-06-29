export async function viewList({ request, env, waitUntil }) {
  const cache = await caches.open("focus");
  const cachedResponse = await cache.match(request);
  const resourceClass = request.url.replace(/.*\//, "");

  const lastModified = await env.NAMESPACE.get(
    `${resourceClass}/Last-Modified`
  );
  if (
    cachedResponse &&
    lastModified &&
    new Date(cachedResponse.headers.get("cf-cache-date")) >=
      new Date(lastModified)
  )
    return cachedResponse;

  const { keys } = await env.NAMESPACE.list({ prefix: `${resourceClass}:` });
  const resources = await Promise.all(
    keys.map(async (key: { name: string }) =>
      JSON.parse(await env.NAMESPACE.get(key.name))
    )
  );
  const response = new Response(JSON.stringify(resources), {
    headers: {
      "Content-Type": "application/json",
      "cf-cache-date": new Date().toUTCString(),
    },
  });

  if (lastModified) response.headers.set("Last-Modified", lastModified);

  waitUntil(cache.put(request, response.clone()));

  return response;
}
