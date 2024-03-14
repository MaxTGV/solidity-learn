/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC721,
  ERC721Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC721/ERC721";

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
  "0x60806040523480156200001157600080fd5b5060405162002968380380620029688339818101604052810190620000379190620001f6565b8160009081620000489190620004c6565b5080600190816200005a9190620004c6565b505050620005ad565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000cc8262000081565b810181811067ffffffffffffffff82111715620000ee57620000ed62000092565b5b80604052505050565b60006200010362000063565b9050620001118282620000c1565b919050565b600067ffffffffffffffff82111562000134576200013362000092565b5b6200013f8262000081565b9050602081019050919050565b60005b838110156200016c5780820151818401526020810190506200014f565b60008484015250505050565b60006200018f620001898462000116565b620000f7565b905082815260208101848484011115620001ae57620001ad6200007c565b5b620001bb8482856200014c565b509392505050565b600082601f830112620001db57620001da62000077565b5b8151620001ed84826020860162000178565b91505092915050565b6000806040838503121562000210576200020f6200006d565b5b600083015167ffffffffffffffff81111562000231576200023062000072565b5b6200023f85828601620001c3565b925050602083015167ffffffffffffffff81111562000263576200026262000072565b5b6200027185828601620001c3565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002ce57607f821691505b602082108103620002e457620002e362000286565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200034e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200030f565b6200035a86836200030f565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003a7620003a16200039b8462000372565b6200037c565b62000372565b9050919050565b6000819050919050565b620003c38362000386565b620003db620003d282620003ae565b8484546200031c565b825550505050565b600090565b620003f2620003e3565b620003ff818484620003b8565b505050565b5b8181101562000427576200041b600082620003e8565b60018101905062000405565b5050565b601f82111562000476576200044081620002ea565b6200044b84620002ff565b810160208510156200045b578190505b620004736200046a85620002ff565b83018262000404565b50505b505050565b600082821c905092915050565b60006200049b600019846008026200047b565b1980831691505092915050565b6000620004b6838362000488565b9150826002028217905092915050565b620004d1826200027b565b67ffffffffffffffff811115620004ed57620004ec62000092565b5b620004f98254620002b5565b620005068282856200042b565b600060209050601f8311600181146200053e576000841562000529578287015190505b620005358582620004a8565b865550620005a5565b601f1984166200054e86620002ea565b60005b82811015620005785784890151825560018201915060208501945060208101905062000551565b8683101562000598578489015162000594601f89168262000488565b8355505b6001600288020188555050505b505050505050565b6123ab80620005bd6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb46514610224578063b88d4fde14610240578063c87b56dd1461025c578063e985e9c51461028c576100cf565b80636352211e146101a657806370a08231146101d657806395d89b4114610206576100cf565b806301ffc9a7146100d457806306fdde0314610104578063081812fc14610122578063095ea7b31461015257806323b872dd1461016e57806342842e0e1461018a575b600080fd5b6100ee60048036038101906100e99190611433565b6102bc565b6040516100fb919061147b565b60405180910390f35b61010c61039e565b6040516101199190611526565b60405180910390f35b61013c6004803603810190610137919061157e565b610430565b60405161014991906115ec565b60405180910390f35b61016c60048036038101906101679190611633565b6104b5565b005b61018860048036038101906101839190611673565b6105cc565b005b6101a4600480360381019061019f9190611673565b61062c565b005b6101c060048036038101906101bb919061157e565b61064c565b6040516101cd91906115ec565b60405180910390f35b6101f060048036038101906101eb91906116c6565b6106fd565b6040516101fd9190611702565b60405180910390f35b61020e6107b4565b60405161021b9190611526565b60405180910390f35b61023e60048036038101906102399190611749565b610846565b005b61025a600480360381019061025591906118be565b61085c565b005b6102766004803603810190610271919061157e565b6108be565b6040516102839190611526565b60405180910390f35b6102a660048036038101906102a19190611941565b610965565b6040516102b3919061147b565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061038757507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806103975750610396826109f9565b5b9050919050565b6060600080546103ad906119b0565b80601f01602080910402602001604051908101604052809291908181526020018280546103d9906119b0565b80156104265780601f106103fb57610100808354040283529160200191610426565b820191906000526020600020905b81548152906001019060200180831161040957829003601f168201915b5050505050905090565b600061043b82610a63565b61047a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047190611a53565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104c08261064c565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610530576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052790611ae5565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661054f610acf565b73ffffffffffffffffffffffffffffffffffffffff16148061057e575061057d81610578610acf565b610965565b5b6105bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b490611b77565b60405180910390fd5b6105c78383610ad7565b505050565b6105dd6105d7610acf565b82610b90565b61061c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061390611c09565b60405180910390fd5b610627838383610c6e565b505050565b6106478383836040518060200160405280600081525061085c565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036106f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106eb90611c9b565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361076d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076490611d2d565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600180546107c3906119b0565b80601f01602080910402602001604051908101604052809291908181526020018280546107ef906119b0565b801561083c5780601f106108115761010080835404028352916020019161083c565b820191906000526020600020905b81548152906001019060200180831161081f57829003601f168201915b5050505050905090565b610858610851610acf565b8383610ed4565b5050565b61086d610867610acf565b83610b90565b6108ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a390611c09565b60405180910390fd5b6108b884848484611040565b50505050565b60606108c982610a63565b610908576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ff90611dbf565b60405180910390fd5b600061091261109c565b90506000815111610932576040518060200160405280600081525061095d565b8061093c846110b3565b60405160200161094d929190611e1b565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610b4a8361064c565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610b9b82610a63565b610bda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bd190611eb1565b60405180910390fd5b6000610be58361064c565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610c275750610c268185610965565b5b80610c6557508373ffffffffffffffffffffffffffffffffffffffff16610c4d84610430565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610c8e8261064c565b73ffffffffffffffffffffffffffffffffffffffff1614610ce4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cdb90611f43565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610d53576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4a90611fd5565b60405180910390fd5b610d5e838383611213565b610d69600082610ad7565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610db99190612024565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e109190612058565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4610ecf838383611218565b505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610f42576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f39906120d8565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611033919061147b565b60405180910390a3505050565b61104b848484610c6e565b6110578484848461121d565b611096576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108d9061216a565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b6060600082036110fa576040518060400160405280600181526020017f3000000000000000000000000000000000000000000000000000000000000000815250905061120e565b600082905060005b6000821461112c5780806111159061218a565b915050600a826111259190612201565b9150611102565b60008167ffffffffffffffff81111561114857611147611793565b5b6040519080825280601f01601f19166020018201604052801561117a5781602001600182028036833780820191505090505b5090505b60008514611207576001826111939190612024565b9150600a856111a29190612232565b60306111ae9190612058565b60f81b8183815181106111c4576111c3612263565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856112009190612201565b945061117e565b8093505050505b919050565b505050565b505050565b600061123e8473ffffffffffffffffffffffffffffffffffffffff166113a4565b15611397578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611267610acf565b8786866040518563ffffffff1660e01b815260040161128994939291906122e7565b6020604051808303816000875af19250505080156112c557506040513d601f19601f820116820180604052508101906112c29190612348565b60015b611347573d80600081146112f5576040519150601f19603f3d011682016040523d82523d6000602084013e6112fa565b606091505b50600081510361133f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113369061216a565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161491505061139c565b600190505b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611410816113db565b811461141b57600080fd5b50565b60008135905061142d81611407565b92915050565b600060208284031215611449576114486113d1565b5b60006114578482850161141e565b91505092915050565b60008115159050919050565b61147581611460565b82525050565b6000602082019050611490600083018461146c565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156114d05780820151818401526020810190506114b5565b60008484015250505050565b6000601f19601f8301169050919050565b60006114f882611496565b61150281856114a1565b93506115128185602086016114b2565b61151b816114dc565b840191505092915050565b6000602082019050818103600083015261154081846114ed565b905092915050565b6000819050919050565b61155b81611548565b811461156657600080fd5b50565b60008135905061157881611552565b92915050565b600060208284031215611594576115936113d1565b5b60006115a284828501611569565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006115d6826115ab565b9050919050565b6115e6816115cb565b82525050565b600060208201905061160160008301846115dd565b92915050565b611610816115cb565b811461161b57600080fd5b50565b60008135905061162d81611607565b92915050565b6000806040838503121561164a576116496113d1565b5b60006116588582860161161e565b925050602061166985828601611569565b9150509250929050565b60008060006060848603121561168c5761168b6113d1565b5b600061169a8682870161161e565b93505060206116ab8682870161161e565b92505060406116bc86828701611569565b9150509250925092565b6000602082840312156116dc576116db6113d1565b5b60006116ea8482850161161e565b91505092915050565b6116fc81611548565b82525050565b600060208201905061171760008301846116f3565b92915050565b61172681611460565b811461173157600080fd5b50565b6000813590506117438161171d565b92915050565b600080604083850312156117605761175f6113d1565b5b600061176e8582860161161e565b925050602061177f85828601611734565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6117cb826114dc565b810181811067ffffffffffffffff821117156117ea576117e9611793565b5b80604052505050565b60006117fd6113c7565b905061180982826117c2565b919050565b600067ffffffffffffffff82111561182957611828611793565b5b611832826114dc565b9050602081019050919050565b82818337600083830152505050565b600061186161185c8461180e565b6117f3565b90508281526020810184848401111561187d5761187c61178e565b5b61188884828561183f565b509392505050565b600082601f8301126118a5576118a4611789565b5b81356118b584826020860161184e565b91505092915050565b600080600080608085870312156118d8576118d76113d1565b5b60006118e68782880161161e565b94505060206118f78782880161161e565b935050604061190887828801611569565b925050606085013567ffffffffffffffff811115611929576119286113d6565b5b61193587828801611890565b91505092959194509250565b60008060408385031215611958576119576113d1565b5b60006119668582860161161e565b92505060206119778582860161161e565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806119c857607f821691505b6020821081036119db576119da611981565b5b50919050565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b6000611a3d602c836114a1565b9150611a48826119e1565b604082019050919050565b60006020820190508181036000830152611a6c81611a30565b9050919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000611acf6021836114a1565b9150611ada82611a73565b604082019050919050565b60006020820190508181036000830152611afe81611ac2565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b6000611b616038836114a1565b9150611b6c82611b05565b604082019050919050565b60006020820190508181036000830152611b9081611b54565b9050919050565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b6000611bf36031836114a1565b9150611bfe82611b97565b604082019050919050565b60006020820190508181036000830152611c2281611be6565b9050919050565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b6000611c856029836114a1565b9150611c9082611c29565b604082019050919050565b60006020820190508181036000830152611cb481611c78565b9050919050565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b6000611d17602a836114a1565b9150611d2282611cbb565b604082019050919050565b60006020820190508181036000830152611d4681611d0a565b9050919050565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b6000611da9602f836114a1565b9150611db482611d4d565b604082019050919050565b60006020820190508181036000830152611dd881611d9c565b9050919050565b600081905092915050565b6000611df582611496565b611dff8185611ddf565b9350611e0f8185602086016114b2565b80840191505092915050565b6000611e278285611dea565b9150611e338284611dea565b91508190509392505050565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b6000611e9b602c836114a1565b9150611ea682611e3f565b604082019050919050565b60006020820190508181036000830152611eca81611e8e565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000611f2d6025836114a1565b9150611f3882611ed1565b604082019050919050565b60006020820190508181036000830152611f5c81611f20565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611fbf6024836114a1565b9150611fca82611f63565b604082019050919050565b60006020820190508181036000830152611fee81611fb2565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061202f82611548565b915061203a83611548565b925082820390508181111561205257612051611ff5565b5b92915050565b600061206382611548565b915061206e83611548565b925082820190508082111561208657612085611ff5565b5b92915050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b60006120c26019836114a1565b91506120cd8261208c565b602082019050919050565b600060208201905081810360008301526120f1816120b5565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b60006121546032836114a1565b915061215f826120f8565b604082019050919050565b6000602082019050818103600083015261218381612147565b9050919050565b600061219582611548565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036121c7576121c6611ff5565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061220c82611548565b915061221783611548565b925082612227576122266121d2565b5b828204905092915050565b600061223d82611548565b915061224883611548565b925082612258576122576121d2565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600081519050919050565b600082825260208201905092915050565b60006122b982612292565b6122c3818561229d565b93506122d38185602086016114b2565b6122dc816114dc565b840191505092915050565b60006080820190506122fc60008301876115dd565b61230960208301866115dd565b61231660408301856116f3565b818103606083015261232881846122ae565b905095945050505050565b60008151905061234281611407565b92915050565b60006020828403121561235e5761235d6113d1565b5b600061236c84828501612333565b9150509291505056fea2646970667358221220a42b2369b1ef112286133a12801c2156387696bd1594119c33a275e52188870364736f6c63430008120033";

type ERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
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
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC721 {
    return super.attach(address) as ERC721;
  }
  override connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new utils.Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721;
  }
}
