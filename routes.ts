import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getUsers, getUser, addUser, deleteUser, updateUser } from './controllers/users.ts'

// init routes
const router = new Router()

router.get('/api/v1/users', getUsers)
    .get('/api/v1/users/:id', getUser)
    .post('/api/v1/users', addUser)
    .delete('/api/v1/users/:id', deleteUser)
    .put('/api/v1/users/:id', updateUser)

export default router;