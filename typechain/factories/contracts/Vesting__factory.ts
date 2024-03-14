/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Vesting, VestingInterface } from "../../contracts/Vesting";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_vestingToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DistributePeriodOver",
    type: "error",
  },
  {
    inputs: [],
    name: "NoRightsDistributed",
    type: "error",
  },
  {
    inputs: [],
    name: "RightsAlreadyDistributed",
    type: "error",
  },
  {
    inputs: [],
    name: "VestingNotStarted",
    type: "error",
  },
  {
    inputs: [],
    name: "VestingPeriodOver",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAmountError",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RightsDistributed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensWithdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "DISTRIBUTE_RIGHTS_PERIOD",
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
    inputs: [],
    name: "VESTING_DURATION",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "distributeRights",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getAvailableAmount",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "releasePercentageByMonth",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vestingEndTime",
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
        name: "",
        type: "address",
      },
    ],
    name: "vestingInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "distributed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vestingStartTime",
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
    inputs: [],
    name: "vestingToken",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001a4338038062001a43833981810160405281019062000037919062000350565b620000576200004b6200021760201b60201c565b6200021f60201b60201c565b62000073670f105ebe388c746860c01b620002e360201b60201c565b6200008f671535fcb0501e8aab60c01b620002e360201b60201c565b6201518042620000a09190620003bb565b600481905550620000c267dd50dc09164fd2ca60c01b620002e360201b60201c565b6293a800600454620000d59190620003bb565b600581905550620000f767d351d17916d031af60c01b620002e360201b60201c565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000154670d7c3aafcc7a99e060c01b620002e360201b60201c565b600a6003600060018152602001908152602001600020819055506200018a6792cf88813da58e8d60c01b620002e360201b60201c565b601e600360006002815260200190815260200160002081905550620001c0678cfa6095e85e770560c01b620002e360201b60201c565b6032600360006003815260200190815260200160002081905550620001f6674ba80a756cda22e560c01b620002e360201b60201c565b606460036000600481526020019081526020016000208190555050620003f6565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200031882620002eb565b9050919050565b6200032a816200030b565b81146200033657600080fd5b50565b6000815190506200034a816200031f565b92915050565b600060208284031215620003695762000368620002e6565b5b6000620003798482850162000339565b91505092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620003c88262000382565b9150620003d58362000382565b9250828201905080821115620003f057620003ef6200038c565b5b92915050565b61163d80620004066000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806386fab45e1161008c578063a8660a7811610066578063a8660a78146101dc578063e24ac66d146101fa578063f2fde38b14610218578063f78e633d14610234576100cf565b806386fab45e146101965780638d8f2adb146101b45780638da5cb5b146101be576100cf565b806319d152fa146100d45780631f3a71ba146100f257806329e1e280146101225780634cfc4d3014610152578063715018a61461017057806374a56e1f1461017a575b600080fd5b6100dc610266565b6040516100e99190611075565b60405180910390f35b61010c600480360381019061010791906110d3565b61028c565b6040516101199190611119565b60405180910390f35b61013c60048036038101906101379190611160565b6105ea565b6040516101499190611119565b60405180910390f35b61015a610602565b6040516101679190611119565b60405180910390f35b610178610609565b005b610194600480360381019061018f919061118d565b610691565b005b61019e610ab6565b6040516101ab9190611119565b60405180910390f35b6101bc610abc565b005b6101c6610c6e565b6040516101d391906111dc565b60405180910390f35b6101e4610c97565b6040516101f19190611119565b60405180910390f35b610202610c9d565b60405161020f9190611119565b60405180910390f35b610232600480360381019061022d91906110d3565b610ca4565b005b61024e600480360381019061024991906110d3565b610d9b565b60405161025d93929190611212565b60405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006102a267b686702a9804f18160c01b610dd2565b6102b667b619fcd3c729c77960c01b610dd2565b6102ca670101da5d71fd6bee60c01b610dd2565b60045442101561032e576102e867f9b52df6925dcf8a60c01b610dd2565b6102fc67f2a779b43b894bf560c01b610dd2565b6040517f35549be800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61034267cc883798f3716aa260c01b610dd2565b610356673fd6819c6cac888860c01b610dd2565b61036a67aecc31a749a73a0b60c01b610dd2565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001540361040e576103c867e3fd49538a3e0bfa60c01b610dd2565b6103dc676fadd0eeb1e8a1b960c01b610dd2565b6040517fe293fd6f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610422673d8bbbd142bc209060c01b610dd2565b610436673b75f3cdccb3350160c01b610dd2565b61044a670a07b8f50fcc508260c01b610dd2565b600062278d006004544261045e9190611278565b61046891906112db565b905061047e67cd872cc1087abd7060c01b610dd2565b6104926792cfdac97fccdd8460c01b610dd2565b6000600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015490506104ed67836f5ea5d0daa51c60c01b610dd2565b61050167ed9733d22362681660c01b610dd2565b6000600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154905061055c6752ee1c2fc026764e60c01b610dd2565b61057067740e194a62ccef6b60c01b610dd2565b6000606460036000600187610585919061130c565b8152602001908152602001600020548461059f9190611340565b6105a991906112db565b90506105bf67780fd75e5e1b7f4460c01b610dd2565b6105d367107b6a29684c339d60c01b610dd2565b81816105df9190611278565b945050505050919050565b60036020528060005260406000206000915090505481565b6293a80081565b610611610dd5565b73ffffffffffffffffffffffffffffffffffffffff1661062f610c6e565b73ffffffffffffffffffffffffffffffffffffffff1614610685576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067c906113df565b60405180910390fd5b61068f6000610ddd565b565b6106a5670559b1eb4e4ab2ec60c01b610dd2565b6106ad610dd5565b73ffffffffffffffffffffffffffffffffffffffff166106cb610c6e565b73ffffffffffffffffffffffffffffffffffffffff1614610721576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610718906113df565b60405180910390fd5b6107356747cdd0cc13f1da4960c01b610dd2565b61074967372e14a6acd4314a60c01b610dd2565b61075d67d89da01f35c6629a60c01b610dd2565b61077167adf82f38103bc87b60c01b610dd2565b6004544211156107d55761078f67f552b5fbdbfa743e60c01b610dd2565b6107a3671c322ab7051c86cd60c01b610dd2565b6040517f2742f6e800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107e967a6584d1dcac0526d60c01b610dd2565b6107fd67946f2d353d78883d60c01b610dd2565b610811673fc8a97f8cae50b760c01b610dd2565b600081036108735761082d6738bca69cc653893e60c01b610dd2565b6108416766e6bafeb0290e9a60c01b610dd2565b6040517f6e0ccc0700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610887671bf8aacc26ed29e660c01b610dd2565b61089b67bda04d75a0e051df60c01b610dd2565b6108af67be3405b67ef9b1ad60c01b610dd2565b600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff161561095e5761091867acfa461f48cbf88a60c01b610dd2565b61092c6789c75fe1fe1153ca60c01b610dd2565b6040517f6b05e89300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61097267a2e6cce0b3f973f560c01b610dd2565b6109866704a2e06e71912c0760c01b610dd2565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506109e1673484632edd0dbd5f60c01b610dd2565b6001600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548160ff021916908315150217905550610a50677f7777b268d1f61f60c01b610dd2565b610a6467eba45c43e11d7fe260c01b610dd2565b8173ffffffffffffffffffffffffffffffffffffffff167f2ef4b79db08d5b9133b3407e7550851510485871e56619e6301f35679090015e82604051610aaa9190611119565b60405180910390a25050565b60055481565b610ad06761417616e4b4a47960c01b610dd2565b610ae467ebfcd9c2a4166f5160c01b610dd2565b610af867e91d1fe25a7eadaf60c01b610dd2565b6000339050610b11673bab048750cdc59760c01b610dd2565b610b256702e8a400559fbc9060c01b610dd2565b6000610b308261028c565b9050610b4667a3c751977ad261f360c01b610dd2565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254610b98919061130c565b92505081905550610bb367f4a8529f4fca185060c01b610dd2565b610bc7675db53572e11a7f2660c01b610dd2565b610bf4600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff163383610ea1565b610c086780db8299f24c712860c01b610dd2565b610c1c674fe80de5ca4074e360c01b610dd2565b8173ffffffffffffffffffffffffffffffffffffffff167f6352c5382c4a4578e712449ca65e83cdb392d045dfcf1cad9615189db2da244b82604051610c629190611119565b60405180910390a25050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60045481565b6201518081565b610cac610dd5565b73ffffffffffffffffffffffffffffffffffffffff16610cca610c6e565b73ffffffffffffffffffffffffffffffffffffffff1614610d20576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d17906113df565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d8690611471565b60405180910390fd5b610d9881610ddd565b50565b60026020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900460ff16905083565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000808473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b8585604051602401610ed6929190611491565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610f40919061152b565b6000604051808303816000865af19150503d8060008114610f7d576040519150601f19603f3d011682016040523d82523d6000602084013e610f82565b606091505b5091509150818015610fb05750600081511480610faf575080806020019051810190610fae919061156e565b5b5b610fef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fe6906115e7565b60405180910390fd5b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061103b61103661103184610ff6565b611016565b610ff6565b9050919050565b600061104d82611020565b9050919050565b600061105f82611042565b9050919050565b61106f81611054565b82525050565b600060208201905061108a6000830184611066565b92915050565b600080fd5b60006110a082610ff6565b9050919050565b6110b081611095565b81146110bb57600080fd5b50565b6000813590506110cd816110a7565b92915050565b6000602082840312156110e9576110e8611090565b5b60006110f7848285016110be565b91505092915050565b6000819050919050565b61111381611100565b82525050565b600060208201905061112e600083018461110a565b92915050565b61113d81611100565b811461114857600080fd5b50565b60008135905061115a81611134565b92915050565b60006020828403121561117657611175611090565b5b60006111848482850161114b565b91505092915050565b600080604083850312156111a4576111a3611090565b5b60006111b2858286016110be565b92505060206111c38582860161114b565b9150509250929050565b6111d681611095565b82525050565b60006020820190506111f160008301846111cd565b92915050565b60008115159050919050565b61120c816111f7565b82525050565b6000606082019050611227600083018661110a565b611234602083018561110a565b6112416040830184611203565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061128382611100565b915061128e83611100565b92508282039050818111156112a6576112a5611249565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006112e682611100565b91506112f183611100565b925082611301576113006112ac565b5b828204905092915050565b600061131782611100565b915061132283611100565b925082820190508082111561133a57611339611249565b5b92915050565b600061134b82611100565b915061135683611100565b925082820261136481611100565b9150828204841483151761137b5761137a611249565b5b5092915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006113c9602083611382565b91506113d482611393565b602082019050919050565b600060208201905081810360008301526113f8816113bc565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061145b602683611382565b9150611466826113ff565b604082019050919050565b6000602082019050818103600083015261148a8161144e565b9050919050565b60006040820190506114a660008301856111cd565b6114b3602083018461110a565b9392505050565b600081519050919050565b600081905092915050565b60005b838110156114ee5780820151818401526020810190506114d3565b60008484015250505050565b6000611505826114ba565b61150f81856114c5565b935061151f8185602086016114d0565b80840191505092915050565b600061153782846114fa565b915081905092915050565b61154b816111f7565b811461155657600080fd5b50565b60008151905061156881611542565b92915050565b60006020828403121561158457611583611090565b5b600061159284828501611559565b91505092915050565b7f5354000000000000000000000000000000000000000000000000000000000000600082015250565b60006115d1600283611382565b91506115dc8261159b565b602082019050919050565b60006020820190508181036000830152611600816115c4565b905091905056fea2646970667358221220a61c99260e87066a4e35bdb74ba254c7f144c8ba5f81b20723fe085a738948d164736f6c63430008120033";

type VestingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VestingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Vesting__factory extends ContractFactory {
  constructor(...args: VestingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _vestingToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Vesting> {
    return super.deploy(_vestingToken, overrides || {}) as Promise<Vesting>;
  }
  override getDeployTransaction(
    _vestingToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_vestingToken, overrides || {});
  }
  override attach(address: string): Vesting {
    return super.attach(address) as Vesting;
  }
  override connect(signer: Signer): Vesting__factory {
    return super.connect(signer) as Vesting__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VestingInterface {
    return new utils.Interface(_abi) as VestingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Vesting {
    return new Contract(address, _abi, signerOrProvider) as Vesting;
  }
}
