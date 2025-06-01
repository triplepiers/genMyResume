'use client'
import { useState } from 'react';

import { createWorker } from 'tesseract.js';
import * as pdfJS from 'pdfjs-dist/legacy/build/pdf.mjs';
pdfJS.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

import mammoth from 'mammoth';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';
const { Dragger } = Upload;

export default function Test(props: any[]) {
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // 上传前 => 检查文件格式
  const checkFormat = (file: any) => {
    const allowed =
      file.type === 'application/pdf' || // PDF
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; // DOCX
    if (!allowed) {
      messageApi.error(`${file.name} is not a DOCX/PDF file`);
    } else {
      setFileList([file]);
    }
    return allowed || Upload.LIST_IGNORE;
  }

  // 转换文件
  const convertFile = async () => {
    let fType = fileList[0].type;
    let res;

    setIsLoading(true);
    messageApi.loading('Parsing file ...', 0);

    if (fType === 'application/pdf') {
      res = await convertPDF(await readFile(fileList[0]));
    } else {
      res = await convertDocx(fileList[0]);
    }
    console.log(res);

    setIsLoading(false);
    messageApi.destroy();
    
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
    return pdfJS.getDocument({ data: file }).promise;
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
            overflow-x-hidden pt-10 relative flex flex-col gap-2 items-center'>
        <Dragger
          fileList={fileList}
          // 限制一下能选的文件
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf"
          maxCount={1}
          // 显示一下文件大小
          showUploadList={{
            extra: ({ size = 0 }) => (
              <span style={{ color: '#aaa' }}> ({(size / 1024 / 1024).toFixed(2)}MB)</span>
            ),
            showRemoveIcon: false
          }}
          beforeUpload={checkFormat}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Drag a file here / Click to select</p>
          <p className="ant-upload-hint">
            We can read DOC, DOCX, PDF format
          </p>
        </Dragger>
        <Button style={{ backgroundColor: 'var(--hilight)', fontWeight: 700 }}
          onClick={convertFile} disabled={fileList.length === 0 || isLoading}>
          Next
        </Button>
      </div >
    </>
  )
}