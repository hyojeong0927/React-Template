export default function Form({
  children,
  bottomBtn = false,
  button = null,
  className = '',
  onSubmit,
  legend = '입력폼',
}) {
  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-full ${className}`}
      role="form"
    >
      <fieldset className="border border-gray-300 rounded-lg p-4">
        <legend className="text-lg font-bold px-2">{legend}</legend>

        {/* 폼 내용 */}
        {children && <div className="form-inner space-y-4">{children}</div>}

        {/* 버튼 영역 */}
        {bottomBtn && button && (
          <div className="btn-area flex justify-end gap-2 mt-4">
            {Array.isArray(button)
              ? button.map((btn, i) => <span key={i}>{btn}</span>)
              : button}
          </div>
        )}
      </fieldset>
    </form>
  );
}
