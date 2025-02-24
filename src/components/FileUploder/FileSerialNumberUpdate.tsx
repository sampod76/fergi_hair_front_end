import LoadingSkeleton from '@components/ui/Loading/LoadingSkeleton';
import {
  useGetAllFileUploadQuery,
  useUpdateFileUploadSerialNumberMutation,
} from '@redux/features/admin/fileUpload';
import { ErrorModal, SuccessModal } from '@utils/modalHook';
import { Button, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
export default function FileSerialNumberUpdate() {
  const { fileType } = useParams();

  const [characters, updateCharacters] = useState<any[]>([]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, {
      ...reorderedItem,
      indexNumber: result.source.index,
    });
    updateCharacters(items);
  }
  const [updateSerialNumber, { isLoading: uLoading }] =
    useUpdateFileUploadSerialNumberMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(9999);
  const [sortBy, setSortBy] = useState<string>('serialNumber');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  //
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fileTypeGet, setFileType] = useState<string>(fileType || '');
  //
  const query: Record<string, any> = {};
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['fileType'] = fileTypeGet;
  query['searchTerm'] = searchTerm;
  const { data, isLoading } = useGetAllFileUploadQuery(query, {
    skip: !Boolean(fileTypeGet),
  });
  const categoryData = data?.data || [];
  console.log('🚀 ~ CategorySerialNumberUpdate ~ categoryData:', categoryData);
  useEffect(() => {
    if (categoryData?.length) {
      updateCharacters(categoryData);
    }
  }, [categoryData]);

  const updateSerialNumberFunction = async () => {
    try {
      if (characters?.length === 0) {
        message.error('No milestone selected to update position');
        return;
      }
      const bodyData = characters.map((c, i) => {
        return { _id: c._id, number: i + 1 };
      });
      console.log(bodyData, 'bodyData');
      const res = await updateSerialNumber({ data: bodyData }).unwrap();
      console.log('🚀 ~ updateSerialNumberFunction ~ res:', res);
      SuccessModal('Successfully updated');
    } catch (error) {
      ErrorModal(error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      <div className="mx-2 my-3">
        <Select
          onChange={(value) => setFileType(value)}
          placeholder="Select a company"
          allowClear
          size="large"
          //   defaultValue={companyType}
          value={fileTypeGet}
        >
          <Select.Option value="doc">Form/doc</Select.Option>
          <Select.Option value="video">Video</Select.Option>
        </Select>
      </div>
      <div
        style={{
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderRadius: '1rem',
          backgroundColor: 'white',
          padding: '1rem',
        }}
      >
        <div className="flex items-center justify-between px-3">
          <div></div>
          <h1 className="m-2 text-center">{fileTypeGet} Position Update</h1>
          <Button
            loading={uLoading}
            onClick={() => updateSerialNumberFunction()}
            className="rounded-2xl !bg-blue-600 !px-4 !py-2 !text-white"
          >
            Update
          </Button>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable type="group" droppableId="characters">
            {(provided: any) => (
              <div
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ _id, title }: any, index: number) => (
                  <Draggable
                    key={_id}
                    draggableId={_id.toString()}
                    index={index}
                  >
                    {(provided: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="rounded-xl p-3 shadow-md shadow-green-200"
                      >
                        <p className="line-clamp-2">
                          {index + 1}. {title}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
