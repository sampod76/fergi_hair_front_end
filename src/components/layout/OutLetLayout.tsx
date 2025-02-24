import { Outlet } from 'react-router-dom';

export default function OutLateLayout({
  option,
}: {
  option?: { shoping: boolean };
}) {
  return (
    <>
      <Outlet />
    </>
  );
}
