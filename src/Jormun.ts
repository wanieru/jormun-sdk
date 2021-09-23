import { Data } from "./Data";
import { Unix } from "./Unix";

interface JormunUser
{
    [key : string] : Data
}
type MergeConflictResult = "download" | "upload";
type MergeConflictResolver = () => Promise<MergeConflictResult>;
type AlertResolver = (message : string) => void;
export class Jormun
{
    private app : string;
    private mergeConflictResolver : MergeConflictResolver;
    private alertResolver : AlertResolver;
    private users : {[id : number]: JormunUser};
    private lastResolve : {response : MergeConflictResult, time : number} | null;

    public constructor(app : string)
    {
        this.app = app;
    }
    public async resolveConflict() : Promise<MergeConflictResult>
    {
        if(this.lastResolve == null || Unix() - this.lastResolve.time > 10)
        {
            this.lastResolve = {response:await this.mergeConflictResolver(), time: Unix()};
        }
        return this.lastResolve.response;
    }
    public alert(message : string)
    {
        this.alertResolver(message);
    }
    public setMergeConflictResolver(resolver : MergeConflictResolver)
    {
        this.mergeConflictResolver = resolver;
    }
    public setAlertResolver(resolver : AlertResolver)
    {
        this.alertResolver = resolver;
    }
    public async user(id : number) : Promise<JormunUser | null>
    {
        if(this.users[id])
            return this.users[id];
        return null;
    }
}