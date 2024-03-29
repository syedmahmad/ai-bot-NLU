import { useEffect } from 'react';
import {
  Box,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { toast } from 'react-toastify'
import axios from 'axios';
import { Table } from 'antd';
import CreateFlowModal from '../Modals/createFlowModal';
import { useMutation } from '@tanstack/react-query';
import EditFlowModal from '../Modals/editFlowModal';
import { useState } from 'react';
import TablePopover from '../popovers/TablePopover';
import CreateFlowButton from '../buttons/createFlowButton';
import { createTableData } from '../../utils/createTableData';
import { useNavigate } from 'react-router-dom';

function TableComponent() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 6, // Set your desired page size
  //   total: 0,
  // });

  // useEffect(() => {
  //   fetchData();
  // }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, []);

  // delete flow mutation
  const mutation = useMutation({
    mutationFn: async (data) => {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/flow_document/${data.id}`,
      );
    },
  });
  
  // delete flow function
  const deleteFlow = (event, item) => {
    mutation.mutate(
      { id: item.id },
      {
        onError: async () => {   
          setTimeout(() => {
            event.target.parentNode.parentElement.firstElementChild.click();
          }, 50);
          await fetchData()
          toast.success("Flow deleted successfully");
          setSelectedItem(null);
        }
      },
    );
  }

  const fetchData = async () => {
    // await axios.get(`${import.meta.env.VITE_API_URL}/flow_document/?include_deleted=false&page=${pagination.current}&size=${pagination.pageSize}`).then((response) => {
    await axios.get(`${import.meta.env.VITE_API_URL}/flow_document/?include_deleted=false`).then((response) => {
      const arr = createTableData(response);
      setData(arr);
      // setPagination({
      //   ...pagination,
      //   total: response.data.total,
      //   current: response.data.page,
      //   pageSize: response.data.size
      // });
    });
  }

  const {
    isOpen: createFlowOpen,
    onOpen: createFlowOnOpen,
    onClose: createFlowOnClose,
  } = useDisclosure();

  const {
    isOpen: editModalOpen,
    onOpen: editModalOnOpen,
    onClose: editModalOnClose,
  } = useDisclosure();

  const columns = [
    {
      title: 'Flow Name',
      dataIndex: 'name',
      key: 'name',
      className: 'first'
    },
    {
      title: 'Flow Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Last Edited on',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: (
        <CreateFlowButton
            createFlowOnOpen={createFlowOnOpen}
        />
      ),
      align: 'right',
      key: 'id',
      className: 'last',
      onCell: () => {
        return {
          onClick: (event) => {
              event.stopPropagation();
          },
      };
      },
      render: (item) => (
        <TablePopover 
            deleteFlow={deleteFlow}
            editModalOnOpen={editModalOnOpen}
            item={item}
            setSelectedItem={setSelectedItem}
        />
      ),
    },
  ];

  // const handleTableButtonClick = (page, pageSize) => {
  //   setPagination({
  //     ...pagination,
  //     current: page,
  //     pageSize: pageSize
  //   });
  // }

  return (
    <>
      <CreateFlowModal
          isOpen={createFlowOpen}
          onClose={createFlowOnClose}
      />

      {selectedItem !== null ? (
        <EditFlowModal
            fetchData={fetchData}
            isOpen={editModalOpen}
            onClose={editModalOnClose}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
        />) : null}

      <Box
          padding="84px 28px"
          width="100%"
      >
        <Heading
            fontFamily="Inter"
            fontSize="lg"
            fontWeight={400}
            marginLeft="48px"
        >
          Flows
        </Heading>

        <br />

        <Box style={{
    height: "calc(100vh - 150px)",
    overflow: "auto"
  }}
        >
          <Table
              columns={columns}
              dataSource={data}
              onRow={(record) => {
                return {
                  onClick: () => {
                    navigate(`/flow/${record.id}`)
                  },
                };
              }}
              pagination={false} 
              // pagination={{ 
              //   simple: true,
              //   total: pagination.total,
              //   pageSize: pagination.pageSize,
              //   position: ["bottomCenter"],
              //   onChange: handleTableButtonClick
              // }}
              style={{
                borderTopRightRadius: '0.625rem',
                borderTopLeftRadius: '0.625rem',
                border: '1px solid #D8D8D8',
              }}
          />
        </Box>
      </Box>
    </>
  );
}

export default TableComponent;
