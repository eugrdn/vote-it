export type CustomProps = {
  fromSSR: FromSSR;
};

export type FromSSR = {
  md: MobileDetect;
};

export type MobileDetect = {
  isMobile: boolean;
  deviceInfo: {
    mobile: string;
    tablet: string;
    os: string;
    userAgent: string;
  };
};
