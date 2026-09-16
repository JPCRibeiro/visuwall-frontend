import { Link } from "react-router";
import { Clock, Images, Star, Upload } from "lucide-react";

export default function Home() {
  return (
    <div className="-mt-16">
      <div className="-z-10 absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(3_227_184/.2),transparent,transparent)] from-[#03e3b8]/20 via-transparent to-transparent" />
      <div className="relative overflow-hidden mb-10 pt-16">
        <div className="relative container mx-auto px-4 pt-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Descubra
              <span className="bg-linear-to-r from-[#03e3b8] to-[#3AEDE3] bg-clip-text text-transparent">
                {" "}
                Wallpapers{" "}
              </span>
              Incríveis
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Explore wallpapers de alta qualidade para seu computador e celular
            </p>
          </div>
          <div className="flex justify-center gap-5 mb-10 flex-wrap">
            <Link
              to={"/wallpapers"}
              className="w-30 h-30 bg-[#181818]/70 p-4 rounded-md border border-[#2a2a2a] shadow-md shadow-black/20 flex flex-col justify-center items-center gap-2 text-[#B4B4B4] hover:text-[#03e3b8] transition-colors duration-200 font-medium"
            >
              <Images size={26} />
              Wallpapers
            </Link>
            <Link
              to={"/favoritos"}
              className="w-30 h-30 bg-[#181818]/75 p-4 rounded-md border border-[#2a2a2a] shadow-md shadow-black/20 flex flex-col justify-center items-center gap-2 text-[#B4B4B4] hover:text-[#03e3b8] transition-colors duration-200 font-medium"
            >
              <Star size={26} />
              Favoritos
            </Link>
            <Link
              to={"/upload"}
              className="w-30 h-30 bg-[#181818]/75 p-4 rounded-md border border-[#2a2a2a] shadow-md shadow-black/20 flex flex-col justify-center items-center gap-2 text-[#B4B4B4] hover:text-[#03e3b8] transition-colors duration-200 font-medium"
            >
              <Upload size={26} />
              Upload
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap gap-6 mb-8 text-sm text-zinc-400 font-medium">
          <span className="flex items-center gap-2">
            <Clock className="text-[#03e3b8]" size={16} />
            Atualizado diariamente
          </span>
          <span className="flex items-center gap-2">
            <Upload className="text-[#03e3b8]" size={16} />
            Download grátis
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
      </div>
    </div>
  );
}
