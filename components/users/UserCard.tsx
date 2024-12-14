import { User } from '@/types/user';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Gift, MoreVertical, Trash2 } from "lucide-react";
import { formatDate, canReceiveGift } from '@/lib/utils/date';

interface UserCardProps {
  user: User;
  onGiveGift: (userId: string) => void;
  onRemoveGift: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserCard({ user, onGiveGift, onRemoveGift, onDeleteUser }: UserCardProps) {
  return (
    <Card className="p-4 bg-card text-card-foreground">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">
            {user.lastGiftDate ? (
              <>
                Son hediye tarihi: {formatDate(user.lastGiftDate)}
                {canReceiveGift(user.lastGiftDate) && (
                  <span className="ml-2 text-green-500">(Hediye almaya uygun)</span>
                )}
              </>
            ) : (
              "Henüz hediye almadı"
            )}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onGiveGift(user.id)}>
              <Gift className="w-4 h-4 mr-2" />
              Hediye Ver
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRemoveGift(user.id)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Hediyeyi Sil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteUser(user.id)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Üyeyi Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}