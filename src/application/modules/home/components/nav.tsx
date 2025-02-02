import { NavItem } from "@/application/shared/components/nav-item";

export function Nav() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <NavItem to="#duolibras" >
            DuoLibras
          </NavItem>
        </li>

        <li>
          <NavItem to="#como-estamos-agora" >
            Como estamos agora?
          </NavItem>
        </li>
      </ul>
    </nav>
  );
}