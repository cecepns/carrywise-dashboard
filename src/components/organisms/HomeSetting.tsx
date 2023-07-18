import { memo } from 'react';
import { usersData } from '@/constants';
import { UserCard } from '@/components/molecules';
import { Typography } from '@/components/atoms';

export const HomeSetting: React.FC = memo(() => {
  return (
    <div>
      {usersData.map((props) => (
        <div className="mb-4" key={props.title}>
          <Typography className="mb-4 text-blue-700 text-lg">{props.title}</Typography>
          {props.users.map((user, idx) => (
            <UserCard 
              key={idx}
              img={user.img}
              name={user.name}
              access={user.access}
              date={user.date}
              card={user.card}
              expired={user.expired}
            />
          ))}
        </div>
      ))}
    </div>
  );
});
  
