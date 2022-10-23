import { useValue } from '@/hooks/useValue';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, DatePicker, Descriptions, Form, Input, message, Modal, PageHeader, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import styles from './me.module.scss';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

/**
 * 普通用户信息
 */
interface IUserInfo {
  id: number;
  user_name: string;
  nickname: string;
  status: string;
  avatar: string;
  created_at: number;
}

interface IUserOpenInfo {
  institution: string;
  background: string;
  graduation_at: number;
}

export default function Me() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const myInfo = useValue<IUserInfo | null>(null);
  const myOpenInfo = useValue<IUserOpenInfo | null>(null);
  const isEditting = useValue(false);
  useEffect(() => {
    axios.get('/api/v1/user/me').then((resp) => {
      const data = resp.data;
      const info = data.data as IUserInfo;
      console.log(info);
      if (data.code === 401) {
        window.location.pathname = '/login';
      }
      if (data.code === 0) {
        myInfo.set(info);
        axios.get(`/api/v1/interviewee/me?interviewee_id=${info.id}`).then((resp2) => {
          console.log(resp2.data.data);
          myOpenInfo.set(resp2.data.data);
        });
      }
    });
  }, []);

  function exit() {
    axios.delete(`/api/v1/user/logout`).then(() => {
      window.location.pathname = 'login';
    });
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const postValue = { ...values, id: myInfo.value?.id ?? 0, graduation_at: values.graduation_at.year() };
    console.log(postValue);
    editOpenInfo(postValue);
  };

  function editOpenInfo(values: any) {
    axios.post('/api/v1/interviewee/setme', values).then((resp) => {
      console.log(resp.data);
      window.location.reload();
    });
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const editInfoForm = (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="机构" name="institution" rules={[{ required: true, message: '请输入机构' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="背景" name="background" rules={[{ required: true, message: '请输入背景' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="毕业年份" name="graduation_at" required={true}>
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  /**
   * 上传头像部分
   */

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log(info.file);
    const formData = new FormData();
    formData.append('uid', myInfo.value?.id.toString() ?? '1');
    formData.append('file', info.file.originFileObj as Blob);
    axios.post('/api/v1/user/avatar/upload', formData).then((resp) => {
      console.log(resp);
      window.location.reload();
    });
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <PageHeader
        extra={[
          <Button
            onClick={() => {
              isEditting.set(!isEditting.value);
            }}
            key="edit"
            type="primary"
          >
            {isEditting.value ? '退出编辑' : '编辑'}
          </Button>,
          <Button key="exit" onClick={exit}>
            退出登录
          </Button>,
        ]}
        className={styles.site_page_header}
        title="我的信息"
        subTitle="学生用户"
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '1em 1em 1em 1em' }}>
          {myInfo.value?.avatar !== '' && <Avatar onClick={showModal} src={myInfo.value?.avatar ?? ''} />}
          {myInfo.value?.avatar === '' && (
            <Avatar onClick={showModal} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {myInfo.value.user_name}
            </Avatar>
          )}
          <div style={{ fontSize: 'larger', padding: '0 0 0 1em' }}>{myInfo.value?.user_name ?? ''}</div>
        </div>
        {isEditting.value && editInfoForm}
        {!isEditting.value && (
          <Descriptions bordered>
            <Descriptions.Item label="昵称">{myInfo.value?.nickname ?? ''}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {myInfo.value?.status === 'active' ? '在看机会' : '暂不求职'}
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {new Date(myInfo.value?.created_at as number).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="机构">{myOpenInfo.value?.institution ?? ''}</Descriptions.Item>
            <Descriptions.Item label="背景">{myOpenInfo.value?.background ?? ''}</Descriptions.Item>
            <Descriptions.Item label="毕业时间">{myOpenInfo.value?.graduation_at ?? 0}</Descriptions.Item>
          </Descriptions>
        )}
      </PageHeader>
      <Modal title="上传头像" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Modal>
    </div>
  );
}
