import Logo from "../assets/Menu/logo.png";
import React, { useEffect, useState } from "react";
import DashboardImg from "../assets/Menu/dashboard-inactive.svg";
import Notification from "../assets/Produt/notification.svg";
import ProductIcon from "../assets/Menu/products-active.svg";
import Analytics from "../assets/Menu/analytics-inactive.svg";
import ProfileImg from "../assets/Header/profile-img.png";

import { Breadcrumb, Layout, Menu, theme, Divider } from "antd";
import ViewProduts from "./ViewProduts";
import AddProduct from "./AddProduct";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <img src={DashboardImg} className="w-5" />),
  getItem("analytics", "2", <img src={Analytics} className="w-5" />),
  getItem("Products", "3", <img src={ProductIcon} className="w-5" />),
];

const DashBoard = () => {
  const location = useLocation();
  const [renderPage, setRenderPage] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setRenderPage(page);
  }, [location]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { page, id } = queryString.parse(window.location.search);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: colorBgContainer,
        }}
        width={250}
      >
        <div className="demo-logo-vertical">
          <img src={Logo} className="px-[50px] pt-[35px]" />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["3"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content className="md:mx-[40px] mx-2">
          <div className="grid grid-cols-12  content-center md:py-2 py-3 ">
            <div className="col-span-8  mt-6">
              <Breadcrumb style={{}}>
                <Breadcrumb.Item className=" text-[13px] font-jakarta font-semibold">
                  <span
                    className={`${
                      renderPage ? "text-[#AFB8CD]" : "text-[#764EE8]"
                    }`}
                  >
                    Products{" "}
                  </span>
                  {renderPage === "addProduct" ? (
                    <span
                      className={`${
                        !renderPage ? "text-[#AFB8CD]" : "text-[#764EE8]"
                      }`}
                    >
                      {" "}
                      {">"} Add Product
                    </span>
                  ) : renderPage === "editProduct" ? (
                    <span
                      className={`${
                        !renderPage ? "text-[#AFB8CD]" : "text-[#764EE8]"
                      }`}
                    >
                      {" "}
                      {">"} Edit Product
                    </span>
                  ) : (
                    ""
                  )}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="col-span-1 ml-[7px] flex justify-end">
              <img src={Notification} className="w-7 " />
            </div>
            <div className="col-span-3 grid grid-cols-3 bg-white p-1 ml-[70px] rounded-[100px] ">
              <div className="pt-[5px] col-span-1 ">
                <img
                  src={ProfileImg}
                  className="w-8 rounded-full border border-[#000000] mx-auto md:block hidden"
                />
              </div>
              <div className="col-span-2 hidden md:block">
                <div className="text-[13px] font-normal font-jakarta text-[#313234]">Everon Supplies</div>
                <div className="font-normal text-[10px] font-jakarta text-[#000000]">bridget@gmail.com</div>
              </div>
            </div>
          </div>
          <Divider className="m-0" />
          <div>
            {(!renderPage || renderPage == 0) && <ViewProduts />}
            {renderPage === "addProduct" && <AddProduct />}
            {renderPage === "editProduct" && <AddProduct isEdit={true} />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
