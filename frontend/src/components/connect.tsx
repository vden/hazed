import { CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect, useNetwork
} from 'wagmi';

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
        <CDropdown component="div" variant="nav-item">
          <CDropdownToggle>
            <FontAwesomeIcon icon={faWallet} />
            &nbsp;
              { shortAddress }
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem component="a" href={`https://ftmscan.com/address/${address}`} target="_blank">
              {balance ? `${formatEtherTruncated(balance?.value)} ${chain?.nativeCurrency.symbol }` : '...'}
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem component="button" onClick={() => disconnect()}>
              Disconnect
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
    );
  }

  return (
    <div>
      <button
        disabled={!metamask.ready}
        key={metamask.id}
        onClick={() => connect({ connector: metamask })}
      >
        Connect Wallet
        {!metamask.ready && ' (unsupported)'}
        {isLoading && metamask.id === pendingConnector?.id && ' (connecting)'}
      </button>

      {error && <div>{error.message}</div>}
    </div>
  );
}
