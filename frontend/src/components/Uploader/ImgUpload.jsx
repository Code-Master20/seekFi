import { RiImageEditLine } from "react-icons/ri";
import { useRef } from "react";

export const ImageUpload = ({ Icon, className }) => {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click(); // triggers file input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div className={className}>
      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Clickable Icon */}
      <Icon size={25} style={{ cursor: "pointer" }} onClick={handleIconClick} />
    </div>
  );
};
