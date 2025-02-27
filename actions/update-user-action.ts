"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema, UpdateUserSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type actionStateType = {
    errors: string[]
    success: string
}
export async function updateUser(prevState: actionStateType, formData: FormData) {
    const userData = {
        name: formData.get('name'),
        email: formData.get('email')
    }
    const userDataValidate = UpdateUserSchema.safeParse(userData)
    if(!userDataValidate.success){
        return {
            errors: userDataValidate.error.issues.map(issue => issue.message),
            success: prevState.success
        }
    }
    const url = `${process.env.API_URL}/auth/user`
    const token = getToken()
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userDataValidate.data.name,
            email: userDataValidate.data.email
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
    revalidatePath('/admin/profile/settings')
    return {
        errors: prevState.errors,
        success
    }
}