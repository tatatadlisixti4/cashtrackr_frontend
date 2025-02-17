"use client"
import {PinInput, PinInputField} from "@chakra-ui/pin-input"
import {useState} from "react"
import {confirmAccount} from "@/actions/confirm-account-action"
import { useFormState } from "react-dom"

export default function ConfirmAccountForm() {
    const [token, setToken] = useState("")
    const [state, dispatch] = useFormState(confirmAccount, {
        errors: []
    })

    const handleChange = (token: string) => {
        setToken(token)
    }

    const handleComplete = () => {
        console.log("Llegaste al final...")
        console.log(state)
        dispatch()
        
    }

    return (
        <div className="flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center " />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center " />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center " />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center " />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center " />
                <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center " />
            </PinInput>
        </div>
    )
}
