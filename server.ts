import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'

// port 
const port = 5000

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())


console.log(`listenning port from ${port}`)

await app.listen({ port })