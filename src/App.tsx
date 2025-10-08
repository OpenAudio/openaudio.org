import styled from '@emotion/styled'
import { useEffect, useMemo, useState } from 'react'
import Orb from './components/Orb'
import CountUp from './components/CountUp'
import IconCode from './assets/iconCode.svg?react'
import TerminalAnimation from './components/TerminalAnimation'
import LogoMarquee, { type MarqueeLogo } from './components/LogoMarquee'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import distrokid from './assets/partners/distrokid.png'
import ddex from './assets/partners/ddex.png'
import downtown from './assets/partners/downtown.png'
import empire from './assets/partners/empire.png'
import fuga from './assets/partners/fuga.png'
import kobalt from './assets/partners/kobalt.png'
import labelworx from './assets/partners/labelworx.png'
import nettwerk from './assets/partners/nettwerk.png'
import warner from './assets/partners/warner.png'
import blockdaemon from './assets/partners/blockdaemon.png'
import cultur3 from './assets/partners/cultur3.png'
import figment from './assets/partners/figment.png'
import kraken from './assets/partners/kraken.png'
import hivemind from './assets/partners/hivemind.png'

const marqueeLogos: MarqueeLogo[] = [
  { src: distrokid, alt: 'DistroKid', width: 106.5 },
  { src: warner, alt: 'Warner', width: 93.79 },
  { src: kobalt, alt: 'Kobalt', width: 88.91 },
  { src: ddex, alt: 'DDEX', width: 110.56 },
  { src: downtown, alt: 'Downtown', width: 120.93 },
  { src: empire, alt: 'Empire', width: 44.05 },
  { src: fuga, alt: 'Fuga', width: 110.39 },
  { src: nettwerk, alt: 'Nettwerk', width: 50.58 },
  { src: labelworx, alt: 'LabelWorx', width: 187.3 },
  { src: blockdaemon, alt: 'Blockdaemon', width: 142.21 },
  { src: cultur3, alt: 'Cultur3', width: 18.64 },
  { src: figment, alt: 'Figment', width: 105.13 },
  { src: kraken, alt: 'Kraken', width: 60.44 },
  { src: hivemind, alt: 'Hivemind', width: 149.56 },
]


const AudiusLink = styled.a`
  color: currentColor;
  text-decoration: none;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover { color: #D767E1; }
`


const CopyWrap = styled.div`
  position: absolute;
  left: 48px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9;
  color: #ffffff;
  mix-blend-mode: difference;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  a, button { pointer-events: auto; }
  @media (max-width: 768px) {
    left: 16px;
    right: 16px;
    top: 24%;
    transform: translateY(-24%);
    gap: 14px;
    @media (max-height: 740px) {
      padding-top: 24px;
    }
    @media (max-height: 640px) {
      padding-top: 36px;
    }
  }
`

const LineSmall = styled.div`
  user-select: none;
  font-family: "new-science", sans-serif;
  font-size: 20px;
  letter-spacing: 0.03em;
  opacity: 0.85;
  pointer-events: none;
  a { pointer-events: auto; }
`

const LineBig = styled.h1`
  user-select: none;
  margin: 0;
  font-family: "new-science", sans-serif;
  font-size: clamp(40px, 8vw, 400px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  pointer-events: none;
  @media (max-width: 768px) {
    line-height: 1.08;
  }
`

const CtaButton = styled.a`
  user-select: none;
  margin-top: 12px;
  width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border: 1px solid currentColor;
  border-radius: 9999px;
  color: #ffffff;
  text-decoration: none;
  font-family: "new-science", sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  opacity: 1;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  pointer-events: auto;
  &:hover { color: #D767E1; }
  &:active { color: #000000; background: #D767E1; border-color: #D767E1; }
`

// Below-the-fold layout
const BelowFold = styled.main`
  position: relative;
  background: #ffffff;
  color: #000000;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 48px;
  @media (max-width: 768px) {
    padding: 64px 16px;
  }
`

