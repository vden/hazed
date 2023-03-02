import { faLink, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect, useNetwork
} from 'wagmi';

import "./network.css";

import chevronUp from '../svg/chevron-up.svg';
import { formatEtherTruncated } from '../utils/format';


export function Connect() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  // const { data: ensAvatar } = useEnsAvatar({ address, chainId: 1 });
  // const { data: ensName } = useEnsName({ address, chainId: 1 });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const [ metamask ] = connectors;

  const shortAddress = address
    ? `${address.substring(0, 6)}…${address.substring(address.length - 4)}`
    : '-';

  if (isConnected) {
    return (
      <div>
        <div>
          <div className="dropdown-head">
            <span>
              <FontAwesomeIcon icon={faWallet} />
              &nbsp;
              {shortAddress}
            </span>
            <button className="arrow arrow-down">
              <img src={chevronUp} alt="" />
            </button>
          </div>
          <div className="dropdown-body">
            <a
              href={`https://ftmscan.com/address/${address}`}
              target="_blank"
              rel="noreferrer"
              className="text"
            >
              {balance
                ? `${formatEtherTruncated(balance?.value)} ${
                    chain?.nativeCurrency.symbol
                  }`
                : '...'}
            </a>
            <button
              className="hbutton hbutton-lnk"
              style={{ paddingLeft: 0, textTransform: 'none' }}
              onClick={() => disconnect()}
            >
              <span>
                Disconnect
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        className="hbutton hbutton-lnk"
        disabled={!metamask.ready}
        key={metamask.id}
        style={{textTransform: "none"}}
        onClick={() => connect({ connector: metamask })}
      >
        <span>
          Connect wallet&nbsp;
          <FontAwesomeIcon icon={faLink} />
          {!metamask.ready && ' (unsupported)'}
          {isLoading && metamask.id === pendingConnector?.id && ' (connecting)'}
        </span>
      </button>

      {error && <div>{error.message}</div>}
    </div>
  );
}
