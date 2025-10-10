export default function Radio({
  name,
  options = [],
  value,
  onChange,
  direction = 'row', // row 또는 column
  className = '',
}) {
  return (
    <fieldset className={`radio-group ${className}`}>
      <legend className="sr-only">{name}</legend>
      <div
        className={`flex ${
          direction === 'column' ? 'flex-col gap-2' : 'flex-row gap-4'
        }`}
      >
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center cursor-pointer text-gray-800"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mr-2 accent-blue-600 focus:ring-2 focus:ring-blue-400"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
