import React from "react";

export interface IDrawerActions {
  tooltipLabel?: string;
  label?: ((d: any) => string) | string | null;
  iconButton?: React.ReactNode;
  onClick: (row: any, toggle: any) => void;
  popoverTitle?: ((d: any) => string) | string | null;
  hidePopoverFooter?: boolean;
  confirmTitle?: ((d: any) => string) | string;
  disabled?: ((row: any) => boolean) | boolean;
  buttonProps?: ((row: any) => Record<string, any>) | Record<string, any>;
  confirmProps?: ((row: any) => Record<string, any>) | Record<string, any>;
  Render?: React.ReactElement | React.FC<any> | React.ReactNode;
  Component?: any;
}

export interface IDrawerProps {
  currentRecord?: Record<string, any>;
  isOpen?: boolean;
  toggle?: () => void;
  title?: ((d: any) => React.ReactNode) | React.ReactNode | string;
  subTitle?: ((d: any) => React.ReactNode) | React.ReactNode | string;
  extraBody?: (
    d: any
  ) =>
    | React.ReactNode
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null;
  width?: number | string;
  Render?: (d: any) => React.ReactNode;
  actions?: Array<IDrawerActions>;
  extraActions?: Array<IDrawerActions>;
}
