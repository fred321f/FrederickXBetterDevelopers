import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) { // cn lets us combine the clsx and tailwind-merge libraries, so we can use both at once.
  return twMerge(clsx(inputs))
}
