import { useEffect } from 'react';
import { useValue } from '@/hooks/useValue';
import ProcessDetail, { IProcessDetail } from '@/pages/process/ProcessDetail';
import axios from 'axios';
import { ICompanyInfo } from '@/pages/companyHome/CompanyHome';
import { Select } from 'antd';
const { Option } = Select;

export default function CompanyAllProcecss() {
  const allProcess = useValue<IProcessDetail[]>([]);

  const handleChange = (value: string, thisProcess: IProcessDetail) => {
    console.log(`selected ${value}`);
    const updateJson = {
      interviewee_id: thisProcess.interviewee_id,
      // @ts-ignore
      position_id: thisProcess.position_id,
      company_id: thisProcess.company_id,
      status: parseInt(value, 10),
    };
    console.log(updateJson);
    axios.post('/api/v1/process/change_process', updateJson).then((resp) => {
      console.log(resp);
    });
  };

  useEffect(() => {
    axios.get('/api/v1/company/AllInfo').then((resp) => {
      const data = resp.data;
      const info = data.data as ICompanyInfo;
      console.log('company data', info);
      if (data.code === 401) {
        window.location.pathname = '/login';
      }
      axios.get(`/api/v1/company/get_all_process?company_id=${info.id ?? 0}`).then((resp2) => {
        console.log(resp2);
        allProcess.set(resp2.data.data);
      });
    });
  }, []);

  const companyProcess = allProcess.value.map((process) => {
    return (
      <div
        key={process.company_id + process.company_id + process.creat_at}
        style={{
          margin: '0.5em 0.5em 0.5em 0.5em',
          padding: '0.5em 0.5em 0.5em 0.5em',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ margin: '1em 1em 1em 1em' }}>
          设置状态：
          <Select
            defaultValue={process.status.toString()}
            style={{ width: 120 }}
            onChange={(val) => handleChange(val, process)}
          >
            <Option value="1">简历筛选</Option>
            <Option value="2">面试中</Option>
            <Option value="3">Offer</Option>
            <Option value="0">流程结束</Option>
          </Select>
        </div>
        <ProcessDetail
          interviewee_id={process.interviewee_id}
          // @ts-ignore
          postion_id={process.position_id!}
          company_id={process.company_id}
          status={process.status}
          creat_at={process.creat_at}
        />
      </div>
    );
  });

  return (
    <div>
      <div>公司全部流程</div>
      <div>{companyProcess}</div>
    </div>
  );
}
