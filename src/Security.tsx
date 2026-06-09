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

const Mono = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 14px;
`

const RepoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
`

const RepoItem = styled.li`
  line-height: 1.5;
`

const RepoLink = styled.a`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
  border-bottom: 1px solid rgba(0,0,0,0.25);
  &:hover {
    border-bottom-color: #000000;
  }
`

const RepoDesc = styled.span`
  display: block;
  font-size: 14px;
  opacity: 0.7;
  margin-top: 2px;
`

type Repo = { name: string; description: string }

const SMART_CONTRACT_REPOS: Repo[] = [
  { name: 'eth-contracts', description: 'Ethereum smart contracts for the protocol.' },
  { name: 'solana-programs', description: 'Solana on-chain programs.' },
]

const PROTOCOL_REPOS: Repo[] = [
  { name: 'go-openaudio', description: 'Go implementation of the Open Audio Protocol.' },
  { name: 'staking', description: 'Staking and delegation interface.' },
  { name: 'docs', description: 'Docs for the Open Audio Protocol.' },
  { name: 'ddex-proto', description: 'Protobuf definitions of DDEX schemas used by the protocol.' },
]

function RepoSection({ title, repos }: { title: string; repos: Repo[] }) {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <RepoList>
        {repos.map((repo) => (
          <RepoItem key={repo.name}>
            <RepoLink
              href={`https://github.com/OpenAudio/${repo.name}`}
              target="_blank"
              rel="noreferrer"
            >
              OpenAudio/{repo.name}
            </RepoLink>
            <RepoDesc>{repo.description}</RepoDesc>
          </RepoItem>
        ))}
      </RepoList>
    </Section>
  )
}

export default function Security() {
  return (
    <Page>
      <SiteHeader />
      <Container>
        <Title>Security</Title>
        <Intro>
          Please report security issues to <Mono>security@audius.co</Mono> with a description of the
          vulnerability and any steps to reproduce.
        </Intro>

        <RepoSection title="Smart Contracts" repos={SMART_CONTRACT_REPOS} />

        <RepoSection title="Protocol" repos={PROTOCOL_REPOS} />

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



