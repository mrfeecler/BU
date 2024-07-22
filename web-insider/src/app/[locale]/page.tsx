import { validateLocale } from '@/helpers/validate-locale';
import { Flex } from 'antd';
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('../home/banner'), { ssr: true });

const RenderTabs = dynamic(() => import('../home/RenderTabs/RenderTabs'), {
  ssr: false,
});
const Introduce = dynamic(() => import('../home/introduce'), { ssr: true });

export default function Home(props: PageProps) {
  validateLocale(props);

  return (
    <Flex vertical gap={80} className='pt-[60px] pb-10 px-8 mx-auto max-w-2xl'>
      <Banner />
      <RenderTabs />
      <Introduce />
    </Flex>
  );
}
