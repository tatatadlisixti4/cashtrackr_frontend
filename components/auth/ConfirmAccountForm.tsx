"use client"
import {PinInput, PinInputField} from "@chakra-ui/pin-input"
import {useEffect, useState} from "react"
import {confirmAccount} from "@/actions/confirm-account-action"
import {useFormState} from "react-dom"
import SuccessMessage from "../ui/SuccessMessage"
import {toast} from "react-toastify"

export default function ConfirmAccountForm() {
    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState("")

    const confirmAccountWithToken = confirmAccount.bind(null, token) 
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(isComplete) {
            dispatch()
        }
    }, [isComplete])

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
    }, [state])
    
    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }
    
    return (
        <>
            <div className="mt-8">
                {state.success && <SuccessMessage key={state.success}>{state.success}</SuccessMessage>}
            </div>
            <div className="flex justify-center gap-5 my-10">
                <PinInput
                    value={token}
                    onChange={handleChange}
                    onComplete={handleComplete}
                >
                    <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
                    <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
                    <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
                    <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
                    <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
                    <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
                </PinInput>
            </div>
        </>
    )
}
