import {ReactNode} from "react"

export default function ErrorMessage({children}: {children: ReactNode}) {
    return (
        <div className="p-2 bg-red-400 border-2 border-red-700 text-white text-center rounded-lg font-bold text-lg">{children}</div>
    )
}
