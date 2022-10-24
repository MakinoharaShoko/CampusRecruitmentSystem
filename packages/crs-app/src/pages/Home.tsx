import { useValue } from '@/hooks/useValue';
import { IPositionInfo } from '@/pages/companyHome/CompanyHome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import JD from '@/pages/Home/JD';

export default function Home() {
  const allPos = useValue<IPositionInfo[]>([]);
  const [isStu, setIsStu] = useState(false);
  const [stuId, setStuId] = useState(0);
  useEffect(() => {
    axios.get('/api/v1/position/get_all_position').then((resp) => {
      const data = resp.data;
      const info = data.data as IPositionInfo[];
      console.log(info);
      if (data.code === 401) {
        window.location.pathname = '/login';
      }
      allPos.set(info);
    });

    axios.get('/api/v1/user/me').then((resp) => {
      const data = resp.data;
      const info = data.data;
      console.log(info);
      if (!info) {
        setIsStu(false);
      } else {
        setIsStu(true);
        setStuId(info.id!);
      }
    });
  }, []);
  const JDS = allPos.value.map((pos) => {
    return (
      // eslint-disable-next-line react/jsx-pascal-case
      <JD
        key={pos.id}
        id={pos.id}
        position_name={pos.position_name}
        company_id={pos.company_id}
        jd={pos.jd}
        created_at={pos.created_at}
        isStu={isStu}
        stuId={stuId}
      />
    );
  });

  return (
    <div>
      <div style={{ width: '100%', textAlign: 'center', fontSize: 'large' }}>欢迎投递！</div>
      <div>{JDS}</div>
    </div>
  );
}
