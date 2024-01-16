/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  FundManager,
  FundManagerInterface,
} from "../../contracts/FundManager";

const _abi = [
  {
    inputs: [],
    name: "InsufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidValue",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "foundationAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FoundationCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "foundationAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "donationReceiver",
        type: "address",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "createFoundation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfFoundationsCreated",
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
        name: "foundation",
        type: "address",
      },
    ],
    name: "ownersOfFunds",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "foundationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFundsToReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612886806100206000396000f3fe608060405260043610620000445760003560e01c80639922394114620000495780639c05ae801462000069578063ce15446714620000ad578063fd8adcf714620000dd575b600080fd5b6200006760048036038101906200006191906200082e565b6200010b565b005b3480156200007657600080fd5b506200009560048036038101906200008f919062000894565b620002eb565b604051620000a49190620008d7565b60405180910390f35b348015620000ba57600080fd5b50620000c56200031e565b604051620000d491906200090f565b60405180910390f35b348015620000ea57600080fd5b50620001096004803603810190620001039190620009a2565b62000324565b005b620001216744922115b1e0013c60c01b62000642565b62000137675a7e7c53356ee5d760c01b62000642565b6200014d67994a11eada2e0f4f60c01b62000642565b6000348383604051620001609062000645565b6200016d92919062000a72565b6040518091039082f09050801580156200018b573d6000803e3d6000fd5b509050620001a4671010fe902445af4260c01b62000642565b33600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000238676651c30dbddcd44560c01b62000642565b6000808154809291906200024c9062000ad5565b91905055506200026767deab6088dbeb2af560c01b62000642565b6200027d67c8f5b2a3d0067b0760c01b62000642565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f5eab298ac0840089906cdc2305e1b1e7354674a47e1610b966b6b1fc7fb77f328434604051620002de92919062000b22565b60405180910390a3505050565b60016020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b6200033a67d6111811c6b47b7b60c01b62000642565b6200035067391e5eb6627d282460c01b62000642565b620003666727fa25e1c98af07e60c01b62000642565b3373ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161462000457576200040f672d918874487dcdb060c01b62000642565b62000425671fdac3b76b1cc28560c01b62000642565b6040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6200046d6772ce79554b5051e460c01b62000642565b6200048367dc5f092bd9d3d10660c01b62000642565b6200049967b0fda24a4bc8916760c01b62000642565b6000829050620004b467a02eb1c4e89e3eb660c01b62000642565b620004ca679343c4f88babd0f960c01b62000642565b8073ffffffffffffffffffffffffffffffffffffffff16630bcd177e836040518263ffffffff1660e01b81526004016200050591906200090f565b600060405180830381600087803b1580156200052057600080fd5b505af115801562000535573d6000803e3d6000fd5b505050506200054f67c020783078e0bb4a60c01b62000642565b62000565670b0fc5fa17a9fd1260c01b62000642565b8073ffffffffffffffffffffffffffffffffffffffff1663d5ee15576040518163ffffffff1660e01b8152600401602060405180830381865afa158015620005b1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620005d7919062000b6d565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f78e6250172d8e0a57d8d41f480f13581571a2d27bb2a93f5f7bd2511f5c22a6c846040516200063591906200090f565b60405180910390a3505050565b50565b611cb18062000ba083390190565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620006948262000667565b9050919050565b620006a68162000687565b8114620006b257600080fd5b50565b600081359050620006c6816200069b565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200072182620006d6565b810181811067ffffffffffffffff82111715620007435762000742620006e7565b5b80604052505050565b60006200075862000653565b905062000766828262000716565b919050565b600067ffffffffffffffff821115620007895762000788620006e7565b5b6200079482620006d6565b9050602081019050919050565b82818337600083830152505050565b6000620007c7620007c1846200076b565b6200074c565b905082815260208101848484011115620007e657620007e5620006d1565b5b620007f3848285620007a1565b509392505050565b600082601f830112620008135762000812620006cc565b5b813562000825848260208601620007b0565b91505092915050565b600080604083850312156200084857620008476200065d565b5b60006200085885828601620006b5565b925050602083013567ffffffffffffffff8111156200087c576200087b62000662565b5b6200088a85828601620007fb565b9150509250929050565b600060208284031215620008ad57620008ac6200065d565b5b6000620008bd84828501620006b5565b91505092915050565b620008d18162000687565b82525050565b6000602082019050620008ee6000830184620008c6565b92915050565b6000819050919050565b6200090981620008f4565b82525050565b6000602082019050620009266000830184620008fe565b92915050565b6000620009398262000667565b9050919050565b6200094b816200092c565b81146200095757600080fd5b50565b6000813590506200096b8162000940565b92915050565b6200097c81620008f4565b81146200098857600080fd5b50565b6000813590506200099c8162000971565b92915050565b60008060408385031215620009bc57620009bb6200065d565b5b6000620009cc858286016200095a565b9250506020620009df858286016200098b565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b8381101562000a2557808201518184015260208101905062000a08565b60008484015250505050565b600062000a3e82620009e9565b62000a4a8185620009f4565b935062000a5c81856020860162000a05565b62000a6781620006d6565b840191505092915050565b600060408201905062000a896000830185620008c6565b818103602083015262000a9d818462000a31565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000ae282620008f4565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000b175762000b1662000aa6565b5b600182019050919050565b6000604082019050818103600083015262000b3e818562000a31565b905062000b4f6020830184620008fe565b9392505050565b60008151905062000b67816200069b565b92915050565b60006020828403121562000b865762000b856200065d565b5b600062000b968482850162000b56565b9150509291505056fe60a060405260405162001cb138038062001cb18339818101604052810190620000299190620006ef565b620000496200003d6200023c60201b60201c565b6200024460201b60201c565b6200006567fca2dff43ce023f760c01b6200030860201b60201c565b6200008167ab65f19c15fc690260c01b6200030860201b60201c565b8173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050620000d1676d9e2afbac9f273b60c01b6200030860201b60201c565b8060039081620000e29190620009a0565b50620000ff67e449f589669becda60c01b6200030860201b60201c565b6200011b678374aba68e024fb260c01b6200030860201b60201c565b6000341115620002175762000141672f1337d3aa6aa30660c01b6200030860201b60201c565b6200015d6747db0da16ce6049e60c01b6200030860201b60201c565b6200017967a602cc942ecf41a660c01b6200030860201b60201c565b620001896200030b60201b60201c565b620001a56786617ccb2bb8750360c01b6200030860201b60201c565b620001c167ec0738432fafbfb560c01b6200030860201b60201c565b3373ffffffffffffffffffffffffffffffffffffffff167f264f630d9efa0d07053a31163641d9fcc0adafc9d9e76f1c37c2ce3a558d2c523460405162000209919062000a98565b60405180910390a262000234565b62000233677a5177a4e8c6ad8d60c01b6200030860201b60201c565b5b505062000b1f565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b62000327670f7fedbdd166ccbd60c01b6200030860201b60201c565b62000343677e19deee6838b95660c01b6200030860201b60201c565b6200035f67b564a0d67dfd65fa60c01b6200030860201b60201c565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036200046457620003c367cddf0358646c6db160c01b6200030860201b60201c565b620003df678abaf2a72ef9d6c860c01b6200030860201b60201c565b620003fb672563ed8202f266ec60c01b6200030860201b60201c565b6002339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000481565b6200048067a859be5d275e71e960c01b6200030860201b60201c565b5b6200049d67d6bee24934f9a98560c01b6200030860201b60201c565b34600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620004ee919062000ae4565b92505081905550565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000538826200050b565b9050919050565b6200054a816200052b565b81146200055657600080fd5b50565b6000815190506200056a816200053f565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620005c5826200057a565b810181811067ffffffffffffffff82111715620005e757620005e66200058b565b5b80604052505050565b6000620005fc620004f7565b90506200060a8282620005ba565b919050565b600067ffffffffffffffff8211156200062d576200062c6200058b565b5b62000638826200057a565b9050602081019050919050565b60005b838110156200066557808201518184015260208101905062000648565b60008484015250505050565b60006200068862000682846200060f565b620005f0565b905082815260208101848484011115620006a757620006a662000575565b5b620006b484828562000645565b509392505050565b600082601f830112620006d457620006d362000570565b5b8151620006e684826020860162000671565b91505092915050565b6000806040838503121562000709576200070862000501565b5b6000620007198582860162000559565b925050602083015167ffffffffffffffff8111156200073d576200073c62000506565b5b6200074b85828601620006bc565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620007a857607f821691505b602082108103620007be57620007bd62000760565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620008287fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620007e9565b620008348683620007e9565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620008816200087b62000875846200084c565b62000856565b6200084c565b9050919050565b6000819050919050565b6200089d8362000860565b620008b5620008ac8262000888565b848454620007f6565b825550505050565b600090565b620008cc620008bd565b620008d981848462000892565b505050565b5b818110156200090157620008f5600082620008c2565b600181019050620008df565b5050565b601f82111562000950576200091a81620007c4565b6200092584620007d9565b8101602085101562000935578190505b6200094d6200094485620007d9565b830182620008de565b50505b505050565b600082821c905092915050565b6000620009756000198460080262000955565b1980831691505092915050565b600062000990838362000962565b9150826002028217905092915050565b620009ab8262000755565b67ffffffffffffffff811115620009c757620009c66200058b565b5b620009d382546200078f565b620009e082828562000905565b600060209050601f83116001811462000a18576000841562000a03578287015190505b62000a0f858262000982565b86555062000a7f565b601f19841662000a2886620007c4565b60005b8281101562000a525784890151825560018201915060208501945060208101905062000a2b565b8683101562000a72578489015162000a6e601f89168262000962565b8355505b6001600288020188555050505b505050505050565b62000a92816200084c565b82525050565b600060208201905062000aaf600083018462000a87565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000af1826200084c565b915062000afe836200084c565b925082820190508082111562000b195762000b1862000ab5565b5b92915050565b60805161116f62000b42600039600081816105a501526107fb015261116f6000f3fe6080604052600436106100a05760003560e01c8063bf1482fa11610064578063bf1482fa146101fd578063cc6cb19a14610228578063d5ee155714610265578063ed88c68e14610290578063f2fde38b1461029a578063f3a01489146102c357610125565b80630bcd177e1461012a578063715018a6146101535780637284e4161461016a5780638da5cb5b14610195578063ac62f566146101c057610125565b36610125576100b967dd3af0425da8932360c01b6102ee565b6100c16102f1565b6100d567273229de69a4f38260c01b6102ee565b3373ffffffffffffffffffffffffffffffffffffffff167f264f630d9efa0d07053a31163641d9fcc0adafc9d9e76f1c37c2ce3a558d2c523460405161011b9190610c41565b60405180910390a2005b600080fd5b34801561013657600080fd5b50610151600480360381019061014c9190610c8d565b610499565b005b34801561015f57600080fd5b5061016861060d565b005b34801561017657600080fd5b5061017f610621565b60405161018c9190610d4a565b60405180910390f35b3480156101a157600080fd5b506101aa6106af565b6040516101b79190610dad565b60405180910390f35b3480156101cc57600080fd5b506101e760048036038101906101e29190610c8d565b6106d8565b6040516101f49190610dad565b60405180910390f35b34801561020957600080fd5b50610212610717565b60405161021f9190610e86565b60405180910390f35b34801561023457600080fd5b5061024f600480360381019061024a9190610ed4565b6107e1565b60405161025c9190610c41565b60405180910390f35b34801561027157600080fd5b5061027a6107f9565b6040516102879190610dad565b60405180910390f35b61029861081d565b005b3480156102a657600080fd5b506102c160048036038101906102bc9190610ed4565b610901565b005b3480156102cf57600080fd5b506102d8610984565b6040516102e59190610c41565b60405180910390f35b50565b610305670f7fedbdd166ccbd60c01b6102ee565b610319677e19deee6838b95660c01b6102ee565b61032d67b564a0d67dfd65fa60c01b6102ee565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036104185761038867cddf0358646c6db160c01b6102ee565b61039c678abaf2a72ef9d6c860c01b6102ee565b6103b0672563ed8202f266ec60c01b6102ee565b6002339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061042d565b61042c67a859be5d275e71e960c01b6102ee565b5b61044167d6bee24934f9a98560c01b6102ee565b34600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104909190610f30565b92505081905550565b6104ad67383c2736e702d9d760c01b6102ee565b6104b5610ade565b6104c967150a180891ee067060c01b6102ee565b6104dd67ceb3e7adb7e6593d60c01b6102ee565b6104f1672cfed7a44eb0ed0860c01b6102ee565b61050567128e7867d96c022060c01b6102ee565b4781111561056757610521675e285e335913b31c60c01b6102ee565b6105356753637ff68863a48560c01b6102ee565b6040517f356680b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61057b67e5df2672d68ba92c60c01b6102ee565b61058f67ae3a9300399a2ad860c01b6102ee565b6105a3678e4188706ab645ec60c01b6102ee565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610609573d6000803e3d6000fd5b5050565b610615610ade565b61061f6000610b5c565b565b6003805461062e90610f93565b80601f016020809104026020016040519081016040528092919081815260200182805461065a90610f93565b80156106a75780601f1061067c576101008083540402835291602001916106a7565b820191906000526020600020905b81548152906001019060200180831161068a57829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600281815481106106e857600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606061072d67fb752cb7a942587d60c01b6102ee565b6107416777c6894fa56d743d60c01b6102ee565b61075567b8bbfa7de93b5f9a60c01b6102ee565b60028054806020026020016040519081016040528092919081815260200182805480156107d757602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161078d575b5050505050905090565b60016020528060005260406000206000915090505481565b7f000000000000000000000000000000000000000000000000000000000000000081565b610831673cafaa73a21812de60c01b6102ee565b61084567e738b24ff88c7d9060c01b6102ee565b610859677d4248c5c78b0f6f60c01b6102ee565b600034036108bb5761087567af7705b1b0056f8860c01b6102ee565b61088967fb485df9dad9b04360c01b6102ee565b6040517fed0a901a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108cf67b5a01277f41346c760c01b6102ee565b6108e36757cc5d3677a2933760c01b6102ee565b6108f7674a915df4cea2b15160c01b6102ee565b6108ff6102f1565b565b610909610ade565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610978576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096f90611036565b60405180910390fd5b61098181610b5c565b50565b600061099a677f285f6d904447c960c01b6102ee565b6109ae6714275a948d5b428460c01b6102ee565b6109c267c2ccf66d0c2ff0be60c01b6102ee565b60006109d867c2dae53b36b86dc960c01b6102ee565b6109ec678a16ffd7718ba87560c01b6102ee565b60005b600280549050811015610aae57610a10675c7aee904482e2f960c01b6102ee565b6001600060028381548110610a2857610a27611056565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610a999190610f30565b91508080610aa690611085565b9150506109ef565b50610ac367d6d6674e625c7b8a60c01b6102ee565b610ad767692e7d28f7a0f21360c01b6102ee565b8091505090565b610ae6610c20565b73ffffffffffffffffffffffffffffffffffffffff16610b046106af565b73ffffffffffffffffffffffffffffffffffffffff1614610b5a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5190611119565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000819050919050565b610c3b81610c28565b82525050565b6000602082019050610c566000830184610c32565b92915050565b600080fd5b610c6a81610c28565b8114610c7557600080fd5b50565b600081359050610c8781610c61565b92915050565b600060208284031215610ca357610ca2610c5c565b5b6000610cb184828501610c78565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610cf4578082015181840152602081019050610cd9565b60008484015250505050565b6000601f19601f8301169050919050565b6000610d1c82610cba565b610d268185610cc5565b9350610d36818560208601610cd6565b610d3f81610d00565b840191505092915050565b60006020820190508181036000830152610d648184610d11565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d9782610d6c565b9050919050565b610da781610d8c565b82525050565b6000602082019050610dc26000830184610d9e565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610dfd81610d8c565b82525050565b6000610e0f8383610df4565b60208301905092915050565b6000602082019050919050565b6000610e3382610dc8565b610e3d8185610dd3565b9350610e4883610de4565b8060005b83811015610e79578151610e608882610e03565b9750610e6b83610e1b565b925050600181019050610e4c565b5085935050505092915050565b60006020820190508181036000830152610ea08184610e28565b905092915050565b610eb181610d8c565b8114610ebc57600080fd5b50565b600081359050610ece81610ea8565b92915050565b600060208284031215610eea57610ee9610c5c565b5b6000610ef884828501610ebf565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610f3b82610c28565b9150610f4683610c28565b9250828201905080821115610f5e57610f5d610f01565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610fab57607f821691505b602082108103610fbe57610fbd610f64565b5b50919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611020602683610cc5565b915061102b82610fc4565b604082019050919050565b6000602082019050818103600083015261104f81611013565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600061109082610c28565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036110c2576110c1610f01565b5b600182019050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611103602083610cc5565b915061110e826110cd565b602082019050919050565b60006020820190508181036000830152611132816110f6565b905091905056fea26469706673582212201d4ee48f0894a772126837c45d5800bd6d30e7febfab595f674a193624a368be64736f6c63430008120033a264697066735822122090adc12d99c7942ec1a280c9f3cef016e1e4559431ff433ec02e157e1685338764736f6c63430008120033";

type FundManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FundManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FundManager__factory extends ContractFactory {
  constructor(...args: FundManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FundManager> {
    return super.deploy(overrides || {}) as Promise<FundManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FundManager {
    return super.attach(address) as FundManager;
  }
  override connect(signer: Signer): FundManager__factory {
    return super.connect(signer) as FundManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FundManagerInterface {
    return new utils.Interface(_abi) as FundManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FundManager {
    return new Contract(address, _abi, signerOrProvider) as FundManager;
  }
}
