"use server"
import {ResetPasswordSchema } from "@/src/schemas"

type actionStateType = {
    errors: string[],
    success: string
}
export default async function resetPassword(token: string, prevState: actionStateType, formData: FormData) {
    console.log(token) 
    
    const resetPasswordInput = {
        password: formData.get('password'),
        passwordConfirmation: formData.get('passwordConfirmation')
    }

    const isPasswordValid = ResetPasswordSchema.safeParse(resetPasswordInput)
    if(!isPasswordValid.success) {
        return {
            errors: isPasswordValid.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    
    const url = `${process.env.API_URL}/auth/reset-password/${token}`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    })
    const json = req.json();
    
    console.log(json)
    
    
    return {   
        errors: [],
        success: ''
    }
}
