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
import type { ERC20, ERC20Interface } from "../../contracts/ERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "initialSupply_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AmountExceedsApproveBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "ApproveFromZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ApproveToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "BurnAmountExceedsBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "BurnFromZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintOwnerOnly",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApproveAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferAmountExceedsBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
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
    name: "Burn",
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
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
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
  "0x60806040523480156200001157600080fd5b5060405162002dfa38038062002dfa8339818101604052810190620000379190620004cd565b6200005367a5f95f106eb6f7d560c01b6200025960201b60201c565b6200006f67f95a1a4381ac805260c01b6200025960201b60201c565b8460009081620000809190620007d4565b506200009d673386ba012188342660c01b6200025960201b60201c565b8360019081620000ae9190620007d4565b50620000cb67abf8093ce785c9ac60c01b6200025960201b60201c565b82600260006101000a81548160ff021916908360ff1602179055506200010267b5c00cd36b82b7be60c01b6200025960201b60201c565b816003819055506200012567acaa08264341641760c01b6200025960201b60201c565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001826786abf8dfbdf0891360c01b6200025960201b60201c565b81600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550620001e267af6cf05b25d9218660c01b6200025960201b60201c565b620001fe674f0f6df58ae05d2e60c01b6200025960201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d412139688583604051620002469190620008cc565b60405180910390a25050505050620008e9565b50565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002c5826200027a565b810181811067ffffffffffffffff82111715620002e757620002e66200028b565b5b80604052505050565b6000620002fc6200025c565b90506200030a8282620002ba565b919050565b600067ffffffffffffffff8211156200032d576200032c6200028b565b5b62000338826200027a565b9050602081019050919050565b60005b838110156200036557808201518184015260208101905062000348565b60008484015250505050565b60006200038862000382846200030f565b620002f0565b905082815260208101848484011115620003a757620003a662000275565b5b620003b484828562000345565b509392505050565b600082601f830112620003d457620003d362000270565b5b8151620003e684826020860162000371565b91505092915050565b600060ff82169050919050565b6200040781620003ef565b81146200041357600080fd5b50565b6000815190506200042781620003fc565b92915050565b6000819050919050565b62000442816200042d565b81146200044e57600080fd5b50565b600081519050620004628162000437565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620004958262000468565b9050919050565b620004a78162000488565b8114620004b357600080fd5b50565b600081519050620004c7816200049c565b92915050565b600080600080600060a08688031215620004ec57620004eb62000266565b5b600086015167ffffffffffffffff8111156200050d576200050c6200026b565b5b6200051b88828901620003bc565b955050602086015167ffffffffffffffff8111156200053f576200053e6200026b565b5b6200054d88828901620003bc565b9450506040620005608882890162000416565b9350506060620005738882890162000451565b92505060806200058688828901620004b6565b9150509295509295909350565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620005e657607f821691505b602082108103620005fc57620005fb6200059e565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620006667fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000627565b62000672868362000627565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620006b5620006af620006a9846200042d565b6200068a565b6200042d565b9050919050565b6000819050919050565b620006d18362000694565b620006e9620006e082620006bc565b84845462000634565b825550505050565b600090565b62000700620006f1565b6200070d818484620006c6565b505050565b5b81811015620007355762000729600082620006f6565b60018101905062000713565b5050565b601f82111562000784576200074e8162000602565b620007598462000617565b8101602085101562000769578190505b62000781620007788562000617565b83018262000712565b50505b505050565b600082821c905092915050565b6000620007a96000198460080262000789565b1980831691505092915050565b6000620007c4838362000796565b9150826002028217905092915050565b620007df8262000593565b67ffffffffffffffff811115620007fb57620007fa6200028b565b5b620008078254620005cd565b6200081482828562000739565b600060209050601f8311600181146200084c576000841562000837578287015190505b620008438582620007b6565b865550620008b3565b601f1984166200085c8662000602565b60005b8281101562000886578489015182556001820191506020850194506020810190506200085f565b86831015620008a65784890151620008a2601f89168262000796565b8355505b6001600288020188555050505b505050505050565b620008c6816200042d565b82525050565b6000602082019050620008e36000830184620008bb565b92915050565b61250180620008f96000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806370a0823111610097578063a9059cbb11610066578063a9059cbb146102c3578063b09f1266146102f3578063d28d885214610311578063dd62ed3e1461032f57610100565b806370a082311461022957806395d89b41146102595780639dc29fac14610277578063a457c2d71461029357610100565b8063313ce567116100d3578063313ce567146101a157806332424aa3146101bf57806339509351146101dd57806340c10f191461020d57610100565b806306fdde0314610105578063095ea7b31461012357806318160ddd1461015357806323b872dd14610171575b600080fd5b61010d61035f565b60405161011a9190612182565b60405180910390f35b61013d6004803603810190610138919061223d565b61042d565b60405161014a9190612298565b60405180910390f35b61015b6104a8565b60405161016891906122c2565b60405180910390f35b61018b600480360381019061018691906122dd565b6104ed565b6040516101989190612298565b60405180910390f35b6101a9610612565b6040516101b6919061234c565b60405180910390f35b6101c7610665565b6040516101d4919061234c565b60405180910390f35b6101f760048036038101906101f2919061223d565b610678565b6040516102049190612298565b60405180910390f35b6102276004803603810190610222919061223d565b610a54565b005b610243600480360381019061023e9190612367565b610dbc565b60405161025091906122c2565b60405180910390f35b610261610e41565b60405161026e9190612182565b60405180910390f35b610291600480360381019061028c919061223d565b610f0f565b005b6102ad60048036038101906102a8919061223d565b611353565b6040516102ba9190612298565b60405180910390f35b6102dd60048036038101906102d8919061223d565b611849565b6040516102ea9190612298565b60405180910390f35b6102fb6118c6565b6040516103089190612182565b60405180910390f35b610319611954565b6040516103269190612182565b60405180910390f35b61034960048036038101906103449190612394565b6119e2565b60405161035691906122c2565b60405180910390f35b606061037567c7ae495f205ea98a60c01b611aa5565b6103896719d484c698dcbc1760c01b611aa5565b61039d6748004cb7d1bd187760c01b611aa5565b600080546103aa90612403565b80601f01602080910402602001604051908101604052809291908181526020018280546103d690612403565b80156104235780601f106103f857610100808354040283529160200191610423565b820191906000526020600020905b81548152906001019060200180831161040657829003601f168201915b5050505050905090565b600061044367a035d1e667b86d5460c01b611aa5565b61045767d36fcebe2430e15b60c01b611aa5565b61046b6756afcec199276c8c60c01b611aa5565b610476338484611aa8565b61048a67cf9c0d311e79b71160c01b611aa5565b61049e67d696a6163640c07d60c01b611aa5565b6001905092915050565b60006104bd660182eddc945a1360c01b611aa5565b6104d167a5cbea5dea05471160c01b611aa5565b6104e5678c2a81f34c75aa4260c01b611aa5565b600354905090565b600061050367ec4072c0d17e4cb560c01b611aa5565b610517679a8ce45bc1bb6c5960c01b611aa5565b61052b670fe86b29339b3a3260c01b611aa5565b6105388484846001611cad565b61054c6710fd7c2490aefb2260c01b611aa5565b81600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105d89190612463565b925050819055506105f3672060cc3aa55a11e360c01b611aa5565b61060767c6b4f712e552dfa960c01b611aa5565b600190509392505050565b6000610628679afd0cf0c69547fd60c01b611aa5565b61063c677423e1c9ed84899c60c01b611aa5565b610650672c820300c56fc97960c01b611aa5565b600260009054906101000a900460ff16905090565b600260009054906101000a900460ff1681565b600061068e675b4880f94cc6723d60c01b611aa5565b6106a267adb11c9d34b790fb60c01b611aa5565b6106b66712dfdb56132ab27160c01b611aa5565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610744576106fe67683e4df07329ba5460c01b611aa5565b610712678db6fffefb88861d60c01b611aa5565b6040517f3b719e1800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610758673cf7425fd50613e360c01b611aa5565b61076c673aee8ca484a3862460c01b611aa5565b610780679f36f3323613f0aa60c01b611aa5565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020540361085e576108186785467eb7293c9a2f60c01b611aa5565b61082c675b756613597a2c8860c01b611aa5565b6040517ff0f0ff1e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61087267b5b2cdc3fb3b76a760c01b611aa5565b610886678aff9c7d5796f4c960c01b611aa5565b81600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109129190612497565b9250508190555061092d6702e368016af2307e60c01b611aa5565b61094167415592224850d85e60c01b611aa5565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051610a1a91906122c2565b60405180910390a3610a36672129c16a87fe767960c01b611aa5565b610a4a67da59f2d9cc7fbfac60c01b611aa5565b6001905092915050565b610a6867f709c074b721409560c01b611aa5565b610a7c672fd1f152e0a975aa60c01b611aa5565b610a90670d22d81cc7923e7c60c01b611aa5565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b3f57610af967d985f5d6697c974260c01b611aa5565b610b0d677e37763996ecbe3b60c01b611aa5565b6040517fcc3f445400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610b536727216693cbdd689b60c01b611aa5565b610b6767c214ee195ea1ac8f60c01b611aa5565b610b7b67a96f63cba65bb50460c01b611aa5565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c0957610bc3672a47641cae3b48b160c01b611aa5565b610bd767a7623ae879d8385560c01b611aa5565b6040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c1d67c64b76c60da09ca860c01b611aa5565b610c3167e41d0a5deb6cb20760c01b611aa5565b8060036000828254610c439190612497565b92505081905550610c5e67b25056e2bf4fa78a60c01b611aa5565b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610cad9190612497565b92505081905550610cc8678c589788c04f383760c01b611aa5565b610cdc670e2c5cd9825a2f1b60c01b611aa5565b8173ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d412139688582604051610d2291906122c2565b60405180910390a2610d3e67aff09b3792b001ff60c01b611aa5565b610d526748f57f844963a45260c01b611aa5565b8173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610db091906122c2565b60405180910390a35050565b6000610dd267a43beb3793beea2460c01b611aa5565b610de667d246eebcdacb985b60c01b611aa5565b610dfa6742deb6fbd978c73c60c01b611aa5565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060610e57676a403ad86c6e0b2a60c01b611aa5565b610e6b67168ff7b32396627360c01b611aa5565b610e7f6733d3f6cfa0099d5560c01b611aa5565b60018054610e8c90612403565b80601f0160208091040260200160405190810160405280929190818152602001828054610eb890612403565b8015610f055780601f10610eda57610100808354040283529160200191610f05565b820191906000526020600020905b815481529060010190602001808311610ee857829003601f168201915b5050505050905090565b610f2367c7ad741bca4ca41660c01b611aa5565b610f37676679d38d7e19750e60c01b611aa5565b610f4b670b10b3b12b2240f760c01b611aa5565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ffa57610fb4673ee1b6eba0602b8260c01b611aa5565b610fc867596b26726d5565c160c01b611aa5565b6040517fcc3f445400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61100e67f99560983a9a587860c01b611aa5565b611022679b5246b04820788b60c01b611aa5565b6110366767b8bbed4ede5a9060c01b611aa5565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036110c45761107e671a8a6eb6103aad7b60c01b611aa5565b61109267caec9ae2da87454160c01b611aa5565b6040517fb817eee700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6110d8671bb0a38e44f4def660c01b611aa5565b6110ec677a872790875c78a860c01b611aa5565b6111006747fe26e253f0599a60c01b611aa5565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481106111a05761115a67e86af5e37dc1321f60c01b611aa5565b61116e6722aa6ca13275305360c01b611aa5565b6040517f177466fe00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6111b4677e40323456de89ce60c01b611aa5565b6111c867bba7d6987954653060c01b611aa5565b80600360008282546111da9190612463565b925050819055506111f567fac5f9d19f1a432e60c01b611aa5565b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112449190612463565b9250508190555061125f67283e838d8435c38460c01b611aa5565b611273671c8e554754817ab560c01b611aa5565b8173ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5826040516112b991906122c2565b60405180910390a26112d56796a3deb5de324b3660c01b611aa5565b6112e9679456a2e6eeaa697d60c01b611aa5565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161134791906122c2565b60405180910390a35050565b600061136967944ab279754ad8b360c01b611aa5565b61137d67d4c04299c8ab8df660c01b611aa5565b61139167f7384fa50f2ce3ec60c01b611aa5565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361141f576113d967965bff0575c2996d60c01b611aa5565b6113ed67b84746e5686844e660c01b611aa5565b6040517f3b719e1800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61143367255b0d8c39c7bbbf60c01b611aa5565b61144767fbfe672b026a909d60c01b611aa5565b61145b67c24451f6839c3da260c01b611aa5565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403611539576114f367a38e97e10c6954d860c01b611aa5565b61150767dbf5c914b04f25b960c01b611aa5565b6040517ff0f0ff1e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61154d67ab352e176264a6c960c01b611aa5565b61156167125b9c9feeb5899560c01b611aa5565b6115756787457e9f0f43368260c01b611aa5565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211156116535761160d6705226c8512980cd560c01b611aa5565b61162167ab681276dd76147660c01b611aa5565b6040517f21cb316e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611667676d4831f093ec19a260c01b611aa5565b61167b67db6dac12bd0e952560c01b611aa5565b81600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546117079190612463565b9250508190555061172267367a0345ef7722db60c01b611aa5565b611736678fe3e54bfb00e10660c01b611aa5565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205460405161180f91906122c2565b60405180910390a361182b6760a51dfbfe66a80160c01b611aa5565b61183f676413be9720e6b4c960c01b611aa5565b6001905092915050565b600061185f671e3d42524fbdd1fe60c01b611aa5565b61187367f65187f1551ac36660c01b611aa5565b6118876767582b13467cc40660c01b611aa5565b6118943384846000611cad565b6118a8672d603b8c4315964160c01b611aa5565b6118bc67fa0d11bbbf216b4260c01b611aa5565b6001905092915050565b600180546118d390612403565b80601f01602080910402602001604051908101604052809291908181526020018280546118ff90612403565b801561194c5780601f106119215761010080835404028352916020019161194c565b820191906000526020600020905b81548152906001019060200180831161192f57829003601f168201915b505050505081565b6000805461196190612403565b80601f016020809104026020016040519081016040528092919081815260200182805461198d90612403565b80156119da5780601f106119af576101008083540402835291602001916119da565b820191906000526020600020905b8154815290600101906020018083116119bd57829003601f168201915b505050505081565b60006119f8673ac81132b0a6021d60c01b611aa5565b611a0c67b3ccf0d1013c413560c01b611aa5565b611a20670eb34d15c720d50860c01b611aa5565b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b50565b611abc6719488a942b07986560c01b611aa5565b611ad0672e0652ee63ecfad360c01b611aa5565b611ae46782dbf7f86372e2de60c01b611aa5565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611b7257611b2c67431eee916acff6a760c01b611aa5565b611b4067abcaf34f4760f03c60c01b611aa5565b6040517f3b719e1800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611b86675cdd2f4f074e7fa460c01b611aa5565b611b9a67e317f389c6265fe460c01b611aa5565b80600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611c2f679073b52a1328dfed60c01b611aa5565b611c43676e5f7c2c12688e2060c01b611aa5565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051611ca091906122c2565b60405180910390a3505050565b611cc167b4e165e1ebead46c60c01b611aa5565b611cd567129d6fecb24a9fd960c01b611aa5565b611ce9679233619858715e1e60c01b611aa5565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611d7757611d31677eb0aec4aaa28fb860c01b611aa5565b611d4567ec0236a902eeb66560c01b611aa5565b6040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611d8b675b9769b9e1c1d77160c01b611aa5565b611d9f67cd639701c39a53ef60c01b611aa5565b611db3672b2131ad17d373dc60c01b611aa5565b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115611e5457611e0e673132c773c28279f060c01b611aa5565b611e2267a66a890dcbc5c30e60c01b611aa5565b6040517f5dd58b8b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611e68670c29e7c7b4d40b9f60c01b611aa5565b611e7c670dc0b349c75061a160c01b611aa5565b611e9067ead152b63cda6dde60c01b611aa5565b808015611f185750600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482115b15611f7757611f31670c43f49e9dd4cdad60c01b611aa5565b611f456764c322f8b5773d2160c01b611aa5565b6040517f21cb316e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611f8b67fa68d6b9015b784b60c01b611aa5565b611f9f67c97bfbdb857fcdbe60c01b611aa5565b81600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611fee9190612463565b9250508190555061200967c5ffba63446be0b160c01b611aa5565b81600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546120589190612497565b92505081905550612073673bd6b1c35283029c60c01b611aa5565b612087675a215befcc301f8360c01b611aa5565b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516120e491906122c2565b60405180910390a350505050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561212c578082015181840152602081019050612111565b60008484015250505050565b6000601f19601f8301169050919050565b6000612154826120f2565b61215e81856120fd565b935061216e81856020860161210e565b61217781612138565b840191505092915050565b6000602082019050818103600083015261219c8184612149565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006121d4826121a9565b9050919050565b6121e4816121c9565b81146121ef57600080fd5b50565b600081359050612201816121db565b92915050565b6000819050919050565b61221a81612207565b811461222557600080fd5b50565b60008135905061223781612211565b92915050565b60008060408385031215612254576122536121a4565b5b6000612262858286016121f2565b925050602061227385828601612228565b9150509250929050565b60008115159050919050565b6122928161227d565b82525050565b60006020820190506122ad6000830184612289565b92915050565b6122bc81612207565b82525050565b60006020820190506122d760008301846122b3565b92915050565b6000806000606084860312156122f6576122f56121a4565b5b6000612304868287016121f2565b9350506020612315868287016121f2565b925050604061232686828701612228565b9150509250925092565b600060ff82169050919050565b61234681612330565b82525050565b6000602082019050612361600083018461233d565b92915050565b60006020828403121561237d5761237c6121a4565b5b600061238b848285016121f2565b91505092915050565b600080604083850312156123ab576123aa6121a4565b5b60006123b9858286016121f2565b92505060206123ca858286016121f2565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061241b57607f821691505b60208210810361242e5761242d6123d4565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061246e82612207565b915061247983612207565b925082820390508181111561249157612490612434565b5b92915050565b60006124a282612207565b91506124ad83612207565b92508282019050808211156124c5576124c4612434565b5b9291505056fea2646970667358221220f02615c149658f03082091428d2e7abf4eb44237d41465f75249f6d6eefe2c5364736f6c63430008120033";

type ERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20__factory extends ContractFactory {
  constructor(...args: ERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    decimals_: PromiseOrValue<BigNumberish>,
    initialSupply_: PromiseOrValue<BigNumberish>,
    owner_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC20> {
    return super.deploy(
      name_,
      symbol_,
      decimals_,
      initialSupply_,
      owner_,
      overrides || {}
    ) as Promise<ERC20>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    decimals_: PromiseOrValue<BigNumberish>,
    initialSupply_: PromiseOrValue<BigNumberish>,
    owner_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      initialSupply_,
      owner_,
      overrides || {}
    );
  }
  override attach(address: string): ERC20 {
    return super.attach(address) as ERC20;
  }
  override connect(signer: Signer): ERC20__factory {
    return super.connect(signer) as ERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20Interface {
    return new utils.Interface(_abi) as ERC20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}
