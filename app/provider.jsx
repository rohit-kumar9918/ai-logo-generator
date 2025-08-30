"use client";
import React, { useEffect, useState } from 'react';
import Header from './_components/header';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { userDetailContext } from './_context/UserDetailContext'; // Import from userdetailcontext.jsx

const Provider = ({ children }) => {
  const { user } = useUser();
  const [userDetail, setuserDetail] = useState(null);

  useEffect(() => {
    if (user) {
      checkUserAuth();
    }
  }, [user]);

  const checkUserAuth = async () => {
    try {
      const result = await axios.post('/api/users', {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result.data);
      setuserDetail(result.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <div className='mt-5'>
      <userDetailContext.Provider value={{ userDetail, setuserDetail }}>
      <Header />
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56">
        {children}
      </div>
      </userDetailContext.Provider>
    </div>
  );
};

export default Provider;