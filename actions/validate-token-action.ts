"use server"
type ActionStateType = {
    errors: string[],
    success: string
}
export async function validateToken(token: string, prevState: ActionStateType) {
    console.log(prevState)
    console.log(token)
    

    return {
        errors: ['a'],
        success: ''
    }
}