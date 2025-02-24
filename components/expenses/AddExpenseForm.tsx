import {useEffect} from "react"
import {useFormState} from "react-dom"
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation"
import {DialogTitle} from "@headlessui/react"
import {toast} from "react-toastify"
import ExpenseForm from "./ExpenseForm"
import createExpense from "@/actions/create-expense-action"
import ErrorMessage from "../ui/ErrorMessage"

export default function AddExpenseForm() {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()
    const {id} : {id: string}  = useParams()
    const createExpenseWithId = createExpense.bind(null, Number(id))
    const [state, dispatch] = useFormState(createExpenseWithId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.success) {
            toast.success(state.success)
            const hideModal = new URLSearchParams(params.toString())
            Array.from(hideModal.entries()).forEach(([key]) => hideModal.delete(key))
            router.replace(`${pathname}?${hideModal}`)
        }
    }, [state])

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Agregar Gasto
            </DialogTitle>

            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-amber-500">gasto</span>
            </p>

            <form
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={dispatch}
            >
                {state.errors.map(error => (<ErrorMessage key={error}>{error}</ErrorMessage>))}
                <ExpenseForm />
                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Registrar Gasto'
                />
            </form>
        </>
    )
}