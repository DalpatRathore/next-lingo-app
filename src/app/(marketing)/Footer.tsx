import Image from "next/image";
import Admin from "./Admin";

const Footer = () => {
  return (
    <footer className="w-full h-20 border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full gap-3">
        <Image
          src={"/es.svg"}
          alt="Spanish"
          height={32}
          width={40}
          className="mr-4 rounded-md"
        ></Image>

        <Image
          src={"/hr.svg"}
          alt="Croatian"
          height={32}
          width={40}
          className="mr-4 rounded-md"
        ></Image>

        <Image
          src={"/jp.svg"}
          alt="Japanese"
          height={32}
          width={40}
          className="mr-4 rounded-md"
        ></Image>

        <Image
          src={"/fr.svg"}
          alt="France"
          height={32}
          width={40}
          className="mr-4 rounded-md"
        ></Image>

        <Image
          src={"/it.svg"}
          alt="Italian"
          height={32}
          width={40}
          className="mr-4 rounded-md"
        ></Image>

        <Admin></Admin>
      </div>
    </footer>
  );
};
export default Footer;
