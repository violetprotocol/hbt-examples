/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  ERC721,
  ERC721Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC721/ERC721";
import type { PromiseOrValue } from "../../../../../common";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

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
        name: "data",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620014b0380380620014b08339810160408190526200003491620001db565b81516200004990600090602085019062000068565b5080516200005f90600190602084019062000068565b50505062000281565b828054620000769062000245565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013657600080fd5b81516001600160401b03808211156200015357620001536200010e565b604051601f8301601f19908116603f011681019082821181831017156200017e576200017e6200010e565b816040528381526020925086838588010111156200019b57600080fd5b600091505b83821015620001bf5785820183015181830184015290820190620001a0565b83821115620001d15760008385830101525b9695505050505050565b60008060408385031215620001ef57600080fd5b82516001600160401b03808211156200020757600080fd5b620002158683870162000124565b935060208501519150808211156200022c57600080fd5b506200023b8582860162000124565b9150509250929050565b600181811c908216806200025a57607f821691505b6020821081036200027b57634e487b7160e01b600052602260045260246000fd5b50919050565b61121f80620002916000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101c3578063b88d4fde146101d6578063c87b56dd146101e9578063e985e9c5146101fc57600080fd5b80636352211e1461018757806370a082311461019a57806395d89b41146101bb57600080fd5b8063095ea7b3116100bd578063095ea7b31461014c57806323b872dd1461016157806342842e0e1461017457600080fd5b806301ffc9a7146100e457806306fdde031461010c578063081812fc14610121575b600080fd5b6100f76100f2366004610dff565b610238565b60405190151581526020015b60405180910390f35b61011461028a565b6040516101039190610e74565b61013461012f366004610e87565b61031c565b6040516001600160a01b039091168152602001610103565b61015f61015a366004610ebc565b610343565b005b61015f61016f366004610ee6565b61045d565b61015f610182366004610ee6565b6104d5565b610134610195366004610e87565b6104f0565b6101ad6101a8366004610f22565b610555565b604051908152602001610103565b6101146105ef565b61015f6101d1366004610f3d565b6105fe565b61015f6101e4366004610f8f565b61060d565b6101146101f7366004610e87565b61068c565b6100f761020a36600461106b565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061026957506001600160e01b03198216635b5e139f60e01b145b8061028457506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102999061109e565b80601f01602080910402602001604051908101604052809291908181526020018280546102c59061109e565b80156103125780601f106102e757610100808354040283529160200191610312565b820191906000526020600020905b8154815290600101906020018083116102f557829003601f168201915b5050505050905090565b600061032782610700565b506000908152600460205260409020546001600160a01b031690565b600061034e826104f0565b9050806001600160a01b0316836001600160a01b0316036103c05760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103dc57506103dc813361020a565b61044e5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016103b7565b6104588383610767565b505050565b61046733826107e2565b6104ca5760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016103b7565b610458838383610861565b6104588383836040518060200160405280600081525061060d565b6000818152600260205260408120546001600160a01b0316806102845760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016103b7565b60006001600160a01b0382166105d35760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e6572000000000000000000000000000000000000000000000060648201526084016103b7565b506001600160a01b031660009081526003602052604090205490565b6060600180546102999061109e565b610609338383610a22565b5050565b61061733836107e2565b61067a5760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016103b7565b61068684848484610af0565b50505050565b606061069782610700565b60006106ae60408051602081019091526000815290565b905060008151116106ce57604051806020016040528060008152506106f9565b806106d884610b79565b6040516020016106e99291906110d8565b6040516020818303038152906040525b9392505050565b6000818152600260205260409020546001600160a01b03166107645760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016103b7565b50565b6000818152600460205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03841690811790915581906107a9826104f0565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806107ee836104f0565b9050806001600160a01b0316846001600160a01b0316148061083557506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806108595750836001600160a01b031661084e8461031c565b6001600160a01b0316145b949350505050565b826001600160a01b0316610874826104f0565b6001600160a01b0316146108f05760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016103b7565b6001600160a01b0382166109525760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103b7565b61095d600082610767565b6001600160a01b038316600090815260036020526040812080546001929061098690849061111d565b90915550506001600160a01b03821660009081526003602052604081208054600192906109b4908490611134565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031603610a835760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103b7565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610afb848484610861565b610b0784848484610c92565b6106865760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016103b7565b606081600003610ba05750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610bca5780610bb48161114c565b9150610bc39050600a8361117b565b9150610ba4565b60008167ffffffffffffffff811115610be557610be5610f79565b6040519080825280601f01601f191660200182016040528015610c0f576020820181803683370190505b5090505b841561085957610c2460018361111d565b9150610c31600a8661118f565b610c3c906030611134565b60f81b818381518110610c5157610c516111a3565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610c8b600a8661117b565b9450610c13565b60006001600160a01b0384163b15610dde57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610cd69033908990889088906004016111b9565b6020604051808303816000875af1925050508015610d11575060408051601f3d908101601f19168201909252610d0e918101906111f5565b60015b610dc4573d808015610d3f576040519150601f19603f3d011682016040523d82523d6000602084013e610d44565b606091505b508051600003610dbc5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016103b7565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610859565b506001949350505050565b6001600160e01b03198116811461076457600080fd5b600060208284031215610e1157600080fd5b81356106f981610de9565b60005b83811015610e37578181015183820152602001610e1f565b838111156106865750506000910152565b60008151808452610e60816020860160208601610e1c565b601f01601f19169290920160200192915050565b6020815260006106f96020830184610e48565b600060208284031215610e9957600080fd5b5035919050565b80356001600160a01b0381168114610eb757600080fd5b919050565b60008060408385031215610ecf57600080fd5b610ed883610ea0565b946020939093013593505050565b600080600060608486031215610efb57600080fd5b610f0484610ea0565b9250610f1260208501610ea0565b9150604084013590509250925092565b600060208284031215610f3457600080fd5b6106f982610ea0565b60008060408385031215610f5057600080fd5b610f5983610ea0565b915060208301358015158114610f6e57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610fa557600080fd5b610fae85610ea0565b9350610fbc60208601610ea0565b925060408501359150606085013567ffffffffffffffff80821115610fe057600080fd5b818701915087601f830112610ff457600080fd5b81358181111561100657611006610f79565b604051601f8201601f19908116603f0116810190838211818310171561102e5761102e610f79565b816040528281528a602084870101111561104757600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561107e57600080fd5b61108783610ea0565b915061109560208401610ea0565b90509250929050565b600181811c908216806110b257607f821691505b6020821081036110d257634e487b7160e01b600052602260045260246000fd5b50919050565b600083516110ea818460208801610e1c565b8351908301906110fe818360208801610e1c565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561112f5761112f611107565b500390565b6000821982111561114757611147611107565b500190565b60006001820161115e5761115e611107565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261118a5761118a611165565b500490565b60008261119e5761119e611165565b500690565b634e487b7160e01b600052603260045260246000fd5b60006001600160a01b038087168352808616602084015250836040830152608060608301526111eb6080830184610e48565b9695505050505050565b60006020828403121561120757600080fd5b81516106f981610de956fea164736f6c634300080e000a";

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
