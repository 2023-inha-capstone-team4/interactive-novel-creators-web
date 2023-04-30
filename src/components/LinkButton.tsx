/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function LinkButton(props: LinkButtonProps) {
  return (
    <Link to={props.href} css={style}>
      {props.icon && <span className="linkbutton-icon">{props.icon}</span>}
      {props.children && (
        <span className="linkbutton-text">{props.children}</span>
      )}
    </Link>
  );
}

interface LinkButtonProps {
  href: string;
  icon?: ReactNode;
  children?: ReactNode;
}

const style = css`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 9px 15px;

  background-color: var(--color-primary);
  border: 1px solid var(--color-primary-dark);
  border-radius: 5px;

  font-weight: 500;
  font-size: 14px;
  color: var(--color-text-white);

  .linkbutton-icon {
    font-size: 20px;
    margin-right: 5px;
  }

  &:hover {
    filter: brightness(95%);
    transition: filter 0.2s ease;
  }
`;
