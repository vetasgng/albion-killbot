import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from "react";

interface ServerNavMobileContextValue {
  registerOpenHandler: (handler: (() => void) | null) => void;
  openServerNav: () => void;
}

const ServerNavMobileContext =
  createContext<ServerNavMobileContextValue | null>(null);

export const ServerNavMobileProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const handlerRef = useRef<(() => void) | null>(null);

  const registerOpenHandler = useCallback((handler: (() => void) | null) => {
    handlerRef.current = handler;
  }, []);

  const openServerNav = useCallback(() => {
    handlerRef.current?.();
  }, []);

  return (
    <ServerNavMobileContext.Provider
      value={{ registerOpenHandler, openServerNav }}
    >
      {children}
    </ServerNavMobileContext.Provider>
  );
};

export const useServerNavMobile = () => useContext(ServerNavMobileContext);
