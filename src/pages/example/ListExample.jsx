import { Ulist, Dlist, Olist } from '../../components/etc/List';

export default function List() {
  const people = [
    'Creola Katherine Johnson: mathematician',
    'Mario José Molina-Pasquel Henríquez: chemist',
    'Mohammad Abdus Salam: physicist',
    'Percy Lavon Julian: chemist',
    'Subrahmanyan Chandrasekhar: astrophysicist',
  ];
  const peopleDlist = [
    { term: 'Creola Katherine Johnson', description: 'mathematician' },
    { term: 'Mario José Molina-Pasquel Henríquez', description: 'chemist' },
    { term: 'Mohammad Abdus Salam', description: 'physicist' },
    { term: 'Percy Lavon Julian', description: 'chemist' },
    { term: 'Subrahmanyan Chandrasekhar', description: 'astrophysicist' },
  ];
  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center">List 예시</h1>
      <h2>ulist</h2>
      <Ulist items={people} />
      <br />
      <h2>olist</h2>
      <Olist items={people} />
      <br />
      <h2>dlist</h2>
      <Dlist items={peopleDlist} />
    </>
  );
}
