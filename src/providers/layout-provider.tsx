import { ReactNode, createContext, useContext, useState } from "react";

interface LayoutContextType {
  DRAWER_WIDTH: number;
  COLLAPSED_WIDTH: number;
  isOpenMenu: boolean;
  isOpenMobileMenu: boolean;
  toggleMenu: () => void;
  toggleMobileMenu: () => void;
  /*     setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
        setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
        setIsOpenConfigDrawer: React.Dispatch<React.SetStateAction<boolean>>; */
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const toggleMenu = () => setIsOpenMenu(!isOpenMenu);
  const toggleMobileMenu = () => setIsOpenMobileMenu(!isOpenMobileMenu);

  return (
    <LayoutContext.Provider
      value={{
        isOpenMenu,
        toggleMenu,
        toggleMobileMenu,
        isOpenMobileMenu,
        DRAWER_WIDTH: 190,
        COLLAPSED_WIDTH: 60,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export const useLayoutProvider = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayoutProvider must be used within a LayoutProvider");
  }
  return context;
};
