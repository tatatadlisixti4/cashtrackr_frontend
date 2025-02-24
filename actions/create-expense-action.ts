"use server"

import getToken from "@/src/auth/token"
import { DraftExpenseSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export default async function createExpense(budgetId: number, prevState: ActionStateType, formData: FormData) {
    const token = getToken()
    const expenseData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const expense = DraftExpenseSchema.safeParse(expenseData)
    if(!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    console.log(token);
    console.log(budgetId)
    console.log(formData)
    return {
        errors: prevState.errors,
        success: prevState.success
    } 
}