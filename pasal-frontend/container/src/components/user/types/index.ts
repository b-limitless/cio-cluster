export type Authorization = {
    name: string;
    cat: string;
    guard_name: string;
    created_at: string;
    id?:string;
  };
  
export type Row = {[x:string]: Authorization[]};

export type AuthorizationType = Row[];

export interface PermissionInterface {
    authorizations: AuthorizationType
    loading : boolean, 
    error: string | null
}

