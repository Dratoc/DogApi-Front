/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Layout,
  Select,
  Divider,
  Table,
  notification
} from "antd";

import BgProfile from "../assets/images/bg-profile.jpg";
import { getAllDogsApi, getBreedImagesApi, getSubBreedImagesApi } from "../api/dogs";

function FilterBreed() {
  const[breeds, setBreeds] = useState({});
  const[listSubBreed, setListSubBreed] = useState([]);
  const { Option } = Select;
  const { Content } = Layout;
  const [form] = Form.useForm();
  const [listFilters, setListFilters] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getAllDogsApi().then(response => {
      if(response.status === "success"){
        setBreeds(response.message);
      }  
    });
  },[])

  const createOptionBreeds = (listNamesBreed) => {

    const options = [];
    let cont = 1;
      
    for (const prop in listNamesBreed) {
        
      options.push(<Option key={`optionBreeds${cont}`} value={prop} >{prop}</Option>)
      cont++;
    }
  
    return options;
  }
  
  const handleChange = (valueSelected) => {
       
    setListSubBreed([]);

    if(breeds[valueSelected].length > 0){ 
      
      form.setFieldsValue({
        breeds: valueSelected,
        subbreed: ''
      });

      setListSubBreed(breeds[valueSelected]);      
    }

  };  

 
  const deletebtn = [
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
        fill="#111827"
        className="fill-danger"
      ></path>
    </svg>,
  ];


  const deleteFilter = (key) => {
    setImages([]);
    const newFilter = listFilters.filter( (filter) => filter.key !== key);
    setListFilters(newFilter);
    
    notification["error"]({
      message: "FILTER DELETED",
      placement: "bottomRight"
    })
  }

  const onFinish = (values) => {
    let subBreeds = 'There is only one like this!';
    let key = listFilters.length;
    if(values.subbreed ){
      subBreeds = values.subbreed
    }
    
    const model = { 
      key: `keylistfilters${key}`,
      breed: `${values.breed}`,
      subBreeds: subBreeds,
      options: 
      <>
        <Button type="link" danger onClick={() => deleteFilter(key)}>
          {deletebtn}DELETE
        </Button>
      </>
    } 
    setListFilters([...listFilters ,model]);
    
    notification["success"]({
      message: "FILTER CREATED",
      placement: "bottomRight"
    })

  };

  const onFinishFailed = (errorInfo) => {    
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: 'Breeds',
      dataIndex: 'breed',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Sub-Breeds',
      dataIndex: 'subBreeds',
    },
    {
      title: '',
      dataIndex: 'options',
    },
  ];
  
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

      const {subBreeds, breed} = selectedRows[0];
      
      if(subBreeds === "There is only one like this!"){
        getBreedImagesApi(breed).then(response => {
          if(response.status === "success"){
            setImages(response.message); //.slice(0,5)
          }  
        });
      }else{
        getSubBreedImagesApi(breed, subBreeds).then(response => {
          if(response.status === "success"){
            setImages(response.message);
          }  
        });

      }      
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      >
      </div>
      <Content className="p-0">
      <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Create Filter</h5>}
              bordered="false"
            >
              <Form
                form={form}
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="breed"
                  label="Breed"
                  rules={[
                    { required: true, message: "Please select a breed!" },
                  ]}
                >
                  <Select placeholder="Please select a breed" onChange={handleChange} style={{ width: '100%' }}>
                    {createOptionBreeds(breeds)}
                  </Select>
                </Form.Item> 
                { listSubBreed.length > 0 ?
                  <Form.Item
                    label="Sub-Breed"
                    name="subbreed"
                    rules={[
                      { required: true, message: "Please select a subBreed!" },
                    ]}
                  >
                    <Select  style={{ width: '100%' }}>
                      {listSubBreed.map( (valueSubbreed) => {
                        return (
                          <Option key={valueSubbreed} value={valueSubbreed} >{valueSubbreed}</Option>
                        )
                      } )}
                    </Select>
                  </Form.Item> 
                :
                  null                 
                }
                <Form.Item>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      CREATE
                    </Button>
                  </Form.Item>
              </Form>
              
            </Card>
      </Content>
      { listFilters.length > 0 ? 
        <Card
        title='se'
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <>
              <div>
                <Divider />
                <Table
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={listFilters}
                />
              </div>
          </>
        }
        >
        </Card>
      : null}
      
      <Card
        bordered={false}
        className="header-solid mb-24"
      >
        <Row gutter={[24, 24]}>
          {images.map((obj, index) => ( 
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={obj} />}
              >
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default FilterBreed;
