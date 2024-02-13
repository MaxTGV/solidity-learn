/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Staking, StakingInterface } from "../../contracts/Staking";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_depositToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_lockPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardPercentage",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InsufficientAllowanceError",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientBalanceError",
    type: "error",
  },
  {
    inputs: [],
    name: "LockPeriodNotEndedError",
    type: "error",
  },
  {
    inputs: [],
    name: "NoActiveDepositError",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardAlreadyClaimedError",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardNotClaimedError",
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
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "DepositMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
    ],
    name: "calculateReward",
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
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositToken",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "rewardClaimed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockPeriod",
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
    name: "rewardPercentage",
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
    name: "rewardToken",
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
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200192d3803806200192d833981810160405281019062000037919062000204565b6200005367865f7ff078bc550c60c01b6200015c60201b60201c565b6200006f677fb25e57f4b767f960c01b6200015c60201b60201c565b836000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000cb67089b0faa4aa6e12060c01b6200015c60201b60201c565b82600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200012867d9275b466c62490b60c01b6200015c60201b60201c565b816002819055506200014b6774cff9f8186dd0a060c01b6200015c60201b60201c565b806003819055505050505062000276565b50565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001918262000164565b9050919050565b620001a38162000184565b8114620001af57600080fd5b50565b600081519050620001c38162000198565b92915050565b6000819050919050565b620001de81620001c9565b8114620001ea57600080fd5b50565b600081519050620001fe81620001d3565b92915050565b600080600080608085870312156200022157620002206200015f565b5b60006200023187828801620001b2565b94505060206200024487828801620001b2565b93505060406200025787828801620001ed565b92505060606200026a87828801620001ed565b91505092959194509250565b6116a780620002866000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063b6b55f2511610066578063b6b55f25146100e8578063c89039c514610104578063d2d7231f14610122578063f7c618c114610152578063fc7e286d1461017057610093565b8063372500ab146100985780633ccfd60b146100a25780633fd8b02f146100ac57806352d472eb146100ca575b600080fd5b6100a06101a2565b005b6100aa610558565b005b6100b4610866565b6040516100c191906110b4565b60405180910390f35b6100d261086c565b6040516100df91906110b4565b60405180910390f35b61010260048036038101906100fd9190611100565b610872565b005b61010c610d0b565b60405161011991906111ac565b60405180910390f35b61013c60048036038101906101379190611100565b610d2f565b60405161014991906110b4565b60405180910390f35b61015a610d8e565b60405161016791906111ac565b60405180910390f35b61018a60048036038101906101859190611205565b610db4565b6040516101999392919061124d565b60405180910390f35b6101b66711fedad236d3927060c01b610deb565b6101ca672dcf91e3dac1c84e60c01b610deb565b6101de67d04e502e0148bf4c60c01b610deb565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905061023567fc7f19837cbd8d5160c01b610deb565b6102496782769d01382c789d60c01b610deb565b60008160000154036102af5761026967821271a283c401bf60c01b610deb565b61027d6740a09fc0baf6130960c01b610deb565b6040517f3bdb9bb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6102c367bca6d3b35847855960c01b610deb565b6102d767a66ad4158a7d4e3660c01b610deb565b6102eb67c603eff68f626a4a60c01b610deb565b60025481600101546102fd91906112b3565b42101561035e576103186796dd0d323baf8c8060c01b610deb565b61032c67292e439608a74b7260c01b610deb565b6040517fd9be2ec100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61037267ea08e9f76d83900460c01b610deb565b61038667b70ae65c7811cbec60c01b610deb565b61039a67ab8287cf6802cfcc60c01b610deb565b8060020160009054906101000a900460ff161561040b576103c567b14fd6b98354e3bc60c01b610deb565b6103d967bb0f19299bc45aa660c01b610deb565b6040517f82e4b30100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61041f679f2728ce1bab770160c01b610deb565b610433677322bb514cfe549460c01b610deb565b610447678162a32c9ea7c1ad60c01b610deb565b60006104568260000154610d2f565b905061046c6787fe6e47659784b060c01b610deb565b60018260020160006101000a81548160ff02191690831515021790555061049d67b75c882d1c725a5760c01b610deb565b6104b167d48fcfbd95a894b860c01b610deb565b6104de600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff163383610dee565b6104f2678b9d528133ba36c860c01b610deb565b61050667328e3879845dcd5660c01b610deb565b3373ffffffffffffffffffffffffffffffffffffffff167f106f923f993c2149d49b4255ff723acafa1f2d94393f561d3eda32ae348f72418260405161054c91906110b4565b60405180910390a25050565b61056c673ea277e1c21e8d6760c01b610deb565b610580677462d7cf631606f560c01b610deb565b610594673b962275fcda9a5e60c01b610deb565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506105eb67c330a30de6f49f8b60c01b610deb565b6105ff67b3d20fd51a88cd4460c01b610deb565b60008160000154036106655761061f67b0d02a7989428d2e60c01b610deb565b610633670ad504980822483d60c01b610deb565b6040517f3bdb9bb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106796706e75c331dd0d15360c01b610deb565b61068d677e2a071c1a6134f360c01b610deb565b6106a16789ebc052e7d3f39f60c01b610deb565b8060020160009054906101000a900460ff16610711576106cb675f150bc4fc9f15d060c01b610deb565b6106df6720598f9a070d185b60c01b610deb565b6040517fd3182ccf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107256775fcb40e6093c42660c01b610deb565b61073967e56a153f4b27f46e60c01b610deb565b61074d67adf0c7b05b6fbc6d60c01b610deb565b61077c60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16338360000154610dee565b610790673202b41d496f96be60c01b610deb565b600081600001819055506107ae676d8ac8120e7a383260c01b610deb565b600081600101819055506107cc674f52f81bc1e83f8060c01b610deb565b60008160020160006101000a81548160ff0219169083151502179055506107fd6706f61ccf40dcc78160c01b610deb565b610811676bea167a504bb3c660c01b610deb565b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826000015460405161085b91906110b4565b60405180910390a250565b60025481565b60035481565b61088667ab10e3a5f1d5dd6260c01b610deb565b61089a679701cbcd65a3dec260c01b610deb565b6108ae670e6261f8ddb94f4860c01b610deb565b60008103610910576108ca67b4aa8909311d35c160c01b610deb565b6108de67e869c5bf953e3d2160c01b610deb565b6040517f6e0ccc0700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610924672af90f03830043e760c01b610deb565b61093867cf4bd2416b6c166860c01b610deb565b61094c678851f1cfbdd6d41a60c01b610deb565b8060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b81526004016109a89291906112f6565b602060405180830381865afa1580156109c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e99190611334565b1015610a4957610a0367881966263927f36060c01b610deb565b610a1767932112279b66af3160c01b610deb565b6040517f73a74a7800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610a5d679e99cf3d8b3d5bfd60c01b610deb565b610a7167b26f0076b996396c60c01b610deb565b610a856734e68e7143dc379860c01b610deb565b8060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b8152600401610adf9190611361565b602060405180830381865afa158015610afc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b209190611334565b1015610b8057610b3a678a877cc640c33a3e60c01b610deb565b610b4e671be217876c6581d760c01b610deb565b6040517f384d3c5900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610b9467b3a1df53e5a60e8660c01b610deb565b610ba867940c2fbfdcb171ee60c01b610deb565b610bbc677211318d5432e33560c01b610deb565b610be860008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16333084610f43565b610bfc677eedbd5c3e5bdf4360c01b610deb565b604051806060016040528082815260200142815260200160001515815250600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff021916908315150217905550905050610ca4675c46d486ff4337cf60c01b610deb565b610cb86702aa47dd55be4f6960c01b610deb565b3373ffffffffffffffffffffffffffffffffffffffff167f0b05f0d1cd0819f155b8a61f60baf7767c1ee49d04aeaab701df236140eb93f98242604051610d0092919061137c565b60405180910390a250565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000610d4567bee627ea5dac473860c01b610deb565b610d59679ac5a6b9b0761f1760c01b610deb565b610d6d6763a97bb2901bc14360c01b610deb565b606460035483610d7d91906113a5565b610d879190611416565b9050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60046020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900460ff16905083565b50565b6000808473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b8585604051602401610e23929190611447565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610e8d91906114e1565b6000604051808303816000865af19150503d8060008114610eca576040519150601f19603f3d011682016040523d82523d6000602084013e610ecf565b606091505b5091509150818015610efd5750600081511480610efc575080806020019051810190610efb9190611524565b5b5b610f3c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f33906115ae565b60405180910390fd5b5050505050565b6000808573ffffffffffffffffffffffffffffffffffffffff166323b872dd60e01b868686604051602401610f7a939291906115ce565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610fe491906114e1565b6000604051808303816000865af19150503d8060008114611021576040519150601f19603f3d011682016040523d82523d6000602084013e611026565b606091505b509150915081801561105457506000815114806110535750808060200190518101906110529190611524565b5b5b611093576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108a90611651565b60405180910390fd5b505050505050565b6000819050919050565b6110ae8161109b565b82525050565b60006020820190506110c960008301846110a5565b92915050565b600080fd5b6110dd8161109b565b81146110e857600080fd5b50565b6000813590506110fa816110d4565b92915050565b600060208284031215611116576111156110cf565b5b6000611124848285016110eb565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061117261116d6111688461112d565b61114d565b61112d565b9050919050565b600061118482611157565b9050919050565b600061119682611179565b9050919050565b6111a68161118b565b82525050565b60006020820190506111c1600083018461119d565b92915050565b60006111d28261112d565b9050919050565b6111e2816111c7565b81146111ed57600080fd5b50565b6000813590506111ff816111d9565b92915050565b60006020828403121561121b5761121a6110cf565b5b6000611229848285016111f0565b91505092915050565b60008115159050919050565b61124781611232565b82525050565b600060608201905061126260008301866110a5565b61126f60208301856110a5565b61127c604083018461123e565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006112be8261109b565b91506112c98361109b565b92508282019050808211156112e1576112e0611284565b5b92915050565b6112f0816111c7565b82525050565b600060408201905061130b60008301856112e7565b61131860208301846112e7565b9392505050565b60008151905061132e816110d4565b92915050565b60006020828403121561134a576113496110cf565b5b60006113588482850161131f565b91505092915050565b600060208201905061137660008301846112e7565b92915050565b600060408201905061139160008301856110a5565b61139e60208301846110a5565b9392505050565b60006113b08261109b565b91506113bb8361109b565b92508282026113c98161109b565b915082820484148315176113e0576113df611284565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006114218261109b565b915061142c8361109b565b92508261143c5761143b6113e7565b5b828204905092915050565b600060408201905061145c60008301856112e7565b61146960208301846110a5565b9392505050565b600081519050919050565b600081905092915050565b60005b838110156114a4578082015181840152602081019050611489565b60008484015250505050565b60006114bb82611470565b6114c5818561147b565b93506114d5818560208601611486565b80840191505092915050565b60006114ed82846114b0565b915081905092915050565b61150181611232565b811461150c57600080fd5b50565b60008151905061151e816114f8565b92915050565b60006020828403121561153a576115396110cf565b5b60006115488482850161150f565b91505092915050565b600082825260208201905092915050565b7f5354000000000000000000000000000000000000000000000000000000000000600082015250565b6000611598600283611551565b91506115a382611562565b602082019050919050565b600060208201905081810360008301526115c78161158b565b9050919050565b60006060820190506115e360008301866112e7565b6115f060208301856112e7565b6115fd60408301846110a5565b949350505050565b7f5354460000000000000000000000000000000000000000000000000000000000600082015250565b600061163b600383611551565b915061164682611605565b602082019050919050565b6000602082019050818103600083015261166a8161162e565b905091905056fea2646970667358221220892f4b003004b6240a11429f9ebbf580d2625232c9283de1e129cfa0f97d499164736f6c63430008120033";

type StakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Staking__factory extends ContractFactory {
  constructor(...args: StakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _depositToken: PromiseOrValue<string>,
    _rewardToken: PromiseOrValue<string>,
    _lockPeriod: PromiseOrValue<BigNumberish>,
    _rewardPercentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Staking> {
    return super.deploy(
      _depositToken,
      _rewardToken,
      _lockPeriod,
      _rewardPercentage,
      overrides || {}
    ) as Promise<Staking>;
  }
  override getDeployTransaction(
    _depositToken: PromiseOrValue<string>,
    _rewardToken: PromiseOrValue<string>,
    _lockPeriod: PromiseOrValue<BigNumberish>,
    _rewardPercentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _depositToken,
      _rewardToken,
      _lockPeriod,
      _rewardPercentage,
      overrides || {}
    );
  }
  override attach(address: string): Staking {
    return super.attach(address) as Staking;
  }
  override connect(signer: Signer): Staking__factory {
    return super.connect(signer) as Staking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingInterface {
    return new utils.Interface(_abi) as StakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Staking {
    return new Contract(address, _abi, signerOrProvider) as Staking;
  }
}
