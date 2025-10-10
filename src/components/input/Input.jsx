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
}) {
  return (
    <div className={`form-row mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-1 font-medium text-gray-800"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id || name}-error` : undefined}
        className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
        `}
      />

      {/* Error Message */}
      {error && (
        <p
          id={`${id || name}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
