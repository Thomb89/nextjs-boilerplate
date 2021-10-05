import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export type MenuItemLinkProps = {} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const MenuItemLink: React.FC<MenuItemLinkProps> = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};
