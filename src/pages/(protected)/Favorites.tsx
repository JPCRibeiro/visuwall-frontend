import PageTitle from "@/components/PageTitle";
import { Star } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div>
      <PageTitle
        Icon={Star}
        title="Favoritos"
        description="Wallpapers curtidos por você"
      />
    </div>
  );
}
