"use server"

import {ErrorResponseSchema, ResetPasswordSchema, SuccessSchema } from "@/src/schemas"

type actionStateType = {
    errors: string[],
    success: string
}
export default async function resetPassword(token: string, prevState: actionStateType, formData: FormData) {
    const resetPasswordInput = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
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
            password: isPasswordValid.data.password
        })
    })
    
    const json = await req.json()
    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    
    const success = SuccessSchema.parse(json)    
    return {   
        errors: [],
        success
    }
}
