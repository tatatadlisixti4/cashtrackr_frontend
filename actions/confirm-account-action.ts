"use server"
type ActionStateType = {
    errors: string[]
}
export async function confirmAccount(token: string, prevState: ActionStateType) {
    console.log('holiwis')
    console.log(token)
    console.log(prevState)
    return {
        errors: []
    }
    
}