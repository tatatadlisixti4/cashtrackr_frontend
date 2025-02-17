"use server"
import {RegisterSchema} from "@/src/schemas"

export async function register(formData: FormData) {
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }
    
    // Validación
    const register = RegisterSchema.safeParse(registerData)
    const errors = register.error?.issues.map(error => error.message)
    console.log(errors)
    console.log(register)
    
    // Registro del usuario
    if(!register.success) {
        return {}
    }
    const url = `${process.env.API_URL}/auth/create-account`
    console.log(url)
    
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
} 