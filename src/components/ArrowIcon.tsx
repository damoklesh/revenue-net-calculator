type ArrowIconProps = {
  direction?: 'right' | 'left'
}

export function ArrowIcon({ direction = 'right' }: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={direction === 'left' ? 'arrow-icon arrow-icon-left' : 'arrow-icon'}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path d="M3 9h11M9.5 4.5 14 9l-4.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}
