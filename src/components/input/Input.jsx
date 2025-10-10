export default function Input({
  id,
  name,
  type = 'text',
  label,
  value,
  placeholder = '',
  onChange,
  error = '',
  required = false,
  disabled = false,
  className = '',
  /** ✅ 버튼 옵션 추가 */
  buttonLabel, // 버튼에 표시할 텍스트
  onButtonClick, // 버튼 클릭 이벤트
  buttonDisabled = false, // 버튼 비활성화
}) {
  const inputId = id || name;

  return (
    <div className={`form-row mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1 font-medium text-gray-800"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* ✅ Input + Button 묶음 */}
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
          `}
        />

        {/* 버튼 옵션이 있을 때만 표시 */}
        {buttonLabel && (
          <button
            type="button"
            onClick={onButtonClick}
            disabled={buttonDisabled}
            className={`shrink-0 px-4 py-2 text-sm font-medium rounded-md border transition
              ${
                buttonDisabled
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {buttonLabel}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
