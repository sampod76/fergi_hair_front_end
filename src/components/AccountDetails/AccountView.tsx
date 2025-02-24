import { UserProfile } from '@components/DemoData/AccountData';

export default function AccountView({ user }: { user: UserProfile }) {
  return (
    <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg">
      {/* Profile Header */}
      <div className="text-center">
        <img
          className="mx-auto h-20 w-20 rounded-full border-2 border-gray-200"
          src={user.profileImage.url}
          alt="Profile"
        />
        <h2 className="mt-4 text-lg font-semibold">{user.name}</h2>
      </div>

      {/* Profile Details */}
      <div className="mt-6 space-y-3 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-800">Account Status:</span>{' '}
          {user.accountStatus}
        </div>
        <div>
          <span className="font-medium text-gray-800">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-medium text-gray-800">Contact:</span>{' '}
          {user.contact}
        </div>
        <div>
          <span className="font-medium text-gray-800">Location:</span>{' '}
          {user.location}
        </div>
        <div>
          <span className="font-medium text-gray-800">Gender:</span>{' '}
          {user.gender}
        </div>
        <div>
          <span className="font-medium text-gray-800">Age:</span> ± {user.age}
        </div>
        <div>
          <span className="font-medium text-gray-800">Purchased Package:</span>{' '}
          {user.purchasedPackage}
        </div>
        <div>
          <span className="font-medium text-gray-800">Passport ID:</span>{' '}
          {user.passportID}
        </div>
      </div>

      {/* Passport Image */}
      <div className="mt-6 text-center">
        <img
          className="w-full rounded-lg"
          src={user.passportImage.url}
          alt="Passport"
        />
      </div>

      {/* Block Button */}
      <button className="mt-6 w-full rounded-lg bg-red-500 py-2 font-medium text-white transition hover:bg-red-600">
        Block
      </button>
    </div>
  );
}
