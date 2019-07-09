import React from "react";
import styled from "styled-components";
import IconComponent from "./Icon";
import * as Icon from "react-feather";

const Wrapper = styled.div`
  background-color: #fefefe;
  padding: 20px;
`;

const IconSectionTitle = styled.span`
  margin: 5px;
  font-weight: 600;
  text-align: end;
  font-size: 12px;
  color: #666;
`;

const IconsSet = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px 0px;
  padding-bottom: 10px;
`;

export default function SideBar() {
  const iconSetGeometric = [
    {
      svg: <Icon.Square />,
      name: "RECTANGLE"
    },
    {
      svg: <Icon.Circle />,
      name: "CIRCLE"
    },
    {
      svg: <Icon.Minus />,
      name: "MINUS"
    }
  ];

  const iconSetIcons = [
    {
      svg: <Icon.Phone />,
      name: "PHONE"
    },
    {
      svg: <Icon.Paperclip />,
      name: "PAPERCLIP"
    },
    {
      svg: <Icon.Monitor />,
      name: "MONITOR"
    },
    {
      svg: <Icon.Home />,
      name: "HOUSE"
    },
    {
      svg: <Icon.Camera />,
      name: "CAMERA"
    }
  ];

  return (
    <Wrapper>
      <IconSectionTitle>Geometric</IconSectionTitle>
      <IconsSet>
        {iconSetGeometric.map((val, index) => {
          return <IconComponent svg={val.svg} name={val.name} key={index} />;
        })}
      </IconsSet>
      <IconSectionTitle>Icons</IconSectionTitle>
      <IconsSet>
        {iconSetIcons.map((val, index) => {
          return <IconComponent svg={val.svg} name={val.name} key={index} />;
        })}
      </IconsSet>
    </Wrapper>
  );
}
