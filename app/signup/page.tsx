import RegisterForm from "@/components/auth/register-form";
import Container from "@/components/shared/container";
import IsoFeatures from "@/components/shared/iso-features";
import Logo from "@/components/shared/logo";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Container>
        <div className="grid lg:grid-cols-2 gap-6 lg:items-center w-full h-[75vh]">
          <div className="hidden lg:flex h-full mask-t-from-60% mask-b-from-60% mask-l-from-75% mask-r-from-75%">
            <IsoFeatures />
          </div>

          {/* login form   */}
          <div className="flex flex-col gap-6 p-4 items-center lg:p-6 lg:gap-10">
            <Logo size="large" />

            <div className="flex flex-col gap-4 w-full">
              <div className="text-center">
                <h2 className="text-center font-semibold lg:text-3xl leading-normal">
                  Visualize Your Logic Instantly.
                </h2>
                <p className="text-sm text-foreground/90">
                  Register to unlock all features!
                </p>
              </div>
              <RegisterForm />

              <p className="text-center text-foreground/80">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-foreground underline underline-offset-2 hover:no-underline transition-all duration-200 ease-in-out"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
