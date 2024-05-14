'use client';
import { convertBlob } from '@/utils/helper';
import { ComponentPropsWithoutRef, useState } from 'react';
import Image from 'next/image';
import Icon from '../Icon';

export type FileProps = {
  image: string;
  file: File | null;
  error: string;
};

type FileUploaderProps = ComponentPropsWithoutRef<'input'> & {
  maxSize: number;
  instruction: string;
  placeholder: string;
  percent?: number;
  uploaded?: FileProps;
  onUpload: (file: File | null, image: string, error: string) => void;
};

const FileUploader = ({
  maxSize,
  placeholder,
  instruction,
  percent,
  uploaded,
  onUpload,
  ...props
}: FileUploaderProps) => {
  const [error, setError] = useState('');
  const [filename, setFilename] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [filesize, setFilesize] = useState(0);

  const waitImage = async (file: File) => {
    if (props.accept == 'image/*') {
      setShowImage(false);
      const src = await convertBlob(file);
      setImage(src);
      setShowImage(true);
      return src;
    }
    return '';
  };

  const getFile = async (target: HTMLInputElement) => {
    setShowFile(false);
    if (target.files) {
      const file = target.files[0];
      const fileSize = Math.round((file.size / 1024) * 100) / 100;
      const fileName = file?.name;
      if (fileSize > maxSize) {
        const err = `maximum file size is ${maxSize} KB, while your upload size is ${fileSize} KB`;
        setError(err);
        onUpload(null, '', err);
        return;
      }
      setIsLoading(true);
      setShowFile(true);
      const src = await waitImage(file);

      setError('');
      setFilesize(Math.round(fileSize));
      setFilename(fileName);
      onUpload(file, src, '');
      if (fileSize < 2000) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <div className="flex items-center gap-3.5 text-dark-gray text-xs">
        <label
          htmlFor={props.id}
          className="w-28 h-9 grid place-items-center cursor-pointer rounded-lg border border-primary text-primary hover:border-primary-dark hover:text-primary-dark active:border-primary-darker active:text-primary-darker transition-colors duration-300 font-poppins font-semibold"
        >
          {placeholder}
          <input
            type="file"
            name={props.name}
            className="hidden"
            onInput={({ target }) => {
              getFile(target as HTMLInputElement);
            }}
            {...props}
          />
        </label>
        <span>{instruction}</span>
      </div>
      {error !== '' || (uploaded && uploaded.error !== '') ? (
        <span className="text-danger text-xs">
          {uploaded && uploaded.error !== '' ? uploaded.error : error}
        </span>
      ) : (
        (showFile || (uploaded && uploaded.file)) && (
          <div className="mt-3 border border-gray-light rounded-lg px-3 py-3.5 flex gap-2.5 items-center">
            <div className="w-12 h-12 bg rounded-lg overflow-hidden grid place-items-center [&>div]:grid [&>div]:place-items-center">
              {isLoading ? (
                <div className="animate-pulse bg-gray-cart w-full h-full">
                  <Icon name="ImageUp" className="w-6 h-6" />
                </div>
              ) : props.accept?.includes('image') &&
                (showImage || (uploaded && uploaded.image) !== '') ? (
                <Image
                  src={
                    uploaded && uploaded.image !== '' ? uploaded.image : image
                  }
                  width={48}
                  height={48}
                  alt="uploaded-image"
                  className="object-contain object-center w-4/5 h-4/5"
                ></Image>
              ) : (
                <div className="bg-primary/20 w-full h-full">
                  <Icon
                    name="FileCheck2"
                    className="w-6 h-6 stroke-primary-dark"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-[calc(100%-58px)] overflow-hidden">
              <div className="w-full flex justify-between items-center font-medium gap-2">
                <span className="text-dark text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  {(uploaded && uploaded.file?.name) || filename}
                </span>
                <span className="text-dark-gray text-xs min-w-fit whitespace-nowrap">
                  {uploaded && uploaded.file
                    ? Math.round((uploaded.file.size / 1024) * 100) / 100
                    : filesize}{' '}
                  KB
                </span>
              </div>
              <div className="bg-gray-light h-1 w-full relative [&>*]:inset-y-0 [&>*]:absolute [&>*]:bg-primary">
                <span style={{ width: `${percent}%` }}></span>
                <span
                  className={`duration-1000 origin-left w-full ${showFile && isLoading ? 'scale-x-50 transition-none' : (showFile || (uploaded && uploaded.file != null)) && !isLoading ? 'transition-transform scale-x-100' : 'scale-x-0'}`}
                ></span>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default FileUploader;
