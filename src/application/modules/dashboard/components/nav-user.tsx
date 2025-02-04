import { SidebarMenu, SidebarMenuItem } from "@/application/shared/components/ui/sidebar";
import { DropdownMenuSettings } from "./dropdown-menu";

export function NavUser() {
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenuSettings />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
