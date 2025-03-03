import { useAppSelector } from '@redux/hooks';
import { CiCreditCard1, CiSettings } from 'react-icons/ci';
import { FaCreditCard, FaWpforms } from 'react-icons/fa6';
import { GiHairStrands } from 'react-icons/gi';
import {
  MdAddCard,
  MdDashboard,
  MdOndemandVideo,
  MdOutlineProductionQuantityLimits,
  MdPeople,
  MdTipsAndUpdates,
} from 'react-icons/md';
import { RiFlowerFill } from 'react-icons/ri';
import { TbCategoryPlus, TbPointFilled } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { TSidebarItem, TUserPath } from '../types';
const icon = [
  {
    name: 'FaWpforms',
    icon: <FaWpforms style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'RiFlowerFill',
    icon: <RiFlowerFill style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'MdOndemandVideo',
    icon: <MdOndemandVideo style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'MdDashboard',
    icon: <MdDashboard style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'MdPeople',
    icon: <MdPeople style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'CiSettings',
    icon: <CiSettings style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'TbCategoryPlus',
    icon: <TbCategoryPlus style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'MdOutlineProductionQuantityLimits',
    icon: <MdOutlineProductionQuantityLimits style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'MdTipsAndUpdates',
    icon: <MdTipsAndUpdates style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'GiHairStrands',
    icon: <GiHairStrands style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'CiCreditCard1',
    icon: <CiCreditCard1 style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'FaCreditCard',
    icon: <FaCreditCard style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'TbPointFilled',
    icon: <TbPointFilled style={{ fontSize: '1.5rem' }} />,
  },
  {
    name: 'MdAddCard',
    icon: <MdAddCard style={{ fontSize: '1.5rem' }} />,
  },
];

const findIcon = (name?: string) => {
  const res = icon.find((i) => i.name === name)?.icon;
  return res || null;
};

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const togoSidebar = useAppSelector((state) => state.global.collapse);

  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink
            className="flex cursor-pointer items-center justify-start gap-1 whitespace-normal text-lg font-semibold leading-5"
            to={`/${role}/${item.path}`}
          >
            {
              <span className={togoSidebar ? '-ml-1 mt-1.5' : ''}>
                {findIcon(item?.iconName)}
              </span>
            }{' '}
            {item.name}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name!,
        label: (
          <div className="flex items-center justify-start gap-1 text-lg font-semibold">
            {
              <span className={togoSidebar ? '-ml-1 mt-1.5' : ''}>
                {findIcon(item?.iconName)}
              </span>
            }{' '}
            {item.name}
          </div>
        ),
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name + child.path,
              label: (
                <NavLink
                  className="flex cursor-pointer items-center justify-start gap-1 !text-lg font-semibold"
                  to={`/${role}/${child.path}`}
                >
                  {<span className="">{findIcon(child?.iconName)}</span>}{' '}
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
