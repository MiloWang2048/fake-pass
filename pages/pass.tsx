import { ArrowCircleUp, CloseSmall, Left, More } from "@icon-park/react";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useDeferredValue, useEffect, useState } from "react";
import type { FormData } from ".";

const Pass: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>();
  const [avatar, setAvatar] = useState<string>();
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(new Date().toLocaleString());
    if (typeof window !== "undefined") {
      setFormData(
        JSON.parse(localStorage.getItem("formData") ?? "{}") as FormData
      );
      setAvatar(localStorage.getItem("avatar") ?? undefined);
    }
  }, []);
  const back = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="bg-blue-400 flex justify-between p-3.5 text-white">
          <Left theme="outline" size="24" onClick={back} />
          <div>移动管理</div>
          <More theme="outline" size="24" />
        </div>
        <div className="bg-emerald-500 grow text-center text-white relative">
          <div className="text-3xl font-bold mt-8 mb-2">出校通行卡</div>
          <div className="font-bold">疫情防控，人人有责</div>
          <div className="mt-8 bg-white mx-10 rounded-2xl pb-2">
            <div className="bg-emerald-400 rounded-b-full mx-5 py-1 font-bold">
              出校信息确认
            </div>
            <div className="text-gray-900 flex mt-5">
              <div className="w-20 h-30 ml-10 mr-3 relative overflow-hidden rounded">
                <Image src={avatar ?? ""} alt="" layout="fill" />
              </div>
              <div className="text-left">
                <div className="text-gray-900 font-bold">
                  {formData?.name}-{formData?.serial}
                </div>
                <div className="text-gray-500 text-sm">
                  <div>{formData?.campaign}</div>
                  <div>{formData?.school}</div>
                  <div>{`${formData?.grade}${formData?.major}`}</div>
                </div>
              </div>
            </div>
            <ArrowCircleUp
              className="text-emerald-500 my-8 inline-block animate-scale"
              strokeWidth={3}
              theme="outline"
              size="180"
            />
            <div className="text-emerald-500">
              <div className="text-4xl font-bold mb-2">出校</div>
              {/* <div className="font-bold">申请出校已批准</div> */}
            </div>
            <div className="text-gray-500 mt-1 text-sm">出校时间：{time}</div>
          </div>
          <div
            className="absolute border rounded-full left-10 bottom-10 right-10 py-1.5"
            onClick={back}
          >
            确定
          </div>
          <CloseSmall
            onClick={back}
            className="absolute top-2 right-2"
            theme="outline"
            size="45"
            strokeWidth={2}
          />
        </div>
      </div>
    </>
  );
};

export default Pass;
