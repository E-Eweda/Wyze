import {
  Camera,
  Cctv,
  SunMedium,
  Bell,
  Video,
  Radar,
  Router,
  MemoryStick,
  ShieldCheck,
  Shield,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';


const PRODUCT_ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  'camera-pan': Cctv,
  floodlight: SunMedium,
  doorbell: Bell,
  battery: Video,
  motion: Radar,
  hub: Router,
  sd: MemoryStick,
  warranty: ShieldCheck,
};

const STEP_ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  shield: Shield,
  sensor: Radar,
  grid: LayoutGrid,
};

export function productIcon(token: string): LucideIcon {
  return PRODUCT_ICONS[token] ?? Camera;
}

export function stepIcon(token: string): LucideIcon {
  return STEP_ICONS[token] ?? Camera;
}
