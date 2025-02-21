import getToken from "@/src/auth/token"
async function getBudgetById(budgetId: string) {
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const json = await req.json()
    console.log(json)
}   

export default async function EditBudgetPage({params}: {params : {id: string}}) {
    const {id} = params
    getBudgetById(id)
    return (
        <div>EditBudgetPage</div>
    )
}
