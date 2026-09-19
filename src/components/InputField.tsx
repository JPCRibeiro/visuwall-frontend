import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { useState, type ComponentProps } from "react";
import Label from "./Label";

type InputFieldProps = ComponentProps<"input"> & {
  label?: string;
  LeftIcon?: LucideIcon;
  isPassword?: boolean;
  error?: string;
};

export default function InputField({
  label,
  LeftIcon,
  isPassword,
  className,
  error,
  type,
  ...props
}: InputFieldProps) {
  const [hidden, setHidden] = useState(true);

  const inputType = isPassword ? (hidden ? "password" : "text") : type;

  return (
    <div className="flex flex-col gap-2">
      {label && <Label label={label} />}

      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-4 flex justify-center text-zinc-500">
            <LeftIcon size={20} />
          </div>
        )}

        <input
          type={inputType}
          className={cn(
            "w-full bg-zinc-800/50 shadow-md rounded-md border border-zinc-700/50 text-zinc-100 focus:border-primary text-sm transition-colors duration-300 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 h-12",
            LeftIcon ? "pl-12" : "pl-4",
            isPassword ? "pr-12" : "pr-4",
            error && "border-red-500 focus:border-red-400",
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-4 flex justify-center text-zinc-500 hover:text-white transition-colors cursor-pointer"
            onClick={() => setHidden(!hidden)}
          >
            {hidden ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <span className="text-sm text-red-400 pl-1 pt-1">{error}</span>}
    </div>
  );
}
