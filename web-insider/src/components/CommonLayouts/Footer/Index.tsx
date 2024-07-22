import { IconDiscord } from '@/assets/icons/IconDiscord';
import { IconFacebook } from '@/assets/icons/IconFacebook';
import { cn } from '@/helpers/functions';
import { Flex } from 'antd';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import './index.scss';

const Footer = () => {
  const locale = useLocale();

  return (
    <div
      className={cn(
        'footer mx-auto max-w-2xl px-4',
        'border-t border-[#E5E6EB] border-solid'
      )}
    >
      <div
        className={cn(
          'footer__wrapper lg:flex justify-between gap-8 lg:gap-auto py-6'
        )}
      >
        <Flex
          vertical
          justify='space-between'
          className='introduce mb-10 lg:mb-0'
        >
          <div className='introduce__image mb-4'>
            <Image src='/logoBU.svg' alt='logo' width={131} height={131} />
          </div>
          <div className='flex social pt-3 gap-3'>
            <a href='#' className='block p-2'>
              <IconFacebook />
            </a>
            {/* <a href='#' className='block p-2'>
              <IconPinterest />
            </a> */}
            <a href='#' className='block p-2'>
              <IconDiscord />
            </a>
            {/* <a href='#' className='block p-2'>
              <IconYoutube />
            </a>
            <a href='#' className='block p-2'>
              <IconTikTok />
            </a> */}
          </div>
        </Flex>
        <div className='footer-list grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-[118px]'>
          <div className='footer-item font-bold text-xl '>
            <h4 className='footer-item__title font-bold font-jeb mb-4 whitespace-nowrap'>
              Blockultra
            </h4>
            <div className='footer-item__content'>
              <Link
                href={`/${locale}/about-us`}
                className='block text-sm font-medium font-jm mb-2'
              >
                About us
              </Link>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Careers
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Disclaimer
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Terms of use
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Privacy Policy
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Community Rules
              </a>
            </div>
          </div>
          <div className='footer-item font-bold text-xl'>
            <h4 className='footer-item__title font-bold font-jeb mb-4'>
              Follow us
            </h4>
            <div className='footer-item__content'>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Twitter
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Telegram Ann
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Telegram Chat
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Medium
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Facebook
              </a>
            </div>
          </div>
          <div className='footer-item font-bold text-xl '>
            <h4 className='footer-item__title font-bold font-jeb mb-4'>
              Contact us
            </h4>
            <div className='footer-item__content'>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Request Form
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Support chat
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                For Partnership
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Feedback
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Privacy Policy
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Community Rules
              </a>
            </div>
          </div>
          <div className='footer-item font-bold text-xl '>
            <h4 className='footer-item__title font-bold font-jeb mb-4'>
              Statistics
            </h4>
            <div className='footer-item__content'>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Top Coins
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Top KOLs
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                IDO / IEOTop{' '}
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                IDO / IEOTop{' '}
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Privacy Policy
              </a>
              <a href='#' className='block text-sm font-medium font-jm mb-2'>
                Funding Rounds
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='copy-right-text p-4 text-center font-jm font-medium text-xs'>
        ©Copyright 2023 All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
