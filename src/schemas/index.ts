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

export const LoginSchema = z.object({
    email: z.string()
        .min(1, {message: 'El Email es Obligatorio'})
        .email({message: 'Email no válido'}),
    password: z.string()
        .min(1, {message: 'El Password no puede ir vacio'})
})

export const TokenSchema = z
    .string({message: 'Tóken no válido'})
    .length(6, {message: 'Tóken no válido'})
    export const SuccessSchema = z.string()


export const DraftBudgetSchema = z.object({
    name: z.string()
        .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
    amount: z.coerce.
        number({message: 'Cantidad no válida'})
        .min(1, {message: 'Cantidad no válida'}),
})

export const ForgotPasswordSchema = z.object({
    email: z.string()   
        .min(1, {message: 'El Email es Obligatorio'})
        .email( {message: 'Email no válido'})
})

export const ResetPasswordSchema = z.object({
    password: z.string()
        .min(8, {message: 'El password es muy corto, mínimo 8 caracteres'}),
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: 'Los Passwords no son iguales',
    path: ['password_confirmation']
})

export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})
