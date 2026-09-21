import AuthForm from "@/features/auth/components/AuthForm";
import AuthPage from "@/features/auth/components/AuthPage";
import { loginSchema, type LoginFormType } from "@/features/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "@/components/InputField";
import { KeyRound, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { useLogin } from "@/features/auth/api/queries";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const login = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormType) => {
    login.mutate(data, { onSuccess: () => navigate("/") });
  };

  return (
    <AuthPage>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          label="Email"
          placeholder="seu@email.com"
          LeftIcon={Mail}
          {...register("email")}
          error={errors.email?.message}
        />

        <InputField
          type="password"
          label="Senha"
          placeholder="••••••••"
          LeftIcon={KeyRound}
          isPassword
          {...register("password")}
          error={errors.password?.message}
        />
        <Button disabled={login.isPending} className="w-full">
          {login.isPending ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </AuthForm>
    </AuthPage>
  );
}
