import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useTheme, type ThemeChoice } from '@/lib/theme';
import { Button } from '@/components/ui/button';

const OPTIONS: { value: ThemeChoice; label: string; icon: LucideIcon }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

/** Three-way switch for light, dark or following the operating system. */
export function ThemeToggle() {
  const [choice, setChoice] = useTheme();
  return (
    <div role="group" aria-label="Theme" className="flex gap-1 rounded-lg border p-0.5">
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          aria-label={option.label}
          aria-pressed={choice === option.value}
          title={option.label}
          onClick={() => setChoice(option.value)}
          className={cn(
            'h-7 flex-1 text-muted-foreground',
            choice === option.value && 'bg-sidebar-accent text-sidebar-foreground',
          )}
        >
          <option.icon />
        </Button>
      ))}
    </div>
  );
}
