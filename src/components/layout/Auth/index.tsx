import Image, { StaticImageData } from 'next/image';
import AuthHero from '@/assets/images/register-hero.png';

type AuthWithRoleProps = {
  children: React.ReactNode;
  heroImage?: StaticImageData;
  reverse?: boolean;
  pageTitle?: string;
  wrapperClass?: React.ComponentPropsWithoutRef<'div'>['className'];
};

const AuthWithRole = ({
  children,
  heroImage = AuthHero,
  reverse,
  wrapperClass,
  pageTitle = 'Register',
}: AuthWithRoleProps) => {
  return (
    <div
      className={`flex ${reverse ? 'flex-row-reverse' : ''} h-screen overflow-hidden`}
    >
      <div
        id="auth-main"
        className={`${reverse ? '' : 'no-scrollbar'} relative z-[1] grid place-items-center h-screen overflow-y-auto py-[35px] px-[23px] sm:p-[35px] lg:py-[calc(.5rem+2vw)] min-w-[280px] w-full sm:min-w-[480px] md:min-w-[576px] md:w-1/2 bg-light/50 backdrop-blur-xl ${wrapperClass}`}
      >
        <div className="w-full max-w-[520px]">
          <h2 className="font-semibold font-poppins text-2xl leading-[135%] text-center text-primary-text mb-10">
            {pageTitle}
          </h2>
          <div className="text-dark-gray leading-[150%] tracking-[0.5px] mb-[6px]">
            Please select your role
          </div>
          {children}
        </div>
      </div>
      <div className="w-1/2 hidden md:flex items-center justify-center relative z-0">
        <Image
          src={heroImage}
          className={`min-h-[75vh] min-w-fit`}
          priority
          alt="auth-hero"
        />
      </div>
    </div>
  );
};

export default AuthWithRole;
