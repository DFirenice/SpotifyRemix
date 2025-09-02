'use client'

import { useFormikContext } from "formik"
import { Input } from "@app-ui/input"
import React from "react"

const CustomField = ({ name, ...props }: { name: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
    const { setFieldValue } = useFormikContext()
    return (
        <Input
            {...props}
            name={name}
            onChange={(e) => setFieldValue(name, e.target.value)}
        />
    )
}

export default CustomField