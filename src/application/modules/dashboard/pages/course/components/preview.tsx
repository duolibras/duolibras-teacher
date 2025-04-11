import { AspectRatio } from "@/application/shared/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/application/shared/components/ui/dialog";
import { cn } from "@/application/shared/lib/utils";
import { PlayCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Plyr from "plyr-react";
import { useState } from "react";
import { useGetCoursePreview } from "../../../hooks/use-get-course-preview";
import { useCoursePageContext } from "../contexts/course-page-context";

export function Preview() {  
  const { course } = useCoursePageContext();
  const { previewUrl, prefetchPreview } = useGetCoursePreview({ courseId: course.id });
  
  const [isPreviewButtonVisible, setIsPreviewButtonVisible] = useState<boolean>(false);
  const [isPreviewVideoVisible, setIsPreviewVideoVisible] = useState<boolean>(false);
    
  return (
    <>
       <div className="max-w-[600px] w-full relative rounded-lg overflow-hidden">
        <AspectRatio ratio={16 / 9} >
          <img src={course.bannerUrl ?? ''} alt="" />
        </AspectRatio>

        {course.hasVideoPreview && (
          <div 
            onMouseEnter={() => {
              setIsPreviewButtonVisible(true);
              prefetchPreview();
            }}
            onMouseLeave={() => setIsPreviewButtonVisible(false)}
            onClick={() => setIsPreviewVideoVisible(true)}
            className={cn(
              "w-full h-full absolute top-0 left-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all flex items-center justify-center group hover:conteúdor-pointer"
            )}
          >
            <AnimatePresence initial={isPreviewButtonVisible}>
              {isPreviewButtonVisible && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center items-center flex-col space-y-2 text-slate-100"
                >
                  <PlayCircle className="size-20" />
                  <span>Ver vídeo de preview</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <Dialog onOpenChange={setIsPreviewVideoVisible} open={isPreviewVideoVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vídeo de apresentação</DialogTitle>
            <DialogDescription>Veja seu vídeo de apresentação</DialogDescription>
          </DialogHeader>

          <div className="max-w-[600px] w-full">
            <AspectRatio ratio={16 / 9}>
              {previewUrl && (
                <Plyr 
                  controls 
                  preload="auto"
                  controlsList="noplaybackrate nodownload"
                  options={{
                    autoplay: true,
                  }}
                  source={{
                    type: "video",
                    sources: [{ src: previewUrl, type: "video/mp4" }]
                  }} 
                />
              )}
            </AspectRatio>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}