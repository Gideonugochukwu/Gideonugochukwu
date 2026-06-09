type IconProps = { className?: string };

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45C23.2 24 24 23.22 24 22.26V1.74C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

export function TwitterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.658l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.826l4.713 6.231 5.451-6.231zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M13.5 21.95V14.2h2.62l.39-3.04H13.5V9.22c0-.88.24-1.48 1.51-1.48h1.61V5.02c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.91 1.42-3.91 4.02v2.24H7.75v3.04h2.62v7.75h3.13z" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.9a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M23.5 6.5a2.99 2.99 0 0 0-2.1-2.12C19.55 4 12 4 12 4s-7.55 0-9.4.38A2.99 2.99 0 0 0 .5 6.5C.12 8.36.12 12 .12 12s0 3.64.38 5.5a2.99 2.99 0 0 0 2.1 2.12C4.45 20 12 20 12 20s7.55 0 9.4-.38a2.99 2.99 0 0 0 2.1-2.12c.38-1.86.38-5.5.38-5.5s0-3.64-.38-5.5zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M19.11 17.27c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.13-.6.14-.18.27-.7.89-.85 1.07-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.83-1.99-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.47.07-.71.34-.25.27-.94.92-.94 2.24 0 1.32.96 2.6 1.09 2.78.13.18 1.88 2.87 4.56 4.02.64.28 1.13.44 1.52.57.64.2 1.22.18 1.68.11.51-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.31zM12.04 21.5h-.01a9.5 9.5 0 0 1-4.83-1.32l-.35-.21-3.59.94.96-3.5-.22-.36A9.46 9.46 0 0 1 2.5 12c0-5.24 4.26-9.5 9.5-9.5 2.54 0 4.92.99 6.72 2.78A9.43 9.43 0 0 1 21.5 12c0 5.24-4.26 9.5-9.46 9.5z" />
    </svg>
  );
}

export const SOCIAL_META: Record<
  string,
  { label: string; Icon: (p: IconProps) => React.JSX.Element }
> = {
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  twitter: { label: "X (Twitter)", Icon: TwitterIcon },
  instagram: { label: "Instagram", Icon: InstagramIcon },
  facebook: { label: "Facebook", Icon: FacebookIcon },
  tiktok: { label: "TikTok", Icon: TikTokIcon },
  youtube: { label: "YouTube", Icon: YouTubeIcon },
};
