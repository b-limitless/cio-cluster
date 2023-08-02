import logger from "../logger";
import { KYC } from "../models/kyc";

export class KYCServiceLocal {
  async build(data: any) {
    try {
      const buildKYC = KYC.build({ ...data });
      await buildKYC.save();
      logger.log("info", "KYC successfully build", buildKYC);
      return buildKYC;
    } catch (err: any) {
      logger.log("error", `Could not save KYC: ${err}`);
      throw new Error(err);
    }
  }
}

const KYCService = new KYCServiceLocal();

export { KYCService };
