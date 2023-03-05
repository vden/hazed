import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight,
  faArrowTurnDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNetwork } from 'wagmi';
import AddressProvider from '../components/address';
import { Connect } from '../components/connect';
import { HazedID } from '../components/hazedid';
import { Network } from '../components/network';
import { Send } from '../components/send';
import { Withdraw } from '../components/withdraw';

import LogoHover from '../svg/logo-hover.svg';
import Logo from '../svg/logo.svg';
import SendReceive from '../svg/send-receive.svg';
import Shield from '../svg/shield.svg';

import { registryAddress } from '../utils/constants';

import './main.css';

export function Main() {
  const [activeTab, setActiveTab] = useState<string>('send');

  const { chain } = useNetwork();
  const contractAddress = registryAddress[chain?.id || 250];

  return (
    <section className="layout">
      <div className="content">
        <div className="header-h">
          <div className="header-item">
            <img className="logo logo-bg" src={LogoHover} alt="Hazed" />
            <img
              className="logo logo-default"
              src={Logo}
              alt="Hazed"
              onClick={() => (document.location.href = '/')}
            />
          </div>
          <div className="header-item">
            <Connect />

            <Network />
          </div>
        </div>

        <div className="promo large-block">
          <h1>
            Bring <span className="promo-accent">anonymous</span> & simple
            <br /> transfers to {chain?.name.split(' ')[0] || 'Fantom'}
          </h1>

          <div className="benefits">
            <div className="item">
              <img src={Shield} alt="" width={24} />
              <p>
                Make use of stealth addresses with <strong>no&nbsp;link</strong>{' '}
                to your existing accounts.
              </p>
            </div>
            <div className="item">
              <img src={SendReceive} alt="" width={24} />
              <p>
                Send and receive {chain?.nativeCurrency.symbol || 'FTM'}{' '}
                <strong>privately</strong> as well as tokens & NFTs{' '}
                <i>(soon)</i>
              </p>
            </div>
          </div>
        </div>

        <AddressProvider>
          <HazedID />

          <div className="large-block">
            <div className="nav-tabs">
              <div
                className={activeTab === 'send' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('send')}
              >
                <h2>
                  <FontAwesomeIcon icon={faArrowRight} />
                  &nbsp; Send
                </h2>
                <span className="super">
                  {chain?.nativeCurrency.symbol || 'FTM'}
                </span>
              </div>
              <div
                className={activeTab === 'withdraw' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('withdraw')}
              >
                <h2>
                  <FontAwesomeIcon icon={faArrowTurnDown} flip="horizontal" />
                  &nbsp; Receive
                </h2>
                <span className="super">
                  {chain?.nativeCurrency.symbol || 'FTM'}
                </span>
              </div>
              <div className="tab disabled" title="Soon!">
                <h2>
                  <FontAwesomeIcon icon={faArrowRight} />
                  &nbsp; Send
                </h2>
                <span className="super">TOKEN</span>
              </div>
              <div className="tab disabled" title="Soon!">
                <h2>
                  <FontAwesomeIcon icon={faArrowTurnDown} flip="horizontal" />
                  &nbsp; Receive
                </h2>
                <span className="super">TOKEN</span>
              </div>
            </div>

            <div
              className="pane"
              style={{ display: activeTab === 'send' ? 'block' : 'none' }}
            >
              <Send />
            </div>
            <div
              className="pane"
              style={{
                display: activeTab === 'withdraw' ? 'block' : 'none',
              }}
            >
              <Withdraw />
            </div>
          </div>
        </AddressProvider>

        <div className="footer">
          <a
            href="https://vitalik.eth.limo/general/2023/01/20/stealth.html"
            rel="noreferrer"
            target="_blank"
          >
            <span>
              How it works &nbsp;
              <FontAwesomeIcon
                icon={faArrowRight}
                transform={{ rotate: -45 }}
              />
            </span>
          </a>
          <a href="https://www.youtube.com/watch?v=38bplxh9nQ0" rel="noreferrer" target="_blank">
            <span>
              Demo video &nbsp;<FontAwesomeIcon icon={faYoutube} />
            </span>
          </a>
          <a
            href={`https://ftmscan.com/address/${contractAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              Registry contract &nbsp;
              <FontAwesomeIcon
                icon={faArrowRight}
                transform={{ rotate: -45 }}
              />
            </span>
          </a>
          <a
            href="https://github.com/vden/hazed"
            style={{ flexGrow: 1 }}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              Github &nbsp;
              <FontAwesomeIcon icon={faGithub} />
            </span>
          </a>
          <span className="version">v1.0.0</span>
        </div>
      </div>
    </section>
  );
}
