import { Model, HydratedDocument } from "mongoose";
import { EthAddress, IClaim } from "../../shared";
import { Claim } from "../models/claim";

class ClaimRepository {
  model: Model<IClaim>;

  constructor(model: typeof Claim) {
    this.model = model;
  }

  async create({ address, amount }: IClaim): Promise<HydratedDocument<IClaim>> {
    return await this.model.create({ address, amount });
  }

  async find(params: Partial<IClaim>) {
    return await this.model.find(params).exec();
  }

  async findByAddress(address: EthAddress) {
    return await this.model.findOne({ address }).exec();
  }
}

export default new ClaimRepository(Claim);
