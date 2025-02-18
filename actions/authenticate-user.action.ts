"use server"
import {ErrorResponseSchema, LoginSchema, SuccessSchema} from "@/src/schemas"

type ActionStateType = {
    errors: string[]
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {
    console.log(prevState)

    const loginCredentials = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginCredentials)
    if(!auth.success) {
        return {
            errors: auth.error.errors.map(error =>  error.message)
        }
    }  

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: auth.data.email,
            password: auth.data.password
        })
    })
    const json = await req.json()

    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error]
        }
    }

    const token = SuccessSchema.parse(json)
    console.log(token)
    
    return {
        errors: []
    }
}
