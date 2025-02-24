import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const DropDownUI = ({
  children,
  itemData,
}: {
  children: React.ReactNode;
  itemData: any;
}) => {
  const generateSubMenu = (data: any[]) => {
    return data?.map((item) => (
      <Menu.Item
        style={{
          // background:"red",
          // padding: "1rem",
          minWidth: '10rem',
          padding: '1rem',
        }}
        key={item.label}
      >
        {item.children ? (
          <Menu.SubMenu
            style={{
              // background: "blue",
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#023047',
            }}
            key={item.label}
            title={
              <Link
                className="ml-0 text-[15px] font-[600] text-[#023047]"
                to={item.link}
              >
                {item.label}1
              </Link>
            }
          >
            {generateSubMenu(item.children)}
          </Menu.SubMenu>
        ) : (
          <Link
            className="text-[15px] font-[600] text-[#023047]"
            to={item.link}
          >
            {item.label}2
          </Link>
        )}
      </Menu.Item>
    ));
  };

  const menu = <Menu>{generateSubMenu(itemData)}</Menu>;

  return (
    <Dropdown overlay={menu}>
      <Link to={`/courses/${children}`}>
        {children}
        <DownOutlined />
      </Link>
    </Dropdown>
  );
};

export default DropDownUI;
