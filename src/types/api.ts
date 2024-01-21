import { IFeedbackEmailData } from "./email";
import { Status } from "./status";

export interface IUpdateProposalStatusBody {
    status: Status;
    metadata: IFeedbackEmailData
}