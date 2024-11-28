import { createContext, useState } from "react";

type FileUploadContextType = {
    file: File | null;
    fileError: string | null;
    filePreview: string | null;
    setFilePreview: (preview: string) => void;
    handleNewFile: (file: File) => void;
    handleFileError: (error: string) => void;
    handleRemoveFile: () => void;
    handleMaxSizeChange: (size: number) => void;
};

export const FileUploadContext = createContext<FileUploadContextType>({
    file: null,
    fileError: null,
    filePreview: null,
    setFilePreview: () => {},
    handleNewFile: () => {},
    handleFileError: () => {},
    handleRemoveFile: () => {},
    handleMaxSizeChange: () => {},
});

function FileUploadProvider({ children }: { children: React.ReactNode }) {
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [maxFileSize, setMaxFileSize] = useState<number>(10 * 1024 * 1024);

    const handleNewFile = (file: File) => {
        const error = uploadFileValidation(file);
        if (error) {
            handleFileError(error);
            return;
        }

        setFile(file);
        setFileError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileError(null);
        setFilePreview(null);
    };

    const handleFileError = (error: string) => {
        setFile(null);
        setFilePreview(null);
        setFileError(error);
    };

    const handleMaxSizeChange = (size: number) => {
        setMaxFileSize(size * 1024 * 1024);
    };

    const uploadFileValidation = (file: File) => {
        if (file.size > maxFileSize) {
            return "exceeded the max size";
        }

        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            return "wrong file format";
        }
    };

    return (
        <FileUploadContext.Provider
            value={{
                file,
                fileError,
                filePreview,
                setFilePreview,
                handleNewFile,
                handleFileError,
                handleRemoveFile,
                handleMaxSizeChange,
            }}
        >
            {children}
        </FileUploadContext.Provider>
    );
}

export default FileUploadProvider;
