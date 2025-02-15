import type {Metadata} from "next"
import LoginForm from "@/components/auth/LoginForm"
export const metadata: Metadata = {
    title: "CashTrackr - Iniciar Sesión",
    description: "CashTrackr - Iniciar Sesión"
}

export default function RegisterPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Iniciar Sesión</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>
            <LoginForm></LoginForm>
        </>
    )
}
