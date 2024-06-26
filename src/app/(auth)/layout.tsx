const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full bg-[url('/auth-bg.jpg')] bg-cover bg-no-repeat">
      {children}
    </div>
  );
};
export default AuthLayout;
