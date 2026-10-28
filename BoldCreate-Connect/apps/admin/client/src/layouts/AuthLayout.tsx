import type { ReactNode } from 'react';
import { AppFooter } from '../components/AppFooter';
import { Brand } from '../components/Brand';
import { Card, CardContent } from '../components/ui/card';

/** Centered card for the pages shown before sign-in. */
export function AuthLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="grid flex-1 place-items-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Brand layout="stacked" />
          <Card>
            <CardContent className="flex flex-col gap-6 pt-6">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {children}
            </CardContent>
          </Card>
        </div>
      </main>
      <AppFooter className="justify-center border-t-0 text-center" />
    </div>
  );
}
