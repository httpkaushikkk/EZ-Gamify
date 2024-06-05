import React from "react";

interface EditInterface {}

const Edit: React.FC<EditInterface> = ({ params }: any) => {
  return (
    <div>
      <p>{params.slug}</p>
    </div>
  );
};

export default Edit;
