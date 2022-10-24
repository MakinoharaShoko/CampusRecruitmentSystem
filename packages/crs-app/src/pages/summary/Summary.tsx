import { useValue } from '@/hooks/useValue';
import { IProcessDetail } from '@/pages/process/ProcessDetail';
import { Input, Button } from 'antd';
import axios from 'axios';
import { LikeOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';

export default function Summary() {
  const allProcess = useValue<IProcessDetail[]>([]);

  const input = useValue('');

  function update() {
    axios.get(`/api/v1/school/get_all_process?school_name=${input.value}`).then((resp) => {
      console.log(resp);
      if (resp.data.data !== null) allProcess.set(resp.data.data);
    });
  }

  /**
   * 统计
   */
  let jianli = 0;
  let mianshi = 0;
  let offer = 0;
  let jieshu = 0;
  let all = 0;

  allProcess.value.forEach((process) => {
    if (process.status !== 3) {
      all++;
    }

    if (process.status === 1) {
      jianli++;
    }
    if (process.status === 2) {
      mianshi++;
    }
    if (process.status === 3) {
      offer++;
    }
    if (process.status === 0) {
      jieshu++;
    }
  });

  const showAllProgressSummary = (
    <div style={{ margin: '1em 1em 1em 1em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="已获得Offer" value={offer} prefix={<LikeOutlined />} />
        </Col>
        <Col span={12}>
          <Statistic title="简历筛选" value={jianli} suffix={` / ${all}`} />
        </Col>
        <Col span={12}>
          <Statistic title="面试" value={mianshi} suffix={` / ${all}`} />
        </Col>
        <Col span={12}>
          <Statistic title="流程结束" value={jieshu} suffix={` / ${all}`} />
        </Col>
      </Row>
    </div>
  );

  return (
    <div style={{ padding: '1em 1em 1em 1em' }}>
      <div style={{ fontSize: 'large' }}>学校名称</div>
      <Input.Group compact>
        <Input
          onChange={(event) => {
            input.set(event.target.value);
          }}
          style={{ width: '500px' }}
          defaultValue={input.value}
        />
        <Button onClick={update} type="primary">
          查询
        </Button>
      </Input.Group>
      {showAllProgressSummary}
    </div>
  );
}
