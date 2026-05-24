import { cn } from "../lib/utils";

export default function ShimmerButton({
  children,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-xl w-full py-4 font-semibold text-white transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {/* Kurumsal mavi ışık kayması */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,#1e40af,45%,#60a5fa,55%,#1e40af)] bg-[length:200%_100%] animate-shimmer group-hover:bg-[linear-gradient(110deg,#1d4ed8,45%,#93c5fd,55%,#1d4ed8)] transition-colors" />
      
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}