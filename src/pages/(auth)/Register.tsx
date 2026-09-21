import { KeyRound, Loader2, Lock, Mail, User } from "lucide-react";
import InputField from "@/components/InputField";
import AuthPage from "@/features/auth/components/AuthPage";
import { useForm } from "react-hook-form";
import AuthForm from "@/features/auth/components/AuthForm";
import { registerSchema, type RegisterFormType } from "@/features/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { useRegister } from "@/features/auth/api/queries";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const registerQuery = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = (data: RegisterFormType) => {
    registerQuery.mutate(data, { onSuccess: () => navigate("/") });
  };

  return (
    <AuthPage>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          label="Nome de usuário"
          placeholder="John Pork"
          LeftIcon={User}
          {...register("username")}
          error={errors.username?.message}
        />

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

        <InputField
          type="password"
          label="Confirmar senha"
          placeholder="••••••••"
          LeftIcon={Lock}
          isPassword
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Button disabled={registerQuery.isPending} className="w-full">
          {registerQuery.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Entrar"
          )}
        </Button>
      </AuthForm>
    </AuthPage>
  );
}
