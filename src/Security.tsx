import styled from '@emotion/styled'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

const Page = styled.main`
  background: #ffffff;
  color: #000000;
  min-height: 100vh;
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 24px 80px;
  font-family: "new-science", sans-serif;
`

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-weight: 800;
  font-size: clamp(28px, 6vw, 56px);
  letter-spacing: 0.02em;
`

const Intro = styled.p`
  margin: 0 0 32px 0;
  font-size: 16px;
  line-height: 1.7;
  opacity: 0.9;
`

const Section = styled.section`
  border-top: 1px solid rgba(0,0,0,0.08);
  padding-top: 24px;
  margin-top: 24px;
`

const SectionTitle = styled.h2`
  margin: 0 0 8px 0;
  font-weight: 800;
  font-size: 20px;
`

const List = styled.ul`
  margin: 0;
  padding-left: 18px;
  line-height: 1.7;
  font-size: 15px;
  opacity: 0.95;
`

const Mono = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 14px;
`

export default function Security() {
  return (
    <Page>
      <SiteHeader />
      <Container>
        <Title>Security</Title>
        <Intro>
          Security is vital to the Open Audio Protocol. We welcome responsible disclosures of
          vulnerabilities in our code.
        </Intro>

        <Section>
          <SectionTitle>Bug Bounty Policy</SectionTitle>
          <p style={{ margin: 0, opacity: 0.95 }}>
            We follow responsible disclosure best practices similar to HackerOne / Immunefi.
          </p>
        </Section>

        <Section>
          <SectionTitle>Disclosure Process</SectionTitle>
          <List>
            <li>Privately email details and a proof-of-concept to <Mono>security@audius.co</Mono>.</li>
            <li>We assess severity together using informal CVSS-style guidelines.</li>
            <li>We coordinate a fix and rollout, then you may disclose publicly.</li>
            <li>We publish a short write-up of the issue.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Bounties</SectionTitle>
          <List>
            <li>Smart contracts: Critical — contact our team</li>
            <li>Smart contracts: High — $20,000+</li>
            <li>Smart contracts: Medium — $5,000</li>
            <li>Smart contracts: Low — $0 – $1,000</li>
            <li>Web apps & APIs: Critical — $5,000</li>
            <li>Web apps & APIs: High — $2,000</li>
            <li>Web apps & APIs: Medium — $500</li>
            <li>Web apps & APIs: Low — $0 – $100</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Out of Scope</SectionTitle>
          <p style={{ margin: 0, opacity: 0.95 }}>
            Best-practice recommendations without impact, self‑XSS, issues on third‑party apps,
            or denial‑of‑service are not eligible. When unsure, email us first.
          </p>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <p style={{ margin: 0, opacity: 0.95 }}>
            For any security concern, contact <Mono>security@audius.co</Mono>.
          </p>
        </Section>
      </Container>
      <SiteFooter />
    </Page>
  )
}



