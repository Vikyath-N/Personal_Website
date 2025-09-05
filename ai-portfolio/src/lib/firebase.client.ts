import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
};

export const app = getApps().length ? getApp() : initializeApp(cfg);

export const analytics: Promise<Analytics|null> =
  typeof window !== "undefined"
    ? isSupported().then(s => (s ? getAnalytics(app) : null))
    : Promise.resolve(null);
