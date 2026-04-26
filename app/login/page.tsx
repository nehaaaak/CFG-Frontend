import LoginForm from "@/components/auth/login-form";
import Container from "@/components/shared/container";
import IsoCFG from "@/components/shared/iso-cfg";
import Logo from "@/components/shared/logo";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Container>
        <div className="grid lg:grid-cols-2 gap-6 lg:items-center w-full h-[75vh]">
          {/* image here  */}
          <div className="hidden lg:flex h-full mask-t-from-95% mask-b-from-95% mask-l-from-70% mask-r-from-70%">
            <IsoCFG />
          </div>

          {/* login form   */}
          <div className="flex flex-col gap-6 p-4 items-center lg:p-6 lg:gap-10">
            <Logo size="large" />

            <div className="flex flex-col gap-4 w-full">
              <div className="text-center">
                <h2 className="text-center font-semibold lg:text-3xl leading-normal">
                  Welcome Back!
                </h2>
                <p className="text-sm text-foreground/90">
                  Continue login to unlock all features!
                </p>
              </div>
              <LoginForm />

              <p className="text-center text-foreground/80">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-foreground underline underline-offset-2 hover:no-underline transition-all duration-200 ease-in-out"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
