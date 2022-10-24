import { ICompanyInfo, IPositionInfo } from '@/pages/companyHome/CompanyHome';
import { useValue } from '@/hooks/useValue';
import { useEffect } from 'react';
import axios from 'axios';
import { Button, Descriptions, message } from 'antd';

export default function JD(props: IPositionInfo & { isStu: boolean; stuId: number }) {
  const companyInfo = useValue<ICompanyInfo | null>(null);
  useEffect(() => {
    axios.get(`/api/v1/company/me?company_id=${props.company_id}`).then((resp) => {
      const info = resp.data.data as ICompanyInfo;
      companyInfo.set(info);
    });
  }, []);

  function apply(company_id: number, postion_id: number) {
    if (!props.isStu) {
      message.warn('未登录学生账号，不能投递').then();
      return;
    }
    axios
      .post('/api/v1/process/new_process', { company_id, position_id: postion_id, interviewee_id: props.stuId })
      .then((resp) => {
        message.success('投递成功').then();
        console.log(resp.data);
      });
  }

  return (
    <div
      style={{
        margin: '1em 1em 1em 1em',
        padding: '1em 0.5em 1em 0.5em ',
        boxShadow: '3px 3px 15px rgba(0,0,0,0.1)',
      }}
    >
      <div>
        <Descriptions
          bordered
          title={props.position_name}
          extra={<Button onClick={() => apply(parseInt(props.company_id, 10), props.id)}>投递</Button>}
        >
          <Descriptions.Item label="招聘企业">{companyInfo.value?.company_name}</Descriptions.Item>
          <Descriptions.Item label="发布时间">{new Date(props.created_at).toLocaleDateString()}</Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{ padding: '0.5em 0.5em 0.5em 0.5em' }}>{props.jd}</div>
    </div>
  );
}
