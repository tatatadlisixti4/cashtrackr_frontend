"use server"
import {RegisterSchema} from "@/src/schemas"

type ActionStateType = {
    errors: string[]
}

export async function register(prevState: ActionStateType, formData: FormData){
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }
    
    // Validación
    const register = RegisterSchema.safeParse(registerData)
    if(!register.success) {
        const errors = register.error.errors.map(error => error.message)
        return {errors}
    }

    // Registro del usuario
    const url = `${process.env.API_URL}/auth/create-account`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: register.data.name,
            password: register.data.password, 
            email: register.data.email
        })
    })
    const json = await req.json()
    console.log(json)
    
    return {errors: []}
} 