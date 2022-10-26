/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BytesLike,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC20MerkleDrop,
  ERC20MerkleDropInterface,
} from "../ERC20MerkleDrop";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "merkleroot",
        type: "bytes32",
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
        name: "claimant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claimed",
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
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "isClaimed",
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
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "root",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        name: "recipient",
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
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
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
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620010c4380380620010c48339810160408190526200003491620001cf565b8251839083906200004d90600390602085019062000072565b5080516200006390600490602084019062000072565b50505060805250620002959050565b828054620000809062000242565b90600052602060002090601f016020900481019282620000a45760008555620000ef565b82601f10620000bf57805160ff1916838001178555620000ef565b82800160010185558215620000ef579182015b82811115620000ef578251825591602001919060010190620000d2565b50620000fd92915062000101565b5090565b5b80821115620000fd576000815560010162000102565b600082601f8301126200012a57600080fd5b81516001600160401b03808211156200014757620001476200027f565b604051601f8301601f19908116603f011681019082821181831017156200017257620001726200027f565b816040528381526020925086838588010111156200018f57600080fd5b600091505b83821015620001b3578582018301518183018401529082019062000194565b83821115620001c55760008385830101525b9695505050505050565b600080600060608486031215620001e557600080fd5b83516001600160401b0380821115620001fd57600080fd5b6200020b8783880162000118565b945060208601519150808211156200022257600080fd5b50620002318682870162000118565b925050604084015190509250925092565b600181811c908216806200025757607f821691505b602082108114156200027957634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b608051610e0c620002b86000396000818161025301526103960152610e0c6000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c578063a457c2d711610066578063a457c2d7146101ef578063a9059cbb14610202578063dd62ed3e14610215578063ebf0c7171461024e57600080fd5b806370a082311461018c57806395d89b41146101b55780639e34070f146101bd57600080fd5b806318160ddd116100c857806318160ddd1461014557806323b872dd14610157578063313ce5671461016a578063395093511461017957600080fd5b806306fdde03146100ef578063095ea7b31461010d57806314132f4814610130575b600080fd5b6100f7610275565b6040516101049190610cc8565b60405180910390f35b61012061011b366004610bfb565b610307565b6040519015158152602001610104565b61014361013e366004610c25565b61031d565b005b6002545b604051908152602001610104565b610120610165366004610bbf565b610513565b60405160128152602001610104565b610120610187366004610bfb565b6105bd565b61014961019a366004610b6a565b6001600160a01b031660009081526020819052604090205490565b6100f76105f9565b6101206101cb366004610caf565b600881901c600090815260056020526040812054600160ff84161b16151592915050565b6101206101fd366004610bfb565b610608565b610120610210366004610bfb565b6106a1565b610149610223366004610b8c565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101497f000000000000000000000000000000000000000000000000000000000000000081565b60606003805461028490610d54565b80601f01602080910402602001604051908101604052809291908181526020018280546102b090610d54565b80156102fd5780601f106102d2576101008083540402835291602001916102fd565b820191906000526020600020905b8154815290600101906020018083116102e057829003601f168201915b5050505050905090565b60006103143384846106ae565b50600192915050565b6040516bffffffffffffffffffffffff19606086901b166020820152603481018490526000906054016040516020818303038152906040528051906020012090506000806103c18585808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152507f000000000000000000000000000000000000000000000000000000000000000092508791506107d29050565b91509150816104255760405162461bcd60e51b815260206004820152602560248201527f45524332304d65726b6c6544726f703a2056616c69642070726f6f66207265716044820152641d5a5c995960da1b60648201526084015b60405180910390fd5b600881901c600090815260056020526040902054600160ff83161b161561049e5760405162461bcd60e51b815260206004820152602760248201527f45524332304d65726b6c6544726f703a20546f6b656e7320616c72656164792060448201526618db185a5b595960ca1b606482015260840161041c565b600881901c60009081526005602052604090208054600160ff84161b179055866001600160a01b03167fd8138f8a3f377c5259ca548e70e4c2de94f129f5a11036a15b69513cba2b426a876040516104f891815260200190565b60405180910390a261050a87876108a0565b50505050505050565b600061052084848461097f565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156105a55760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b606482015260840161041c565b6105b285338584036106ae565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916103149185906105f4908690610d1d565b6106ae565b60606004805461028490610d54565b3360009081526001602090815260408083206001600160a01b03861684529091528120548281101561068a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b606482015260840161041c565b61069733858584036106ae565b5060019392505050565b600061031433848461097f565b6001600160a01b0383166107105760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161041c565b6001600160a01b0382166107715760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161041c565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000808281805b8751811015610894576107ed600283610d35565b9150600088828151811061080357610803610dc0565b60200260200101519050808411610845576040805160208101869052908101829052606001604051602081830303815290604052805190602001209350610881565b604080516020810183905290810185905260600160405160208183030381529060405280519060200120935060018361087e9190610d1d565b92505b508061088c81610d8f565b9150506107d9565b50941495939450505050565b6001600160a01b0382166108f65760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161041c565b80600260008282546109089190610d1d565b90915550506001600160a01b03821660009081526020819052604081208054839290610935908490610d1d565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0383166109e35760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161041c565b6001600160a01b038216610a455760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161041c565b6001600160a01b03831660009081526020819052604090205481811015610abd5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161041c565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610af4908490610d1d565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b4091815260200190565b60405180910390a350505050565b80356001600160a01b0381168114610b6557600080fd5b919050565b600060208284031215610b7c57600080fd5b610b8582610b4e565b9392505050565b60008060408385031215610b9f57600080fd5b610ba883610b4e565b9150610bb660208401610b4e565b90509250929050565b600080600060608486031215610bd457600080fd5b610bdd84610b4e565b9250610beb60208501610b4e565b9150604084013590509250925092565b60008060408385031215610c0e57600080fd5b610c1783610b4e565b946020939093013593505050565b60008060008060608587031215610c3b57600080fd5b610c4485610b4e565b935060208501359250604085013567ffffffffffffffff80821115610c6857600080fd5b818701915087601f830112610c7c57600080fd5b813581811115610c8b57600080fd5b8860208260051b8501011115610ca057600080fd5b95989497505060200194505050565b600060208284031215610cc157600080fd5b5035919050565b600060208083528351808285015260005b81811015610cf557858101830151858201604001528201610cd9565b81811115610d07576000604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610d3057610d30610daa565b500190565b6000816000190483118215151615610d4f57610d4f610daa565b500290565b600181811c90821680610d6857607f821691505b60208210811415610d8957634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610da357610da3610daa565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fdfea264697066735822122024a40f250dacc9e7fadfb9b42e7e480934052e1b335850640c6300fb335643e764736f6c63430008070033";

type ERC20MerkleDropConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20MerkleDropConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20MerkleDrop__factory extends ContractFactory {
  constructor(...args: ERC20MerkleDropConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC20MerkleDrop";
  }

  deploy(
    name: string,
    symbol: string,
    merkleroot: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20MerkleDrop> {
    return super.deploy(
      name,
      symbol,
      merkleroot,
      overrides || {}
    ) as Promise<ERC20MerkleDrop>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    merkleroot: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name,
      symbol,
      merkleroot,
      overrides || {}
    );
  }
  attach(address: string): ERC20MerkleDrop {
    return super.attach(address) as ERC20MerkleDrop;
  }
  connect(signer: Signer): ERC20MerkleDrop__factory {
    return super.connect(signer) as ERC20MerkleDrop__factory;
  }
  static readonly contractName: "ERC20MerkleDrop";
  public readonly contractName: "ERC20MerkleDrop";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20MerkleDropInterface {
    return new utils.Interface(_abi) as ERC20MerkleDropInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20MerkleDrop {
    return new Contract(address, _abi, signerOrProvider) as ERC20MerkleDrop;
  }
}
