'use client'

/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "@/lib/axios";

import { createWorker } from 'tesseract.js';
import mammoth from 'mammoth';

import { CircleCheck, NotebookPen } from 'lucide-react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';
const { Dragger } = Upload;

export default function Select(props: any[]) {
  const router = useRouter();
  const [PDFJS, setPDFJS] = useState<any>();

  useEffect(() => {
    // 在客户端动态加载，否则会报 500（DOMMatrix undefined)
    const loadPDFJS = async () => {
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf-dist/pdf.worker.min.mjs';
      setPDFJS(pdfjs);
    }
    loadPDFJS();
  }, [])

  const [messageApi, contextHolder] = message.useMessage();

  const [fileList, setFileList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fromScratch, setFromScratch] = useState(true);
  // 上传前 => 检查文件格式
  const checkFormat = (file: any) => {
    const allowed =
      file.type === 'application/pdf' || // PDF
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; // DOCX
    if (!allowed) {
      messageApi.error(`${file.name} is not a DOCX/PDF file`);
    } else {
      setFileList([file]);
      setFromScratch(false);
    }
    return allowed || Upload.LIST_IGNORE;
  }

  const removeFile = (file: any) => {
    setFileList([])
  }

  const goNext = async () => {
    if (fromScratch) {
      router.push('/checkout');
    } else if (fileList.length > 0) {
      let resume = await convertFile();
      axios.post('/tp/analyze', { resume })
        .then(res => res.status)
        .then(status => {
          setIsLoading(false);
          messageApi.destroy();
          if (status === 200) {
            messageApi.success('Successfully parsed', 3);
          } else if (status === 205) {
            messageApi.error('Fail to parse, create from scratch', 3);
          }
          setTimeout(() => {
            router.push('/checkout');
          }, 3500);
        })
    }
  }
  // 转换文件
  const convertFile = async () => {

    let fType = fileList[0].type;
    let res;

    setIsLoading(true);
    messageApi.loading('Analyzing your resume', 0);

    if (fType === 'application/pdf') {
      res = await convertPDF(await readFile(fileList[0]));
    } else {
      res = await convertDocx(fileList[0]);
    }

    return res;
  }

  // 读取 docx
  const convertDocx = async (file: any) => {
    const res = await mammoth.extractRawText({ arrayBuffer: file });
    return res.value; // 返回纯文本
  }

  // 读取文件
  const readFile = async (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("loadend", (event: any) =>
        resolve(new Uint8Array(event.target.result))
      );
      reader.readAsArrayBuffer(file);
    });
  }
  const loadPDF = async (file: any) => {
    return PDFJS.getDocument({ data: file }).promise;
  }
  const PDFToImage = async (pdf: any) => {
    const images = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      }).promise;
      images.push(canvas.toDataURL("image/png"));
    }
    return images;
  };
  const imgToText = async (images: any) => {
    const worker = await createWorker('eng', 1);
    let res = ""
    for (const image of images) {
      const {
        data: { text },
      } = await worker.recognize(image);
      res += text;
    }
    await worker.terminate();
    return res
  }
  const convertPDF = async (file: any) => {
    const pdf = await loadPDF(file);
    const imgs = await PDFToImage(pdf);
    let res = await imgToText(imgs);
    return res;
  }

  return (
    <>
      {contextHolder}
      <div id="container"></div>
      <div className='min-w-screen max-w-screen min-h-[calc(100vh-var(--header-height))]
            overflow-x-hidden py-10 relative flex flex-col gap-y-10 items-center justify-center'>
        <div className='flex flex-col items-center w-100%'>
          <h1 className='text-3xl font-bold text-center pb-2'>Do you have an existing resume?</h1>
          <div className='text-center'>If so, you can just review, edit, and update it with new information</div>
        </div>
        <div className='shrink-0 flex flex-wrap justify-center gap-10 w-100% pb-5'>
          <div className='flex-1 shrink-0 min-w-75 flex flex-col gap-y-2 items-center'>
            <div className={`text-xl font-bold flex gap-x-1 duration-100 ${!fromScratch ? 'text-[var(--green)]' : ''}`}>
              {!fromScratch ? <CircleCheck style={{ height: '1em' }} /> : ''}
              <div className='leading-none'>Upload Resume</div>
            </div>
            <Dragger
              className='h-full'
              fileList={fileList}
              // 限制一下能选的文件
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf"
              maxCount={1}
              // 显示一下文件大小
              showUploadList={{
                extra: ({ size = 0 }) => (
                  <span style={{ color: '#aaa' }}> ({(size / 1024 / 1024).toFixed(2)}MB)</span>
                ),
                // showRemoveIcon: false
              }}
              onRemove={removeFile}
              beforeUpload={checkFormat}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Drag a file here / Click to select</p>
              <p className="ant-upload-hint">
                We can read DOC, DOCX, PDF format
              </p>
            </Dragger>
          </div>
          <div className='cursor-pointer flex flex-col shrink-0 min-w-75 gap-y-2 items-center'
            onClick={() => {
              if (!fromScratch) setFromScratch(true);
            }}>
            <div className={`text-xl font-bold flex gap-x-1 duration-100 ${fromScratch ? 'text-[var(--green)]' : ''}`}>
              {fromScratch ? <CircleCheck style={{ height: '1em' }} /> : ''}
              <div className='leading-none'>Start from scratch</div>
            </div>
            <div className='h-full w-full bg-[#F4F5FA] rounded-lg border-1 border-dashed border-[#D9D9D9]
          flex flex-col items-center py-8'>
              <NotebookPen style={{ color: '#1777FF', height: '2.5em', width: '2.5em' }} />
              <div className='pt-5'>We'll guide you through</div>
              <div className='pt-2 text-[#868789] text-sm font-normal'>Thus your skills can shine</div>
            </div>
          </div>
        </div>
        <Button style={{ backgroundColor: 'var(--hilight)', fontWeight: 700 }}
          onClick={goNext} disabled={isLoading || (!fromScratch && fileList.length === 0)}>
          {fromScratch ? 'Next' : 'Analyze'}
        </Button>
      </div >
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      pageName: "Start",
    },
  };
}