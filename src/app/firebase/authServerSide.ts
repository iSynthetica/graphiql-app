import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { adminSDK } from './admin-firebase';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    return {
      props: {
        isLoggedIn: false,
      },
    };
  }

  try {
    const token = await adminSDK.auth().verifyIdToken(cookies.token);
    if (!token) {
      return {
        props: {
          isLoggedIn: false,
        },
      };
    }

    const { uid } = token;
    const user = await adminSDK.auth().getUser(uid);

    return {
      props: {
        isLoggedIn: true,
      },
    };
  } catch (error) {
    return {
      props: {
        isLoggedIn: false,
      },
    };
  }
}
