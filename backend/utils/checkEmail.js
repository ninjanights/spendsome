import dns from "dns";

export const checkEmailDomain = (email) => {
  return new Promise((resolve) => {
    const domain = email.split("@")[1];

    dns.resolveMx(domain, (e, addresses) => {
      if (e || !addresses || addresses.length === 0) {
        return resolve(false);
      }
      resolve(true);
    });
  });
};
