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
  "0x608060405234801561001057600080fd5b50612963806100206000396000f3fe608060405260043610620000445760003560e01c80639922394114620000495780639c05ae801462000069578063ce15446714620000ad578063fd8adcf714620000dd575b600080fd5b6200006760048036038101906200006191906200082d565b6200010b565b005b3480156200007657600080fd5b506200009560048036038101906200008f919062000893565b620002ea565b604051620000a49190620008d6565b60405180910390f35b348015620000ba57600080fd5b50620000c56200031d565b604051620000d491906200090e565b60405180910390f35b348015620000ea57600080fd5b50620001096004803603810190620001039190620009a1565b62000323565b005b62000121674a4d365b5d5b962b60c01b62000641565b6200013666dd024b8bc944a560c01b62000641565b6200014c67b7974c58db6753ab60c01b62000641565b60003483836040516200015f9062000644565b6200016c92919062000a71565b6040518091039082f09050801580156200018a573d6000803e3d6000fd5b509050620001a36724f2856c2d1a9db460c01b62000641565b33600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000237675c3f7cda2f4f660560c01b62000641565b6000808154809291906200024b9062000ad4565b919050555062000266674e0f6badde07162760c01b62000641565b6200027c67691e5a177669234f60c01b62000641565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f5eab298ac0840089906cdc2305e1b1e7354674a47e1610b966b6b1fc7fb77f328434604051620002dd92919062000b21565b60405180910390a3505050565b60016020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b6200033967d84ccd9ffe16fc4660c01b62000641565b6200034f6774398e2ec9c886d160c01b62000641565b6200036567e1b72241006248f160c01b62000641565b3373ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161462000456576200040e67f61cd476ee40560060c01b62000641565b62000424675dbe47d7b2a5689960c01b62000641565b6040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6200046c672574152ecfb5773160c01b62000641565b62000482675e066dc91f82879060c01b62000641565b62000498679c1766f443714ffd60c01b62000641565b6000829050620004b3675c9e9134f320422760c01b62000641565b620004c967d14f83b9276b305760c01b62000641565b8073ffffffffffffffffffffffffffffffffffffffff16630bcd177e836040518263ffffffff1660e01b81526004016200050491906200090e565b600060405180830381600087803b1580156200051f57600080fd5b505af115801562000534573d6000803e3d6000fd5b505050506200054e67b0124a678def06b760c01b62000641565b620005646790e3712bf76028b760c01b62000641565b8073ffffffffffffffffffffffffffffffffffffffff1663d5ee15576040518163ffffffff1660e01b8152600401602060405180830381865afa158015620005b0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620005d6919062000b6c565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f78e6250172d8e0a57d8d41f480f13581571a2d27bb2a93f5f7bd2511f5c22a6c846040516200063491906200090e565b60405180910390a3505050565b50565b611d8f8062000b9f83390190565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620006938262000666565b9050919050565b620006a58162000686565b8114620006b157600080fd5b50565b600081359050620006c5816200069a565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200072082620006d5565b810181811067ffffffffffffffff82111715620007425762000741620006e6565b5b80604052505050565b60006200075762000652565b905062000765828262000715565b919050565b600067ffffffffffffffff821115620007885762000787620006e6565b5b6200079382620006d5565b9050602081019050919050565b82818337600083830152505050565b6000620007c6620007c0846200076a565b6200074b565b905082815260208101848484011115620007e557620007e4620006d0565b5b620007f2848285620007a0565b509392505050565b600082601f830112620008125762000811620006cb565b5b813562000824848260208601620007af565b91505092915050565b600080604083850312156200084757620008466200065c565b5b60006200085785828601620006b4565b925050602083013567ffffffffffffffff8111156200087b576200087a62000661565b5b6200088985828601620007fa565b9150509250929050565b600060208284031215620008ac57620008ab6200065c565b5b6000620008bc84828501620006b4565b91505092915050565b620008d08162000686565b82525050565b6000602082019050620008ed6000830184620008c5565b92915050565b6000819050919050565b6200090881620008f3565b82525050565b6000602082019050620009256000830184620008fd565b92915050565b6000620009388262000666565b9050919050565b6200094a816200092b565b81146200095657600080fd5b50565b6000813590506200096a816200093f565b92915050565b6200097b81620008f3565b81146200098757600080fd5b50565b6000813590506200099b8162000970565b92915050565b60008060408385031215620009bb57620009ba6200065c565b5b6000620009cb8582860162000959565b9250506020620009de858286016200098a565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b8381101562000a2457808201518184015260208101905062000a07565b60008484015250505050565b600062000a3d82620009e8565b62000a498185620009f3565b935062000a5b81856020860162000a04565b62000a6681620006d5565b840191505092915050565b600060408201905062000a886000830185620008c5565b818103602083015262000a9c818462000a30565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000ae182620008f3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000b165762000b1562000aa5565b5b600182019050919050565b6000604082019050818103600083015262000b3d818562000a30565b905062000b4e6020830184620008fd565b9392505050565b60008151905062000b66816200069a565b92915050565b60006020828403121562000b855762000b846200065c565b5b600062000b958482850162000b55565b9150509291505056fe60a060405260405162001d8f38038062001d8f8339818101604052810190620000299190620006ef565b620000496200003d6200023c60201b60201c565b6200024460201b60201c565b6200006567cc2a79c76a20510360c01b6200030860201b60201c565b6200008167df577934bb18dac360c01b6200030860201b60201c565b8173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050620000d167094687998409a9f360c01b6200030860201b60201c565b8060039081620000e29190620009a0565b50620000ff67de76aa802f8a3c3260c01b6200030860201b60201c565b6200011b67c6620d1577af00c860c01b6200030860201b60201c565b600034111562000217576200014167b448ca781009866e60c01b6200030860201b60201c565b6200015d6741b56640e33e726260c01b6200030860201b60201c565b6200017967c335d88e4ad5d10660c01b6200030860201b60201c565b620001896200030b60201b60201c565b620001a567091c053bcccaf89060c01b6200030860201b60201c565b620001c1670fc9de6e4084220860c01b6200030860201b60201c565b3373ffffffffffffffffffffffffffffffffffffffff167f264f630d9efa0d07053a31163641d9fcc0adafc9d9e76f1c37c2ce3a558d2c523460405162000209919062000a98565b60405180910390a262000234565b62000233676276e0ad5fde0d0f60c01b6200030860201b60201c565b5b505062000b1f565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b6200032767b21010693374f54f60c01b6200030860201b60201c565b6200034367029bf240057b1d0460c01b6200030860201b60201c565b6200035f675aa33d49b05224d960c01b6200030860201b60201c565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036200046457620003c367ce3780687d56108960c01b6200030860201b60201c565b620003df670cbbbcbd6ca4e42360c01b6200030860201b60201c565b620003fb67c72800df4fcc0c1160c01b6200030860201b60201c565b6002339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000481565b62000480673ff88ee0cfac1ecc60c01b6200030860201b60201c565b5b6200049d671929eb805808dd4d60c01b6200030860201b60201c565b34600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620004ee919062000ae4565b92505081905550565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000538826200050b565b9050919050565b6200054a816200052b565b81146200055657600080fd5b50565b6000815190506200056a816200053f565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620005c5826200057a565b810181811067ffffffffffffffff82111715620005e757620005e66200058b565b5b80604052505050565b6000620005fc620004f7565b90506200060a8282620005ba565b919050565b600067ffffffffffffffff8211156200062d576200062c6200058b565b5b62000638826200057a565b9050602081019050919050565b60005b838110156200066557808201518184015260208101905062000648565b60008484015250505050565b60006200068862000682846200060f565b620005f0565b905082815260208101848484011115620006a757620006a662000575565b5b620006b484828562000645565b509392505050565b600082601f830112620006d457620006d362000570565b5b8151620006e684826020860162000671565b91505092915050565b6000806040838503121562000709576200070862000501565b5b6000620007198582860162000559565b925050602083015167ffffffffffffffff8111156200073d576200073c62000506565b5b6200074b85828601620006bc565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620007a857607f821691505b602082108103620007be57620007bd62000760565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620008287fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620007e9565b620008348683620007e9565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620008816200087b62000875846200084c565b62000856565b6200084c565b9050919050565b6000819050919050565b6200089d8362000860565b620008b5620008ac8262000888565b848454620007f6565b825550505050565b600090565b620008cc620008bd565b620008d981848462000892565b505050565b5b818110156200090157620008f5600082620008c2565b600181019050620008df565b5050565b601f82111562000950576200091a81620007c4565b6200092584620007d9565b8101602085101562000935578190505b6200094d6200094485620007d9565b830182620008de565b50505b505050565b600082821c905092915050565b6000620009756000198460080262000955565b1980831691505092915050565b600062000990838362000962565b9150826002028217905092915050565b620009ab8262000755565b67ffffffffffffffff811115620009c757620009c66200058b565b5b620009d382546200078f565b620009e082828562000905565b600060209050601f83116001811462000a18576000841562000a03578287015190505b62000a0f858262000982565b86555062000a7f565b601f19841662000a2886620007c4565b60005b8281101562000a525784890151825560018201915060208501945060208101905062000a2b565b8683101562000a72578489015162000a6e601f89168262000962565b8355505b6001600288020188555050505b505050505050565b62000a92816200084c565b82525050565b600060208201905062000aaf600083018462000a87565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000af1826200084c565b915062000afe836200084c565b925082820190508082111562000b195762000b1862000ab5565b5b92915050565b60805161124d62000b426000396000818161061901526108e3015261124d6000f3fe6080604052600436106100a05760003560e01c8063bf1482fa11610064578063bf1482fa146101fd578063cc6cb19a14610228578063d5ee155714610265578063ed88c68e14610290578063f2fde38b1461029a578063f3a01489146102c357610125565b80630bcd177e1461012a578063715018a6146101535780637284e4161461016a5780638da5cb5b14610195578063ac62f566146101c057610125565b36610125576100b9671a6f7be34a2293ea60c01b6102ee565b6100c16102f1565b6100d567f92d08ef87da183960c01b6102ee565b3373ffffffffffffffffffffffffffffffffffffffff167f264f630d9efa0d07053a31163641d9fcc0adafc9d9e76f1c37c2ce3a558d2c523460405161011b9190610d1f565b60405180910390a2005b600080fd5b34801561013657600080fd5b50610151600480360381019061014c9190610d6b565b610499565b005b34801561015f57600080fd5b50610168610681565b005b34801561017657600080fd5b5061017f610709565b60405161018c9190610e28565b60405180910390f35b3480156101a157600080fd5b506101aa610797565b6040516101b79190610e8b565b60405180910390f35b3480156101cc57600080fd5b506101e760048036038101906101e29190610d6b565b6107c0565b6040516101f49190610e8b565b60405180910390f35b34801561020957600080fd5b506102126107ff565b60405161021f9190610f64565b60405180910390f35b34801561023457600080fd5b5061024f600480360381019061024a9190610fb2565b6108c9565b60405161025c9190610d1f565b60405180910390f35b34801561027157600080fd5b5061027a6108e1565b6040516102879190610e8b565b60405180910390f35b610298610905565b005b3480156102a657600080fd5b506102c160048036038101906102bc9190610fb2565b6109e9565b005b3480156102cf57600080fd5b506102d8610ae0565b6040516102e59190610d1f565b60405180910390f35b50565b61030567b21010693374f54f60c01b6102ee565b61031967029bf240057b1d0460c01b6102ee565b61032d675aa33d49b05224d960c01b6102ee565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036104185761038867ce3780687d56108960c01b6102ee565b61039c670cbbbcbd6ca4e42360c01b6102ee565b6103b067c72800df4fcc0c1160c01b6102ee565b6002339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061042d565b61042c673ff88ee0cfac1ecc60c01b6102ee565b5b610441671929eb805808dd4d60c01b6102ee565b34600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610490919061100e565b92505081905550565b6104ad67164d64f6941f209b60c01b6102ee565b6104b5610c3a565b73ffffffffffffffffffffffffffffffffffffffff166104d3610797565b73ffffffffffffffffffffffffffffffffffffffff1614610529576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105209061108e565b60405180910390fd5b61053d6753b0584f1ca1e4ba60c01b6102ee565b61055167558cb4d2da6e2e7a60c01b6102ee565b6105656714e79d69729f29ef60c01b6102ee565b6105796763e4f851675674df60c01b6102ee565b478111156105db5761059567f8212826c6187f9860c01b6102ee565b6105a96731fc47cc216b398660c01b6102ee565b6040517f356680b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105ef678dfefe7b063d248560c01b6102ee565b61060367b65406badcfcf69560c01b6102ee565b610617679b4d52d26bd046d860c01b6102ee565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561067d573d6000803e3d6000fd5b5050565b610689610c3a565b73ffffffffffffffffffffffffffffffffffffffff166106a7610797565b73ffffffffffffffffffffffffffffffffffffffff16146106fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f49061108e565b60405180910390fd5b6107076000610c42565b565b60038054610716906110dd565b80601f0160208091040260200160405190810160405280929190818152602001828054610742906110dd565b801561078f5780601f106107645761010080835404028352916020019161078f565b820191906000526020600020905b81548152906001019060200180831161077257829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600281815481106107d057600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6060610815671c1c32346205443b60c01b6102ee565b61082967e94b9dffa35a5a6d60c01b6102ee565b61083d670c6f0910084efdeb60c01b6102ee565b60028054806020026020016040519081016040528092919081815260200182805480156108bf57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610875575b5050505050905090565b60016020528060005260406000206000915090505481565b7f000000000000000000000000000000000000000000000000000000000000000081565b61091967df0c86c01a62a1de60c01b6102ee565b61092d672dcfb7940ff7130360c01b6102ee565b6109416777f6d4bbf86946a060c01b6102ee565b600034036109a35761095d672ad43772308f90f560c01b6102ee565b61097167be8ac5c6d8fd7d5c60c01b6102ee565b6040517fed0a901a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6109b7679da6ec17b759392960c01b6102ee565b6109cb677640148d001e85dd60c01b6102ee565b6109df679689eb43a8b2f11a60c01b6102ee565b6109e76102f1565b565b6109f1610c3a565b73ffffffffffffffffffffffffffffffffffffffff16610a0f610797565b73ffffffffffffffffffffffffffffffffffffffff1614610a65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5c9061108e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610ad4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610acb90611180565b60405180910390fd5b610add81610c42565b50565b6000610af66781052a27bd2860ef60c01b6102ee565b610b0a67cacaa88bfc34db9c60c01b6102ee565b610b1e67f1bf451e5dae9b9760c01b6102ee565b6000610b34676f48e80cdb06da2060c01b6102ee565b610b486765cbfe60de9ff50c60c01b6102ee565b60005b600280549050811015610c0a57610b6c67c0bbb4e824c9e63660c01b6102ee565b6001600060028381548110610b8457610b836111a0565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610bf5919061100e565b91508080610c02906111cf565b915050610b4b565b50610c1f67292fb67fe1d7681060c01b6102ee565b610c3367d4a28acdd32269b860c01b6102ee565b8091505090565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000819050919050565b610d1981610d06565b82525050565b6000602082019050610d346000830184610d10565b92915050565b600080fd5b610d4881610d06565b8114610d5357600080fd5b50565b600081359050610d6581610d3f565b92915050565b600060208284031215610d8157610d80610d3a565b5b6000610d8f84828501610d56565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610dd2578082015181840152602081019050610db7565b60008484015250505050565b6000601f19601f8301169050919050565b6000610dfa82610d98565b610e048185610da3565b9350610e14818560208601610db4565b610e1d81610dde565b840191505092915050565b60006020820190508181036000830152610e428184610def565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e7582610e4a565b9050919050565b610e8581610e6a565b82525050565b6000602082019050610ea06000830184610e7c565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610edb81610e6a565b82525050565b6000610eed8383610ed2565b60208301905092915050565b6000602082019050919050565b6000610f1182610ea6565b610f1b8185610eb1565b9350610f2683610ec2565b8060005b83811015610f57578151610f3e8882610ee1565b9750610f4983610ef9565b925050600181019050610f2a565b5085935050505092915050565b60006020820190508181036000830152610f7e8184610f06565b905092915050565b610f8f81610e6a565b8114610f9a57600080fd5b50565b600081359050610fac81610f86565b92915050565b600060208284031215610fc857610fc7610d3a565b5b6000610fd684828501610f9d565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061101982610d06565b915061102483610d06565b925082820190508082111561103c5761103b610fdf565b5b92915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611078602083610da3565b915061108382611042565b602082019050919050565b600060208201905081810360008301526110a78161106b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806110f557607f821691505b602082108103611108576111076110ae565b5b50919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061116a602683610da3565b91506111758261110e565b604082019050919050565b600060208201905081810360008301526111998161115d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006111da82610d06565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361120c5761120b610fdf565b5b60018201905091905056fea2646970667358221220705dcea979c4be4ba463aeca068864d92380a50a54922aa9519fe015594054f664736f6c63430008120033a26469706673582212204084cddde100b471c65b25d4d1795a4868a44cf7fe1b242286fab5a357be341d64736f6c63430008120033";

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
