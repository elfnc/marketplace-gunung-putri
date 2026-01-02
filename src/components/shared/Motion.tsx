"use client"

import { motion, MotionProps } from "framer-motion"
import { ReactNode } from "react"

interface MotionComponentProps extends MotionProps {
    children: ReactNode
    className?: string
    as?: "div" | "section" | "ul" | "li" | "span" | "article" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
}

export const Motion = ({
    children,
    className,
    as = "div",
    ...props
}: MotionComponentProps) => {
    const Component = motion[as] as any

    return (
        <Component className={className} {...props}>
            {children}
        </Component>
    )
}
