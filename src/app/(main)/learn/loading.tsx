import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div
      className="w-full h-full flex items-center
     justify-center"
    >
      <Loader2 className="w-6 h-6 text-muted-foreground animate-spin"></Loader2>
    </div>
  );
};
export default Loading;
