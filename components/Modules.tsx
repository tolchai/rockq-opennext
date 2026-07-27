// 'use client';

import cn from 'classnames';
import Numbers from './modules/Numbers';
import Quote from './modules/Quote';
import History from './modules/History';
import About from './modules/About';
import Team from './modules/Team';
import Cta from './modules/CTA';
import FAQs from './modules/FAQs';
import { GlobalSettings, Service } from '@/graphql/generated';
import FundPortfolio from './modules/FundPortfolio';
import Form from './modules/Form';
import Header from './modules/Header';
import FullHomepageHeader from './modules/FullHomepageHeader';

import SingleImage from './modules/SingleImage';
import SinglePerson from './modules/SinglePerson';
// import News from './modules/News';
import Links from './modules/Links';
import Opportunities from './modules/Opportunities';
import Media from './modules/Media';
import Contacts from './modules/Contacts';
// import Initiatives from './modules/Initiatives';
import Text from './modules/Text';
import SingleVideo from './modules/SingleVideo';
import TextBlocks from './modules/TextBlocks';
import Gallery from './modules/Gallery';
import Legal from './modules/Legal';
import Steps from './modules/Steps';
import { PostTypes } from '@/lib/types';
import Services from './modules/Services';
import ScrollSections from './modules/ScrollSections';
import Testimonials from './modules/Testimonials';
import Clients from './modules/Clients';
import Cases from './modules/Cases';

interface ModulesProps extends PostTypes {
  modules: any[];
  options?: GlobalSettings;
  services?: Service[];
  zapierHook?: string;
}

interface ModuleProps extends ModulesProps {
  module: any;
  i: number;
}

const Modules: React.FC<ModulesProps> = ({
  modules,
  postType = 'page',
  zapierHook,
  // opportunities,
  // externalLinks,
  services,
  options,
}) => {
  // console.log(modules);

  return (
    <div>
      {modules?.map((module, i) => {
        if (!module.moduleSettings) return null;

        const {
          __typename,
          moduleSettings: { active, menuTitle, moduleId },
        } = module;

        if (!active) return null;

        return (
          <div
            id={moduleId ? moduleId : undefined}
            className={cn(__typename, 'relative', {
              // 'bg-white rounded-2xl: layout === 'boxes',
            })}
            key={module.id ?? i}
          >
            {renderModule({
              module,
              services,
              options,
              postType,
              zapierHook,
              i,
              modules,
            })}
          </div>
        );
      })}
    </div>
  );
};

const renderModule = ({
  module,
  options,
  services,
  postType = 'page',
  zapierHook,
}: ModuleProps) => {
  switch (module.__typename) {
    case 'ModulesModulesFullHomepageHeaderLayout':
      return <FullHomepageHeader module={module} />;
    case 'ModulesModulesHeaderLayout':
      return <Header module={module} />;
    case 'ModulesModulesNumbersLayout':
      return <Numbers module={module} />;
    case 'ModulesModulesQuotesLayout':
      return <Quote module={module} />;
    case 'ModulesModulesHistoryLayout':
      return <History module={module} />;
    case 'ModulesModulesAboutLayout':
      return <About module={module} />;
    case 'ModulesModulesTeamLayout':
      return <Team module={module} />;
    case 'ModulesModulesSinglePersonLayout':
      return <SinglePerson module={module} />;
    case 'ModulesModulesGalleryLayout':
      return <Gallery module={module} />;
    case 'ModulesModulesSingleVideoLayout':
      return <SingleVideo module={module} />;
    case 'ModulesModulesSingleImageLayout':
      return <SingleImage module={module} />;
    case 'ModulesModulesCtaLayout':
      return <Cta module={module} />;
    case 'ModulesModulesFormLayout':
      return options ? (
        <Form module={module} options={options} zapierHook={zapierHook} />
      ) : null;
    case 'ModulesModulesFaqsLayout':
      return <FAQs module={module} />;
    case 'ModulesModulesFundPortfolioLayout':
      return <FundPortfolio module={module} postType={postType} />;
    case 'ModulesModulesMediaLayout':
      return <Media module={module} />;
    case 'ModulesModulesContactsLayout':
      return options ? <Contacts module={module} options={options} /> : null;
    case 'ModulesModulesOpportunitiesLayout':
      return (
        <Opportunities
          module={module}
          // opportunities={opportunities}
        />
      );
    case 'ModulesModulesLinksLayout':
      return <Links module={module} />;
    case 'ModulesModulesLegalLayout':
      return <Legal module={module} />;
    case 'ModulesModulesTextLayout':
      return <Text module={module} postType={postType} />;
    case 'ModulesModulesTextBlocksLayout':
      return <TextBlocks module={module} />;
    case 'ModulesModulesServicesLayout':
      return <Services module={module} services={services ?? []} />;
    case 'ModulesModulesStepsLayout':
      return <Steps module={module} postType={postType} />;
    case 'ModulesModulesScrollSectionsLayout':
      return <ScrollSections module={module} />;
    case 'ModulesModulesTestimonialsLayout':
      return <Testimonials module={module} />;
    case 'ModulesModulesClientsLayout':
      return <Clients module={module} />;
    case 'ModulesModulesCaseStudiesLayout':
      return <Cases module={module} />;
      return null;
    default:
      return null;
  }
};

export default Modules;
