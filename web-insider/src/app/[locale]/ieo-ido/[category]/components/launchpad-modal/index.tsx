import Text from '@/components/Text';
import { changeImageUrl } from '@/helpers/functions';
import { Avatar, Flex, Modal } from 'antd';
import { useParams } from 'next/navigation';
import React from 'react';
import { IeoIdoCategory } from '../../config';
import { IIeoIdoData } from '../../types';

type IChildrenCallback = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

type LaunchpadProps = {
  children: (props: IChildrenCallback) => React.ReactNode;
  data: IIeoIdoData['launchpadList'];
  platformId: string;
};

export default function LaunchpadModal(props: LaunchpadProps) {
  const { children, data, platformId } = props;
  const {
    category: _category = IeoIdoCategory.upcoming,
    locale,
    slug,
  } = useParams<{
    category: string;
    locale: string;
    slug: string[];
  }>();
  const category = slug ? slug[1] || IeoIdoCategory.ended : _category;
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  const childrenCallback: IChildrenCallback = {
    onOpen: showModal,
    onClose: handleCancel,
    isOpen,
  };

  const handleGoToLaunchpad = (key: string) => {
    window.open(
      window.location.origin + `/${locale}/ieo-ido/top-ido-launchpads/${key}`
    );
  };

  return (
    <>
      {children(childrenCallback)}
      <Modal
        title={
          <Text weight='bold' size={20} lineHeight={28}>
            Launchpads
          </Text>
        }
        onCancel={handleCancel}
        centered
        open={isOpen}
        footer={null}
        styles={{
          header: {
            paddingTop: 20,
            paddingLeft: 24,
            paddingRight: 24,
            marginBottom: 24,
          },
          content: {
            overflow: 'hidden',
            padding: 0,
            maxHeight: 468,
          },
          body: {
            paddingBottom: 20,
            paddingLeft: 24,
            paddingRight: 20,
            marginRight: 4,
            overflowY: 'auto',
            height: 'auto',
            maxHeight: 392,
          },
        }}
        classNames={{
          content: 'modal-scroll',
        }}
      >
        <Flex vertical gap={16}>
          {data.map((item: any) => (
            <Flex align='center' gap={12} key={item.name}>
              <Avatar src={changeImageUrl(item.image)} alt='avatar' size={32} />
              <Text
                onClick={() => handleGoToLaunchpad(item.key)}
                className={'cursor-pointer'}
              >
                {item.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Modal>
    </>
  );
}
