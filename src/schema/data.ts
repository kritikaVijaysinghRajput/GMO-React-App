export interface post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface department {
  department: string;
  subDepartments: string[];
}
export const departmentsData: department[] = [
  {
    department: "Agriculture & Fishing",
    subDepartments: [
      "Agriculture",
      "Crops",
      "Farming Animals & Livestock",
      "Fishery & Aquaculture",
      "Ranching",
    ],
  },
  {
    department: "Business Services",
    subDepartments: [
      "Accounting & Accounting Services",
      "Auctions",
      "Business Services - General",
      "Call Centers & Business Centers",
      "Career Planning",
      "Commercial Printing",
      "Debt Collection",
    ],
  },
];
