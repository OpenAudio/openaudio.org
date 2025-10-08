import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

export type MarqueeLogo = {
  src: string
  alt: string
  width: number // base width in px (desktop)
}

type LogoMarqueeProps = {
  logos: MarqueeLogo[]
}

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const MarqueeWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 12px 0;
`

const GradientEdge = styled.div<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  bottom: 0;
  width: 32px;
  height: 76px;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(
    to ${p => (p.left ? 'right' : 'left')},
    #ffffff 0%,
    rgba(255,255,255,0) 100%
  );
  ${p => (p.left ? 'left: 0;' : 'right: 0;')}
  @media (max-width: 768px) {
    width: 16px;
    height: 60px;
  }
`

const Track = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: max-content;
  animation: ${scroll} 30s linear infinite;
  will-change: transform;
  @media (max-width: 768px) { gap: 20px; }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: max-content;
  @media (max-width: 768px) { gap: 20px; }
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  @media (max-width: 768px) { height: 28px; }
  img {
    display: block;
    height: 100%;
    width: auto;
    filter: grayscale(1) brightness(0);
    user-select: none;
    -webkit-user-drag: none;
    pointer-events: none;
  }
`

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  return (
    <MarqueeWrap>
      <GradientEdge left />
      <GradientEdge />
      <Track>
        <Row>
          {logos.map((logo, i) => (
            <LogoBox key={`a-${i}`}>
              <img src={logo.src} alt={logo.alt} />
            </LogoBox>
          ))}
        </Row>
        <Row>
          {logos.map((logo, i) => (
            <LogoBox key={`b-${i}`}>
              <img src={logo.src} alt={logo.alt} />
            </LogoBox>
          ))}
        </Row>
      </Track>
    </MarqueeWrap>
  )
}


