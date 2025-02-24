import {notFound} from "next/navigation"
import getToken from "@/src/auth/token"
import {BudgetAPIResponseSchema} from "@/src/schemas"

import {cache} from "react"
export const getBudgetById = cache(async (budgetId: string) => {
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const json = await req.json()
    
    if(!req.ok) {
        notFound()
        
    } 
    const budget = BudgetAPIResponseSchema.safeParse(json)
    if(!budget.success) {
        notFound()
    }
    return budget.data
})