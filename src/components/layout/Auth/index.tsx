import Image, { StaticImageData } from 'next/image';
import AuthHero from '@/assets/images/register-hero.png';
import Modal from '@/components/common/Modal';
import { Button, Icon } from '@/components/common';

export type AuthModalProps = {
  mode: 'CircleCheck' | 'CircleAlert' | 'Info';
  title: string;
  loading?: boolean;
  caption: string;
  show: boolean;
  btnText: string;
  onCloseModal: () => void;
  onConfirm: () => void;
};

type AuthWithRoleProps = {
  children: React.ReactNode;
  heroImage?: StaticImageData;
  reverse?: boolean;
  pageTitle?: string;
  wrapperClass?: React.ComponentPropsWithoutRef<'div'>['className'];
  modal?: AuthModalProps;
};

const AuthWithRole = ({
  children,
  heroImage = AuthHero,
  reverse,
  wrapperClass,
  pageTitle = 'Register',
  modal,
}: AuthWithRoleProps) => {
  return (
    <>
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
      {modal && (
        <Modal
          showModal={modal.show}
          modalClass="[&>*]:rounded-xl"
          onClick={modal.onCloseModal}
        >
          <div className="flex flex-col gap-5 items-center px-7 py-12 sm:w-96 [&>*]:text-center">
            <Icon
              name={modal.mode}
              className={`w-36 h-36 stroke-white/80 [&_path]:stroke-white [&_path]:stroke-[1.5] ${modal.mode == 'CircleAlert' ? 'fill-warning' : 'fill-primary-dark'}`}
            />
            <b className="font-semibold font-poppins text-dark leading-[125%]">
              {modal.title}
            </b>
            <p className="text-gray text-sm -translate-y-2 max-w-96">
              {modal.caption}
            </p>
            <Button
              onClick={modal.onConfirm}
              loading={modal.loading}
              variant={modal.mode == 'CircleAlert' ? 'warning' : 'primary'}
              className="min-w-40 h-11 px-4"
            >
              {modal.btnText}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AuthWithRole;
