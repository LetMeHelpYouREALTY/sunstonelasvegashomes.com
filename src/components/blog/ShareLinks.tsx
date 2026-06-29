"use client";

import LinkButton from "@/components/LinkButton";
import { SITE } from "@/config";

type ShareLink = {
  name: string;
  href: string;
  linkTitle: string;
  Icon: ({ className }: { className?: string }) => React.JSX.Element;
};

const SHARE_LINKS: ShareLink[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: "Share this post via WhatsApp",
    Icon: WhatsAppIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: "Share this post on Facebook",
    Icon: FacebookIcon,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: "Share this post on X",
    Icon: XIcon,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: "Share this post via Telegram",
    Icon: TelegramIcon,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: "Share this post on Pinterest",
    Icon: PinterestIcon,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: "Share this post via email",
    Icon: MailIcon,
  },
];

type ShareLinksProps = {
  path: string;
};

export default function ShareLinks({ path }: ShareLinksProps) {
  const shareUrl = `${SITE.website.replace(/\/$/, "")}${path}`;

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-1 sm:items-start">
      <span className="italic">Share this post on:</span>
      <div className="text-center">
        {SHARE_LINKS.map(({ href, linkTitle, Icon }) => (
          <LinkButton
            key={linkTitle}
            href={`${href}${encodeURIComponent(shareUrl)}`}
            className="scale-90 p-2 hover:rotate-6 sm:p-1"
            title={linkTitle}
          >
            <Icon className="inline-block size-6 scale-125 fill-transparent stroke-current stroke-2 opacity-90 group-hover:fill-transparent sm:scale-110" />
            <span className="sr-only">{linkTitle}</span>
          </LinkButton>
        ))}
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.5-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.3.1-.4l.3-.3.2-.3c.1-.1 0-.2 0-.3s-.5-1.2-.7-1.7-.4-.5-.5-.5h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.8 1.9 4.2 4.2 0 0 0 .9 2.2 9.6 9.6 0 0 0 3.7 3.2c.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M13.5 22v-8.1h2.7l.4-3.1h-3.1V8.8c0-.9.3-1.6 1.7-1.6H16.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.2v3.1H10V22h3.5Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.8L5.5 22H2.4l7.3-8.4L1 2h6.9l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.1 3.9H5.2L17.7 20Z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="m9.9 15.5 -.3 4.2c.4 0 .6-.2.8-.4l2-1.9 4.1 3c.8.4 1.3.2 1.5-.7l2.7-12.7c.3-1.2-.4-1.7-1.2-1.4L2.5 9.8c-1.2.5-1.2 1.1-.2 1.4l4.8 1.5L18.7 6.5c.5-.3 1-.1.6.2" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.5 19.3c-.1-.8-.1-2 0-2.9.1-.8.7-3.3.7-3.3s-.2-.4-.2-1c0-.9.5-1.6 1.2-1.6.6 0 .8.4.8 1 0 .6-.4 1.5-.6 2.3-.2.7.3 1.2 1 1.2 1.2 0 2.1-1.2 2.1-3 0-1.6-1.1-2.7-2.8-2.7-1.9 0-3 1.4-3 3.2 0 .6.2 1.3.6 1.6.1 0 .1 0 .1-.1l.2-.7c0-.1 0-.2-.1-.3-.2-.4-.3-.8-.3-1.3 0-1.1.8-2.1 2.2-2.1 1.2 0 1.9.8 1.9 1.8 0 1.2-.5 2.2-1.2 2.2-.4 0-.7-.3-.6-.7.1-.3.3-.6.3-1 0-.4-.2-.7-.6-.7-.5 0-.8.5-.8 1.1 0 .4.1.7.1.7l-.4 1.7c-.1.5-.1 1.1-.1 1.6A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
