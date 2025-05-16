import { ComponentProps, ReactNode } from "react";

declare module "flowbite-react" {
  export interface AvatarProps extends ComponentProps<"div"> {
    img?: string;
    alt?: string;
    rounded?: boolean;
    bordered?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    stacked?: boolean;
    status?: "online" | "offline" | "away" | "busy";
    statusPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    placeholderInitials?: string;
  }

  export interface DropdownProps extends ComponentProps<"div"> {
    arrowIcon?: boolean;
    dismissOnClick?: boolean;
    floatingArrow?: boolean;
    inline?: boolean;
    label?: ReactNode;
    placement?: "top" | "right" | "bottom" | "left";
    trigger?: "click" | "hover";
  }

  export interface DropdownItemProps extends ComponentProps<"button"> {
    icon?: ReactNode | (() => ReactNode);
  }

  export interface DropdownDividerProps extends ComponentProps<"div"> {
    className?: string;
  }

  export interface DropdownHeaderProps extends ComponentProps<"div"> {
    className?: string;
  }

  export const Avatar: React.FC<AvatarProps>;
  export const Dropdown: React.FC<DropdownProps> & {
    Item: React.FC<DropdownItemProps>;
    Divider: React.FC<DropdownDividerProps>;
    Header: React.FC<DropdownHeaderProps>;
  };
}
