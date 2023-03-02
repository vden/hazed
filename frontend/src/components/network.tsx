import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useAccount, useNetwork, useSwitchNetwork
} from 'wagmi';
import { networkIcons } from '../utils/constants';

export function Network() {
  const {isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  if (isConnected && switchNetwork && chain) {
    const icon = networkIcons[chain.id];

    return (
      <div>
        <CDropdown component="div" variant="nav-item">
          <CDropdownToggle>
            {icon && <img width="18" src={icon} alt={chain.name} />}{' '}
            {chain.unsupported ? (<span><FontAwesomeIcon icon={faExclamationTriangle} /> Unsupported chain</span>) : chain.name}
          </CDropdownToggle>
          <CDropdownMenu>
            {chains
            .filter((chain) => [250, 4002].indexOf(chain.id) >= 0)
            .map((chain) => (
              <CDropdownItem key={chain.id}
                size={8}
                component="button"
                onClick={() => switchNetwork(chain.id)}
              >
                <img width="18" src={networkIcons[chain.id]} alt={chain.name} />&nbsp;
                {chain.name}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
      </div>
    );
  }

  return <></>
}