
interface IProps {
  to: string;
  children: React.ReactNode;
}

export function NavItem({ to, children}: IProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(to);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a 
      href={to}
      onClick={handleClick}
      rel="internal"
      target="_self"
      className="text-muted-foreground hover:text-primary transition-colors font-medium tracking-tight"
    >
      {children}
    </a>
  )
}