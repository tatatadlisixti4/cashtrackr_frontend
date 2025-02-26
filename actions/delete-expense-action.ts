"use server"
import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import {Budget, Expense} from "@/src/types"
import { revalidatePath } from "next/cache"

type actionStateType = {
    errors: string[],
    success: string
}
type budgetAndExpenseId = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}
export default async function deleteExpense(
    {budgetId, expenseId}: budgetAndExpenseId, 
    prevData: actionStateType
) {
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method:  'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    const json = await req.json()
    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    revalidatePath(`/admin/budgets/${budgetId}`)
    const success = SuccessSchema.parse(json)
    return {
        errors: prevData.errors,
        success
    }
}