import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Administer = () => {
  return (
    <a href="https://www.linkedin.com/in/dalpatrathore">
      <Avatar>
        <AvatarImage src="/dalpatrathore.png"></AvatarImage>
        <AvatarFallback> DR</AvatarFallback>
      </Avatar>
    </a>
  );
};
export default Administer;
