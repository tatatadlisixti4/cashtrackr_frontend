"use server"
type ActionStateType = {
    errors: string[]
}
export async function confirmAccount(prevState: ActionStateType) {
    console.log('holiwis')
    console.log(prevState)
    return {
        errors: []
    }
    
}