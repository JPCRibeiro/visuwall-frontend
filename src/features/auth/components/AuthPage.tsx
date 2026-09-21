import { type ReactNode } from "react";
import { Link, useLocation } from "react-router";

type AuthPageProps = {
  children: ReactNode;
};

export default function AuthPage({ children }: AuthPageProps) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#3AEDE3]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-[#3AEDE3]/5 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg z-10 flex flex-col justify-center w-full m-auto p-4 pt-16 absolute inset-0">
        <div className="pb-6">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            {isLogin ? "Fazer Login" : "Criar conta"}
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            {isLogin
              ? "Entre na sua conta para continuar"
              : "Cadastre-se para começar"}
          </p>
        </div>

        {children}

        <p className="text-center text-md text-slate-400 mt-8">
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <Link
            to={isLogin ? "/cadastro" : "/login"}
            className="text-primary hover:text-[#02b191] transition-colors"
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </Link>
        </p>
      </div>
    </>
  );
}

//{isLogin ? <LoginForm /> : <RegisterForm />}
