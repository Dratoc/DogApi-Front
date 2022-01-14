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
import { useEffect, useState } from 'react';
import {getAllDogs}  from '../api/dogs';

import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Avatar,
    Typography,
    Select
  } from "antd";  
  
  // Images
  import face2 from "../assets/images/face-1.jpg";

  const { Option } = Select;
  const { Title } = Typography;
  

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  // table code start
  const columns = [
    {
      title: "Breeds",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "Sub Breeds",
      dataIndex: "function",
      key: "function",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo"
    }

  ];
    
  const createItemDog = (breeds, subBreeds, key) => {
        
    return (
      {
        key: `breeds ${key}`,
        name: (
          <>
              <div className="avatar-info">
                <Title level={5}>breeds</Title>
                <p>{breeds}</p>
              </div>
          </>
        ),
        function: (
          <>
            <div className="author-info">
              <Title level={5}>subBreeds</Title>
              { (subBreeds.length > 0) ? 
                <Select defaultValue="Select" key={`subBreedsSelect${key}`} style={{ width: 120 }} onChange={handleChange}>                
                {
                  subBreeds.map(( value) => {
                    return(
                      <Option key={`subBreedsOptions${key}-${value}`} value={value}>{value}</Option>
                    )
                  } )
                }
                </Select>
                : 
                <p> There is only one like this! </p>
              
              }
              
                
              
            </div>
          </>
        ),  
        photo: (
          <>
            <Avatar.Group>            
              <Avatar
                className="shape-avatar"
                shape="square"
                size={40}
                src={face2}
              ></Avatar>
            </Avatar.Group>
          </>
        )
      }
    )
  }

  const listItemsDog = (listDogs) =>{
    
    const itemsList = [];

    let cont = 1;
    for (const prop in listDogs) {
      
      const item =  createItemDog(prop, listDogs[prop],cont );
      cont++;
      itemsList.push(item);
      
    }

    return itemsList;

  }

  export default function Breedslist() {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
    
    const[breeds, setBreeds] = useState({});
    
    //console.log(listItemsDog(breeds));

    useEffect(() => {
      getAllDogs().then(response => {
        if(response.status === "success"){
          setBreeds(response.message);
        }  
      });
    },[])

    return (
      <>
        <div className="tabled">          
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Authors Table"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">All</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                    </Radio.Group>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={listItemsDog(breeds)}
                    pagination={false}
                    className="ant-border-space"
                  />
                </div>
              </Card>
  
            </Col>
          </Row>
        </div>
      </>
    );
  }
