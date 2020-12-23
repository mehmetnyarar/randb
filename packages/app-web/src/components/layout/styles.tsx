import { Theme } from '@app/ui'
import React, { useContext } from 'react'

// Icon spin from:
// https://github.com/react-icons/react-icons/issues/52

/**
 * Global styles.
 */
export const GlobalStyles: React.FC = () => {
  const { palette } = useContext(Theme)

  return (
    <style jsx global>
      {`
        /* css reset */
        *,
        *:before,
        *:after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* document */
        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        body {
          display: flex;
          background: ${palette['background-basic-color-1']};
          color: ${palette['text-basic-color']};
        }
        #__next {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        html,
        body,
        #__next {
          flex: 1;
          min-height: 100vh;
        }

        /* typography */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: bold;
        }
        .text-left {
          text-align: left;
        }
        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: right;
        }
        .text-break {
          word-break: break-word;
        }

        /* block */
        main,
        article,
        section,
        aside,
        div,
        p {
        }

        /* flexbox */
        .flex-row {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        .flex-column {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
        }

        /* list */
        ul {
          list-style: none;
        }

        /* link */
        a {
          text-decoration: none;
          color: ${palette['color-primary-default']};
        }
        a:hover {
          color: ${palette['color-primary-hover']};
        }

        /* forms and inputs */
        section[role='form'] {
          padding: 16px;
          border-radius: 4px;
          border: 1px solid ${palette['border-basic-color-3']};
          background: ${palette['background-basic-color-2']};
        }
        @media screen and (min-width: 600px) {
          section[role='form'] {
            width: 480px;
          }
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin: 8px 0;
        }

        input,
        select {
          outline: none;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid ${palette['border-basic-color-3']};
        }
        select {
          padding: 7px;
        }
        input:hover {
          border: 1px solid ${palette['color-primary-hover-border']};
        }
        input:read-only,
        input:disabled {
          color: ${palette['text-disabled-color']};
          background-color: ${palette['color-basic-disabled']};
          border: 1px solid ${palette['color-basic-disabled']};
        }

        /* utility classes */
        .full-width {
          flex: 1;
          width: 100%;
        }
        .no-border: {
          border: none;
        }
        .mr-16 {
          margin-right: 16px;
        }

        /* table */
        table {
          border-collapse: collapse;
          border: 1px solid ${palette['border-basic-color-3']};
        }
        table > caption {
          margin-bottom: 16px;
          text-align: left;
        }

        th,
        td {
          padding: 8px;
          border: 1px solid ${palette['border-basic-color-3']};
          overflow-x: auto;
        }
        .valign-top {
          vertical-align: top;
        }

        /* icon */
        .icon-spin {
          -webkit-animation: icon-spin 2s infinite linear;
          animation: icon-spin 2s infinite linear;
        }
        @-webkit-keyframes icon-spin {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
          }
        }
        @keyframes icon-spin {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
          }
        }

        /* sidebar */
        .sidebar {
          border-right: 1px solid ${palette['background-basic-color-4']};
        }

        /* react-burger-menu */
        .bm-burger-button {
          position: fixed;
          width: 24px;
          height: 18px;
          left: 16px;
          top: 28px;
        }
        .bm-burger-bars {
          background: ${palette['text-hint-color']};
        }
        .bm-burger-bars-hover {
          background: ${palette['text-basic-color']};
        }
        .bm-cross-button {
          height: 32px;
          width: 32px;
        }
        .bm-cross {
          background: ${palette['text-hint-color']};
        }
        .bm-menu-wrap {
          position: fixed;
          height: 100vh;
        }
        .bm-menu {
          height: 100vh;
          padding: 16px;
          background: ${palette['background-basic-color-2']};
        }
        .bm-item-list {
          height: auto;
        }

        /* scrollbar */
        .sidebar * ::-webkit-scrollbar {
          width: 10px;
        }
        .sidebar * ::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar * ::-webkit-scrollbar-thumb {
          background: ${palette['background-basic-color-3']};
        }
        .sidebar * ::-webkit-scrollbar-thumb:hover {
          background: ${palette['background-basic-color-1']};
        }
      `}
    </style>
  )
}
