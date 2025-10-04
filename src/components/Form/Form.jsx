export default function Form({
  children,
  bottomBtn = false,
  button = null,
  className = '',
  onSubmit,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <fieldset>
        <legend>입력폼</legend>

        {children && <div className="form-inner">{children}</div>}

        {bottomBtn && (
          <div className="btn-area flex justify-end gap-2">
            {Array.isArray(button)
              ? button.map((btn, i) => <span key={i}>{btn}</span>)
              : button}
          </div>
        )}
      </fieldset>
    </form>
  );
}
