import { cn } from "@/application/shared/lib/utils";

interface IProps {
  text: string;
  description: string;
  type?: 'primary' | 'secondary';
}

export function Data({ description, text, type = 'primary' }: IProps) {
  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <strong className={cn(
        'text-9xl font-bold tracking-wider',
        type === 'primary' ? 'text-gradient' : 'text-gradient-secondary'
      )}>
        {text}
      </strong>
      <span className='text-muted-foreground'>
        {description}
      </span>
    </div>
  );
}