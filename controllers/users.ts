import { Users } from './users.model.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'

let users: Users[] = [
    {
        id:'1',
        firstName: 'John',
        lastName: 'doe',
        dob: '1-1-1980',
        qualification: 'Bachelor of science'
    },
    {
        id:'2',
        firstName: 'Sophie',
        lastName: 'Ralph',
        dob: '1-1-1985',
        qualification: 'Bachelor of science'
    },
    {
        id:'3',
        firstName: 'Michael',
        lastName: 'doe',
        dob: '1-1-1982',
        qualification: 'Bachelor of arts'
    }
]

// Get method for all users
// routes GET /api/v1/uesrs

const getUsers = ({response}: {response: any}) => {
    response.body = users
}

// get user
// routes GET /api/v1/users/:id

const getUser = ({params,  response}: {params: {id: string}, response: any}) => {
    const user: Users | undefined = users.find(user => user.id === params.id);
    
    if(user) {
        response.status = 200;
        response.body = {
            success: true,
            data: user
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No user found'
        }
    }
}

// Add user
// routes POST /api/v1/users

const addUser = async ({ request, response}: {request: any, response: any}) => {
    const body = await request.body()
    if(!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        const user: Users = body.value
        user.id = v4.generate();
        users.push(user)
        response.status = 201
        response.body = {
            status: true,
            data: user,
            msg: 'User added successfully'
        }
    }
}

// delete user
// routes DELETE /api/v1/users/:id

const deleteUser = ({params, response}: {params: {id:string}, response: any}) => {
    users = users.filter(user => user.id !== params.id)
    response.body = {
        success: true,
        msg: 'User deleted successfully',
        users: users
    }
}

// update user
// routes UPDATE /api/v1/users/:id

const updateUser = async ({params, request, response}: {params: {id: string}, request:any, response: any}) => {
    const user: Users | undefined = users.find(user => user.id === params.id)

    if(user) {
        const body = await request.body()
        const updatedData: {
            firstName?: string;
            lastName?: string;
            dob?: string;
            qualificaiton?: string;
        } = body.value
        
        users = users.map(user =>
            user.id === params.id ? { ...user, ...updatedData } : user    
        )

        response.status = 200
        response.body = {
            status: true,
            data: users,
            msg: 'User updated succcessfully'
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No user found'
        }
    }
}



export { getUsers, getUser, addUser, deleteUser, updateUser }