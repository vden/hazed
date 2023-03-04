# Hazed

Hazed enables you to receive funds in EVM chains without revealing your personal account. It's a non-custodial and decentralized platform, so no one will know your address unless you intentionally make a link between stealth address and yours.

The project comprises of a Registry smart contract written in Solidity and a website built using Typescript/React.

Currently, the platform is available on Fantom.

## How does it work

Hazed is heavily inspired by [Vitalik's recent article on stealth addresses](https://vitalik.eth.limo/general/2023/01/20/stealth.html). 

Here is an excerpt from the article explaining cryptography under the hood:

> 1. Bob generates his **root spending key** (`m`) and **stealth meta-address** (`M`).
> 2. Bob adds an ENS record to register `M` as the stealth meta-address for `bob.eth`.
> 3. We assume Alice knows that Bob is `bob.eth`. Alice looks up his stealth meta-address `M` on ENS.
> 4. Alice generates an **ephemeral key** that only she knows, and that she only uses once (to generate this specific stealth address).
> 5. Alice uses an algorithm that combines her ephemeral key and Bob's meta-address to **generate a stealth address**. She can now send assets to this address.
> 6. Alice also **generates her ephemeral public key, and publishes it to the ephemeral public key registry** (this can be done in the same transaction as the first transaction sending assets to this stealth address).
> 7. For Bob to discover stealth addresses belonging to him, Bob needs to **scan the ephemeral public key registry for the *entire list* of ephemeral public keys** published by anyone for any reason since the last time he did the scan.
> 8. For each ephemeral public key, Bob attempts to combine it with his root spending key to generate a stealth address, and checks if there are any assets in that address. If there are, Bob computes the spending key for that address and remembers it.

Hazed uses its own Hazed IDs instead of adding anything to the ENS. It also implements a few improvements to speed up ephemeral keys check.

## Future

While Hazed allows you to transfer native coins, working with tokens and NFTs is a more complex task. We have plans to add support for tokens/NFTs, which will be transferred from a stealth address with the help of relayers. Users will pay the relayer in advance and receive approval notes to use for token/NFT withdrawal (while the actual fee will be covered by the relayer).

Furthermore, Fantom's compatibility with most Ethereum solutions on the EVM level makes it easy to add support for more networks. Once they are supported, we will search for an effective way to allow cross-chain transfers using Hazed ID.
