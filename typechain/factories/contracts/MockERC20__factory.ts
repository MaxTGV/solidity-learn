/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { MockERC20, MockERC20Interface } from "../../contracts/MockERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506102f2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806323b872dd1461003b578063dd62ed3e1461006b575b600080fd5b610055600480360381019061005091906101c9565b61009b565b6040516100629190610237565b60405180910390f35b61008560048036038101906100809190610252565b6100e4565b60405161009291906102a1565b60405180910390f35b60006100b16783600ed93bf566ec60c01b61012d565b6100c567d16e279e975c48de60c01b61012d565b6100d967a01fdbe24a45a21660c01b61012d565b600090509392505050565b60006100fa6797501545e677e6e160c01b61012d565b61010e676cb5b3543db26ab960c01b61012d565b610122673d030578f264e6db60c01b61012d565b6103e8905092915050565b50565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061016082610135565b9050919050565b61017081610155565b811461017b57600080fd5b50565b60008135905061018d81610167565b92915050565b6000819050919050565b6101a681610193565b81146101b157600080fd5b50565b6000813590506101c38161019d565b92915050565b6000806000606084860312156101e2576101e1610130565b5b60006101f08682870161017e565b93505060206102018682870161017e565b9250506040610212868287016101b4565b9150509250925092565b60008115159050919050565b6102318161021c565b82525050565b600060208201905061024c6000830184610228565b92915050565b6000806040838503121561026957610268610130565b5b60006102778582860161017e565b92505060206102888582860161017e565b9150509250929050565b61029b81610193565b82525050565b60006020820190506102b66000830184610292565b9291505056fea26469706673582212207378f4db1093ab53e70dff34111e2529c51fd8f3b3911482264f5db01dabb1a864736f6c63430008120033";

type MockERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockERC20__factory extends ContractFactory {
  constructor(...args: MockERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockERC20> {
    return super.deploy(overrides || {}) as Promise<MockERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockERC20 {
    return super.attach(address) as MockERC20;
  }
  override connect(signer: Signer): MockERC20__factory {
    return super.connect(signer) as MockERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockERC20Interface {
    return new utils.Interface(_abi) as MockERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockERC20 {
    return new Contract(address, _abi, signerOrProvider) as MockERC20;
  }
}
