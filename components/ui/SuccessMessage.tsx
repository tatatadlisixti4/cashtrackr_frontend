import {ReactNode} from "react"

export default function SuccessMessage({children}: {children : ReactNode}) {
    return (
        <div className="p-2 bg-green-400 border-2 border-green-700 text-white text-center rounded-lg font-bold text-lg">{children}</div>
    )
}

