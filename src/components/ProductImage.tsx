import { productIcon } from './icons';

type Size = 'sm' | 'md' | 'fill';


export function ProductImage({
  image,
  size = 'md',
  alt,
}: {
  image: string;
  size?: Size;
  alt: string;
}) {
  const isAsset = /[./]/.test(image);

  const box: Record<Size, string> = {
    sm: 'size-11 rounded-lg border border-panel-line bg-white',
    md: 'size-28 rounded-lg',
    fill: 'size-full min-h-24 rounded-lg  xl:bg-transparent',
  };

  if (isAsset) {
    return (
      <div className={`relative shrink-0 overflow-hidden ${box[size]}`}>
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-90 rounded-[inherit] object-contain"
        />
      </div>
    );
  }

  const Icon = productIcon(image);
  return (
    <div
      role="img"
      aria-label={alt}
      className={`grid shrink-0 place-items-center rounded-[inherit] bg-zinc-100 text-zinc-400 ${box[size]} ${
        size === 'sm' ? '[&>svg]:size-6' : '[&>svg]:size-10'
      }`}
    >
      <Icon strokeWidth={1.5} />
    </div>
  );
}
