import { locales } from '@/config';
import { notFound } from 'next/navigation';

type Props = {
  params: { locale: string };
};

export const validateLocale = (props: Props) => {
  const { locale } = props.params;
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
};
