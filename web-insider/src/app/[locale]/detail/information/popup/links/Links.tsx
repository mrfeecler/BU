import { getIconLink } from '@/app/[locale]/ieo-ido/[category]/config';
import {
  IconDiscord,
  IconFile,
  IconGithub,
  IconLinkedIn,
  IconMedium,
  IconTelegram,
  IconTwitter,
} from '@/assets/icons';
import { IconFacebook } from '@/assets/icons/IconFacebook';
import IconWeb from '@/assets/icons/IconWeb';
import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Flex, Popover } from 'antd';

export function getLogo(type: string) {
  switch (type) {
    case 'twitter':
      return <IconTwitter />;
    case 'web':
      return <IconWeb />;
    case 'telegram':
      return <IconTelegram />;
    case 'discord':
      return <IconDiscord />;
    case 'gitbook':
      return <IconFile />;
    case 'medium':
      return <IconMedium />;
    case 'github':
      return <IconGithub />;
    case 'facebook':
      return <IconFacebook />;
    case 'linkedin':
      return <IconLinkedIn />;
    default:
      null;
  }
}

const renderIconLink = (item: any) => {
  if (!item.value) {
    return <span key={item.value}>{getIconLink(item.type)}</span>;
  }
  return (
    <a href={item.value} target={'_blank'} key={item.value}>
      {getIconLink(item.type)}
    </a>
  );
};

const Links = (props: any) => {
  const links = props.links;
  if (!links) return;
  if (links?.length <= 0) return;
  let newLinks = [];
  for (let i in links) {
    if (getIconLink(links[i].type)) {
      newLinks.push(links[i]);
    }
  }

  const backerExtend = newLinks.slice(3);

  return (
    <>
      {newLinks && newLinks.length > 0 && (
        <Flex vertical gap={8}>
          <Text type='secondary'>Links</Text>
          <Flex align='center' className='gap-4 xl:gap-5'>
            {newLinks.slice(0, 3).map((item) => renderIconLink(item))}
            {newLinks.length > 3 ? (
              <Popover content={<DialogLinks links={backerExtend} />}>
                <span
                  className={cn(
                    'flex items-center justify-center w-7 h-7 rounded-full',
                    'bg-grey-300 text-xs font-semibold text-grey-700',
                    'text-center cursor-pointer'
                  )}
                >
                  <Text weight='semiBold' size={12}>
                    +{newLinks.length - 3}
                  </Text>
                </span>
              </Popover>
            ) : (
              ''
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
export function DialogLinks(props: any) {
  const links = props.links;

  return (
    <div className='flex flex-wrap gap-5 w-full md:max-w-[220px]'>
      {...Array.from(Array(links?.length).keys()).map((item: any) => {
        return renderIconLink(links[item]);
      })}
    </div>
  );
}

export default Links;
