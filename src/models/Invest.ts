class Invest {
  investId: string;
  investorUid: string;
  companyUid: string;
  investNumber: number;
  investAmount: number;

  constructor(
    investId: string,
    investorUid: string,
    companyUid: string,
    investNumber: number,
    investAmount: number
  ) {
    this.investId = investId;
    this.investorUid = investorUid;
    this.companyUid = companyUid;
    this.investNumber = investNumber;
    this.investAmount = investAmount;
  }

  toJson() {
    return {
      investorUid: this.investorUid,
      companyUid: this.companyUid,
      investNumber: this.investNumber,
      investAmount: this.investAmount,
    };
  }

  static fromJson(json: { [key: string]: any }): Invest {
    return new Invest(
      json.investid,
      json.investorUid,
      json.companyUid,
      json.investNumber,
      json.investAmount
    );
  }
}

export default Invest;
