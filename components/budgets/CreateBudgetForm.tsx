"use client"
import {useRouter} from "next/navigation"
import {useEffect} from "react"
import {useFormState} from "react-dom"
import {createBudget} from "@/actions/create-budget-action"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccessMessage"

export default function CreateBudgetForm() {
    const router = useRouter()
    const [state, dispatch] = useFormState(createBudget, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.success) {
            setTimeout(() => {
                router.push('/admin')
            }, 1000)
        }
    }, [state])
    
    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >
            {state.errors && state.errors.map(error => (<ErrorMessage key={error}>{error}</ErrorMessage>))}
            {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
            <div className="space-y-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre Presupuesto
                </label>
                <input
                    id="name"
                    className="w-full p-3  border border-gray-100 bg-slate-100"
                    type="text"
                    placeholder="Nombre del Presupuesto"
                    name="name"
                />
            </div>
            <div className="space-y-3">
                <label htmlFor="amount" className="text-sm uppercase font-bold">
                    Cantidad Presupuesto
                </label>
                <input
                    type="number"
                    id="amount"
                    className="w-full p-3  border border-gray-100 bg-slate-100"
                    placeholder="Cantidad Presupuesto"
                    name="amount"
                />
            </div>
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Crear Presupuesto'
            />
        </form>
    )
}