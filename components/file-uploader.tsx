"use client";

import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface FileUploaderProps {
  onUpload: Function
}

export function FileUploader({ onUpload }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles?.length) onUpload(acceptedFiles[0]);
  }, []);

  const {
    getRootProps, 
    getInputProps
  } = useDropzone(
    {
      onDrop,
      multiple: false
    }
  );

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div 
        className="py-12 md:py-16 lg:py-20 text-center text-lg text-muted-foreground cursor-pointer \
        border-4 border-dashed border-black/10 rounded-md bg-accent"
      >
        <p>Upload a song to onvert</p>
        <p>(MP3, WAV, FLAC, M4A)</p>
      </div>
    </div>
  )
}