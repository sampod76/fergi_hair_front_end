import React from 'react';
import { useParams } from 'react-router-dom';

export default function VideoAndFormView() {
  const { fileId } = useParams();

  return <div>VideoAndFormView</div>;
}
