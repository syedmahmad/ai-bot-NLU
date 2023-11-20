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
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Set your desired page size
    total: 0,
  });

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);


  // delete flow mutation
  const mutation = useMutation({
    mutationFn: async (data) => {
      await axios.delete(
        `http://54.81.9.89/flow_entity/{id}?_id=${data._id}`,
      );
    },
  });
  // delete flow function
  const deleteFlow = (item) => {
    mutation.mutate(
      { _id: item._id },
      {
        onError: async () => {
          await fetchData()
          toast.success("Flow deleted successfully");
          setSelectedItem(null);
        }
      },
    );
  }

  const fetchData = async () => {
    await axios.get(`http://54.81.9.89/flow_entity/?include_deleted=false&page=${pagination.current}&size=${pagination.pageSize}`).then((response) => {
      const arr = createTableData(response);
      setData(arr);
      setPagination({
        ...pagination,
        total: response.data.total,
        current: response.data.page,
        pageSize: response.data.size
      });
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
      key: '_id',
      className: 'last',
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

  const handleTableButtonClick = (page, pageSize) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize
    });
  }

  return (
    <>
      <CreateFlowModal
          fetchData={fetchData}
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
          padding="104px 28px"
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

        <Box>
          <Table
              columns={columns}
              dataSource={data}
              onRow={(record) => {
                return {
                  onClick: () => {
                    navigate(`/flow/${record._id}`)
                  },
                };
              }}
              pagination={{ 
                simple: true,
                total: pagination.total,
                pageSize: pagination.pageSize,
                position: ["bottomCenter"],
                onChange: handleTableButtonClick
              }}
              style={{
                borderTopRightRadius: '0.625rem',
                borderTopLeftRadius: '0.625rem',
                border: '1px solid #D8D8D8'
              }}
          />
        </Box>
      </Box>
    </>
  );
}

export default TableComponent;
