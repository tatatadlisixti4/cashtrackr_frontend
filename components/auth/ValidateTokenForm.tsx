import {useEffect, useState} from "react"
import {PinInput, PinInputField} from "@chakra-ui/pin-input"
import {useFormState} from "react-dom"
import {validateToken} from "@/actions/validate-token-action"

export default function ValidateTokenForm() {
    const [token, setToken] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const validateTokenInput = validateToken.bind(null, token)

    const [state, dispatch] = useFormState(validateTokenInput, {
        errors: [], 
        success: ''
    })

    useEffect(() => {
        if (isComplete) {
            dispatch() 
        }
    }, [isComplete])

    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }

    console.log(state)

    return (
        <div className="flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
            </PinInput>
        </div>
    )
}