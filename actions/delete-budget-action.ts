"use server"

import { Budget } from "@/src/types"

type actionStateType = {
    errors: string[]
}
export async function deleteBudget(budgetId: Budget['id'], prevState: actionStateType, formData: FormData) {
    console.log(budgetId)
    console.log(formData)
    
    return {
        errors: prevState.errors
    }
}