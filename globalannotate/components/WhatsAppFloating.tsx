import { whatsappUrl } from "@/lib/site";

export default function WhatsAppFloating() {
  const href = whatsappUrl("Hi GlobalAnnotate — I'd like to chat about a project.");
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-emerald-900/30 transition-transform hover:scale-105 focus-visible:scale-105"
      style={{ background: "#25D366", color: "#ffffff" }}
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden
        className="h-7 w-7"
        fill="currentColor"
      >
        <path d="M19.11 17.27c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.13-.6.14-.18.27-.7.89-.85 1.07-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.83-1.99-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.47.07-.71.34-.25.27-.94.92-.94 2.24 0 1.32.96 2.6 1.09 2.78.13.18 1.88 2.87 4.56 4.02.64.28 1.13.44 1.52.57.64.2 1.22.18 1.68.11.51-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.31zM16.05 27.5h-.01c-1.98 0-3.92-.53-5.61-1.53l-.4-.24-4.16 1.09 1.11-4.05-.26-.42a11.4 11.4 0 0 1-1.74-6.09c0-6.31 5.13-11.44 11.44-11.44 3.05 0 5.92 1.19 8.08 3.35a11.4 11.4 0 0 1 3.35 8.09c0 6.31-5.13 11.44-11.44 11.44zm9.74-21.18A13.62 13.62 0 0 0 16.05 2c-7.55 0-13.7 6.14-13.71 13.7 0 2.41.63 4.77 1.83 6.85L2 30l7.62-2c2 1.09 4.25 1.67 6.43 1.67h.01c7.55 0 13.7-6.14 13.71-13.7a13.62 13.62 0 0 0-4.02-9.65z" />
      </svg>
    </a>
  );
}
