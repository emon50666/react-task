import  { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";

const TShirtDesign = () => {
  const [firstImage, setFirstImage] = useState(null); 
  const [secondImage, setSecondImage] = useState(null); 
  const [secondImagePosition, setSecondImagePosition] = useState({ x: 100, y: 100 }); 
  const [secondImageSize, setSecondImageSize] = useState({ width: 100, height: 100 }); 
  const tShirtRef = useRef(); 

  // Handle the first image (T-shirt background) upload
  const handleFirstImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFirstImage(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  // Handle the second image (Logo) upload
  const handleSecondImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSecondImage(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  // Download the final image (combined first and second images)
  const downloadImage = async () => {
    if (!tShirtRef.current) return;
    const canvas = await html2canvas(tShirtRef.current, {
      useCORS: true, 
    });
    const link = document.createElement("a");
    link.download = "T-Shirt.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // Dropzone for the first image (T-shirt background)
  const { getRootProps: getTShirtRootProps, getInputProps: getTShirtInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        handleFirstImageUpload(acceptedFiles[0]);
      }
    },
    accept: "image/*",
  });

  // Dropzone for the second image (Logo)
  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        handleSecondImageUpload(acceptedFiles[0]);
      }
    },
    accept: "image/*",
  });

  return (
    <div className="p-4 max-w-full bg-[#fbf9f9] rounded-md">
      <h1 className="text-xl font-bold mb-4 text-center">T-Shirt Design</h1>

      {/* First Image Dropzone */}
      <div className="flex flex-col gap-4 sm:flex-row mb-4">
        <div className="w-full sm:w-1/2 p-4 border-2 border-gray-200 cursor-pointer rounded-md" {...getTShirtRootProps()}>
          <input {...getTShirtInputProps()} />
          <p className="text-center">Predefined  T-Shirt Image</p>
          {firstImage && (
            <img
              src={firstImage}
              alt="First Image"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Second Image Dropzone */}
        <div className="w-full sm:w-1/2 p-4 border-2 border-gray-200 cursor-pointer rounded-md" {...getLogoRootProps()}>
          <input {...getLogoInputProps()} />
          <p className="text-center">Upload Logo</p>
          {secondImage && (
            <img
              src={secondImage}
              alt="Second Image"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {/* T-Shirt Preview */}
      <div
        className="relative bg-gray-100 border-2 border-dashed rounded-md border-gray-200"
        style={{
          width: "100%",
          height: "300px", 
          maxWidth: "400px", 
          margin: "auto",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        ref={tShirtRef} 
      >
        
        {firstImage && (
          <img
            src={firstImage}
            alt="T-shirt Background"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        )}

        {/* Draggable and Resizable Second Image (Logo) */}
        {secondImage && (
          <Rnd
            size={{ width: secondImageSize.width, height: secondImageSize.height }}
            position={{ x: secondImagePosition.x, y: secondImagePosition.y }}
            onDragStop={(e, d) => {
              setSecondImagePosition({ x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setSecondImageSize({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
              });
              setSecondImagePosition(position);
            }}
            bounds="parent"
            lockAspectRatio={true} 
          >
            <img
              src={secondImage}
              alt="Logo"
              className=" object-contain"
            />
          </Rnd>
        )}
      </div>

      {/* Download Button */}
      <div className="mt-4 text-center">
        <button
          onClick={downloadImage}
          className="bg-black text-white px-6 py-2 rounded hover:bg-black/90"
        >
          Download Final Image
        </button>
      </div>
    </div>
  );
};

export default TShirtDesign;
