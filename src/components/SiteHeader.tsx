import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Logo from '../assets/logo.svg?react'
import XIcon from '../assets/iconX.svg?react'

const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 24px;
  left: 0;
  right: 0;
  height: 72px;
  display: flex;
  align-items: center;
  padding: 0 48px;
  z-index: 20;
  color: #ffffff;
  mix-blend-mode: difference;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom: 1px solid transparent;
  opacity: ${({ $scrolled }) => ($scrolled ? 0 : 1)};
  pointer-events: ${({ $scrolled }) => ($scrolled ? 'none' : 'auto')};
  transition: opacity 200ms ease;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  svg { height: 36px; width: auto; display: block; }
`

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 36px;
  font-family: "new-science", sans-serif;
  font-size: 18px;
  letter-spacing: 0.02em;
  a {
    color: currentColor;
    opacity: 1;
    transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    text-decoration: none;
  }
  a:hover { opacity: 0.7; }
  user-select: none;
  @media (max-width: 768px) {
    display: none;
  }
`

const NavItemDisabled = styled.div`
  position: relative;
  display: inline-block;
  color: currentColor;
  .label {
    font-family: "new-science", sans-serif;
    font-size: 18px;
    letter-spacing: 0.02em;
    font-weight: 400;
  }
  .sublabel {
    position: absolute;
    right: 0;
    top: calc(100% - 2px);
    font-family: "new-science", sans-serif;
    text-transform: uppercase;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.1em;
    line-height: 1;
    color: #D767E1;
    pointer-events: none;
    white-space: nowrap;
  }
`

const XLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: currentColor;
  opacity: 1;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  svg { height: 20px; width: 20px; display: block; }
  svg path, svg * { fill: currentColor; stroke: currentColor; }
  &:hover { opacity: 0.7; }
`

const LogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #ededed;
  cursor: pointer;
  opacity: 1;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  svg { display: block; }
  &:hover { opacity: 0.7; }
`

const MobileMenuButton = styled.button`
  display: none;
  margin-left: auto;
  height: 36px;
  width: 36px;
  border: 1px solid currentColor;
  border-radius: 6px;
  background: transparent;
  color: currentColor;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: inline-flex;
  }
`

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'grid' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 96px 16px 16px;
    gap: 12px;
    background: #000000;
    z-index: 11;
    a {
      color: #ffffff;
      text-decoration: none;
      font-family: "new-science", sans-serif;
      font-size: 18px;
      opacity: 0.95;
    }
  }
`

const MobileMenuDisabled = styled.div`
  position: relative;
  color: #ffffff;
  font-family: "new-science", sans-serif;
  padding-bottom: 16px;
  .label {
    font-size: 18px;
    font-weight: 400;
  }
  .sublabel {
    position: absolute;
    left: 0;
    top: calc(100% - 16px);
    text-transform: uppercase;
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.1em;
    color: #D767E1;
  }
`

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Header $scrolled={scrolled}>
        <LogoWrap>
          <LogoLink href="/">
            <Logo />
          </LogoLink>
        </LogoWrap>
        <Nav>
          <a href="https://docs.openaudio.org">Docs</a>
          <NavItemDisabled aria-label="Yellowpaper coming soon">
            <div className="label">Yellowpaper</div>
            <div className="sublabel">Coming soon</div>
          </NavItemDisabled>
          <a href="https://github.com/OpenAudio" target="_blank" rel="noreferrer">Github</a>
          <XLink href="https://x.com/OpenAudioProto" target="_blank" rel="noreferrer">
            <XIcon />
          </XLink>
        </Nav>
        <MobileMenuButton aria-label="Open menu" onClick={() => setMenuOpen((v) => !v)}>
          <span style={{ display: 'block', width: 18, height: 2, background: 'currentColor' }} />
        </MobileMenuButton>
      </Header>
      <MobileMenu $open={menuOpen && !scrolled} onClick={() => setMenuOpen(false)}>
        <a href="https://docs.openaudio.org">Docs</a>
        <MobileMenuDisabled>
          <div className="label">Yellowpaper</div>
          <div className="sublabel">Coming soon</div>
        </MobileMenuDisabled>
        <a href="https://github.com/OpenAudio" target="_blank" rel="noreferrer">Github</a>
        <a href="https://x.com/OpenAudioProto" target="_blank" rel="noreferrer">X</a>
      </MobileMenu>
    </>
  )
}


