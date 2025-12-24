import AppSidebar from '@/components/app-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Provider } from 'jotai';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
 <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
          <Provider>
            {children}
          </Provider>
        </SidebarInset>
    </SidebarProvider>

          </ThemeProvider>
  );
};

export default Layout;