import { Star } from "lucide-react";
import PageTitle from "../../components/PageTitle";

export default function Favorites() {
  return(
    <div>
      <PageTitle
        Icon={Star} 
        title="Favoritos" 
        description="Wallpapers curtidos por você"
      />
    </div>
  )
}