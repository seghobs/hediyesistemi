import { User } from '@/types/user';
import { UserCard } from './UserCard';

interface UserListProps {
  users: User[];
  onGiveGift: (userId: string) => void;
  onRemoveGift: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserList({ users, onGiveGift, onRemoveGift, onDeleteUser }: UserListProps) {
  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onGiveGift={onGiveGift}
          onRemoveGift={onRemoveGift}
          onDeleteUser={onDeleteUser}
        />
      ))}
    </div>
  );
}