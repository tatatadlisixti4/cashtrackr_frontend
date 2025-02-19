"use server"

import {ForgotPasswordSchema} from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}
export async function forgotPassword(prevState: ActionStateType, formData: FormData) {

    const forgotPassword = ForgotPasswordSchema.safeParse({
        email: formData.get('email')
    })

    if(!forgotPassword.success) {
        return {
            errors: forgotPassword.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    return {
        errors: [],
        success: ''
    }
}