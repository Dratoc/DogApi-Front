import { Layout } from "antd";
import Main from '../components/layout/Main';
import "antd/dist/antd.css";
import "../assets/styles/main.css";
import "../assets/styles/responsive.css";
import './LayoutBasic';

export default function LayoutBasic(props){
    const { children } = props;

    return(
        <Layout>
            <Main>
                {children}
            </Main>
        </Layout>
    );
}

