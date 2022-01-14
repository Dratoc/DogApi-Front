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
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Typography,
  Form,
  Input,
  Layout,
  Select,
  Divider
} from "antd";

import {
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";
import { getAllDogsApi } from "../api/dogs";




function FilterBreed() {
  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);
  const[breeds, setBreeds] = useState({});
  const[nameBreedSelected, setNameBreedSelected] = useState('');
  const[listSubBreed, setListSubBreed] = useState([]);
  const { Option } = Select;
  const { Content } = Layout;

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
  
  const getSubBreeds = (listNamesBreed, nameSelected) => {
    
    for (const prop in listNamesBreed) {
        
      if(nameSelected === prop){
        console.log()
        return (`listNamesBreed.${prop}`);
      }
    }

    return null;
  }

 // getSubBreeds(breeds, 'bulldog' )
  const createOptionSubBreeds = (nameBreeds) => {

    const options = [];
    let cont = 1;
      
    for (const prop in nameBreeds) {
        
      options.push(<Option key={`optionSubBreeds${cont}`} value={prop} >{prop}</Option>)
      cont++;
    }
  
    return options;
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  
  const handleChange = (valueSelected) => {
    setListSubBreed([]);
    setNameBreedSelected(valueSelected);
    
    if(breeds[valueSelected].length > 0){
      setListSubBreed(breeds[valueSelected]);
    }
  };  


  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data = [
    {
      title: "Sophie B.",
      avatar: convesionImg,
      description: "Hi! I need more information…",
    },
    {
      title: "Anne Marie",
      avatar: convesionImg2,
      description: "Awesome work, can you…",
    },
    {
      title: "Ivan",
      avatar: convesionImg3,
      description: "About files I can…",
    },
    {
      title: "Peterson",
      avatar: convesionImg4,
      description: "Have a great afternoon…",
    },
    {
      title: "Nick Daniel",
      avatar: convesionImg5,
      description: "Hi! I need more information…",
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  

const dataitem = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

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
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="breed"
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
                    name="subbreed"
                    rules={[
                      { required: true, message: "Please select a subBreed!" },
                    ]}
                  >
                    <Select  defaultValue='Please select a Sub-Breed' style={{ width: '100%' }}>
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
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <>
            <Divider orientation="left">List Filter...</Divider>
              <List
                header={<div></div>}
                footer={<div></div>}
                bordered
                dataSource={dataitem}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                  </List.Item>
                )}
              />
            <Divider orientation="left">Small Size</Divider>
          </>
        }
      ></Card>
      
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Projects</h6>
            <p>Architects design houses</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader projects-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageURL ? (
                <img src={imageURL} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default FilterBreed;
