"use server"
import getToken from "@/src/auth/token"
import {ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema} from "@/src/schemas"
import { revalidatePath } from "next/cache"
type actionStateType = {
    errors: string[]
    success: string
}
export async function updatePassword (prevState: actionStateType, formData: FormData) {
    const token = getToken()
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
    const url = `${process.env.API_URL}/auth/update-password`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            current_password: passwordValuesValidates.data.current_password,
            password: passwordValuesValidates.data.password,
            password_confirmation: passwordValuesValidates.data.password_confirmation
        })
    })
    const json = await req.json()
    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: prevState.success
        }
    }
    const success = SuccessSchema.parse(json)
    revalidatePath('/admin/profile/password')
    return {
        errors: prevState.errors,
        success
    }
}