import { ArrowCircleUp, CloseSmall, Left, More } from "@icon-park/react";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  Typography,
  Space,
} from "@arco-design/web-react";
import _ from "lodash";

export interface FormData {
  name?: string;
  serial?: string;
  campaign?: string;
  school?: string;
  grade?: string;
  major?: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormData>();
  const [avatar, setAvatar] = useState<string>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAvatar(localStorage.getItem("avatar") ?? undefined);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Fake Pass</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon-precomposed" href="icon.png" />
        <link rel="icon" href="icon.png" />
      </Head>
      <h1 className="text-3xl text-center">离校证明生成器</h1>
      <Form
        className="mt-10"
        style={{ width: "90%" }}
        form={form}
        initialValues={
          typeof window !== "undefined"
            ? (JSON.parse(
                window.localStorage.getItem("formData") ?? "{}"
              ) as FormData)
            : {}
        }
      >
        <Form.Item label="头像">
          <Upload
            listType="picture-card"
            fileList={
              avatar
                ? [
                    {
                      uid: "-1",
                      url: avatar,
                      name: "avatar",
                    },
                  ]
                : []
            }
            onChange={(files) => {
              if (!files.length) {
                setAvatar(undefined);
                return;
              }
              const file = files[0].originFile as File;
              const reader = new FileReader();
              reader.onload = () => {
                setAvatar(reader.result?.toString());
              };
              reader.readAsDataURL(file);
            }}
            autoUpload={false}
            limit={1}
          />
        </Form.Item>
        <Form.Item field="name" label="姓名">
          <Input placeholder="张麻子" />
        </Form.Item>
        <Form.Item field="serial" label="学号">
          <Input placeholder="2021xxxxxx" />
        </Form.Item>
        <Form.Item field="campaign" label="校区">
          <Input placeholder="长安校区" />
        </Form.Item>
        <Form.Item field="school" label="学院">
          <Input placeholder="魔法学院" />
        </Form.Item>
        <Form.Item field="grade" label="年级">
          <Input placeholder="2021" />
        </Form.Item>
        <Form.Item field="major" label="专业">
          <Input placeholder="国际法" />
        </Form.Item>
        <Form.Item label="操作">
          <Space>
            <Button
              type="primary"
              onClick={() => {
                form.validate().then((val) => {
                  window.localStorage.setItem("formData", JSON.stringify(val));
                  avatar && window.localStorage.setItem("avatar", avatar);
                  router.push("/pass");
                });
              }}
            >
              提交
            </Button>
            <Button
              status="danger"
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default Home;
