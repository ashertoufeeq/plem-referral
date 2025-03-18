import React from "react";
import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";

export const RenderSubTitle: React.FC<{
  subTitle: any;
  props?: Record<string, any>;
  style?: Record<string, any>;
  className?: string;
}> = ({ subTitle, props = {}, style = {}, className = "" }) => {
  if (typeof subTitle === "function") {
    return subTitle(props);
  }

  if (React.isValidElement(subTitle)) {
    return subTitle;
  }

  if (typeof subTitle === "string") {
    return (
      <Typography.Paragraph style={{ ...(style || {}) }} className={className}>
        {subTitle}
      </Typography.Paragraph>
    );
  }

  return null;
};

export const RenderTitle: React.FC<{
  title: any;
  props?: Record<string, any>;
  style?: Record<string, any>;
  className?: string;
  level?: TitleProps["level"];
  titleProps?: TitleProps;
}> = ({ title, props, level, style = {}, className = "", titleProps = {} }) => {
  if (typeof title === "function") {
    return title(props);
  }

  if (React.isValidElement(title)) {
    return title;
  }

  if (typeof title === "string") {
    return (
      <Typography.Title
        style={{ margin: 0, padding: 0, ...(style || {}) }}
        className={className}
        level={level}
        {...(titleProps ? titleProps : {})}
      >
        {title}
      </Typography.Title>
    );
  }

  return null;
};
