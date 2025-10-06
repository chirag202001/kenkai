import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
      {
        "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg": variant === "primary",
        "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50": variant === "secondary",
        "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50": variant === "outline",
        "text-gray-600 hover:text-gray-900 hover:bg-gray-100": variant === "ghost",
      },
      {
        "px-3 py-1.5 text-sm": size === "sm",
        "px-6 py-3 text-base": size === "md",
        "px-8 py-4 text-lg": size === "lg",
      },
      className
    );

    if (asChild && isValidElement(children)) {
      // Clone the child element and add our button styles to it
      return cloneElement(children as any, {
        className: cn(baseClasses, (children.props as any)?.className),
        ...props,
      });
    }

    return (
      <button
        className={baseClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
