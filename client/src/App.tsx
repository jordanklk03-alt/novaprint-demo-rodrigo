// NOVAprint / Creative Commerce Studio: router raíz que conecta la experiencia pública con el espacio operativo del admin.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { AdminGuard } from "./components/AdminGuard";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Configurator from "./pages/Configurator";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAIDesigner from "./pages/AdminAIDesigner";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/personalizar" component={Configurator} />
      <Route path="/cuenta" component={Account} />
      <Route path="/carrito" component={Cart} />
      <Route path="/admin"><AdminGuard><AdminDashboard /></AdminGuard></Route>
      <Route path="/admin/ai"><AdminGuard><AdminAIDesigner /></AdminGuard></Route>
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
