
export class report{

    public criminalName: string;

    public location: string;
    public lat;
    public long;
    public status: boolean;
    public extraInfo: string;

    public time: number;

    public witnessName: string;
    public witnessNumber: string;

    public cid: number;
  
  
    constructor (cn: string, l: string, s: boolean, e: string, wn: string, wnum: string, id: number, lat:number, long:number) {
        this.criminalName = cn;
        this.location = l;

        this.lat = lat;
        this.long = long;
        
        this.status = s;
        this.extraInfo = e;

        this.time = new Date().getTime();

        this.witnessName = wn;
        this.witnessNumber = wnum;

        this.cid = id;
    }
}
  
