import { renderToBuffer } from "@react-pdf/renderer";
import EstimateDocument from "./EstimateDocument";
import { EstimatePayload, Proposal } from "../types";

export async function generateEstimatePdf(
  estimate: EstimatePayload,
  proposal: Proposal | null = null
): Promise<Buffer> {
  return renderToBuffer(<EstimateDocument estimate={estimate} proposal={proposal} />);
}
