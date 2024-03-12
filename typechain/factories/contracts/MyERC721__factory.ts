/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { MyERC721, MyERC721Interface } from "../../contracts/MyERC721";

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
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BurnOfNonOwnedToken",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721ReceiverReject",
    type: "error",
  },
  {
    inputs: [],
    name: "NotTokenOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerNotFoundError",
    type: "error",
  },
  {
    inputs: [],
    name: "SettingApprovalStatusFroSelf",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenAlreadyMinted",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenNotApprovedForTransfer",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenOwnerNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenURINotFoundError",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferAmountExceedsBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotAuthorized",
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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
    name: "ApprovalEvent",
    type: "event",
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
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAllEvent",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "TransferEvent",
    type: "event",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        name: "tokenId",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200239f3803806200239f8339818101604052810190620000379190620001f6565b8160049081620000489190620004c6565b5080600590816200005a9190620004c6565b505050620005ad565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000cc8262000081565b810181811067ffffffffffffffff82111715620000ee57620000ed62000092565b5b80604052505050565b60006200010362000063565b9050620001118282620000c1565b919050565b600067ffffffffffffffff82111562000134576200013362000092565b5b6200013f8262000081565b9050602081019050919050565b60005b838110156200016c5780820151818401526020810190506200014f565b60008484015250505050565b60006200018f620001898462000116565b620000f7565b905082815260208101848484011115620001ae57620001ad6200007c565b5b620001bb8482856200014c565b509392505050565b600082601f830112620001db57620001da62000077565b5b8151620001ed84826020860162000178565b91505092915050565b6000806040838503121562000210576200020f6200006d565b5b600083015167ffffffffffffffff81111562000231576200023062000072565b5b6200023f85828601620001c3565b925050602083015167ffffffffffffffff81111562000263576200026262000072565b5b6200027185828601620001c3565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002ce57607f821691505b602082108103620002e457620002e362000286565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200034e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200030f565b6200035a86836200030f565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003a7620003a16200039b8462000372565b6200037c565b62000372565b9050919050565b6000819050919050565b620003c38362000386565b620003db620003d282620003ae565b8484546200031c565b825550505050565b600090565b620003f2620003e3565b620003ff818484620003b8565b505050565b5b8181101562000427576200041b600082620003e8565b60018101905062000405565b5050565b601f82111562000476576200044081620002ea565b6200044b84620002ff565b810160208510156200045b578190505b620004736200046a85620002ff565b83018262000404565b50505b505050565b600082821c905092915050565b60006200049b600019846008026200047b565b1980831691505092915050565b6000620004b6838362000488565b9150826002028217905092915050565b620004d1826200027b565b67ffffffffffffffff811115620004ed57620004ec62000092565b5b620004f98254620002b5565b620005068282856200042b565b600060209050601f8311600181146200053e576000841562000529578287015190505b620005358582620004a8565b865550620005a5565b601f1984166200054e86620002ea565b60005b82811015620005785784890151825560018201915060208501945060208101905062000551565b8683101562000598578489015162000594601f89168262000488565b8355505b6001600288020188555050505b505050505050565b611de280620005bd6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806342966c6811610097578063a22cb46511610066578063a22cb46514610282578063b88d4fde1461029e578063c87b56dd146102ba578063e985e9c5146102ea576100f5565b806342966c68146101e85780636352211e1461020457806370a082311461023457806395d89b4114610264576100f5565b8063095ea7b3116100d3578063095ea7b31461017857806323b872dd1461019457806340c10f19146101b057806342842e0e146101cc576100f5565b806301ffc9a7146100fa57806306fdde031461012a578063081812fc14610148575b600080fd5b610114600480360381019061010f91906114d2565b61031a565b604051610121919061151a565b60405180910390f35b6101326103ec565b60405161013f91906115c5565b60405180910390f35b610162600480360381019061015d919061161d565b61047e565b60405161016f919061168b565b60405180910390f35b610192600480360381019061018d91906116d2565b6105c4565b005b6101ae60048036038101906101a99190611712565b610712565b005b6101ca60048036038101906101c591906116d2565b610854565b005b6101e660048036038101906101e19190611712565b6109fc565b005b61020260048036038101906101fd919061161d565b610a1c565b005b61021e6004803603810190610219919061161d565b610b83565b60405161022b919061168b565b60405180910390f35b61024e60048036038101906102499190611765565b610c2a565b60405161025b91906117a1565b60405180910390f35b61026c610c73565b60405161027991906115c5565b60405180910390f35b61029c600480360381019061029791906117e8565b610d05565b005b6102b860048036038101906102b3919061195d565b610e6d565b005b6102d460048036038101906102cf919061161d565b610ec0565b6040516102e191906115c5565b60405180910390f35b61030460048036038101906102ff91906119e0565b610f8f565b604051610311919061151a565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103e557507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9050919050565b6060600480546103fb90611a4f565b80601f016020809104026020016040519081016040528092919081815260200182805461042790611a4f565b80156104745780601f1061044957610100808354040283529160200191610474565b820191906000526020600020905b81548152906001019060200180831161045757829003601f168201915b5050505050905090565b60008060008084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361051c576040517f711ea30a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006002600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105ba576040517f6a76b03700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8092505050919050565b600080600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610660576040517f59dc379f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b826002600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a4505050565b600080600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415801561080c5750600360008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b15610843576040517fb9eee67900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61084e848484611023565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff1660008083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146108eb576040517ea5a1f500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461093a9190611aaf565b925050819055508160008083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167feaf1c4b3ce0f4f62a2bae7eb3e68225c75f7e6ff4422073b7437b9a78d25f170836040516109f091906117a1565b60405180910390a35050565b610a1783838360405180602001604052806000815250610e6d565b505050565b6000610a2782610b83565b90508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a8e576040517ff768f7aa00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610add9190611ae3565b9250508190555060008083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167feaf1c4b3ce0f4f62a2bae7eb3e68225c75f7e6ff4422073b7437b9a78d25f17084604051610b7791906117a1565b60405180910390a35050565b60008060008084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610c21576040517f0d7b5c5200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80915050919050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060058054610c8290611a4f565b80601f0160208091040260200160405190810160405280929190818152602001828054610cae90611a4f565b8015610cfb5780601f10610cd057610100808354040283529160200191610cfb565b820191906000526020600020905b815481529060010190602001808311610cde57829003601f168201915b5050505050905090565b60003390508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d6f576040517fad96a4c400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f87e3cee377c3fa4779be46681dd00e73cc64a9fa7f172900550261128059391a84604051610e60919061151a565b60405180910390a3505050565b610e78848484610712565b610e84848484846111fb565b610eba576040517ffa34343f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b6060600080600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f5f576040517ffe20270b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610f68836112ed565b604051602001610f789190611b9f565b604051602081830303815290604052915050919050565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611089576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6110946000826105c4565b60018060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546110e39190611ae3565b9250508190555060018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111399190611aaf565b925050819055508160008083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167feaf1c4b3ce0f4f62a2bae7eb3e68225c75f7e6ff4422073b7437b9a78d25f170836040516111ee91906117a1565b60405180910390a3505050565b60006112068461144d565b61121357600190506112e5565b60008473ffffffffffffffffffffffffffffffffffffffff1663150b7a02338887876040518563ffffffff1660e01b81526004016112549493929190611c16565b6020604051808303816000875af1158015611273573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112979190611c77565b905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150505b949350505050565b606060008203611334576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611448565b600082905060005b6000821461136657808061134f90611ca4565b915050600a8261135f9190611d1b565b915061133c565b60008167ffffffffffffffff81111561138257611381611832565b5b6040519080825280601f01601f1916602001820160405280156113b45781602001600182028036833780820191505090505b5090505b60008514611441576001826113cd9190611ae3565b9150600a856113dc9190611d4c565b60306113e89190611aaf565b60f81b8183815181106113fe576113fd611d7d565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8561143a9190611d1b565b94506113b8565b8093505050505b919050565b600080823b905060008163ffffffff1611915050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6114af8161147a565b81146114ba57600080fd5b50565b6000813590506114cc816114a6565b92915050565b6000602082840312156114e8576114e7611470565b5b60006114f6848285016114bd565b91505092915050565b60008115159050919050565b611514816114ff565b82525050565b600060208201905061152f600083018461150b565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561156f578082015181840152602081019050611554565b60008484015250505050565b6000601f19601f8301169050919050565b600061159782611535565b6115a18185611540565b93506115b1818560208601611551565b6115ba8161157b565b840191505092915050565b600060208201905081810360008301526115df818461158c565b905092915050565b6000819050919050565b6115fa816115e7565b811461160557600080fd5b50565b600081359050611617816115f1565b92915050565b60006020828403121561163357611632611470565b5b600061164184828501611608565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006116758261164a565b9050919050565b6116858161166a565b82525050565b60006020820190506116a0600083018461167c565b92915050565b6116af8161166a565b81146116ba57600080fd5b50565b6000813590506116cc816116a6565b92915050565b600080604083850312156116e9576116e8611470565b5b60006116f7858286016116bd565b925050602061170885828601611608565b9150509250929050565b60008060006060848603121561172b5761172a611470565b5b6000611739868287016116bd565b935050602061174a868287016116bd565b925050604061175b86828701611608565b9150509250925092565b60006020828403121561177b5761177a611470565b5b6000611789848285016116bd565b91505092915050565b61179b816115e7565b82525050565b60006020820190506117b66000830184611792565b92915050565b6117c5816114ff565b81146117d057600080fd5b50565b6000813590506117e2816117bc565b92915050565b600080604083850312156117ff576117fe611470565b5b600061180d858286016116bd565b925050602061181e858286016117d3565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61186a8261157b565b810181811067ffffffffffffffff8211171561188957611888611832565b5b80604052505050565b600061189c611466565b90506118a88282611861565b919050565b600067ffffffffffffffff8211156118c8576118c7611832565b5b6118d18261157b565b9050602081019050919050565b82818337600083830152505050565b60006119006118fb846118ad565b611892565b90508281526020810184848401111561191c5761191b61182d565b5b6119278482856118de565b509392505050565b600082601f83011261194457611943611828565b5b81356119548482602086016118ed565b91505092915050565b6000806000806080858703121561197757611976611470565b5b6000611985878288016116bd565b9450506020611996878288016116bd565b93505060406119a787828801611608565b925050606085013567ffffffffffffffff8111156119c8576119c7611475565b5b6119d48782880161192f565b91505092959194509250565b600080604083850312156119f7576119f6611470565b5b6000611a05858286016116bd565b9250506020611a16858286016116bd565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611a6757607f821691505b602082108103611a7a57611a79611a20565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611aba826115e7565b9150611ac5836115e7565b9250828201905080821115611add57611adc611a80565b5b92915050565b6000611aee826115e7565b9150611af9836115e7565b9250828203905081811115611b1157611b10611a80565b5b92915050565b600081905092915050565b7f68747470733a2f2f6d796170692e636f6d2f746f6b656e2f0000000000000000600082015250565b6000611b58601883611b17565b9150611b6382611b22565b601882019050919050565b6000611b7982611535565b611b838185611b17565b9350611b93818560208601611551565b80840191505092915050565b6000611baa82611b4b565b9150611bb68284611b6e565b915081905092915050565b600081519050919050565b600082825260208201905092915050565b6000611be882611bc1565b611bf28185611bcc565b9350611c02818560208601611551565b611c0b8161157b565b840191505092915050565b6000608082019050611c2b600083018761167c565b611c38602083018661167c565b611c456040830185611792565b8181036060830152611c578184611bdd565b905095945050505050565b600081519050611c71816114a6565b92915050565b600060208284031215611c8d57611c8c611470565b5b6000611c9b84828501611c62565b91505092915050565b6000611caf826115e7565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611ce157611ce0611a80565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611d26826115e7565b9150611d31836115e7565b925082611d4157611d40611cec565b5b828204905092915050565b6000611d57826115e7565b9150611d62836115e7565b925082611d7257611d71611cec565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220cae6eb15ef49e3e4ec757dbed4596294b1eadd8a20e49f0a8b0dfd763a18af1264736f6c63430008120033";

type MyERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MyERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MyERC721__factory extends ContractFactory {
  constructor(...args: MyERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MyERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<MyERC721>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): MyERC721 {
    return super.attach(address) as MyERC721;
  }
  override connect(signer: Signer): MyERC721__factory {
    return super.connect(signer) as MyERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyERC721Interface {
    return new utils.Interface(_abi) as MyERC721Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MyERC721 {
    return new Contract(address, _abi, signerOrProvider) as MyERC721;
  }
}