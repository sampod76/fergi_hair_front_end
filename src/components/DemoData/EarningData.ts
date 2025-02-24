export interface IEarningData {
  serial: string; // Serial number of the user
  name: {
    firstName: string; // First name of the user
    lastName: string; // Last name of the user
  };
  profileImage: {
    url: string; // URL of the user's profileImage
  };
  email: string; // Email address of the user
  acc_number: string; // Account number
  amount: string; // Amount, formatted as a string (e.g., "$500")
  time_date: string; // Time and date in a formatted string
  payment_method: string; // Payment method used (e.g., PayPal, Credit Card)
  package: string; // Package type (e.g., Monthly, Yearly)
}

export const earningData: IEarningData[] = [
  {
    serial: 'INV0938',
    name: { firstName: 'Nothing', lastName: 'Studio' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@nothingstudio.com',
    acc_number: '+45484465446',
    amount: '$500',
    time_date: '02:29 PM, 15-08-2023',
    payment_method: 'PayPal',
    package: 'Monthly',
  },
  {
    serial: 'INV0939',
    name: { firstName: 'Bright', lastName: 'Tech' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@brighttech.com',
    acc_number: '+12345678901',
    amount: '$250',
    time_date: '11:15 AM, 10-09-2023',
    payment_method: 'Credit Card',
    package: 'Yearly',
  },
  {
    serial: 'INV0940',
    name: { firstName: 'Creative', lastName: 'Hub' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@creativehub.com',
    acc_number: '+98765432100',
    amount: '$800',
    time_date: '09:45 AM, 20-07-2023',
    payment_method: 'Stripe',
    package: 'Monthly',
  },
  {
    serial: 'INV0941',
    name: { firstName: 'Skyline', lastName: 'Agency' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@skylineagency.com',
    acc_number: '+65432109876',
    amount: '$300',
    time_date: '03:30 PM, 12-06-2023',
    payment_method: 'Bank Transfer',
    package: 'Yearly',
  },
  {
    serial: 'INV0942',
    name: { firstName: 'Visionary', lastName: 'Labs' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@visionarylabs.com',
    acc_number: '+87654321009',
    amount: '$1,000',
    time_date: '01:20 PM, 05-05-2023',
    payment_method: 'PayPal',
    package: 'Monthly',
  },
  {
    serial: 'INV0943',
    name: { firstName: 'Innovate', lastName: 'Co.' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@innovateco.com',
    acc_number: '+11223344556',
    amount: '$400',
    time_date: '08:10 AM, 01-10-2023',
    payment_method: 'Credit Card',
    package: 'Yearly',
  },
  {
    serial: 'INV0944',
    name: { firstName: 'Urban', lastName: 'Designs' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@urbandesigns.com',
    acc_number: '+33445566778',
    amount: '$600',
    time_date: '10:45 AM, 15-11-2023',
    payment_method: 'Stripe',
    package: 'Monthly',
  },
  {
    serial: 'INV0945',
    name: { firstName: 'Pioneer', lastName: 'Studio' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@pioneerstudio.com',
    acc_number: '+55667788990',
    amount: '$350',
    time_date: '12:30 PM, 05-12-2023',
    payment_method: 'Bank Transfer',
    package: 'Yearly',
  },
  {
    serial: 'INV0946',
    name: { firstName: 'Elite', lastName: 'Tech' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@elitetech.com',
    acc_number: '+99887766554',
    amount: '$750',
    time_date: '04:15 PM, 18-04-2023',
    payment_method: 'PayPal',
    package: 'Monthly',
  },
  {
    serial: 'INV0947',
    name: { firstName: 'Dynamic', lastName: 'Solutions' },
    profileImage: {
      url: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=500',
    },
    email: 'info@dynamicsolutions.com',
    acc_number: '+44332211000',
    amount: '$500',
    time_date: '02:00 PM, 22-01-2023',
    payment_method: 'Credit Card',
    package: 'Yearly',
  },
];
