export class AnalysisTemplate {
  id?: number;
  name?: string;
  description?: string;
  conditions?: AnalysisCondition[];
}
interface AnalysisCondition {
  condition: string;
  intervals: AnalysisInterval[];
}
interface AnalysisInterval {
  interval: string;
  intervalUnit: string;
  packagings: AnalysisPackaging[];
}
interface AnalysisPackaging {
  packaging: string;
  applications: Application[];
}
interface Application {
  analysisDepartments: AnalysisDepartment[];
  application?: string;
  dosage?: number;
}
interface AnalysisDepartment {
  analysisDepartment: string;
  remark?: string;
}
