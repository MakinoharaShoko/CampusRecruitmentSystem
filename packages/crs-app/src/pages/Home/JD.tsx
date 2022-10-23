import { ICompanyInfo, IPositionInfo } from '@/pages/companyHome/CompanyHome';
import { useValue } from '@/hooks/useValue';
import { useEffect } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';

export default function JD(props: IPositionInfo & { isStu: boolean; stuId: number }) {
  const companyInfo = useValue<ICompanyInfo | null>(null);
  useEffect(() => {
    axios.get(`/api/v1/company/me?company_id=${props.company_id}`).then((resp) => {
      console.log(resp);
    });
  }, []);

  function apply(company_id: number, postion_id: number) {
    if (!props.isStu) {
      message.warn('未登录学生账号，不能投递').then();
      return;
    }
    axios.post('/api/v1/process/new_process', { company_id, postion_id, interviewee_id: props.stuId }).then((resp) => {
      message.success('投递成功').then();
      console.log(resp.data);
    });
  }

  return (
    <div>
      <div>{JSON.stringify(props)}</div>
      <Button onClick={() => apply(parseInt(props.company_id, 10), props.id)}>投递</Button>
    </div>
  );
}
