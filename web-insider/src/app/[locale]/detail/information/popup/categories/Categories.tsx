import Link from 'next/link';

const Categories = (props: any) => {
  const data = props.data;
  const subCategories = data.subCategories;
  const category = data.category;
  if (!subCategories) return;
  if (subCategories.length === 0) return;
  return (
    <div className='font-jm font-medium w-full md:max-w-[380px]'>
      <div className='text-base text-grey-700 font-bold font-jm pb-4 mb-4 border-b border-grey-300'>
        {data.name} Categories
      </div>
      {category && (
        <div className='mb-6'>
          <div className='mb-3 text-grey-700 text-sm'>Category</div>
          <div className='flex flex-wrap gap-3'>
            <Link
              href={`/en/categories/${data?.categoryId}?slug=${data?.category_slug}`}
              target='_blank'
              className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'
            >
              {category}
            </Link>
          </div>
        </div>
      )}
      <div>
        <div className='mb-3 text-grey-700 text-sm'>SubCategory</div>
        <div className='flex flex-wrap gap-3'>
          {subCategories.map((item: any) => {
            return (
              <Link
                key={item?.id}
                href={`/en/categories/${item?.id}?slug=${item?.slug}`}
                target='_blank'
                className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
