"use server"
import {ResetPasswordSchema } from "@/src/schemas"

type actionStateType = {
    errors: string[],
    success: string
}
export default async function resetPassword(prevState: actionStateType, formData: FormData) {
    const resetPasswordInput = {
        password: formData.get('password'),
        passwordConfirmation: formData.get('passwordConfirmation')
    }

    const isPasswordValid = ResetPasswordSchema.safeParse(resetPasswordInput)
    if(!isPasswordValid.success) {
        return {
            errors: isPasswordValid.error.issues.map(issue => issue.message),
            success: prevState.success
        }
    }

    const url = `${process.env.API_URL}/auth/reset-password/:${}`
    const json = await fetch(url)
    
    return {   
        errors: prevState.errors,
        success: prevState.success
    }
}
