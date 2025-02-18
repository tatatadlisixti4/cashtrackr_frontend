"use server"

import {LoginSchema} from "@/src/schemas"

export async function authenticate(prevState, formData: FormData) {
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
    
}