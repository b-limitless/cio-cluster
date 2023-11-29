import React, { ChangeEvent } from "react";

interface HandleMediaChange {
    (event: ChangeEvent<HTMLInputElement>, 
        setError: Function, 
        setImage: Function): void;
  }

export const handleMediaChange: HandleMediaChange = (
  event,
  setError,
  setImage) => {

  setError(null);
  const file = event.target.files && event.target.files[0];

  const allowedTypes = ["image/jpeg", "image/png", , "image/webp"]; // Add more allowed types if needed
  const maxFileSizeKB = 1024 * 1024 * 3; // Maximum allowed file size in kilobytes (1MB * 3)

  if (!file) {
    setError("Please select a file");
    return;
  }

  if (file.size > maxFileSizeKB) {
    setError(`File size exceeds, Only ${maxFileSizeKB / 1024} MB allowed`);
    return;
  }

  if (!allowedTypes.includes(file.type)) {
    setError(
      `Invalid image type, only jpeg, png, gif, webp extension is allwoed`
    );
    return;
  }

  // Validate before setting to state
  console.log("file",file)

  if (file) {
    setImage(file);
    setError(null);
  }
};
