"use server"
import {revalidateTag} from "next/cache"
import getToken from "@/src/auth/token"
import {ErrorResponseSchema, PasswordValidationSchema, SuccessSchema} from "@/src/schemas"
import {Budget} from "@/src/types"

type actionStateType = {
    errors: string[],
    success: string
}
export async function deleteBudget(budgetId: Budget['id'], prevState: actionStateType, formData: FormData) {
    const token = getToken()
    const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'))
    if(!currentPassword.success) {
        return {
            errors: currentPassword.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    let url = `${process.env.API_URL}/auth/check-password`
    const checkPasswordReq = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: currentPassword.data
        })
    })
    const checkPasswordJson = await checkPasswordReq.json()
    if(!checkPasswordReq.ok) {
        const {error} = ErrorResponseSchema.parse(checkPasswordJson)
        return {
            errors: [error],
            success: ''
        }
    }

    url = `${process.env.API_URL}/budgets/${budgetId}`
    const deleteBudgetReq = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const deleteBudgetJson = await deleteBudgetReq.json()
    if(!deleteBudgetReq.ok) {
        const {error} = ErrorResponseSchema.parse(deleteBudgetJson)
        return {
            errors: [error],
            success: ''
        }
    }
    revalidateTag('all-budgets') 

    const success = SuccessSchema.parse(deleteBudgetJson)
    return {
        errors: prevState.errors,
        success
    }
}