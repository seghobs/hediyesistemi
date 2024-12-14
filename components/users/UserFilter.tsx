import { Button } from "@/components/ui/button";

interface UserFilterProps {
  currentFilter: 'all' | 'recent' | 'oldest';
  onFilterChange: (filter: 'all' | 'recent' | 'oldest') => void;
}

export function UserFilter({ currentFilter, onFilterChange }: UserFilterProps) {
  return (
    <div className="space-x-2">
      <Button
        variant={currentFilter === 'all' ? "default" : "outline"}
        onClick={() => onFilterChange('all')}
      >
        Tümü
      </Button>
      <Button
        variant={currentFilter === 'recent' ? "default" : "outline"}
        onClick={() => onFilterChange('recent')}
      >
        Son Hediye Alanlar
      </Button>
      <Button
        variant={currentFilter === 'oldest' ? "default" : "outline"}
        onClick={() => onFilterChange('oldest')}
      >
        En Eski Hediye Alanlar
      </Button>
    </div>
  );
}