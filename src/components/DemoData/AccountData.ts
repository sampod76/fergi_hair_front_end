import { IFileAfterUpload } from '@local-types/globalType';

export interface ProfileImage {
  url: string;
}

export interface UserProfile {
  serial: string;
  name: string;
  accountStatus: string;
  email: string;
  contact: string;
  location: string;
  gender: string;
  age: number;
  purchasedPackage: string;
  joinDate: string;
  passportID: string;
  profileImage: Partial<IFileAfterUpload>;
  passportImage: Partial<IFileAfterUpload>;
}

export const AccountData: UserProfile[] = [
  {
    serial: 'INV0001',
    name: 'Akash Sharif',
    accountStatus: 'User',
    email: 'info@gmail.com',
    contact: '+56447516134',
    location: 'NY City, USA',
    gender: 'Male',
    age: 52,
    purchasedPackage: 'Annual',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '920000018',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0002',
    name: 'Maria Johnson',
    accountStatus: 'User',
    email: 'maria.johnson@example.com',
    contact: '+1234567890',
    location: 'London, UK',
    gender: 'Female',
    age: 34,
    purchasedPackage: 'Monthly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '830000123',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0003',
    name: 'Liam Carter',
    accountStatus: 'Admin',
    email: 'liam.carter@example.com',
    contact: '+9876543210',
    location: 'Toronto, Canada',
    gender: 'Male',
    age: 29,
    purchasedPackage: 'Lifetime',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '550000987',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0004',
    name: 'Sophia Martinez',
    accountStatus: 'User',
    email: 'sophia.martinez@example.com',
    contact: '+6543217890',
    location: 'Sydney, Australia',
    gender: 'Female',
    age: 41,
    purchasedPackage: 'Quarterly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '110000222',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0005',
    name: 'James Kim',
    accountStatus: 'Moderator',
    email: 'james.kim@example.com',
    contact: '+4455667788',
    location: 'Seoul, South Korea',
    gender: 'Male',
    age: 36,
    purchasedPackage: 'Weekly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '990000444',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0006',
    name: 'Emily Brown',
    accountStatus: 'User',
    email: 'emily.brown@example.com',
    contact: '+1122334455',
    location: 'Paris, France',
    gender: 'Female',
    age: 30,
    purchasedPackage: 'Annual',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '770000555',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0007',
    name: 'Chris Lee',
    accountStatus: 'User',
    email: 'chris.lee@example.com',
    contact: '+9988776655',
    location: 'Tokyo, Japan',
    gender: 'Male',
    age: 45,
    purchasedPackage: 'Monthly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '880000666',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0008',
    name: 'Isabella Garcia',
    accountStatus: 'Admin',
    email: 'isabella.garcia@example.com',
    contact: '+4433221100',
    location: 'Berlin, Germany',
    gender: 'Female',
    age: 28,
    purchasedPackage: 'Lifetime',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '660000777',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0009',
    name: 'Mason Evans',
    accountStatus: 'User',
    email: 'mason.evans@example.com',
    contact: '+9988112233',
    location: 'Rio de Janeiro, Brazil',
    gender: 'Male',
    age: 39,
    purchasedPackage: 'Quarterly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '550000888',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0010',
    name: 'Olivia Rodriguez',
    accountStatus: 'User',
    email: 'olivia.rodriguez@example.com',
    contact: '+8877665544',
    location: 'Dubai, UAE',
    gender: 'Female',
    age: 33,
    purchasedPackage: 'Weekly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '330000999',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0011',
    name: 'Noah Wilson',
    accountStatus: 'User',
    email: 'noah.wilson@example.com',
    contact: '+6655443322',
    location: 'Mumbai, India',
    gender: 'Male',
    age: 31,
    purchasedPackage: 'Annual',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '220000111',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0012',
    name: 'Ava Smith',
    accountStatus: 'User',
    email: 'ava.smith@example.com',
    contact: '+7766554433',
    location: 'Cape Town, South Africa',
    gender: 'Female',
    age: 27,
    purchasedPackage: 'Monthly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '990000222',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0013',
    name: 'Ethan Turner',
    accountStatus: 'Moderator',
    email: 'ethan.turner@example.com',
    contact: '+5544332211',
    location: 'Madrid, Spain',
    gender: 'Male',
    age: 40,
    purchasedPackage: 'Lifetime',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '880000333',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0014',
    name: 'Charlotte White',
    accountStatus: 'User',
    email: 'charlotte.white@example.com',
    contact: '+6677889900',
    location: 'Vienna, Austria',
    gender: 'Female',
    age: 35,
    purchasedPackage: 'Quarterly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '550000444',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0015',
    name: 'Logan Scott',
    accountStatus: 'User',
    email: 'logan.scott@example.com',
    contact: '+3344556677',
    location: 'Jakarta, Indonesia',
    gender: 'Male',
    age: 43,
    purchasedPackage: 'Weekly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '440000555',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0016',
    name: 'Amelia Hughes',
    accountStatus: 'Admin',
    email: 'amelia.hughes@example.com',
    contact: '+2211334455',
    location: 'Bangkok, Thailand',
    gender: 'Female',
    age: 38,
    purchasedPackage: 'Annual',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '330000666',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0017',
    name: 'Jack Reed',
    accountStatus: 'User',
    email: 'jack.reed@example.com',
    contact: '+9988774455',
    location: 'Warsaw, Poland',
    gender: 'Male',
    age: 37,
    purchasedPackage: 'Monthly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '990000777',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0018',
    name: 'Mia Phillips',
    accountStatus: 'User',
    email: 'mia.phillips@example.com',
    contact: '+5544221188',
    location: 'Rome, Italy',
    gender: 'Female',
    age: 25,
    purchasedPackage: 'Lifetime',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '770000888',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0019',
    name: 'Benjamin Harris',
    accountStatus: 'Moderator',
    email: 'benjamin.harris@example.com',
    contact: '+4455667788',
    location: 'Singapore',
    gender: 'Male',
    age: 44,
    purchasedPackage: 'Quarterly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '660000999',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
  {
    serial: 'INV0020',
    name: 'Ella Young',
    accountStatus: 'User',
    email: 'ella.young@example.com',
    contact: '+8877665533',
    location: 'Moscow, Russia',
    gender: 'Female',
    age: 26,
    purchasedPackage: 'Weekly',
    joinDate: '2024-08-08T10:35:14.281+00:00',
    passportID: '220000111',
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    passportImage: {
      url: 'https://images.unsplash.com/photo-1593781493209-823f48853130?q=80&w=500',
    },
  },
];
