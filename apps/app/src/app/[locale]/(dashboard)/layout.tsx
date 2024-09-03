import { ToastProvider } from "../../../../../../packages/ui/src/components/use-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToastProvider>{children}</ToastProvider>;
}
