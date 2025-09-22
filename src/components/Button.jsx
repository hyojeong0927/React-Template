import { FaSpinner } from 'react-icons/fa';

function Button({ loading = false, onClick, className, children }) {
  const clazz = [
    'bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded transition-colors',
    className,
  ].join(' ');

  const handleClick = () => {
    if (loading) {
      return;
    }
    onClick();
  };

  return (
    <button className={clazz} onClick={handleClick} disabled={loading}>
      <span className="flex items-center justify-center">
        {loading && <FaSpinner className="animate-spin mr-2" />}
        {children}
      </span>
    </button>
  );
}

export default Button;
