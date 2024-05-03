import React, { FC, useEffect } from 'react';
import styles from './style.module.scss';
import { Button, Form, Input, Typography } from "antd";
import { useUnit } from "effector-react";
import { authFX } from "../../../entety/admin/user/model/index";
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import { useRouter } from "next/router";

const { Title } = Typography;

const LoginContent: FC = () => {

  const router = useRouter()
  const [form] = Form.useForm<{}>();

  const [isLoading] = useUnit([authFX.pending])

  const onFinish = (values: any) => {
    authFX(values).then(() =>{
      router.push('/admin/category')
    })
  }

  return (
    <MaxWithLayout>
      <div className={styles['login-content']}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{
            width: '100%',
            maxWidth: 360,
            borderRadius: 20,
            border: '1px solid #eeeeee',
            padding: 20,
          }}
          layout={"vertical"}
        >
          <Title
            level={2}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 20,
            }}
          >
            Авторизация
          </Title>

          <Form.Item
            name="username"
            required={true}
          >
            <Input
              placeholder="Login"
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            name="password"
            required={true}
          >
            <Input
              type={'password'}
              placeholder="Пароль"
              maxLength={10}
            />
          </Form.Item>


          <Button
            loading={isLoading}
            type={"primary"}
            htmlType={"submit"}
            style={{
              width: "100%",
            }}
          >
            Войти
          </Button>
        </Form>
      </div>
    </MaxWithLayout>
  );
};

export default LoginContent;
