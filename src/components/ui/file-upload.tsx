import * as React from "react"
import { UploadCloud } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FileUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  description?: string
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, icon, description, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string | null>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0]
        setFileName(file.name)
        
        // Create a new event to trigger the onChange handler
        const event = {
          target: {
            files: e.dataTransfer.files
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>
        
        if (props.onChange) {
          props.onChange(event)
        }
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFileName(e.target.files[0].name)
      } else {
        setFileName(null)
      }
      
      if (props.onChange) {
        props.onChange(e)
      }
    }

    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full min-h-[150px] border-2 border-dashed rounded-md p-6 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-input bg-background",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          {icon || <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />}
          
          {fileName ? (
            <div className="mt-2">
              <p className="text-sm font-medium">{fileName}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click or drag to replace
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium mt-2">
                Click to upload or drag and drop
              </p>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload }
