import type { ReactNode, SubmitEventHandler } from "react";

type AuthFormProps = {
  serverError?: string;
  onSubmit?: SubmitEventHandler<HTMLFormElement>;
  children: ReactNode;
};

export default function AuthForm({
  serverError,
  onSubmit,
  children,
}: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 p-8 bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-800/50 shadow-m"
    >
      {serverError && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md text-center">
          {serverError}
        </div>
      )}

      {children}
    </form>
  );
}
