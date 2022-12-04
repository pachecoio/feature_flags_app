// context/todoContext.tsx
import * as React from 'react';
import {AlertContextType, AlertType} from "./@types/alert";

export const AlertContext = React.createContext<AlertContextType>({
  alert: null, setAlert: () => {}
});

type AlertProviderProps = {
  children: JSX.Element
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = React.useState<AlertType | null>(null);

  function handleSetAlert(alert: AlertType | null) {
    setAlert(alert)
    setTimeout(() => {
      setAlert(null)
    }, 2500)
  }

  return <AlertContext.Provider value={{
    alert, setAlert: handleSetAlert
  }}>{children}</AlertContext.Provider>;
};
