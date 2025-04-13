import { cn } from "@/utilities/ui";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-300",
    {
        defaultVariants: {
            size: "default",
            variant: "default",
        },
        variants: {
            size: {
                clear: "",
                default: "h-10 px-6 py-4",
                icon: "h-10 w-10",
                lg: "h-12 px-8 text-lg",
                sm: "h-8 px-3",
            },
            variant: {
                default:
                    "bg-primary text-primary-50 hover:bg-primary-500 hover:ring ring-0 ring-primary-500",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                ghost: "hover:bg-neutral-100 hover:text-primary",
                link: "text-primary dark:text-primary-300 items-start justify-start underline-offset-4 hover:underline",
                outline:
                    "border border-neutral-800 bg-white/0 hover:bg-white hover:text-neutral-950 text-current dark:border-white dark:text-current dark:hover:text-neutral-950",
                secondary: "bg-primary text-primary-50 hover:bg-primary/80",
            },
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
    asChild = false,
    className,
    size,
    variant,
    ref,
    ...props
}) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
    );
};

export { Button, buttonVariants };
