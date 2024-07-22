import IconEarth from '@/assets/icons/IconEarth';
import Text from '@/components/Text';
import { Flex, SelectProps } from 'antd';
import { FC, useMemo } from 'react';

type TLabel = {
  icon: string;
  title: string;
};
const Label: FC<TLabel> = ({ title, icon }) => {
  const Icon = useMemo(() => {
    if (icon) {
      const src = `/Flag/Country=${icon}, Style=Flag, Radius=Off.svg`;
      return <img src={src} width={21} height={15} />;
    }
    return <IconEarth />;
  }, [icon]);

  return (
    <Flex align='center' gap={12}>
      {Icon}
      <Text className={'!font-medium'}>{title}</Text>
    </Flex>
  );
};

export const CountryOptions: SelectProps['options'] = [
  {
    label: <Label icon='' title='All' />,
    value: '',
  },
  {
    label: <Label icon='Afghanistan' title='Afghanistan' />,
    value: 'afghanistan',
  },
  {
    label: <Label icon='Albania' title='Albania' />,
    value: 'albania',
  },
  {
    label: <Label icon='Algeria' title='Algeria' />,
    value: 'algeria',
  },
  {
    label: <Label icon='Andorra' title='Andorra' />,
    value: 'andorra',
  },
  {
    label: <Label icon='Angola' title='Angola' />,
    value: 'angola',
  },
  {
    label: <Label icon='Antigua and Barbuda' title='Antigua and Barbuda' />,
    value: 'antigua-and-barbuda',
  },
  {
    label: <Label icon='Argentina' title='Argentina' />,
    value: 'argentina',
  },
  {
    label: <Label icon='Armenia' title='Armenia' />,
    value: 'armenia',
  },
  {
    label: <Label icon='Australia' title='Australia' />,
    value: 'australia',
  },
  {
    label: <Label icon='Austria' title='Austria' />,
    value: 'austria',
  },
  {
    label: <Label icon='Azerbaijan' title='Azerbaijan' />,
    value: 'azerbaijan',
  },
  {
    label: <Label icon='Bahamas' title='Bahamas' />,
    value: 'bahamas',
  },
  {
    label: <Label icon='Bahrain' title='Bahrain' />,
    value: 'bahrain',
  },
  {
    label: <Label icon='Bangladesh' title='Bangladesh' />,
    value: 'bangladesh',
  },
  {
    label: <Label icon='Barbados' title='Barbados' />,
    value: 'barbados',
  },
  {
    label: <Label icon='Belarus' title='Belarus' />,
    value: 'belarus',
  },
  {
    label: <Label icon='Belgium' title='Belgium' />,
    value: 'belgium',
  },
  {
    label: <Label icon='Belize' title='Belize' />,
    value: 'belize',
  },
  {
    label: <Label icon='Benin' title='Benin' />,
    value: 'benin',
  },
  {
    label: <Label icon='Bhutan' title='Bhutan' />,
    value: 'bhutan',
  },
  {
    label: <Label icon='Bolivia' title='Bolivia' />,
    value: 'bolivia',
  },
  {
    label: (
      <Label icon='Bosnia and Herzegovina' title='Bosnia and Herzegovina' />
    ),
    value: 'bosnia-and-herzegovina',
  },
  {
    label: <Label icon='Botswana' title='Botswana' />,
    value: 'botswana',
  },
  {
    label: <Label icon='Brazil' title='Brazil' />,
    value: 'brazil',
  },
  {
    label: <Label icon='Brunei Darussalam' title='Brunei Darussalam' />,
    value: 'brunei',
  },
  {
    label: <Label icon='Bulgaria' title='Bulgaria' />,
    value: 'bulgaria',
  },
  {
    label: <Label icon='Burkina Faso' title='Burkina Faso' />,
    value: 'burkina-faso',
  },
  {
    label: <Label icon='Burundi' title='Burundi' />,
    value: 'burundi',
  },
  {
    label: <Label icon='Cape Verde' title='Cape Verde' />,
    value: 'cape-verde',
  },
  {
    label: <Label icon='Cambodia' title='Cambodia' />,
    value: 'cambodia',
  },
  {
    label: <Label icon='Cameroon' title='Cameroon' />,
    value: 'cameroon',
  },
  {
    label: <Label icon='Canada' title='Canada' />,
    value: 'canada',
  },
  {
    label: (
      <Label icon='Central African Republic' title='Central African Republic' />
    ),
    value: 'central-african-republic',
  },
  {
    label: <Label icon='Chad' title='Chad' />,
    value: 'chad',
  },
  {
    label: <Label icon='Chile' title='Chile' />,
    value: 'chile',
  },
  {
    label: <Label icon='China' title='China' />,
    value: 'china',
  },
  {
    label: <Label icon='Colombia' title='Colombia' />,
    value: 'colombia',
  },
  {
    label: <Label icon='Comoros' title='Comoros' />,
    value: 'comoros',
  },
  {
    label: <Label icon='Congo' title='Congo' />,
    value: 'congo',
  },
  {
    label: <Label icon='Costa Rica' title='Costa Rica' />,
    value: 'costa-rica',
  },
  {
    label: <Label icon='Croatia' title='Croatia' />,
    value: 'croatia',
  },
  {
    label: <Label icon='Cuba' title='Cuba' />,
    value: 'cuba',
  },
  {
    label: <Label icon='Cyprus' title='Cyprus' />,
    value: 'cyprus',
  },
  {
    label: <Label icon='Czech Republic' title='Czech Republic' />,
    value: 'czech-republic',
  },
  {
    label: <Label icon='Denmark' title='Denmark' />,
    value: 'denmark',
  },
  {
    label: <Label icon='Djibouti' title='Djibouti' />,
    value: 'djibouti',
  },
  {
    label: <Label icon='Dominica' title='Dominica' />,
    value: 'dominica',
  },
  {
    label: <Label icon='Dominican Republic' title='Dominican Republic' />,
    value: 'dominican-republic',
  },
  {
    label: <Label icon='Ecuador' title='Ecuador' />,
    value: 'ecuador',
  },
  {
    label: <Label icon='Egypt' title='Egypt' />,
    value: 'egypt',
  },
  {
    label: <Label icon='El Salvador' title='El Salvador' />,
    value: 'el-salvador',
  },
  {
    label: <Label icon='Equatorial Guinea' title='Equatorial Guinea' />,
    value: 'equatorial-guinea',
  },
  {
    label: <Label icon='Eritrea' title='Eritrea' />,
    value: 'eritrea',
  },
  {
    label: <Label icon='Estonia' title='Estonia' />,
    value: 'estonia',
  },
  {
    label: <Label icon='Eswatini' title='Eswatini' />,
    value: 'eswatini',
  },
  {
    label: <Label icon='Ethiopia' title='Ethiopia' />,
    value: 'ethiopia',
  },
  {
    label: <Label icon='Fiji' title='Fiji' />,
    value: 'fiji',
  },
  {
    label: <Label icon='Finland' title='Finland' />,
    value: 'finland',
  },
  {
    label: <Label icon='France' title='France' />,
    value: 'france',
  },
  {
    label: <Label icon='Gabon' title='Gabon' />,
    value: 'gabon',
  },
  {
    label: <Label icon='Gambia' title='Gambia' />,
    value: 'gambia',
  },
  {
    label: <Label icon='Georgia' title='Georgia' />,
    value: 'georgia',
  },
  {
    label: <Label icon='Germany' title='Germany' />,
    value: 'germany',
  },
  {
    label: <Label icon='Ghana' title='Ghana' />,
    value: 'ghana',
  },
  {
    label: <Label icon='Greece' title='Greece' />,
    value: 'greece',
  },
  {
    label: <Label icon='Grenada' title='Grenada' />,
    value: 'grenada',
  },
  {
    label: <Label icon='Guatemala' title='Guatemala' />,
    value: 'guatemala',
  },
  {
    label: <Label icon='Guinea' title='Guinea' />,
    value: 'guinea',
  },
  {
    label: <Label icon='Guinea-Bissau' title='Guinea-Bissau' />,
    value: 'guinea-bissau',
  },
  {
    label: <Label icon='Guyana' title='Guyana' />,
    value: 'guyana',
  },
  {
    label: <Label icon='Haiti' title='Haiti' />,
    value: 'haiti',
  },
  {
    label: <Label icon='Holy See' title='Holy See' />,
    value: 'holy-see',
  },
  {
    label: <Label icon='Honduras' title='Honduras' />,
    value: 'honduras',
  },
  {
    label: <Label icon='Hungary' title='Hungary' />,
    value: 'hungary',
  },
  {
    label: <Label icon='Iceland' title='Iceland' />,
    value: 'iceland',
  },
  {
    label: <Label icon='India' title='India' />,
    value: 'india',
  },
  {
    label: <Label icon='Indonesia' title='Indonesia' />,
    value: 'indonesia',
  },
  {
    label: <Label icon='Iran' title='Iran' />,
    value: 'iran',
  },
  {
    label: <Label icon='Iraq' title='Iraq' />,
    value: 'iraq',
  },
  {
    label: <Label icon='Ireland' title='Ireland' />,
    value: 'ireland',
  },
  {
    label: <Label icon='Israel' title='Israel' />,
    value: 'israel',
  },
  {
    label: <Label icon='Italy' title='Italy' />,
    value: 'italy',
  },
  {
    label: <Label icon='Jamaica' title='Jamaica' />,
    value: 'jamaica',
  },
  {
    label: <Label icon='Japan' title='Japan' />,
    value: 'japan',
  },
  {
    label: <Label icon='Jordan' title='Jordan' />,
    value: 'jordan',
  },
  {
    label: <Label icon='Kazakhstan' title='Kazakhstan' />,
    value: 'kazakhstan',
  },
  {
    label: <Label icon='Kenya' title='Kenya' />,
    value: 'kenya',
  },
  {
    label: <Label icon='Kiribati' title='Kiribati' />,
    value: 'kiribati',
  },
  {
    label: <Label icon='Kuwait' title='Kuwait' />,
    value: 'kuwait',
  },
  {
    label: <Label icon='Kyrgyzstan' title='Kyrgyzstan' />,
    value: 'kyrgyzstan',
  },
  {
    label: <Label icon='Laos' title='Laos' />,
    value: 'laos',
  },
  {
    label: <Label icon='Latvia' title='Latvia' />,
    value: 'latvia',
  },
  {
    label: <Label icon='Lebanon' title='Lebanon' />,
    value: 'lebanon',
  },
  {
    label: <Label icon='Lesotho' title='Lesotho' />,
    value: 'lesotho',
  },
  {
    label: <Label icon='Liberia' title='Liberia' />,
    value: 'liberia',
  },
  {
    label: <Label icon='Libya' title='Libya' />,
    value: 'libya',
  },
  {
    label: <Label icon='Liechtenstein' title='Liechtenstein' />,
    value: 'liechtenstein',
  },
  {
    label: <Label icon='Lithuania' title='Lithuania' />,
    value: 'lithuania',
  },
  {
    label: <Label icon='Luxembourg' title='Luxembourg' />,
    value: 'luxembourg',
  },
  {
    label: <Label icon='Madagascar' title='Madagascar' />,
    value: 'madagascar',
  },
  {
    label: <Label icon='Malawi' title='Malawi' />,
    value: 'malawi',
  },
  {
    label: <Label icon='Malaysia' title='Malaysia' />,
    value: 'malaysia',
  },
  {
    label: <Label icon='Maldives' title='Maldives' />,
    value: 'maldives',
  },
  {
    label: <Label icon='Mali' title='Mali' />,
    value: 'mali',
  },
  {
    label: <Label icon='Malta' title='Malta' />,
    value: 'malta',
  },
  {
    label: <Label icon='Marshall Islands' title='Marshall Islands' />,
    value: 'marshall-islands',
  },
  {
    label: <Label icon='Mauritania' title='Mauritania' />,
    value: 'mauritania',
  },
  {
    label: <Label icon='Mauritius' title='Mauritius' />,
    value: 'mauritius',
  },
  {
    label: <Label icon='Mexico' title='Mexico' />,
    value: 'mexico',
  },
  {
    label: <Label icon='Micronesia' title='Micronesia' />,
    value: 'micronesia',
  },
  {
    label: <Label icon='Moldova' title='Moldova' />,
    value: 'moldova',
  },
  {
    label: <Label icon='Monaco' title='Monaco' />,
    value: 'monaco',
  },
  {
    label: <Label icon='Mongolia' title='Mongolia' />,
    value: 'mongolia',
  },
  {
    label: <Label icon='Montenegro' title='Montenegro' />,
    value: 'montenegro',
  },
  {
    label: <Label icon='Morocco' title='Morocco' />,
    value: 'morocco',
  },
  {
    label: <Label icon='Mozambique' title='Mozambique' />,
    value: 'mozambique',
  },
  {
    label: <Label icon='Myanmar' title='Myanmar' />,
    value: 'myanmar',
  },
  {
    label: <Label icon='Namibia' title='Namibia' />,
    value: 'namibia',
  },
  {
    label: <Label icon='Nauru' title='Nauru' />,
    value: 'nauru',
  },
  {
    label: <Label icon='Nepal' title='Nepal' />,
    value: 'nepal',
  },
  {
    label: <Label icon='Netherlands' title='Netherlands' />,
    value: 'netherlands',
  },
  {
    label: <Label icon='New Zealand' title='New Zealand' />,
    value: 'new-zealand',
  },
  {
    label: <Label icon='Nicaragua' title='Nicaragua' />,
    value: 'nicaragua',
  },
  {
    label: <Label icon='Niger' title='Niger' />,
    value: 'niger',
  },
  {
    label: <Label icon='Nigeria' title='Nigeria' />,
    value: 'nigeria',
  },
  {
    label: <Label icon='North Korea' title='North Korea' />,
    value: 'north-korea',
  },
  {
    label: <Label icon='North Macedonia' title='North Macedonia' />,
    value: 'north-macedonia',
  },
  {
    label: <Label icon='Norway' title='Norway' />,
    value: 'norway',
  },
  {
    label: <Label icon='Oman' title='Oman' />,
    value: 'oman',
  },
  {
    label: <Label icon='Pakistan' title='Pakistan' />,
    value: 'pakistan',
  },
  {
    label: <Label icon='Palau' title='Palau' />,
    value: 'palau',
  },
  {
    label: <Label icon='Palestine' title='Palestine' />,
    value: 'palestine',
  },
  {
    label: <Label icon='Panama' title='Panama' />,
    value: 'panama',
  },
  {
    label: <Label icon='Papua New Guinea' title='Papua New Guinea' />,
    value: 'papua-new-guinea',
  },
  {
    label: <Label icon='Paraguay' title='Paraguay' />,
    value: 'paraguay',
  },
  {
    label: <Label icon='Peru' title='Peru' />,
    value: 'peru',
  },
  {
    label: <Label icon='Philippines' title='Philippines' />,
    value: 'philippines',
  },
  {
    label: <Label icon='Poland' title='Poland' />,
    value: 'poland',
  },
  {
    label: <Label icon='Portugal' title='Portugal' />,
    value: 'portugal',
  },
  {
    label: <Label icon='Qatar' title='Qatar' />,
    value: 'qatar',
  },
  {
    label: <Label icon='Romania' title='Romania' />,
    value: 'romania',
  },
  {
    label: <Label icon='Russian Federation' title='Russian Federation' />,
    value: 'russia',
  },
  {
    label: <Label icon='Rwanda' title='Rwanda' />,
    value: 'rwanda',
  },
  {
    label: <Label icon='Saint Lucia' title='Saint Lucia' />,
    value: 'saint-lucia',
  },
  {
    label: (
      <Label
        icon='Saint Vincent and the Grenadines'
        title='Saint Vincent and the Grenadines'
      />
    ),
    value: 'saint-vincent-and-the-grenadines',
  },
  {
    label: <Label icon='Samoa' title='Samoa' />,
    value: 'samoa',
  },
  {
    label: <Label icon='San Marino' title='San Marino' />,
    value: 'san-marino',
  },
  {
    label: <Label icon='Sao Tome and Principe' title='Sao Tome and Principe' />,
    value: 'sao-tome-and-principe',
  },
  {
    label: <Label icon='Saudi Arabia' title='Saudi Arabia' />,
    value: 'saudi-arabia',
  },
  {
    label: <Label icon='Senegal' title='Senegal' />,
    value: 'senegal',
  },
  {
    label: <Label icon='Serbia' title='Serbia' />,
    value: 'serbia',
  },
  {
    label: <Label icon='Seychelles' title='Seychelles' />,
    value: 'seychelles',
  },
  {
    label: <Label icon='Sierra Leone' title='Sierra Leone' />,
    value: 'sierra-leone',
  },
  {
    label: <Label icon='Singapore' title='Singapore' />,
    value: 'singapore',
  },
  {
    label: <Label icon='Slovakia' title='Slovakia' />,
    value: 'slovakia',
  },
  {
    label: <Label icon='Slovenia' title='Slovenia' />,
    value: 'slovenia',
  },
  {
    label: <Label icon='Solomon Islands' title='Solomon Islands' />,
    value: 'solomon-islands',
  },
  {
    label: <Label icon='Somalia' title='Somalia' />,
    value: 'somalia',
  },
  {
    label: <Label icon='South Africa' title='South Africa' />,
    value: 'south-africa',
  },
  {
    label: <Label icon='South Korea' title='South Korea' />,
    value: 'south-korea',
  },
  {
    label: <Label icon='South Sudan' title='South Sudan' />,
    value: 'south-sudan',
  },
  {
    label: <Label icon='Spain' title='Spain' />,
    value: 'spain',
  },
  {
    label: <Label icon='Sri Lanka' title='Sri Lanka' />,
    value: 'sri-lanka',
  },
  {
    label: <Label icon='Sudan' title='Sudan' />,
    value: 'sudan',
  },
  {
    label: <Label icon='Suriname' title='Suriname' />,
    value: 'suriname',
  },
  {
    label: <Label icon='Sweden' title='Sweden' />,
    value: 'sweden',
  },
  {
    label: <Label icon='Switzerland' title='Switzerland' />,
    value: 'switzerland',
  },
  {
    label: <Label icon='Syrian Arab Republic' title='Syrian Arab Republic' />,
    value: 'syria',
  },
  {
    label: <Label icon='Tajikistan' title='Tajikistan' />,
    value: 'tajikistan',
  },
  {
    label: <Label icon='Tanzania' title='Tanzania' />,
    value: 'tanzania',
  },
  {
    label: <Label icon='Thailand' title='Thailand' />,
    value: 'thailand',
  },
  {
    label: <Label icon='Timor-Leste' title='Timor-Leste' />,
    value: 'timor-leste',
  },
  {
    label: <Label icon='Togo' title='Togo' />,
    value: 'togo',
  },
  {
    label: <Label icon='Tonga' title='Tonga' />,
    value: 'tonga',
  },
  {
    label: <Label icon='Trinidad and Tobago' title='Trinidad and Tobago' />,
    value: 'trinidad-and-tobago',
  },
  {
    label: <Label icon='Tunisia' title='Tunisia' />,
    value: 'tunisia',
  },
  {
    label: <Label icon='Turkey' title='Turkey' />,
    value: 'turkey',
  },
  {
    label: <Label icon='Turkmenistan' title='Turkmenistan' />,
    value: 'turkmenistan',
  },
  {
    label: <Label icon='Tuvalu' title='Tuvalu' />,
    value: 'tuvalu',
  },
  {
    label: <Label icon='Uganda' title='Uganda' />,
    value: 'uganda',
  },
  {
    label: <Label icon='Ukraine' title='Ukraine' />,
    value: 'ukraine',
  },
  {
    label: <Label icon='UAE' title='UAE' />,
    value: 'uae',
  },
  {
    label: <Label icon='United Kingdom' title='United Kingdom' />,
    value: 'united-kingdom',
  },
  {
    label: <Label icon='United States' title='United States' />,
    value: 'united-states',
  },
  {
    label: <Label icon='Uruguay' title='Uruguay' />,
    value: 'uruguay',
  },
  {
    label: <Label icon='Uzbekistan' title='Uzbekistan' />,
    value: 'uzbekistan',
  },
  {
    label: <Label icon='Vanuatu' title='Vanuatu' />,
    value: 'vanuatu',
  },
  {
    label: <Label icon='Venezuela' title='Venezuela' />,
    value: 'venezuela',
  },
  {
    label: <Label icon='Viet Nam' title='Viet Nam' />,
    value: 'viet-nam',
  },
  {
    label: <Label icon='Virgin Islands' title='Virgin Islands' />,
    value: 'virgin-islands',
  },
  {
    label: <Label icon='Yemen' title='Yemen' />,
    value: 'yemen',
  },
  {
    label: <Label icon='Zambia' title='Zambia' />,
    value: 'zambia',
  },
  {
    label: <Label icon='Zimbabwe' title='Zimbabwe' />,
    value: 'zimbabwe',
  },
];
