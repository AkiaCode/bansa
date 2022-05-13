// deno-lint-ignore-file no-explicit-any
const routers = new Map<string, any>();

const Bansa: any = new Proxy({}, {
  set(target, prop, val, receiver) {
    if (val instanceof Function) {
      routers.set(String(prop), val);
    }
    return Reflect.set(target, prop, val, receiver);
  }
});

const listen = async (options: Deno.ListenOptions): Promise<void> => {
  for await (const conn of Deno.listen(options)) {
    for await (const requestEvent of Deno.serveHttp(conn)) {
      const router = routers.get(new URL(requestEvent.request.url).pathname);

      if (router) {
        requestEvent.respondWith(router(requestEvent.request));
      } else {
        requestEvent.respondWith(new Response('Not Found', { status: 404 }));
      }
    }
  }
};

export { Bansa, listen };
