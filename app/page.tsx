"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserList } from "@/components/users/UserList";
import { UserFilter } from "@/components/users/UserFilter";
import { api } from '@/lib/api';
import { User } from '@/types/user';
import { isSameDay } from '@/lib/utils/date';

export default function Home() {
  const [userList, setUserList] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<'all' | 'recent' | 'oldest'>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUsers = async () => {
    const userArray = userList.split('\n').filter(user => user.trim());
    try {
      const newUsers = await api.addUsers(userArray);
      setUsers(prev => [...prev, ...newUsers]);
      setUserList('');
    } catch (error) {
      console.error('Error adding users:', error);
    }
  };

  const handleGiveGift = async (userId: string) => {
    try {
      await api.giveGift(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error giving gift:', error);
    }
  };

  const handleRemoveGift = async (userId: string) => {
    try {
      await api.removeGift(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error removing gift:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await api.deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const copyTodaysGifts = () => {
    const today = new Date();
    const todaysGifts = users
      .filter(user => user.lastGiftDate && isSameDay(new Date(user.lastGiftDate), today))
      .map(user => user.name)
      .join('\n');
    
    navigator.clipboard.writeText(todaysGifts);
  };

  const getFilteredUsers = () => {
    let filtered = [...users];
    
    switch (filter) {
      case 'recent':
        filtered.sort((a, b) => {
          if (!a.lastGiftDate) return 1;
          if (!b.lastGiftDate) return -1;
          return new Date(b.lastGiftDate).getTime() - new Date(a.lastGiftDate).getTime();
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => {
          if (!a.lastGiftDate) return -1;
          if (!b.lastGiftDate) return 1;
          return new Date(a.lastGiftDate).getTime() - new Date(b.lastGiftDate).getTime();
        });
        break;
    }
    
    return filtered;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Hediye Yönetim Sistemi</h1>
          <ThemeToggle />
        </div>
        
        <div className="mb-6">
          <Textarea
            value={userList}
            onChange={(e) => setUserList(e.target.value)}
            placeholder="Kullanıcı listesini buraya yapıştırın (her satıra bir kullanıcı)"
            className="mb-4 bg-background border-input"
            rows={5}
          />
          <Button onClick={handleAddUsers}>Kullanıcıları Ekle</Button>
        </div>

        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <UserFilter currentFilter={filter} onFilterChange={setFilter} />
          <Button onClick={copyTodaysGifts} className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Bugünkü Hediyeleri Kopyala
          </Button>
        </div>

        <UserList
          users={getFilteredUsers()}
          onGiveGift={handleGiveGift}
          onRemoveGift={handleRemoveGift}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </div>
  );
}