import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import TypeIt from 'typeit-react';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Adithya Anilkumar.</h2>;
  const three = <h3 className="big-heading"><TypeIt
  options={{
    loop: true,
  }}
  getBeforeInit={instance => {
    instance
      .type('Hobbyist Developer')
      .pause(750)
      .delete(18)
      .pause(500)
      .type('Maker')
      .pause(750)
      .delete(5)
      .pause(500)
      .type('Chai Lover')
      .pause(750)
      .delete(10)
      .pause(500)
      .type('Cyborg')
      .pause(500)
      .delete(6)
      .pause(500)
      .type('Audiophile')
      .pause(750)
      .delete(10)
      .pause(500)
      .go();

    // Remember to return it!
    return instance;
  }}></TypeIt></h3>;
  const four = (
    <>
      <p>
      and also a Jedi Master who loves to fly X-Wings :) <br></br><br></br>

I am a DIY Homosapien who loves to create new products and get my hands dirty with Fullstack Web Development and IoT!
<br/>
Currently, I’m focused on building next gen EV's
        at{' '}
        <a href="https://atherenergy.com/" target="_blank" rel="noreferrer">
          Ather Energy
        </a>
        .
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://form.typeform.com/to/dMWZ9O4C?typeform-source=devquest.typeform.com"
      target="_blank"
      rel="noreferrer">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
