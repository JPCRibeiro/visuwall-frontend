import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import type { ComponentProps } from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-all select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",

  {
    variants: {
      variant: {
        default: "shadow-sm px-[18px]! py-[6px]! h-auto! bg-white! font-semibold text-background text-[16px]! bg-linear-to-r from-[#03e3b8] to-[#3AEDE3] border-none shadow-[0_3px_0_#028b71] active:translate-y-[2px] active:shadow-none transition-all duration-150",
        secondary: "shadow-sm shadow-[0_3px_0_#afafaf] px-[18px]! py-[6px]! h-auto! bg-white! font-semibold text-background text-[16px]! bg-white border-none active:translate-y-[2px] active:shadow-none transition-all duration-150",
        outline: "border border-border bg-transparent text-white hover:bg-zinc-800",
        ghost: "bg-transparent text-white hover:bg-zinc-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}