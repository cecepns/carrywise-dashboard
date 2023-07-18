import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb, Typography } from '@/components/atoms';

export const DashboardNavbar = () => {
  const { pathname } = useLocation();
  const [layout, page] = pathname.split('/').filter((el) => el);

  return (
    <div className="rounded-xl transition-all px-0 py-1">
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumb className="bg-transparent p-0 transition-all">
            <Link to={`/${layout}`}>
              <Typography
                className="text-gray-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              className="font-normal text-gray-900"
            >
              {page}
            </Typography>
          </Breadcrumb>
          <Typography className="text-gray-900 block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed">
            {page}
          </Typography>
        </div>
      </div>
    </div>
  );
};
