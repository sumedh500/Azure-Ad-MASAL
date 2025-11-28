import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'a9415218-3a39-4b7d-b045-bf56ad88c304', // your app id
  authority: 'https://login.microsoftonline.com/8d616b73-b5dd-465b-b423-80a55daf5bf5', // or .onmicrosoft.com
    redirectUri: 'https://azure-ad-msal.netlify.app/public-page'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        console.log(message);
      },
      logLevel: LogLevel.Info,
    },
  },
};

export const loginRequest = {
  scopes: ['User.Read'],  // change if you use custom API scopes
};
