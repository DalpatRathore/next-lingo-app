import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

type FooterProps = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: boolean;
};
const Footer = ({ onCheck, status, disabled, lessonId }: FooterProps) => {
  const isMobile = useMedia("max-width:1024px");
  useKey("Enter", onCheck, {}, [onCheck]);
  return (
    <footer
      className={cn(
        "h-[100px] lg:h-[140px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="h-full max-w-[1140px] mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="w-6 h-6 lg:w-10 lg:h-10 mr-4 "></CheckCircle>
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="w-6 h-6 lg:w-10 lg:h-10 mr-4 "></XCircle>
            Try again
          </div>
        )}
        {status === "completed" && (
          <Button
            variant={"default"}
            size={"lg"}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Practice again
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          //   size={"lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};
export default Footer;
