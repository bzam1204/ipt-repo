type LogoProps = {
  size?: number;
  title?: string;
};

export function Logo({ size = 24, title = 'IPT' }: LogoProps) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 32 32"
      aria-label={title}
      role="img"
      focusable="false"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f62fe" />
          <stop offset="100%" stopColor="#6929c4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#g)" />
      <path d="M10 22V10h3v12h-3zm6 0v-3h3v3h-3zm0-5v-7h3v7h-3z" fill="#fff" />
    </svg>
  );
}

export default Logo;
