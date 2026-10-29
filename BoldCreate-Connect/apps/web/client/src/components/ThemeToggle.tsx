import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useTheme, type ThemeChoice } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

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
        <Tooltip key={option.value} label={`${option.label} theme`} className="flex-1">
          <Button
            variant="ghost"
            size="sm"
            aria-label={option.label}
            aria-pressed={choice === option.value}
            onClick={() => setChoice(option.value)}
            className={cn(
              'h-7 w-full text-muted-foreground',
              choice === option.value && 'bg-sidebar-accent text-sidebar-foreground',
            )}
          >
            <option.icon />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}

const NEXT: Record<ThemeChoice, ThemeChoice> = { light: 'dark', dark: 'system', system: 'light' };

/** One icon for the narrow sidebar: it shows the current theme and a click moves to the next. */
export function ThemeCycleButton({ className }: { className?: string }) {
  const [choice, setChoice] = useTheme();
  const current = OPTIONS.find((option) => option.value === choice) ?? OPTIONS[2]!;
  const next = OPTIONS.find((option) => option.value === NEXT[choice])!;
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Theme: ${current.label}. Switch to ${next.label}`}
      title={`Theme: ${current.label}. Switch to ${next.label}`}
      onClick={() => setChoice(next.value)}
      className={cn('size-8 text-sidebar-muted hover:text-sidebar-foreground', className)}
    >
      <current.icon className="size-4" />
    </Button>
  );
}
