import { Lightning } from "@phosphor-icons/react";
import logo from '../assets/logo.svg'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <img src={logo} alt="Logo" />
      <button className="max-w-[220px] w-full h-12 flex items-center justify-center gap-2 bg-buttonGradient text-white rounded">
        <span>Nova recomendação</span>
        <div className="w-8 h-8 bg-white/20 flex justify-center items-center rounded-full">
          <Lightning size={18} />
        </div>
      </button>
    </header>
  );
}
