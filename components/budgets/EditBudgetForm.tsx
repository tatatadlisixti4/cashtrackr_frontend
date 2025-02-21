"use client"
import {useFormState} from "react-dom"
import BudgetForm from "./BudgetForm"
import {editBudget} from "@/actions/edit-budget-action"
import {Budget} from "@/src/types"

export default function EditBudgetForm({budget}: {budget: Budget}) {
    
    const [state, dispatch] = useFormState(editBudget, {
        errors: [],
        success: ''
    })


    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >
            <BudgetForm budget={budget} />
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Editar Presupuesto'
            />
        </form>
    )
}
