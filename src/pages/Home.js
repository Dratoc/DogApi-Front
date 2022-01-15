import { Card, Typography } from "antd";
import {RightOutlined } from "@ant-design/icons";

export default function Home(){
    const { Title } = Typography;

    return(
        <div className="layout-content">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>HI</Title>
                  <p>
                    this is a little page for dog lovers 
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="filterbreed">
                    To start with
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
        </div>
    )
}