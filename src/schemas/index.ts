import {z} from 'zod'

export const RegisterSchema = z.object({
    email: z.string()
        .min(1, {message: 'El email es obligatorio'})
        .email({message: 'Email no válido'}),
    name: z.string()
        .min(1, {message: 'Tu nombre no puede ir vacío'}),
    password: z.string()
        .min(8, {message: 'El password es muy corto, mínimo 8 caracteres'}), 
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: 'Los password no son iguales',
    path: ['password_confirmation']
})

export const SuccessSchema = z.string().min(1, 'Válor no válido')
