import { Link } from 'gatsby'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    font-size: 1.1rem;
  }
`

export const PageContainer = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 0 0px;
  box-sizing: border-box;
`
export const InnerContainer = styled.div`
  padding: 12px;
`

const Header = styled.div``

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <PageContainer>
      <Header>
        <Link to='/'>Home</Link>
      </Header>
      <InnerContainer>{children}</InnerContainer>
    </PageContainer>
  </>
)

export default Layout
