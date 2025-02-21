
type actionStateType = {
    errors: string[],
    success: string
}

export async function editBudget(prevState: actionStateType, formData: FormData) {
    console.log(formData.getAll)
    
    return {
        errors: [''],
        success: ''
    }
}
