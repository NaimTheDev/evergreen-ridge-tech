export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  _gotcha?: string;
}

export interface BreakdownLine {
  label: string;
  hours: number;
  cost: number;
}

export interface EstimatePayload {
  name: string;
  email: string;
  project_type: string;
  complexity: string;
  timeline: string;
  budget: string;
  notes?: string;
  total_hours: number;
  total_low: number;
  total_high: number;
  breakdown: BreakdownLine[];
  bufferLines: BreakdownLine[];
  _gotcha?: string;
}
