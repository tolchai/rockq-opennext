import cn from 'classnames';

// SOCIAL

import Badge from '@/public/images/ui/icons/badge.svg';
import Bulb from '@/public/images/ui/icons/bulb.svg';
import Chart from '@/public/images/ui/icons/chart.svg';
import Checklist from '@/public/images/ui/icons/checklist.svg';
import Chip from '@/public/images/ui/icons/chip.svg';
import Coalition from '@/public/images/ui/icons/coalition.svg';
import Crypto from '@/public/images/ui/icons/crypto.svg';
import Dchevron from '@/public/images/ui/icons/dchevron.svg';
import Diamond from '@/public/images/ui/icons/diamond.svg';
import Diversity from '@/public/images/ui/icons/diversity.svg';
import Dna from '@/public/images/ui/icons/dna.svg';
import Dollar from '@/public/images/ui/icons/dollar.svg';
import Eye from '@/public/images/ui/icons/eye.svg';
import Liquidity from '@/public/images/ui/icons/liquidity.svg';
import People from '@/public/images/ui/icons/people.svg';
import Shield from '@/public/images/ui/icons/shield.svg';
import Stack from '@/public/images/ui/icons/stack.svg';
import Target from '@/public/images/ui/icons/target.svg';

interface IconProps {
  icon: string;
  // size?: 'sm' | 'md';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return (
    <span
      className={cn(className, 'w-8 h-8 block', {
        // "h-3 w-3": size === "sm",
        // "h-4 w-4": size === "md",
      })}
    >
      {icon === 'badge' && <Badge />}
      {icon === 'bulb' && <Bulb />}
      {icon === 'chart' && <Chart />}
      {icon === 'checklist' && <Checklist />}
      {icon === 'chip' && <Chip />}
      {icon === 'coalition' && <Coalition />}
      {icon === 'crypto' && <Crypto />}
      {icon === 'dchevron' && <Dchevron />}
      {icon === 'diamond' && <Diamond />}
      {icon === 'diversity' && <Diversity />}
      {icon === 'dna' && <Dna />}
      {icon === 'dollar' && <Dollar />}
      {icon === 'eye' && <Eye />}
      {icon === 'liquidity' && <Liquidity />}
      {icon === 'people' && <People />}
      {icon === 'shield' && <Shield />}
      {(icon === 'stack' || icon === 'server') && <Stack />}
      {icon === 'target' && <Target />}
    </span>
  );
};

export default Icon;
