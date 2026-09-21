import { Button } from "@/components/Button";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex w-full items-center justify-center sm:min-h-[calc(100svh-65px)] text-white flex-col p-2.5 text-center">
      <h2 className="text-white text-[36px] font-medium">
        Oops! Página não encontrada
      </h2>
      <p className="text-[20px] text-gray-400">
        A página que você está procurando não existe.
      </p>
      <div className="mt-5">
        <Button>
          <Link to="/" >
            Voltar à página inicial
          </Link>
        </Button>
      </div>
    </div>
  )
}