import { Archive, ArchiveRestore, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface IProps {
  archived: boolean;
  deleteFn(): void;
  label: string;
}

export function CardMoreButton({ archived, deleteFn, label }: IProps) {
  return (
    <>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 rounded-lg"
        >
          <DropdownMenuItem>
            <Pencil className="text-muted-foreground" />
            <span>Editar {label}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {archived 
              ? (<ArchiveRestore className="text-muted-foreground" />)
              : (<Archive className="text-muted-foreground" />)}
          <span>{archived ? 'Recuperar' : 'Arquivar'}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={deleteFn}>
            <Trash2 className="text-destructive" />
            <span>Remover {label}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}