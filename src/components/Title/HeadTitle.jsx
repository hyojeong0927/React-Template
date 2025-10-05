export default function HeadTitle({
  level = 2,
  title,
  subTitle,
  descript,
  children,
  align = 'left',
  className = '',
}) {
  const alignClass =
    {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[align] || 'text-left';

  const Heading = `h${level}`;

  // 접근성을 위한 id 생성
  const titleId = `headtitle-${Math.random().toString(36).substr(2, 9)}`;
  const descId = descript ? `${titleId}-desc` : undefined;

  return (
    <section
      className={`title-wrap ${alignClass} ${className}`}
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {title && (
        <Heading id={titleId} className="text-xl font-bold">
          {title}
        </Heading>
      )}

      {children && (
        <div className="btn-area mt-2" role="region" aria-label="Actions">
          {children}
        </div>
      )}

      {subTitle && (
        <div className="title-sub text-gray-500 text-sm mt-1" role="note">
          {subTitle}
        </div>
      )}

      {descript && (
        <p id={descId} className="title-dec text-gray-400 text-xs mt-1">
          {descript}
        </p>
      )}
    </section>
  );
}
