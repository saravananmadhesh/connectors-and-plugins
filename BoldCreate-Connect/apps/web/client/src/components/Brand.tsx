import { cn } from '@/lib/cn';
import { PRODUCT } from '@/lib/product';

export function BrandMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('grid shrink-0 place-items-center', className)}>
      <svg viewBox="170 262 410 376" className="size-full" fill="none">
        <path
          d="M190 380 L262 342 Q270 339 280 345 L322 366 Q337 375 337 392 L337 460 Q337 475 350 482 L392 507 Q410 518 410 540 L410 580 Q410 600 392 610 L372 622 Q348 632 325 620 L190 540 Q177 530 177 515 L177 400 Q177 388 190 380 Z"
          fill="#FF6A1F"
        />
        <path
          d="M296 372 L322 366 Q337 375 337 392 L337 460 Q337 475 350 482 L392 507 L330 490 Q282 462 284 420 Q286 392 296 372 Z"
          fill="#FF4800"
        />
        <path
          d="M360 295 Q372 282 392 274 Q410 268 430 278 L548 350 Q572 366 572 395 L572 490 Q572 515 550 528 L520 545 Q500 552 480 542 L365 470 Q347 458 347 435 L347 320 Q347 305 360 295 Z"
          fill="#FF6A1F"
        />
        <path
          d="M349 338 L432 388 Q470 410 470 450 L470 478 L365 470 Q347 458 347 435 Z"
          fill="#FF4800"
        />
      </svg>
    </span>
  );
}

/** The product lockup: mark, name and maker. Swap the mark for official artwork here. */
export function Brand({
  layout = 'row',
  className,
}: {
  layout?: 'row' | 'stacked';
  className?: string;
}) {
  if (layout === 'stacked') {
    return (
      <div className={cn('flex flex-col items-center gap-2 text-center', className)}>
        <BrandMark className="size-11 text-xl" />
        <div>
          <p className="brand-name text-xl leading-tight">
            {PRODUCT.name} <span className="brand-by text-sm">by {PRODUCT.maker}®</span>
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">{PRODUCT.tagline}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <BrandMark className="size-9 text-base" />
      <p className="leading-tight group-data-[collapsed=true]/sb:md:hidden">
        <span className="brand-name block text-xl leading-tight">{PRODUCT.name}</span>
        <span className="brand-by block text-xs">by {PRODUCT.maker}®</span>
      </p>
    </div>
  );
}
