// src/utils/cn.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that merges Tailwind CSS class names intelligently.
 *
 * - Removes duplicate/conflicting classes (e.g., `px-2` and `px-4` → `px-4`)
 * - Works seamlessly with conditional and dynamic classNames
 *
 * Example:
 *   cn("px-2 py-1", isActive && "bg-blue-500", "text-white")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
