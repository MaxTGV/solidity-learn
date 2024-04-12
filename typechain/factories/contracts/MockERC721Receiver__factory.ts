/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  MockERC721Receiver,
  MockERC721ReceiverInterface,
} from "../../contracts/MockERC721Receiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610347806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063150b7a0214610030575b600080fd5b61004a600480360381019061004591906101bc565b610060565b604051610057919061027f565b60405180910390f35b600061007667df1180ef72438e5c60c01b6100b6565b61008a67986dbe82694b9f6660c01b6100b6565b61009e67e97f387c0cd3e74660c01b6100b6565b8282906100ab91906102b2565b905095945050505050565b50565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100ee826100c3565b9050919050565b6100fe816100e3565b811461010957600080fd5b50565b60008135905061011b816100f5565b92915050565b6000819050919050565b61013481610121565b811461013f57600080fd5b50565b6000813590506101518161012b565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261017c5761017b610157565b5b8235905067ffffffffffffffff8111156101995761019861015c565b5b6020830191508360018202830111156101b5576101b4610161565b5b9250929050565b6000806000806000608086880312156101d8576101d76100b9565b5b60006101e68882890161010c565b95505060206101f78882890161010c565b945050604061020888828901610142565b935050606086013567ffffffffffffffff811115610229576102286100be565b5b61023588828901610166565b92509250509295509295909350565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61027981610244565b82525050565b60006020820190506102946000830184610270565b92915050565b600082905092915050565b600082821b905092915050565b60006102be838361029a565b826102c98135610244565b92506004821015610309576103047fffffffff00000000000000000000000000000000000000000000000000000000836004036008026102a5565b831692505b50509291505056fea26469706673582212202a968ff124b1a00194c5bd656d53436fe467ae88d80ec9dcfa8737cc1406568f64736f6c63430008120033";

type MockERC721ReceiverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockERC721ReceiverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockERC721Receiver__factory extends ContractFactory {
  constructor(...args: MockERC721ReceiverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockERC721Receiver> {
    return super.deploy(overrides || {}) as Promise<MockERC721Receiver>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockERC721Receiver {
    return super.attach(address) as MockERC721Receiver;
  }
  override connect(signer: Signer): MockERC721Receiver__factory {
    return super.connect(signer) as MockERC721Receiver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockERC721ReceiverInterface {
    return new utils.Interface(_abi) as MockERC721ReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockERC721Receiver {
    return new Contract(address, _abi, signerOrProvider) as MockERC721Receiver;
  }
}
