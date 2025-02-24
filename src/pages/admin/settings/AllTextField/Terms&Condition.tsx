import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import TextEditorNotSetValue from '@components/ui/TextEditorNotSetForm';
import {
  useAddTextFiledMutation,
  useGetAllTextFiledQuery,
} from '@redux/features/admin/textFields';
import { selectCurrentUser } from '@redux/features/auth/authSlice';
import { useAppSelector } from '@redux/hooks';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button } from 'antd';

import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TermsAndCondition = () => {
  const user = useAppSelector(selectCurrentUser);
  const [addTextField, { isLoading: aLoaidng }] = useAddTextFiledMutation();
  const { data, isLoading, isFetching } = useGetAllTextFiledQuery({
    dataType: 'termsAndPolice',
  });
  const [textEditorValue, setTextEditorValue] = useState('');

  const getData = data?.data || [];
  useEffect(() => {
    if (getData?.length && getData[0].htmlText) {
      setTextEditorValue(getData[0].htmlText);
    }
  }, [isFetching, isLoading]);
  if (isLoading) {
    return <LoadingSkeleton sectionNumber={5} />;
  }

  // const editor = useRef(null);
  // const [content, setContent] = useState("");

  const handleOnSave = async () => {
    try {
      await addTextField({
        htmlText: textEditorValue,
        dataType: 'termsAndPolice',
      }).unwrap();
      SuccessModal('Successfully');
    } catch (error) {
      console.log('🚀 ~ handleOnSave ~ error:', error);
      ErrorModal(error);
    }
  };

  return (
    <div className="rounded-lg">
      <div className="mx-auto h-full rounded-lg p-4">
        <Link className="!text-black" to={`/${user?.role}/settings`}>
          <h1 className="flex items-center gap-2 py-4 text-2xl font-bold text-black">
            {' '}
            <FaArrowLeft className="mt-1" /> Terms And Police
          </h1>
        </Link>
        <div>
          <TextEditorNotSetValue
            setTextEditorValue={setTextEditorValue}
            defaultTextEditorValue={getData.length ? getData[0].htmlText : ''}
          />
        </div>
        <Button
          block
          loading={aLoaidng}
          onClick={handleOnSave}
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            padding: '1px',
            fontSize: '24px',
            color: 'white',
            height: '40px',
            border: 'none',
          }}
          className="!bg-bgd"
        >
          Save Changes
        </Button>
      </div>
      {/* {htmlPerser(getData.length ? getData[0].htmlText : "")} */}
    </div>
  );
};
export default TermsAndCondition;
