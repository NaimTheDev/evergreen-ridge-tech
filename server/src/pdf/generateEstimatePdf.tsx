import { renderToBuffer } from "@react-pdf/renderer";
import EstimateDocument from "./EstimateDocument";
import { EstimatePayload } from "../types";

export async function generateEstimatePdf(estimate: EstimatePayload): Promise<Buffer> {
  return renderToBuffer(<EstimateDocument estimate={estimate} />);
}
