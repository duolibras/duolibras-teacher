import { queryClient } from "@/application/shared/clients/query-client";
import { Toaster } from "@/application/shared/components/ui/sonner";
import { ThemeProvider } from "@/application/shared/components/ui/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "plyr-react/plyr.css";
import { Router } from "./routes/router";

export function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router />
        <Toaster expand />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
