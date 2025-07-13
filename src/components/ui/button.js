import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils"; // define cn as below

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default" && "bg-green-600 text-white hover:bg-green-700",
        size === "default" && "h-10 px-4 py-2",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
export { Button };
