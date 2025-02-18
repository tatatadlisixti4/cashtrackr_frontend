import {redirect} from "next/navigation"
import {cookies} from "next/headers"

export const verifySession = async () => {
    const token = cookies().get('CASHTRACKR_TOKEN')
    if(!token) {
        redirect('/auth/login')
    }   
}