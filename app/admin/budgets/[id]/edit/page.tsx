import EditBudgetForm from "@/components/budgets/EditBudgetForm"
import getToken from "@/src/auth/token"
import {BudgetAPIResponseSchema} from "@/src/schemas"
import { Metadata } from "next"
import Link from "next/link"
import {notFound} from "next/navigation"


async function getBudgetById(budgetId: string) {
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
}   

export async function generateMetadata({params} : {params: {id: string}}) : Promise<Metadata>{
    const budget = await getBudgetById(params.id)
    return {
        title: `CashTrackr - ${budget.name}`,
        description: `Presupuesto - ${budget.name}`
    }
}

export default async function EditBudgetPage({params}: {params : {id: string}}) {
    const budgetId = params.id
    const budget = await getBudgetById(budgetId)
    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className='font-black text-4xl text-purple-950 my-5'>
                        Editar Presupuesto: {budget.name}
                    </h1>
                    <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
                        <span className="text-amber-500">presupuesto</span>
                    </p>
                </div>
                <Link
                    href={'/admin'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Volver
                </Link>
            </div>
            <div className='p-10 mt-10  shadow-lg border '>
                <EditBudgetForm budget={budget}/>
            </div>
        </>
    )
}
