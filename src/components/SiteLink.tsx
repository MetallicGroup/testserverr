import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteNavigate } from "@/hooks/useSiteNavigate";
import { scrollToPageTop, type HomeSectionId } from "@/lib/homeNavigation";
import { cn } from "@/lib/utils";

type SiteLinkBaseProps = {
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type SiteRouteLinkProps = SiteLinkBaseProps & {
  to: string;
  section?: never;
  external?: false;
};

type SiteSectionLinkProps = SiteLinkBaseProps & {
  section: HomeSectionId;
  to?: never;
  external?: false;
};

type SiteExternalLinkProps = SiteLinkBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external: true;
    to?: never;
    section?: never;
  };

export type SiteLinkProps = SiteRouteLinkProps | SiteSectionLinkProps | SiteExternalLinkProps;

const SiteLink = forwardRef<HTMLAnchorElement, SiteLinkProps>(function SiteLink(props, ref) {
  const { goToSection } = useSiteNavigate();
  const location = useLocation();
  const { className, onClick, children, ...rest } = props;

  if ("external" in props && props.external) {
    const { href, external: _external, ...anchorProps } = rest as Omit<SiteExternalLinkProps, keyof SiteLinkBaseProps>;
    return (
      <a
        ref={ref}
        href={href}
        className={cn(className)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  if ("section" in props && props.section) {
    const { section } = props as SiteSectionLinkProps;
    return (
      <a
        ref={ref}
        href={`/#${section}`}
        className={cn(className)}
        onClick={(event) => {
          event.preventDefault();
          onClick?.(event);
          goToSection(section);
        }}
      >
        {children}
      </a>
    );
  }

  const { to } = props as SiteRouteLinkProps;
  return (
    <Link
      ref={ref}
      to={to}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        if (location.pathname === to) {
          scrollToPageTop();
        }
      }}
    >
      {children}
    </Link>
  );
});

SiteLink.displayName = "SiteLink";

export default SiteLink;
