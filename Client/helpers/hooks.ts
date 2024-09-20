import { useRef, useEffect } from "react";

const DEFAULT_SWIPE_THRESHOLD = 48;
const DEFAULT_SWIPE_CANCEL_THRESHOLD = 48;

/**
 * Hook to execute callbacks when a swipe event (left/right/down/up) occurs on a given ref
 * @param ref HTML element ref to listen for swipe events on
 * @param callbacks Callback functions to execute when swipe events occur
 * @param threshold Minimum swipe distance in pixels to trigger a swipe event
 * @param cancelThreshold Minimum swipe distance on perpendicular axis to cancel a swipe event
 */
export function useSwipe(
  ref: React.RefObject<HTMLElement>,
  callbacks: {
    left?: () => void;
    right?: () => void;
    down?: () => void;
    up?: () => void;
  },
  threshold = DEFAULT_SWIPE_THRESHOLD,
  cancelThreshold = DEFAULT_SWIPE_CANCEL_THRESHOLD,
) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touchObj = e.changedTouches?.[0];
      if (touchObj) {
        startX.current = touchObj.clientX;
        startY.current = touchObj.clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchObj = e.changedTouches?.[0];

      if (!touchObj || startX.current === null || startY.current === null) {
        return;
      }

      const deltaX = touchObj.clientX - startX.current;
      const deltaY = touchObj.clientY - startY.current;

      if (Math.abs(deltaY) < cancelThreshold) {
        if (callbacks.left && deltaX < -threshold) {
          callbacks.left();
        } else if (callbacks.right && deltaX > threshold) {
          callbacks.right();
        }
      }

      if (Math.abs(deltaX) < cancelThreshold) {
        if (callbacks.down && deltaY < -threshold) {
          callbacks.down();
        } else if (callbacks.up && deltaY > threshold) {
          callbacks.up();
        }
      }

      startX.current = null;
      startY.current = null;
    };

    const currentRef = ref.current;

    if (currentRef) {
      currentRef.addEventListener("touchstart", handleTouchStart, false);
      currentRef.addEventListener("touchend", handleTouchEnd, false);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("touchstart", handleTouchStart, false);
        currentRef.removeEventListener("touchend", handleTouchEnd, false);
      }
    };
  }, [ref, callbacks, threshold, cancelThreshold]);
}
