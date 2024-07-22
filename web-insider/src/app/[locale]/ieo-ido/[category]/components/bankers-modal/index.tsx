import Text from '@/components/Text';
import { changeImageUrl } from '@/helpers/functions';
import { Avatar, Flex, Modal } from 'antd';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { IeoIdoCategory } from '../../config';
import { IIeoIdoData } from '../../types';

type IChildrenCallback = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

type BankersModalProps = {
  children: (props: IChildrenCallback) => React.ReactNode;
  platformId: string;
  data: IIeoIdoData['backers'];
};

export default function BankersModal(props: BankersModalProps) {
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

  const Leads = useMemo(
    () =>
      data.filter(
        (item: any) =>
          (item.lead !== undefined && item.lead) ||
          (item.is_lead !== undefined && item.is_lead)
      ),
    [data]
  );

  const Others = useMemo(
    () =>
      data.filter(
        (item: any) =>
          (item.lead !== undefined && !item.lead) ||
          (item.is_lead !== undefined && !item.is_lead)
      ),
    [data]
  );

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

  const handleGoToBacker = (id: number, name: string) => {
    window.open(
      window.location.origin + `/${locale}/fundraising/top-backers/detail/${id}`
    );
  };

  return (
    <>
      {children(childrenCallback)}
      <Modal
        title={
          <Text weight='bold' size={20} lineHeight={28}>
            Backers
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
            maxHeight: 648,
          },
          body: {
            paddingBottom: 20,
            paddingLeft: 24,
            paddingRight: 20,
            marginRight: 4,
            overflowY: 'auto',
            height: 'auto',
            maxHeight: 572,
          },
        }}
        classNames={{
          content: 'modal-scroll',
        }}
      >
        <Flex vertical gap={24}>
          {Leads.length > 0 && (
            <Flex vertical gap={16}>
              <Text weight='bold'>Lead</Text>
              {Leads.map((item: any) => {
                return (
                  <Flex align='center' gap={8} key={item.name}>
                    <Avatar
                      src={changeImageUrl(item.image)}
                      alt='avatar'
                      size={34}
                      className='!flex items-center justify-center'
                    />
                    <Text
                      className={'cursor-pointer'}
                      onClick={() =>
                        handleGoToBacker(item.id || item.key, item.name)
                      }
                    >
                      {item?.name || ''}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          )}
          {Others.length > 0 && (
            <Flex vertical gap={16}>
              {Leads.length > 0 && <Text weight='bold'>Other</Text>}
              {Others.map((item: any) => {
                return (
                  <Flex align='center' gap={8} key={item.name}>
                    <Avatar
                      src={changeImageUrl(item.image)}
                      alt='avatar'
                      size={34}
                      className='!flex items-center justify-center'
                    />
                    <Text
                      className={'cursor-pointer'}
                      onClick={() =>
                        handleGoToBacker(item.id || item.key, item.name)
                      }
                    >
                      {item?.name || ''}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          )}
        </Flex>
      </Modal>
    </>
  );
}
