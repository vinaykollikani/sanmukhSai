import { useEffect, useLayoutEffect } from 'react';

// Use useLayoutEffect safely on the client, fallback to useEffect on the server
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
