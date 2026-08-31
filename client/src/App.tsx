// NOVAprint / Creative Commerce Studio: router raíz que conecta la experiencia pública con el espacio operativo del admin.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Configurator from "./pages/Configurator";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAIDesigner from "./pages/AdminAIDesigner";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/personalizar" component={Configurator} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/ai" component={AdminAIDesigner} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
