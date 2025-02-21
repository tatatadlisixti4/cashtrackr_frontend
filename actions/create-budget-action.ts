"use server"
import getToken from "@/src/auth/token"
import {DraftBudgetSchema, ErrorResponseSchema, SuccessSchema} from "@/src/schemas"

type actionStateType = {
    errors: string[],
    success: string
}
export async function createBudget(prevState: actionStateType, formData: FormData) {
    const budget = DraftBudgetSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })

    if(!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }
    }    
    const url = `${process.env.API_URL}/budgets/`
    const token = getToken()
    const req  = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount
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