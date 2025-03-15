import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { searchPlugin } from '@react-pdf-viewer/search';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import React, { useEffect } from 'react';

interface PDFViewerProps {
  file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  // console.log('🚀 ~ file:', file);
  // Initialize plugins
  const defaultLayout = defaultLayoutPlugin();
  const search = searchPlugin();
  const zoom = zoomPlugin();
  const fullScreen = fullScreenPlugin();
  const pageNavigation = pageNavigationPlugin();

  // UseEffect to set the initial zoom level to 100% after the component mounts
  useEffect(() => {
    const zoomTo100 = zoom.zoomTo;
    zoomTo100(1); // 1 is 100% scale
  }, [zoom]);

  return (
    <div style={{ height: '90vh' }}>
      <Viewer
        fileUrl={file}
        plugins={[
          defaultLayout, // Adds a toolbar with default controls
          search, // Enables text search functionality
          zoom, // Adds zoom controls
          fullScreen, // Enables full-screen mode
          pageNavigation, // Adds page navigation
        ]}
      />
    </div>
  );
};

export default PDFViewer;
