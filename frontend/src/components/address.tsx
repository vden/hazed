import { default as BN } from 'bn.js';
import { ec as EC } from "elliptic";
import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface AddressContextType {
  spendingKey: EC.KeyPair | undefined;
  setSpendingKey: any;
  hazedPrivateKey: BN | undefined;
  setHazedPrivateKey: any;
}

export const AddressContext = createContext<AddressContextType | null>(null);

const AddressProvider: React.FC<Props> = ( { children }: { children: React.ReactNode } ) => {
  const [spendingKey, setSpendingKey] = useState<EC.KeyPair>();
  const [hazedPrivateKey, setHazedPrivateKey] = useState<BN>();

  const value = {
    spendingKey,
    setSpendingKey,
    hazedPrivateKey,
    setHazedPrivateKey,
  };

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
};

export default AddressProvider;