import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
}

/**
 * Device detection hook using User Agent
 * Routes users to appropriate version (mobile/desktop)
 */
export const useDeviceDetect = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
  });

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';

    // Mobile detection patterns
    const mobilePatterns = [
      /android.*mobile/,
      /iphone/,
      /ipod/,
      /blackberry/,
      /windows phone/,
      /opera mini/,
      /iemobile/,
      /mobile/,
    ];

    // Tablet detection patterns
    const tabletPatterns = [
      /ipad/,
      /android(?!.*mobile)/,
      /tablet/,
    ];

    const isMobileUA = mobilePatterns.some(pattern => pattern.test(userAgent));
    const isTabletUA = tabletPatterns.some(pattern => pattern.test(userAgent));

    // Also check screen width as fallback
    const screenWidth = window.innerWidth;
    const isMobileScreen = screenWidth <= 768;
    const isTabletScreen = screenWidth > 768 && screenWidth <= 1024;

    // Touch capability check
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Final determination
    const isMobile = isMobileUA || (isMobileScreen && hasTouch);
    const isTablet = isTabletUA || (isTabletScreen && hasTouch);
    const isDesktop = !isMobile && !isTablet;

    // OS detection
    const isIOS = /iphone|ipad|ipod/.test(userAgent) ||
                  (platform === 'macintel' && navigator.maxTouchPoints > 1);
    const isAndroid = /android/.test(userAgent);

    // Browser detection
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isChrome = /chrome/.test(userAgent) && !/edge/.test(userAgent);

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      isIOS,
      isAndroid,
      isSafari,
      isChrome,
    });
  }, []);

  return deviceInfo;
};

export default useDeviceDetect;
