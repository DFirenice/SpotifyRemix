import * as Yup from 'yup'

export const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('* Invalid email')
        .required('* Email is required'),
    password: Yup.string()
        .min(8, '* Password must be at least 8 chars.')
        .max(30, '* Password must not exceed more than 30 chars.')
        .required('* Password is required')
})

export type TAuthSchema = {
    email: string
    password: string
} | {
    email: string
    password: string
    username: string
}