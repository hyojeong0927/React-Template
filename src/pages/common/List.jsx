import { Ulist, Dlist, Olist } from '../../components/List/List';

function List() {
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
      <h2>ulist</h2>
      <Ulist items={people} />
      <h2>olist</h2>
      <Olist items={people} />
      <h2>dlist</h2>
      <Dlist items={peopleDlist} />
    </>
  );
}

export default List;
