import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { IconLoader } from '@components/icons';
import styled from 'styled-components';
import { mixins } from '@styles';
import './loader.css';

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-color: var(--dark-navy);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;
const StyledLogo = styled.div`
  transition: var(--transition);
  opacity: ${props => (props.isMounted ? 1 : 0)};
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;

    user-select: none;
  }
  @media (max-width: 480px) {
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      width: 125%;
      height: 100%;
      display: block;
      margin: 0 auto;
      user-select: none;
    }
    @media (max-width: 640px) {
      transition: var(--transition);
      opacity: ${props => (props.isMounted ? 1 : 0)};
      svg {
        width: 125%;
        height: 100%;
        display: block;
        user-select: none;
      }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);
  const animate = () => {
    // const loader = anime.timeline({
    //   complete: () => finishLoading(),
    // });
    const timeline = anime.timeline({
      easing: 'easeInOutSine',
      duration: 500,
      complete: () => finishLoading(),
    });

    timeline
      .add({
        targets: '#sig path',
        strokeDashoffset: [anime.setDashoffset, 0],
        delay: anime.stagger(300),
        endDelay: 0,
      })
      .add({
        targets: '#name',
        opacity: [0, 1],
        translateY: [-5, 0],
        duration: 250,
        endDelay: 500,
      });

    // loader
    //   .add({
    //     targets: '#logo path',
    //     delay: 300,
    //     duration: 1500,
    //     easing: 'easeInOutQuart',
    //     strokeDashoffset: [anime.setDashoffset, 0],
    //   })
    //   .add({
    //     targets: '#logo #B',
    //     duration: 700,
    //     easing: 'easeInOutQuart',
    //     opacity: 1,
    //   })
    //   .add({
    //     targets: '#logo',
    //     delay: 500,
    //     duration: 300,
    //     easing: 'easeInOutQuart',
    //     opacity: 0,
    //     scale: 0.1,
    //   })
    //   .add({
    //     targets: '.loader',
    //     duration: 200,
    //     easing: 'easeInOutQuart',
    //     opacity: 0,
    //     zIndex: -1,
    //   });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledContainer className="loader">
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <StyledLogo isMounted={isMounted}>
        <IconLoader />
      </StyledLogo>
    </StyledContainer>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;

// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
// import anime from 'animejs';
// import styled from 'styled-components';
// import { IconLoader } from '@components/icons';

// const StyledLoader = styled.div`
//   ${({ theme }) => theme.mixins.flexCenter};
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   width: 100%;
//   height: 100%;
//   background-color: var(--dark-navy);
//   z-index: 99;

//   .logo-wrapper {
//     width: max-content;
//     max-width: 100px;
//     transition: var(--transition);
//     opacity: ${props => (props.isMounted ? 1 : 0)};
//     svg {
//       display: block;
//       width: 100%;
//       height: 100%;
//       margin: 0 auto;
//       fill: none;
//       user-select: none;
//       #B {
//         opacity: 0;
//       }
//     }
//   }
// `;

// const Loader = ({ finishLoading }) => {
//   const [isMounted, setIsMounted] = useState(false);

//   const animate = () => {
//     const loader = anime.timeline({
//       complete: () => finishLoading(),
//     });

//     loader
//       .add({
//         targets: '#logo path',
//         delay: 300,
//         duration: 1500,
//         easing: 'easeInOutQuart',
//         strokeDashoffset: [anime.setDashoffset, 0],
//       })
//       .add({
//         targets: '#logo #B',
//         duration: 700,
//         easing: 'easeInOutQuart',
//         opacity: 1,
//       })
//       .add({
//         targets: '#logo',
//         delay: 500,
//         duration: 300,
//         easing: 'easeInOutQuart',
//         opacity: 0,
//         scale: 0.1,
//       })
//       .add({
//         targets: '.loader',
//         duration: 200,
//         easing: 'easeInOutQuart',
//         opacity: 0,
//         zIndex: -1,
//       });
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => setIsMounted(true), 10);
//     animate();
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <StyledLoader className="loader" isMounted={isMounted}>
//       <Helmet bodyAttributes={{ class: `hidden` }} />

//       <div className="logo-wrapper">
//         <IconLoader />
//       </div>
//     </StyledLoader>
//   );
// };

// Loader.propTypes = {
//   finishLoading: PropTypes.func.isRequired,
// };

// export default Loader;
