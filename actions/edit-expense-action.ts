"use server"
import getToken from "@/src/auth/token"
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
    console.log(token)
    console.log(budgetId)
    console.log(expenseId)
    
    const editInputs = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    return {
        errors: prevState.errors,
        success: prevState.success
    }
}
