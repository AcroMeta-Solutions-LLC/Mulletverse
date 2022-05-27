import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";

// TODO switch to the login page after created

export const RouteGuard = (props: React.ComponentProps<any>) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useMoralis();

  useEffect(() => {
    const path = router.asPath.split("?")[0];
    const publicPaths = ["/", "/marketplace"];

    if (isInitialized && !isAuthenticated && !publicPaths.includes(path)) {
      router.push({ pathname: "/" });
    }
  }, [isAuthenticated, router, isInitialized]);

  return props.children;
};

export default RouteGuard;
