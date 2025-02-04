import { SummaryClass } from "@/application/modules/classes/services/dto/class-dto";
import { CardMoreButton } from "@/application/shared/components/card-more-button";
import { AspectRatio } from "@/application/shared/components/ui/aspect-ratio";
import { Card } from "@/application/shared/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/application/shared/components/ui/tooltip";

interface IProps {
  courseClass: SummaryClass;
}

export function ClassCard({ courseClass }: IProps) {
  return (
    <Card 
      className="flex flex-col gap-2 max-w-[450px]" 
    >
      {courseClass.bannerUrl && (
        <div className="max-w-[450px] w-full">
          <AspectRatio ratio={16 / 9} >
            <img src={courseClass.bannerUrl} alt="Preview" className="w-full rounded-md h-full object-cover" />
          </AspectRatio>
        </div>
      )}

      <div className="flex flex-col justify-between p-4 gap-4 w-full">
        <div className="flex flex-col w-full col-span-4">
          <strong className="w-full">
            {courseClass.name}
          </strong>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-muted-foreground truncate">
                  {courseClass.description}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {courseClass.description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>

        <div className="flex w-full justify-end">
          <CardMoreButton
            label="aula"
            archived={courseClass.archived}
            deleteFn={() => {}}
          />
        </div>
      </div>
    </Card>
  )
}