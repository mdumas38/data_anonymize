import { useState, useEffect } from 'react';
import { fetchUserData } from '../../../api/src/routes/user';

interface UserProfileProps {
  userId: string; // Assuming userId is a string, adjust if it's a number
}

export function UserProfile({ userId }: UserProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function loadUserData() {
      const data = await fetchUserData(userId);
      setUserData(data);
    }
    loadUserData();
  }, [userId]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Display other anonymized fields as needed */}
    </div>
  );
}

interface UserData {
  name: string;
  email: string;
  // Add other fields as needed
}