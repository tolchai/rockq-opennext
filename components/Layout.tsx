import cn from 'classnames';

// import gsap from "gsap";
// import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
// gsap.registerPlugin(ScrollToPlugin);

import {
  Fund,
  GlobalSettings,
  Initiative,
  Service,
  Solution,
  Solution,
} from '@/graphql/generated';
import Header from './Header';
import Footer from './Footer';
import { PostTypes } from '@/lib/types';

interface LayoutProps extends PostTypes {
  // shared: SharedRecord;
  // products: ProductRecord[];
  modules: any[]; // This should be typed more specifically based on your module structure
  options: GlobalSettings;
  headerMenu?: any[];
  footerMenu?: any[];
  services?: Service[];
  solutions?: Solution[];
  className?: string;
  children: React.ReactNode;
  slug?: string;
}

const Layout: React.FC<LayoutProps> = ({
  modules,
  headerMenu,
  footerMenu,
  options,
  postType = 'page',
  // showFooter = true,
  services,
  solutions,
  className,
  slug,
  children,
}) => {
  return (
    <div className={cn('', className)}>
      <Header
        modules={modules}
        options={options}
        headerMenu={headerMenu}
        services={services}
        solutions={solutions}
        postType={postType}
        slug={slug}
      />
      <main>{children}</main>
      <Footer
        options={options}
        headerMenu={headerMenu}
        footerMenu={footerMenu}
        services={services}
        solutions={solutions}
      />
    </div>
  );
};

export default Layout;
