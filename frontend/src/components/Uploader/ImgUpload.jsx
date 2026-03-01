import { useRef } from "react";

export const ImageUpload = ({
  Icon,
  className,
  onFileSelect,
  accept = "image/*",
  multiple = false,
  size = 25,
}) => {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = multiple ? e.target.files : e.target.files[0];

    if (!files) return;

    if (onFileSelect) {
      onFileSelect(files);
    }

    // reset input so same file can be selected again
    e.target.value = "";
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Icon
        size={size}
        style={{ cursor: "pointer" }}
        onClick={handleIconClick}
      />
    </div>
  );
};
