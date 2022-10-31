import { Model, Document, HydratedDocument } from "mongoose";
import { IHBT } from "../../shared";
import { HBT, HBTDocument } from "../models/hbt";

class HBTRepository {
  model: Model<IHBT>;

  constructor(model: typeof HBT) {
    this.model = model;
  }

  async findByHbtId({
    hbtId,
  }: {
    hbtId: string;
  }): Promise<HydratedDocument<IHBT> | null> {
    return await this.model.findById(hbtId);
  }

  async incrementNumberOfAddressesRegistered({
    hbtId,
  }: {
    hbtId: string;
  }): Promise<HydratedDocument<IHBT> | null> {
    const doc = await this.findByHbtId({ hbtId });
    if (!doc) {
      return await this.model.create({
        _id: hbtId,
        numberOfRegisteredAddresses: 1,
      });
    } else {
      doc.numberOfRegisteredAddresses = doc.numberOfRegisteredAddresses + 1;
      return await doc.save();
    }
  }

  async decrementNumberOfAddressesRegistered({
    hbtId,
  }: {
    hbtId: string;
  }): Promise<HydratedDocument<IHBT> | null> {
    const doc = await this.findByHbtId({ hbtId });
    if (!doc) {
      return await this.model.create({
        _id: hbtId,
        numberOfRegisteredAddresses: 0,
      });
    } else {
      if (doc.numberOfRegisteredAddresses > 0) {
        doc.numberOfRegisteredAddresses--;
      }
      return await doc.save();
    }
  }
}

export default new HBTRepository(HBT);
