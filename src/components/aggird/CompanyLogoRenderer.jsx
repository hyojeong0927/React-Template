export default function CompanyLogoRenderer({ value }) {
  return value ? <img src={value} alt="logo" style={{ height: 24 }} /> : null;
}
