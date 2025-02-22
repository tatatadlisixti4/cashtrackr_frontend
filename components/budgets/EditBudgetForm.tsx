"use client"
import {useEffect} from "react"
import {useFormState} from "react-dom"
import {useRouter} from "next/navigation"
import {toast} from "react-toastify"
import BudgetForm from "./BudgetForm"
import {editBudget} from "@/actions/edit-budget-action"
import {Budget} from "@/src/types"
import ErrorMessage from "../ui/ErrorMessage"

export default function EditBudgetForm({budget}: {budget: Budget}) {
    const router = useRouter()
    const editBudgetWithId = editBudget.bind(null, budget.id)
    const [state, dispatch] = useFormState(editBudgetWithId, {
        errors: [],
        success: ''
    })
    useEffect(() => {
        if(state.success) {
            toast.success(state.success)
            router.push('/admin')
        }
    }, [state])
    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >
            {state.errors && state.errors.map(error => (<ErrorMessage key={error}>{error}</ErrorMessage>))}
            <BudgetForm budget={budget} />
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Editar Presupuesto'
            />
        </form>
    )
}
