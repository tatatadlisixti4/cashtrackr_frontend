"use client"
import {PinInput, PinInputField} from "@chakra-ui/pin-input"
import {useEffect, useState} from "react"
import {confirmAccount} from "@/actions/confirm-account-action"
import {useFormState} from "react-dom"

export default function ConfirmAccountForm() {
    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState("")

    const confirmAccountWithToken = confirmAccount.bind(null, token) 
    const [ , dispatch] = useFormState(confirmAccountWithToken, {
        errors: []
    })

    useEffect(() => {
        if(isComplete) {
            dispatch()
        }
    }, [isComplete])
    
    const handleChange = (token: string) => {
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }

    return (
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
    )
}
