import { useValue } from '../../hooks/useValue';
import { useEffect } from 'react';
import axios from 'axios';

/**
 * 普通用户信息
 */
interface IUserInfo {
  ID: number;
  UserName: string;
  Nickname: string;
  Status: string;
  Avatar: string;
  CreatedAt: number;
}

export default function Me() {
  const myInfo = useValue<IUserInfo | null>(null);
  useEffect(() => {
    axios.get('/api/v1/user/me').then((resp) => {
      const data = resp.data;
      console.log(data);
      if (data.code === 401) {
        window.location.pathname = '/login';
      }
      if (data.code === 0) {
        myInfo.set(data.data);
      }
    });
  }, []);
  return (
    <div>
      <div>Me</div>
      <div>{JSON.stringify(myInfo)}</div>
    </div>
  );
}
