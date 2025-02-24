"use server"

import getToken from "@/src/auth/token"

type ActionStateType = {
    errors: string[],
    success: string
}

export default async function createExpense(budgetId: number, prevState: ActionStateType, formData: FormData) {
    const token = getToken()
    console.log(token);
    console.log(budgetId)
    console.log(formData)
    return {
        errors: prevState.errors,
        success: prevState.success
    } 
}