//deno run --allow-net test.ts
import { Bansa, listen } from './mod.ts'

const client = Bansa;

client['/'] = (req: Request) => {
    return new Response(`User-Agent: ${req.headers.get('User-Agent')}`);
}

listen({ port: 8080 });