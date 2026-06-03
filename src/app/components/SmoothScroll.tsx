'use client';

import { useEffect, useRef } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  
  useEffect(() => {
    // Initialize with current scroll position to prevent jitter
    let scrollPos = window.scrollY;
    let targetScroll = window.scrollY;
    let rafId: number;
    let isScrolling = false;
    
    const smoothScroll = () => {
      scrollPos += (targetScroll - scrollPos) * 0.055; // Easing factor for jelly effect
      
      if (Math.abs(targetScroll - scrollPos) > 0.5) {
        window.scrollTo(0, scrollPos);
        rafId = requestAnimationFrame(smoothScroll);
        isScrolling = true;
      } else {
        window.scrollTo(0, targetScroll);
        isScrolling = false;
      }
    };
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Sync positions if not currently scrolling to prevent jitter
      if (!isScrolling) {
        scrollPos = window.scrollY;
        targetScroll = window.scrollY;
      }
      
      targetScroll = Math.max(0, Math.min(
        targetScroll + e.deltaY,
        document.documentElement.scrollHeight - window.innerHeight
      ));
      
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(smoothScroll);
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      scrollPos = window.scrollY;
      targetScroll = window.scrollY;
      lenisRef.current = { startY: touch.clientY, lastY: touch.clientY };
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!lenisRef.current) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const deltaY = lenisRef.current.lastY - touch.clientY;
      lenisRef.current.lastY = touch.clientY;
      
      targetScroll = Math.max(0, Math.min(
        targetScroll + deltaY * 2,
        document.documentElement.scrollHeight - window.innerHeight
      ));
      
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(smoothScroll);
    };
    
    const handleTouchEnd = () => {
      lenisRef.current = null;
    };

    const handleSmoothScrollTo = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.top === 'number') {
        scrollPos = window.scrollY;
        targetScroll = customEvent.detail.top;
        
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(smoothScroll);
      }
    };
    
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('smooth-scroll-to', handleSmoothScrollTo);
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('smooth-scroll-to', handleSmoothScrollTo);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  return <>{children}</>;
}