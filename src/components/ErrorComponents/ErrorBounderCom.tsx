// Using shadcn/ui for styling (adjust as needed)
import { Button } from 'antd';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function ErrorBounderCom({
  children,
}: {
  children: React.ReactNode;
}) {
  function Fallback({ error, resetErrorBoundary }: any) {
    console.error('🚀 ~ Fallback Error:', error);

    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-6 text-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            Oops! Something went wrong.
          </h2>
          <p className="mb-4 text-gray-600">
            We encountered an unexpected error. Please try again.
          </p>
          <pre className="mb-4 max-h-40 overflow-auto rounded-md bg-red-100 p-3 text-sm text-red-600">
            {error?.message}
          </pre>
          <div className="flex items-center justify-between gap-2">
            <Button onClick={resetErrorBoundary} className="w-full">
              <Link className="flex items-center gap-1" to={'/'}>
                <IoMdArrowRoundBack /> Back
              </Link>
            </Button>
            <Button onClick={resetErrorBoundary} className="w-full">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const logError = (error: any) => {
    console.error('🚀 ~ logError:', error);
    // Log error to an external API if needed
  };

  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => {
        console.log('🚀 ~ Resetting Error Boundary');
      }}
      onError={logError}
    >
      {children}
    </ErrorBoundary>
  );
}
