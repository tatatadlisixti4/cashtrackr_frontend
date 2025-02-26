"use server"
import {revalidatePath} from "next/cache"
import getToken from "@/src/auth/token"
import {DraftExpenseSchema, ErrorResponseSchema, SuccessSchema} from "@/src/schemas"
import {Budget, Expense} from "@/src/types"

type BudgetAndExpenseId = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}
type ActionStateType = {
    errors: string[],
    success: string
}
export default async function editExpense(
    {budgetId, expenseId}: BudgetAndExpenseId,
    prevState: ActionStateType, 
    formData: FormData
) {
    const token = getToken()
    const editInputs = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }
    const expense = DraftExpenseSchema.safeParse(editInputs)
    if(!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method:  'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
        })
    })
    const json = await req.json()
    if(!req.ok) {
        console.log(req.ok)
        
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    const success = SuccessSchema.parse(json)
    revalidatePath(`/admin/budgets/${budgetId}`)
    return {
        errors: prevState.errors,
        success
    }
}
