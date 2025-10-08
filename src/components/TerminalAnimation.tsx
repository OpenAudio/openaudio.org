import { useState, useEffect } from 'react';
import styled from '@emotion/styled'

interface TerminalAnimationProps {
  className?: string;
}

const COMMANDS = ['GOVERNANCE', 'STAKING', 'SECURITY'];

export default function TerminalAnimation({ className = "" }: TerminalAnimationProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentCommand = COMMANDS[currentCommandIndex];
    
    if (isTyping) {
      if (displayText.length < currentCommand.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentCommand.slice(0, displayText.length + 1));
        }, 100 + Math.random() * 100); // Varying typing speed for realism
        
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before clearing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Clear text and move to next command
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        
        return () => clearTimeout(timeout);
      } else {
        // Move to next command
        const timeout = setTimeout(() => {
          setCurrentCommandIndex((prev) => (prev + 1) % COMMANDS.length);
          setIsTyping(true);
        }, 500);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, isTyping, currentCommandIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Root className={className}>
      <Inner>
        <Text>
          {`> $AUDIO ${displayText}`}
          <Cursor visible={showCursor} />
        </Text>
      </Inner>
      <BorderOverlay aria-hidden="true" />
    </Root>
  );
}

const Root = styled.div`
  position: relative;
  width: 100%;
  background: #000000;
`

const Inner = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 16px 43px;
`

const Text = styled.p`
  margin: 0;
  line-height: 1;
  color: #ffffff;
  letter-spacing: 0.48px;
  text-transform: uppercase;
  font-size: 18px;
  white-space: pre;
  font-family: Terminus, monospace;
`

const Cursor = styled.span<{ visible: boolean }>`
  display: inline-block;
  width: 2px;
  height: 24px;
  background: #ffffff;
  margin-left: 4px;
  vertical-align: top;
  transition: opacity 0.1s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`

const BorderOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`