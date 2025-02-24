import { AllImage } from '@assets/AllImge';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@components/ui/input-otp';
import {
  useForgetPasswordMutation,
  useSetOtpMutation,
} from '@redux/features/auth/authApi';
import { setToLocalStorage } from '@utils/local-storage';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, Row } from 'antd';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function VerifyOtpForm() {
  const [value, setValue] = useState<string>('');
  const [showRequired, setShowRequired] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email');

  const [verifyOtpForgotPassword, { isLoading: isVerifying }] =
    useSetOtpMutation();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleVerifyOtp = async () => {
    if (value?.length < 6) {
      setShowRequired(true);
      return;
    }
    if (!email) {
      ErrorModal('Email is required');
      navigate('/forgot-password');
      return;
    }
    setShowRequired(false);
    try {
      const res = await verifyOtpForgotPassword({
        email,
        otp: value,
      }).unwrap();
      console.log(res);
      SuccessModal('OTP verification successful');
      setToLocalStorage('reset-password-token', res?.token);
      navigate('/password-reset' + `?token=${res?.token}`);
    } catch (error) {
      ErrorModal(error);
    }
  };

  const sendResendOtp = async () => {
    try {
      if (!email) {
        ErrorModal('Email is required');
        navigate('/forgot-password');
        return;
      }
      setValue(''); // Reset OTP input value here
      const res = await forgetPassword({ email }).unwrap();
      SuccessModal('OTP sent successfully, please check your email');
    } catch (error) {
      ErrorModal(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-authBg">
      <Row
        style={{ borderRadius: '30px', background: 'white' }}
        justify="center"
        align="middle"
        className="mx-auto h-fit w-fit max-w-md rounded-2xl border p-5 shadow-xl"
      >
        <div className="flex flex-col items-center justify-center px-8 py-5">
          <div className="py-6">
            {/* <CustomImageTag
              src={AllImage.logoAndName}
              width={4000}
              height={4000}
              className="mx-auto h-40 w-80"
            /> */}
            <img src={AllImage.logoAndName} className="mx-auto h-32 w-80" />
          </div>
          <div className="flex flex-col items-center justify-center px-8 py-5">
            <div className="mb-6 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 font-sans text-lg font-bold">
                <Link className="text-black" to={'/forgot-password'}>
                  <FaArrowLeft
                    className="text-black"
                    style={{ fontSize: '15px' }}
                  />
                </Link>
                {'Email'}
              </div>
              <p className="my-3 text-center font-sans">
                {'Please enter the OTP we have sent you in your email'}.
              </p>
            </div>
            <div>
              <div className="w-max">
                <InputOTP
                  value={value} // Bind value to OTP input
                  onChange={setValue} // Handle OTP input changes
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup className="border-secondary-2 rounded-lg border">
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="border-secondary-2 h-[63px] w-[63px] border text-2xl font-bold"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {showRequired && (
                  <p className="text-danger mt-2 text-center">
                    Enter your one-time password correctly
                  </p>
                )}
                <Button
                  loading={isLoading}
                  onClick={sendResendOtp}
                  className="float-end mt-1 text-end text-blue-500"
                >
                  Re-Send
                </Button>
              </div>

              <Button
                className="mx-auto mt-8 h-[3rem] w-full border !bg-buttonBg !py-6 text-lg font-medium capitalize !text-buttonTextColor"
                onClick={handleVerifyOtp}
              >
                {isVerifying && (
                  <Loader size={20} className="mr-2 animate-spin" />
                )}
                Verify Email
              </Button>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}
