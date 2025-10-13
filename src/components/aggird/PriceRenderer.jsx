export default function PriceRenderer({ value }) {
  let priceMultiplier = 1;

  if (value > 300_000_000_000) priceMultiplier = 5;
  else if (value > 20_000_000_000) priceMultiplier = 4;
  else if (value > 10_000_000_000) priceMultiplier = 3;
  else if (value > 5_000_000_000) priceMultiplier = 2;

  const priceArr = new Array(priceMultiplier).fill('');

  return value ? (
    <span className="imgSpan">
      {priceArr.map((_, index) => (
        <img
          key={index}
          src="https://www.ag-grid.com/example-assets/icons/pound-coin-color-icon.svg"
          className="priceIcon"
          alt="coin"
        />
      ))}
    </span>
  ) : null;
}
