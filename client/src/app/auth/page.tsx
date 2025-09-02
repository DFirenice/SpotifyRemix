'use client'

import CustomField from "@/components/ui/custom-field";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import { Separator } from "@/components/ui/separator";
import { SignInSchema, TAuthSchema } from "@/schemas/auth.yup";
import { Button } from "@app-ui/button";
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik'
import Link from "next/link";
import axios, { AxiosResponse } from 'axios'

const FieldLabel = ({ name }: { name: string }) => {
    return <span className="text-sm text-fg-secondary my-1.5">
        { name }
    </span>
}

export default function AuthPage() {    
    const handleSubmit = async (
            values: TAuthSchema,
            actions: FormikHelpers<TAuthSchema>,
            authMethod: 'singup' | 'login'
        ) => {
            actions.setSubmitting(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/${authMethod}`, values)
                .catch(err => {
                    console.error(err)
                }) as AxiosResponse

            if (res.status === 201 || res.status === 200) {
                const token = res.data
                // Remember the JWT
            }

            actions.setSubmitting(false)
        }
    
    return (
        <section className="w-full h-screen grid place-items-center">
            <div className="w-96 min-h-96 bg-dp-2 border border-accent-gray m-auto flex rounded-md flex-col items-center gap-4 px-6 py-10">
                <Heading size="large">SpotRem</Heading>
                <Button variant="outline">
                    <Icon id="google" size="small" />
                    <span>Continue with Google</span>
                </Button>
                <div className="w-full relative flex flex-row justify-center items-center gap-4 my-4">
                    <Separator className="h-0.5 w-[95%]" />
                    <span className="absolute left-1/2 -translate-x-1/2 px-4 flex bg-dp-2 w-min">or</span>
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignInSchema}
                    validateOnBlur={true}
                    onSubmit={(values, actions) => handleSubmit(values, actions, 'login')}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full flex gap-2 flex-col h-full">
                            <div>
                                <FieldLabel name="Email" />
                                <CustomField placeholder="sample@email.com" name="email" autoComplete="off" />
                                <ErrorMessage className="text-red-300/60 mt-2 text-sm" name="email" component="div" />
                            </div>

                            <div className="mb-4 w-full">
                                <FieldLabel name="Password" />
                                <CustomField placeholder="Password" name="password" type="password" autoComplete="off" />
                                <div className="flex flex-row w-full mt-2 text-sm">
                                    <ErrorMessage className="text-red-300/60" name="password" component="div" />
                                    <Link href="" className="ml-auto text-fg-primary/80 hover:underline underline-offset-4">Forgot password?</Link>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-auto"
                            >
                                { isSubmitting ? 'Logging in...' : 'Continue' }
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}