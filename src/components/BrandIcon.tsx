import type { SimpleIcon } from "simple-icons";
import { cn } from "@/lib/utils";

// Brand logo from simple-icons, drawn in the current text color so it
// matches lucide icons next to it. (lucide-react 1.x has no brand icons.)
const BrandIcon = ({ icon, className }: { icon: SimpleIcon; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("h-4 w-4", className)}>
    <path d={icon.path} />
  </svg>
);

export default BrandIcon;
