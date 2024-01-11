/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "CharityContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CharityContract__factory>;
    getContractFactory(
      name: "Foundation",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Foundation__factory>;
    getContractFactory(
      name: "FundManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FundManager__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "CharityContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CharityContract>;
    getContractAt(
      name: "Foundation",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Foundation>;
    getContractAt(
      name: "FundManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FundManager>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
