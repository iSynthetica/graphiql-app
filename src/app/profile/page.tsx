'use client';
import { useAuth } from '@/context/AuthContext';
import { IAuthContextValue } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [name, setName] = useState('');
  const router = useRouter();
  const { user, loading, logout } = useAuth() as IAuthContextValue;

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert('An error occured while fetching user data');
  //   }
  // };
  useEffect(() => {
    // const fetchUserName = async () => {
    //   try {
    //     if (user) {
    //       const q = query(
    //         collection(db, 'users'),
    //         where('uid', '==', user.uid)
    //       );
    //       const doc = await getDocs(q);

    //       const data = doc.docs[0]?.data();
    //       console.log(data, 'data');
    //       if (data) {
    //         setName(data.name);
    //       } else {
    //         console.error('User data not found.');
    //         alert('An error occurred while fetching user data');
    //       }
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     alert('An error occurred while fetching user data');
    //   }
    // };
    if (loading) return;
    if (!user) return router.push('/');
    // fetchUserName();
  }, [user, loading, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center g-3">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Profile;
