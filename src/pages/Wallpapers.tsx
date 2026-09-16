import { Images } from "lucide-react";
import PageTitle from "../components/PageTitle";

export default function Wallpapers() {
  return(
    <div>
      <PageTitle
        Icon={Images} 
        title="Wallpapers" 
        description="Todos os wallpapers enviados pela comunidade"
      />
    </div>
  )
}