const StatsSection = styled.section`
  border-top: 1px solid rgba(0,0,0,0.08);
`

const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: start;
  justify-items: start;
  @media (max-width: 768px) {
    gap: 16px;
  }
`

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
`

const StatNumber = styled.div`
  font-family: "new-science", sans-serif;
  font-weight: 800;
  font-size: clamp(28px, 12vw, 128px);
  line-height: 1.12;
`

const StatLabel = styled.div`
  font-family: "new-science", sans-serif;
  font-size: 24px;
`

const FeaturesSection = styled.section`
  border-top: 1px solid rgba(0,0,0,0.08);
  padding-bottom: 64px;
`

const PartnersSection = styled.section`
  border-top: 1px solid rgba(0,0,0,0.08);
`

const PartnersHeading = styled.div`
  font-family: "new-science", sans-serif;
  font-size: 24px;
  text-transform: uppercase;
  margin-bottom: 10px;
`

// Deprecated row styling replaced by LogoMarquee

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FeatureCard = styled.div`
  border: 1px solid rgba(0,0,0,0.08);
  background: #fff;
  border-radius: 4px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: all 200ms ease;
  &:hover {
    border-color: #000;
    opacity: 0.8;
  }
`

const FeatureImage = styled.div`
  width: 100%;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 4px;
  background: #ffffff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img { max-height: 100%; max-width: 100%; object-fit: contain; display: block; }
`

const FeatureBadge = styled.div`
  font-family: "new-science", sans-serif;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.7;
`

const FeatureTitle = styled.h3`
  margin: 0;
  font-family: "new-science", sans-serif;
  font-weight: 800;
  font-size: 22px;
  line-height: 1.2;
`

const FeatureDesc = styled.p`
  margin: 0;
  font-family: "new-science", sans-serif;
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.85;
`

const ResponsiveOrb = styled(Orb)`
  height: 100vh;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`

const HeroTicker = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  mix-blend-mode: difference;
  color: #ffffff;
  pointer-events: none;
  width: 100vw;
  font-size: 18px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`
const FullWidthTerminal = styled(TerminalAnimation)`
  width: 100vw;
  display: block;
  background: transparent;
  color: #ffffff;
