// src/interfaces.ts

export interface ICategory {
    id: string;
    title: string;
    record: string;
  }
  
  export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" |"pending"| "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
    id: string;
  }
  
  export interface IPost {
    production: any;
    production_lines: string; // Update the field name to match your SQL schema
    id: string;
    title: string;
    content: string;
    br: number | null; // Assuming `br` can be null based on your SQL schema
    aa: string | null; // Assuming `aa` can be null based on your SQL schema
    plan_no: string | null; // Assuming `plan_no` can be null based on your SQL schema
    categories: ICategory[]; // Assuming it's a one-to-many relationship
    sort: string | null; // Assuming `sort` can be null based on your SQL schema
    images: IFile[];
    category_id: number | null;
    category:string;
    no:string;
    work_element:string;
    plan_no:string;
    element_time:string;
    mv:string;
    mod:string;
    model_type:string;
    st:string;
    code:string;
    symbol:string;
    vp:string;
    tps:string;
    jes:string;
    
  }
  
  export interface ShowData {
    no: string;
    work_element: string;
    plan_no: string;
    element_time: string;
    mv: string;
    mod: string;
    model_type: string;
    st: string;
    code: string;
    symbol: string;
    vp: string;
    tps: string;
    jes: string;
  }
  