export default function InfoBox({ title, children, button, className = '' }) {
  const headerId = title ? `${title.replace(/\s+/g, '-')}-header` : undefined;

  return (
    <section
      className={['info-box', className].filter(Boolean).join(' ')}
      aria-labelledby={headerId}
      role="region"
    >
      <div className="info-box__inner">
        {title && (
          <div id={headerId} className="info-box__header">
            {title}
          </div>
        )}
        {children && <div className="info-box__content">{children}</div>}
        {button && <div className="info-box__footer">{button}</div>}
      </div>
    </section>
  );
}
