'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

import cn from 'classnames';

import React from 'react';
import { slugify } from '@/utils/utils';

interface LocalNavProps {
  modules: Array<any>;
}

const LocalNav: React.FC<LocalNavProps> = ({ modules }) => {
  return (
    <ul className='flex gap-2 p-2 bg-neutral-50/70 rounded-xl'>
      {modules?.map((module, i) => {
        // const {
        //   moduleSettings: { active, menuTitle, showInMenu },
        // } = module;

        const active = module.moduleSettings?.active;
        const showInMenu = module.moduleSettings?.showInMenu;
        const menuTitle = module.moduleSettings?.menuTitle;

        if (!active || !showInMenu) return null;

        const slug = menuTitle ? `#${slugify(menuTitle)}` : '';

        return (
          <li key={i} className='font-medium text-14'>
            <a
              href={slug}
              className={cn(
                'hover:bg-white transition-colors block rounded-xl px-2 py-3'
              )}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(slug);
                if (target) {
                  gsap.to(window, {
                    duration: 0.5,
                    scrollTo: {
                      y: target.getBoundingClientRect().top + window.scrollY,
                      offsetY: 40,
                      autoKill: false,
                    },
                  });
                }
              }}
            >
              {menuTitle}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default LocalNav;
