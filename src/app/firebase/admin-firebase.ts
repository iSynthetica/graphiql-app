import * as admin from 'firebase-admin';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
const serviceAccount = require('secret.json');
// import serviceAccount from 'secret.json';
if (!admin.apps.length) {
  initializeApp({
    credential: credential.cert(serviceAccount),
  });
}

export const adminSDK = admin;
