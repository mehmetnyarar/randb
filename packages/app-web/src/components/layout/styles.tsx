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
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }

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
          margin: 0;
          padding: 0;
          min-height: 100vh;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
        }

        main,
        article,
        section,
        aside,
        div,
        p {
          margin: 0;
          padding: 0;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        a {
          text-decoration: none;
          color: ${palette['color-primary-default']};
        }
        a:hover {
          color: ${palette['color-primary-hover']};
        }

        section[role='form'] {
          min-width: 480px;
          max-width: 720px;
          margin-top: 32px;
          padding: 32px;
          border-radius: 4px;
          border: 1px solid ${palette['border-basic-color-3']};
          background: ${palette['background-basic-color-2']};
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
        }

        .no-border: {
          border: none;
        }

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

        .full-width {
          flex: 1;
          width: 100%;
        }

        .mr-16 {
          margin-right: 16px;
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

        .valign-top {
          vertical-align: top;
        }

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
      `}
    </style>
  )
}
