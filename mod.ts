import { serve, ServeInit } from "https://deno.land/std@0.154.0/http/server.ts";
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

const listen = (ServeInit: ServeInit = {}): Promise<void> => serve((request: Request) => {
    const router = routers.get(new URL(request.url).pathname);

    if (router) {
      return router(request);
    } else {
      return new Response('Not Found', { status: 404 })
    }
}, ServeInit);


export { Bansa, listen };
