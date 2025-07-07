/*
 * Adapted from shadcn/ui (https://github.com/shadcn/ui), licensed under MIT.
 * Original copyright by shadcn.
 */

import * as React from "react"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function PhoneInput({ className, type, ...props}: React.ComponentProps<"input">) {
  const [useHK, setUseHK] = useState<boolean>();
  useEffect(() => {
    if (localStorage.getItem("useHK") === null) {
      localStorage.setItem("useHK", "true");
      setUseHK(true);
    } else {
      setUseHK(localStorage.getItem("useHK") === "true");
    }
  });
  return (
    <div className="w-full relative">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-15 pr-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <div className="absolute left-0 top-0 text-sm h-full px-2 flex items-center">
        {useHK? "(+852)" : "(+86)"}
      </div>
    </div>
  )
}

export { Input, PhoneInput }
