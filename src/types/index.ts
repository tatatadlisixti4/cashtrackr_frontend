import {z} from 'zod'
import {BudgetAPIResponseSchema, UserSchema} from "../schemas"

export type User = z.infer<typeof UserSchema>

export type Budget = z.infer<typeof BudgetAPIResponseSchema>