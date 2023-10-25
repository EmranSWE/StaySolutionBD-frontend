// "use client";

// import { useState } from "react";
// import { Layout, Menu } from "antd";
// import { sidebarItems } from "@/constants/sidebarItems";
// import { getUserInfo } from "@/services/auth.service";
// import Link from "next/link";
// const { Sider } = Layout;

// const SideBar = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const { role } = getUserInfo() as any;

//   return (
//     <Sider
//       collapsible
//       collapsed={collapsed}
//       onCollapse={(value) => setCollapsed(value)}
//       width={280}
//       style={{
//         overflow: "auto",
//         height: "100vh",
//         position: "sticky",
//         left: 0,
//         top: 0,
//         bottom: 0,
//       }}
//     >
//       <div
//         style={{
//           color: "white",
//           fontSize: "2rem",
//           textAlign: "center",
//           fontWeight: "bold",
//           marginBottom: "1rem",
//         }}
//       >
//         <Link href="/">StaySolutionBD</Link>
//       </div>
//       <Menu
//         theme="dark"
//         defaultSelectedKeys={["1"]}
//         mode="inline"
//         items={sidebarItems(role)}
//       />
//     </Sider>
//   );
// };

// export default SideBar;

// "use client";

// import { useState, useEffect } from "react";
// import { Layout, Menu } from "antd";
// import { sidebarItems } from "@/constants/sidebarItems";
// import { getUserInfo } from "@/services/auth.service";
// import Link from "next/link";

// const { Sider } = Layout;

// const SideBar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
//   const { role } = getUserInfo() as any;

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Set the initial state

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const sidebarStyles = isMobile
//     ? {
//         position: mobileSidebarVisible ? "fixed" : "absolute",
//         zIndex: 2,
//         width: mobileSidebarVisible ? "80%" : 0,
//         height: "100vh",
//         transition: "width 0.3s",
//       }
//     : {
//         overflow: "auto",
//         height: "100vh",
//         position: "sticky",
//         left: 0,
//         top: 0,
//         bottom: 0,
//       };

//   return (
//     <div>
//       {isMobile && (
//         <button
//           style={{
//             position: "fixed",
//             zIndex: 3,
//             top: "1rem",
//             left: "1rem",
//           }}
//           onClick={() => setMobileSidebarVisible(!mobileSidebarVisible)}
//         >
//           ☰
//         </button>
//       )}

//       <Sider
//         style={sidebarStyles}
//         collapsible
//         collapsed={isMobile ? false : collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         width={280}
//       >
//         <div
//           style={{
//             color: "white",
//             fontSize: "2rem",
//             textAlign: "center",
//             fontWeight: "bold",
//             marginBottom: "1rem",
//           }}
//         >
//           <Link href="/">StaySolutionBD</Link>
//         </div>
//         <Menu
//           theme="dark"
//           defaultSelectedKeys={["1"]}
//           mode="inline"
//           items={sidebarItems(role)}
//         />
//       </Sider>
//     </div>
//   );
// };

// export default SideBar;

"use client";

import { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { role } = getUserInfo() as any;

  return (
    <div>
      {isMobile && !collapsed && (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(true)}
          style={{
            position: "fixed",
            zIndex: 2,
            top: "1rem",
            left: "1rem",
          }}
        />
      )}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        breakpoint="md"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          setCollapsed(broken);
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          <Link href="/">SSBD</Link>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Sider>
    </div>
  );
};

export default SideBar;

// "use client";

// import { useState, useEffect } from "react";
// import { Layout, Menu, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import { sidebarItems } from "@/constants/sidebarItems";
// import { getUserInfo } from "@/services/auth.service";
// import Link from "next/link";

// const { Sider } = Layout;

// const SideBar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const { role } = getUserInfo() as any;

//   return (
//     <div>
//       {isMobile && (
//         <Button
//           type="primary"
//           icon={<MenuOutlined />}
//           onClick={() => setCollapsed(!collapsed)}
//           style={{
//             position: "fixed",
//             zIndex: 2,
//             top: "1rem",
//             left: "1rem",
//           }}
//         />
//       )}

//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => !isMobile && setCollapsed(value)}
//         width={280}
//         breakpoint="md"
//         onBreakpoint={(broken) => setIsMobile(broken)}
//       >
//         <div
//           style={{
//             color: "white",
//             fontSize: "2rem",
//             textAlign: "center",
//             fontWeight: "bold",
//             marginBottom: "1rem",
//           }}
//         >
//           <Link href="/">SSBD</Link>
//         </div>
//         <Menu
//           theme="dark"
//           defaultSelectedKeys={["1"]}
//           mode="inline"
//           items={sidebarItems(role)}
//         />
//       </Sider>
//     </div>
//   );
// };

// export default SideBar;