`


function App() {
  const [totalStreams, setTotalStreams] = useState<number | null>(null)
  const [totalWallets, setTotalWallets] = useState<number | null>(null)
  const [totalArtists, setTotalArtists] = useState<number | null>(null)
  const [appVisible, setAppVisible] = useState<boolean>(false)
  const appFadeClass = useMemo(() => (appVisible ? 'app-visible' : 'app-hidden'), [appVisible])

  useEffect(() => {
    let cancelled = false
    let inFlight = false
    let intervalId: number | null = null
    const fetchMetric = async (url: string): Promise<number | null> => {
      try {
        const res = await fetch(url, { cache: 'no-store' })
        if (!res.ok) return null
        const json = await res.json()
        const v = json?.data?.total
        return typeof v === 'number' ? v : null
      } catch {
        return null
      }
    }
    const run = async () => {
      if (inFlight) return
      inFlight = true
      try {
        const [plays, wallets, artists] = await Promise.all([
          fetchMetric('https://api.audius.co/v1/metrics/total_plays'),
          fetchMetric('https://api.audius.co/v1/metrics/total_wallets'),
          fetchMetric('https://api.audius.co/v1/metrics/total_artists'),
        ])
        if (cancelled) return
        if (plays != null) setTotalStreams(plays)
        if (wallets != null) setTotalWallets(wallets)
        if (artists != null) setTotalArtists(artists)
      } finally {
        inFlight = false
      }
    }
    run()
    intervalId = window.setInterval(run, 5000)
    return () => {
      cancelled = true
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [])

  // Header scroll handling moved into SiteHeader

  return (
    <div className={appFadeClass}>
      <SiteHeader />
      <CopyWrap>
        <div>
          <LineSmall>The OPEN AUDIO PROTOCOL is</LineSmall>
          <LineBig>The Global <br/>Music Database</LineBig>
          <LineSmall>
            Powering <AudiusLink href="https://audius.co" target="_blank" rel="noreferrer">Audius</AudiusLink> and those who reject the streaming status quo
          </LineSmall>
        </div>
        <CtaButton href="https://docs.openaudio.org" target="_blank" rel="noreferrer">
          <IconCode />
          <span>Start Building</span>
        </CtaButton>
      </CopyWrap>
      <ResponsiveOrb onReady={() => setAppVisible(true)} />
      <BelowFold>
        <PartnersSection>
          <Container>
            <PartnersHeading>WITH PARTNERS</PartnersHeading>
            <LogoMarquee logos={marqueeLogos} />
          </Container>
        </PartnersSection>
        <StatsSection>
          <Container>
            <StatsGrid>
              <StatCard>
                <StatNumber>
                  <CountUp to={totalStreams} initialValue={0} delayMs={50} />
                </StatNumber>
                <StatLabel>Total Streams</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>
                  <CountUp to={totalWallets} initialValue={0} delayMs={140} />
                </StatNumber>
                <StatLabel>Wallets</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>
                  <CountUp to={totalArtists} initialValue={0} delayMs={230} />
                </StatNumber>
                <StatLabel>Artists</StatLabel>
              </StatCard>
            </StatsGrid>
          </Container>
        </StatsSection>
        <FeaturesSection>
          <Container>
            <FeaturesGrid>
              <FeatureCard onClick={() => window.open('https://docs.openaudio.org/concepts/wire-protocol', '_blank')}>
                <FeatureImage>
                  <img src="/feature1.webp" alt="" />
                </FeatureImage>
                <FeatureBadge>Architecture</FeatureBadge>
                <FeatureTitle>Decentralized Metadata + Media Pipeline</FeatureTitle>
                <FeatureDesc>
                  Native DDEX support used across the industry, partnering with DistroKid, Warner, Kobalt and more. Harness the largest open source catalog for music.
                </FeatureDesc>
              </FeatureCard>
              <FeatureCard onClick={() => window.open('https://docs.openaudio.org/concepts/artist-coins', '_blank')}>
                <FeatureImage>
                  <img src="/feature2.webp" alt="" />
                </FeatureImage>
                <FeatureBadge>Economics</FeatureBadge>
                <FeatureTitle>Solana Powered Artist Coins</FeatureTitle>
                <FeatureDesc>
                  A standard for artist coins that trade against $AUDIO with tooling for rewards, quests, bounties and airdrops. Create novel fan club experiences.
                </FeatureDesc>
              </FeatureCard>
              <FeatureCard onClick={() => window.open('https://docs.openaudio.org/concepts/media-storage', '_blank')}>
                <FeatureImage>
                  <img src="/feature3.webp" alt="" />
                </FeatureImage>
                <FeatureBadge>Scaling</FeatureBadge>
                <FeatureTitle>Unlimited Storage and Streaming</FeatureTitle>
                <FeatureDesc>
                  Media storage that elastically scales with incentivized, staked $AUDIO validators. Distribute music everywhere with provenance.
                </FeatureDesc>
              </FeatureCard>
              <FeatureCard onClick={() => window.open('https://docs.openaudio.org/tutorials/programmable-distribution', '_blank')}>
                <FeatureImage>
                  <img src="/feature4.webp" alt="" />
                </FeatureImage>
                <FeatureBadge>Tooling</FeatureBadge>
                <FeatureTitle>Programmable Distribution Tools</FeatureTitle>
                <FeatureDesc>
                  Rails to build novel unlock experiences for music using composable web3 primitives. Take releases beyond the current streaming paradigm.
                </FeatureDesc>
              </FeatureCard>
            </FeaturesGrid>
          </Container>
        </FeaturesSection>
      </BelowFold>
      <HeroTicker>
        <FullWidthTerminal />
      </HeroTicker>
      <SiteFooter />
    </div>
  )
}

export default App