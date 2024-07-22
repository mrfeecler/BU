import { validateLocale } from '@/helpers/validate-locale';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = dynamic(
  () => import('@/components/CommonLayouts/Header/Index'),
  { ssr: true }
);
const Footer = dynamic(
  () => import('@/components/CommonLayouts/Footer/Index'),
  { ssr: true }
);

const BreadcrumbProvider = dynamic(
  () => import('../../context/Breadcrumb/BreadcrumbProvider'),
  { ssr: true }
);

const ButtonBackTop = dynamic(
  () => import('@/components/Button/ButtonBackTop'),
  { ssr: false }
);

export default function LocaleLayout(props: PageProps & PropsWithChildren) {
  const { children } = props;
  validateLocale(props);

  return (
    <main>
      <ButtonBackTop />
      <Header />
      <BreadcrumbProvider>{children}</BreadcrumbProvider>
      <Footer />
      <ToastContainer
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  );
}
