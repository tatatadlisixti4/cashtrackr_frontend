"use server"
import {DraftBudgetSchema, ErrorResponseSchema, SuccessSchema} from "@/src/schemas"
import {Budget} from "@/src/types"
import getToken from "@/src/auth/token"

type actionStateType = {
    errors: string[],
    success: string
}

export async function editBudget(budgetId: Budget['id'], prevState: actionStateType, formData: FormData) {
    const token = getToken()
    const editBudgetInput = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }
    const editBudgetValid =  DraftBudgetSchema.safeParse(editBudgetInput)
    if(!editBudgetValid.success) {
        return {
            errors: editBudgetValid.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: editBudgetValid.data.name,
            amount: editBudgetValid.data.amount
        })
    })

    const json = await req.json()
    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success
    }
}
