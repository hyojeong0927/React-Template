export default function CustomButton({ data }) {
  return data ? (
    <button onClick={() => console.log('Software Launched')}>
      {data?.company ? `Launch ${data.company}!` : 'Launch!'}
    </button>
  ) : null;
}
