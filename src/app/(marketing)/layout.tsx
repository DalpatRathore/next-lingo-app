import Footer from "./Footer";
import Header from "./Header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="flex flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
};
export default MarketingLayout;
