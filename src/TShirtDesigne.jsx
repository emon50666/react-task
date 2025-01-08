import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";

const TShirtDesigner = () => {
  const [firstImage, setFirstImage] = useState(null); // State for the first image (T-shirt background)
  const [secondImage, setSecondImage] = useState(null); // State for the second image (Logo)
  const [secondImagePosition, setSecondImagePosition] = useState({ x: 100, y: 100 }); // Position for the logo
  const [secondImageSize, setSecondImageSize] = useState({ width: 100, height: 100 }); // Size for the logo
  const tShirtRef = useRef(); // Ref for capturing the final image

  // Handle the first image (T-shirt background) upload
  const handleFirstImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFirstImage(reader.result); // Set the first image as base64
    };
    reader.readAsDataURL(file);
  };

  // Handle the second image (Logo) upload
  const handleSecondImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSecondImage(reader.result); // Set the second image as base64 (logo)
    };
    reader.readAsDataURL(file);
  };

  // Download the final image (combined first and second images)
  const downloadImage = async () => {
    if (!tShirtRef.current) return;
    const canvas = await html2canvas(tShirtRef.current, {
      useCORS: true, // Handle cross-origin images
    });
    const link = document.createElement("a");
    link.download = "final_tshirt_design.png";
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
    <div className="p-4 max-w-full">
      <h1 className="text-xl font-bold mb-4 text-center">T-Shirt Designer</h1>

      {/* First Image Dropzone */}
      <div className="flex flex-col gap-4 sm:flex-row mb-4">
        <div className="w-full sm:w-1/2 p-4 border-2 border-gray-300" {...getTShirtRootProps()}>
          <input {...getTShirtInputProps()} />
          <p className="text-center">Drag & drop a T-shirt image here (First Image)</p>
          {firstImage && (
            <img
              src={firstImage}
              alt="First Image"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Second Image Dropzone */}
        <div className="w-full sm:w-1/2 p-4 border-2 border-gray-300" {...getLogoRootProps()}>
          <input {...getLogoInputProps()} />
          <p className="text-center">Drag & drop a logo image here (Second Image)</p>
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
        className="relative bg-gray-100 border-2 border-gray-300"
        style={{
          width: "100%",
          height: "300px", // Adjust height to be mobile friendly
          maxWidth: "400px", // Limit max width for large screens
          margin: "auto",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        ref={tShirtRef} // Reference for final image capture
      >
        {/* First Image (T-shirt background) */}
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
            lockAspectRatio={true} // Maintain aspect ratio
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
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Download Final Image
        </button>
      </div>
    </div>
  );
};

export default TShirtDesigner;
