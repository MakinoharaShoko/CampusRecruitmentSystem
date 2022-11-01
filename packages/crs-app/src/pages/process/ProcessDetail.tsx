import { Descriptions, Timeline } from 'antd';
import { useValue } from '@/hooks/useValue';
import { ICompanyInfo, IPositionInfo } from '@/pages/companyHome/CompanyHome';
import { useEffect } from 'react';
import axios from 'axios';
import { IUserOpenInfo } from '../userHome/Me';

export interface IProcessDetail {
  interviewee_id: number;
  postion_id: number;
  company_id: number;
  status: number;
  creat_at: number;
  // resume_url: string;
}

export default function ProcessDetail(props: IProcessDetail) {
  const timelineList = [];
  if (props.status === 1 || props.status === 2 || props.status === 3) {
    timelineList.push(<Timeline.Item key={props.creat_at + '1'}>筛选</Timeline.Item>);
  }
  if (props.status === 2 || props.status === 3) {
    timelineList.push(<Timeline.Item key={props.creat_at + '2'}>面试</Timeline.Item>);
  }
  if (props.status === 3) {
    timelineList.push(<Timeline.Item key={props.creat_at + '3'}>Offer</Timeline.Item>);
  }
  if (props.status === 0) {
    timelineList.push(<Timeline.Item key={props.creat_at + '4'}>流程结束</Timeline.Item>);
  }

  const positionInfo = useValue<IPositionInfo | null>(null);
  const companyInfo = useValue<ICompanyInfo | null>(null);
  const myOpenInfo = useValue<IUserOpenInfo | null>(null);
  useEffect(() => {
    axios.get(`/api/v1/position/check_position?position_id=${props.postion_id}`).then((resp) => {
      console.log('流程中职位信息');
      console.log(resp);
      positionInfo.set(resp.data.data);
    });
    axios.get(`/api/v1/interviewee/me?interviewee_id=${props.interviewee_id}`).then((resp2) => {
      console.log(resp2.data.data);
      myOpenInfo.set(resp2.data.data);
    });
    axios.get(`/api/v1/company/me?company_id=${props.company_id}`).then((resp) => {
      console.log(resp);
      companyInfo.set(resp.data.data);
    });
  }, []);

  return (
    <div style={{ margin: '2em 2em 2em 2em' }}>
      <Descriptions title={positionInfo.value?.position_name ?? ''}>
        <Descriptions.Item label="公司名称">{companyInfo.value?.company_name ?? ''}</Descriptions.Item>
        <Descriptions.Item label="投递时间">
          {new Date(positionInfo.value?.created_at ?? 0).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="候选人简历">
          <div style={{ margin: '0 0 0 0.1em' }}>
            {
              // @ts-ignore
              (myOpenInfo.value?.resume ?? '') === '' && '没有上传简历'
            }
            {
              // @ts-ignore
              (myOpenInfo.value?.resume ?? '') !== '' && (
                // @ts-ignore
                <a href={myOpenInfo.value?.resume.replace(/\./, '') ?? ''}>候选人简历</a>
              )
            }
          </div>
        </Descriptions.Item>
      </Descriptions>
      <Timeline key={props.creat_at + props.company_id}>{timelineList}</Timeline>
    </div>
  );
}
