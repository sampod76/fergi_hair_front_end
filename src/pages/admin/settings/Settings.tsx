import { ENUM_USER_ROLE } from '@local-types/userTypes';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Settings() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div>
      <div className="mx-auto space-y-4">
        {/* Personal Information */}
        <div className="rounded-lg border-t border-gray-200">
          <Link className="!text-black" to={`/${user?.role}/profile`}>
            <button className="w-full bg-bgd2 px-6 py-4 text-left hover:bg-gray-400 focus:outline-none">
              Personal Information
              <span className="float-right">➔</span>
            </button>
          </Link>
        </div>

        {/* Change Password */}
        <div className="rounded-lg border-t border-gray-200">
          <Link className="!text-black" to={`/${user?.role}/change-password`}>
            <button className="w-full bg-bgd2 px-6 py-4 text-left hover:bg-gray-400 focus:outline-none">
              Change Password
              <span className="float-right">➔</span>
            </button>
          </Link>
        </div>
        {/* Terms & Condition */}
        {user?.role === ENUM_USER_ROLE.admin && (
          <div className="rounded-lg border-t border-gray-200">
            <Link
              className="!text-black"
              to={`/${user?.role}/terms-conditions`}
            >
              <button className="w-full bg-bgd2 px-6 py-4 text-left hover:bg-gray-400 focus:outline-none">
                Terms & Condition
                <span className="float-right">➔</span>
              </button>
            </Link>
          </div>
        )}

        {/* Privacy Policy */}
        {user?.role === ENUM_USER_ROLE.admin && (
          <div className="rounded-lg border-t border-gray-200">
            <Link className="!text-black" to={`/${user?.role}/privacy-policy`}>
              <button className="w-full bg-bgd2 px-6 py-4 text-left hover:bg-gray-400 focus:outline-none">
                Privacy Policy
                <span className="float-right">➔</span>
              </button>
            </Link>
          </div>
        )}

        {/* About Us */}
        {user?.role === ENUM_USER_ROLE.admin && (
          <div className="rounded-lg border-b border-t border-gray-200">
            <Link className="!text-black" to={`/${user?.role}/about-us`}>
              <button className="w-full bg-bgd2 px-6 py-4 text-left hover:bg-gray-400 focus:outline-none">
                About Us
                <span className="float-right">➔</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
