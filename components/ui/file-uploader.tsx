"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface FileUploaderProps {
  onUpload: (files: File[]) => void
  acceptedFileTypes?: string[]
  maxFileSize?: number // in MB
  multiple?: boolean
}

export function FileUploader({
  onUpload,
  acceptedFileTypes = [],
  maxFileSize = 5,
  multiple = false,
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    let validFiles: File[] = []
    let errors: string[] = []

    files.forEach((file) => {
      // Check file type
      if (
        acceptedFileTypes.length > 0 &&
        !acceptedFileTypes.some((type) => file.name.toLowerCase().endsWith(type))
      ) {
        errors.push(`${file.name}: Invalid file type`)
        return
      }

      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        errors.push(`${file.name}: File size exceeds ${maxFileSize}MB`)
        return
      }

      validFiles.push(file)
    })

    if (errors.length > 0) {
      setError(errors.join(", "))
      return
    }

    setError("")
    setSelectedFiles(validFiles)
    onUpload(validFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    onUpload(newFiles)
  }

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {acceptedFileTypes.join(", ")} up to {maxFileSize}MB
          </p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept={acceptedFileTypes.join(",")}
        multiple={multiple}
      />

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span className="text-sm truncate max-w-[200px]">
                {file.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 