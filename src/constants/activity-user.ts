export interface Users {
  img: string,
  name?: string,
  access?:string,
  date?: string,
  card?: number,
  expired?: string,
}
  
export interface usersDataProps {
  title:string;
  users: Users[];
}
  
export const usersData: usersDataProps[] = [
  {
    title: 'Ultimo accesso',
    users: [
      {
        img: '/src/assets/img/team-2.jpeg',
        name: 'Cepi',
        access: 'Ingresso Principale',
        date: '2023-02-08 09:30:26.123',
        card: 179232123,
        expired: '2013-02-08 09:30:26.123',
      },
    ],
  },
  {
    title: 'Ultimo 10 accessi',
    users: [
      {
        img: '/src/assets/img/team-2.jpeg',
        name: 'Cepi',
        access: 'Ingresso Principale',
        date: '2023-02-08 09:30:26.123',
        card: 179232123,
        expired: '2013-02-08 09:30:26.123',
      },
      {
        img: '/src/assets/img/team-2.jpeg',
        name: 'Nanda',
        access: 'Ingresso Principale',
        date: '2023-02-08 09:30:26.123',
        card: 179232123,
        expired: '2013-02-08 09:30:26.123',
      },
      {
        img: '/src/assets/img/team-2.jpeg',
        name: 'Nanda',
        access: 'Ingresso Principale',
        date: '2023-02-08 09:30:26.123',
        card: 179232123,
        expired: '2013-02-08 09:30:26.123',
      },
      {
        img: '/src/assets/img/team-2.jpeg',
        name: 'Nanda',
        access: 'Ingresso Principale',
        date: '2023-02-08 09:30:26.123',
        card: 179232123,
        expired: '2013-02-08 09:30:26.123',
      },
    ],
  },
];
