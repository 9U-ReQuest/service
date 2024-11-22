declare global {
    interface Window {
      Kakao: {
        init: (key: string) => void;
        isInitialized: () => boolean;
        Auth: {
          authorize: ({ redirectUri }: { redirectUri: string }) => void;
        };
      };
    }
  }
  export {};