"use server"

import { UpdatePasswordSchema } from "@/src/schemas"

type actionStateType = {
    errors: string[]
    success: string
}
export async function updatePassword (prevState: actionStateType, formData: FormData) {
    const passwordValues = {
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const passwordValuesValidates = UpdatePasswordSchema.safeParse(passwordValues)
    if(!passwordValuesValidates.success) {
        return {
            errors: passwordValuesValidates.error.issues.map(issue => issue.message),
            success: prevState.success
        }
    }
    

    return {
        errors: prevState.errors,
        success: prevState.success
    }
}