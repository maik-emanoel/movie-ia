import { CircleNotch, Lightning } from "@phosphor-icons/react";
import logo from "../assets/logo.svg";

interface HeaderProps {
  handleNextMovies: () => void;
  isLoading: boolean;
}

export function Header({ handleNextMovies, isLoading }: HeaderProps) {
  return (
    <header className="flex items-center justify-between select-none">
      <img src={logo} alt="Logo" />
      <button
        className={`max-w-[220px] w-full h-12 flex items-center justify-center gap-2 bg-buttonGradient text-white rounded transition-all duration-300 hover:brightness-125 ${
          isLoading && "pointer-events-none"
        } sm:p-2 sm:w-fit sm:rounded-full`}
        onClick={handleNextMovies}
      >
        {isLoading ? <span className="sm:hidden">Gerando...</span> : <span className="sm:hidden">Nova recomendação</span>}

        <div className="w-8 h-8 bg-white/20 flex justify-center items-center rounded-full">
          {isLoading ? (
            <CircleNotch size={18} className="animate-spin" />
          ) : (
            <Lightning size={18} />
          )}
        </div>
      </button>
    </header>
  );
}
