import {z} from 'zod'
import {BudgetAPIResponseSchema, DraftExpenseSchema, ExpenseAPIResponseSchema, UserSchema} from "../schemas"

export type User = z.infer<typeof UserSchema>

export type Budget = z.infer<typeof BudgetAPIResponseSchema>

export type Expense = z.infer<typeof ExpenseAPIResponseSchema>

export type DraftExpense = z.infer<typeof DraftExpenseSchema>
