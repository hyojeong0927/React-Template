export default function CompanyRenderer({ value }) {
  return value ? (
    <a href={value} target="_blank" rel="noopener noreferrer">
      {new URL(value).hostname}
    </a>
  ) : null;
}
