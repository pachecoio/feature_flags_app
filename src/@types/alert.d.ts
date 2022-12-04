export type AlertType = {
  title: string;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export type AlertContextType = {
  alert: AlertType | null;
  setAlert: (alert: AlertType | null) => void;
};