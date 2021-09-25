
type AlertDelegate = (message : string, options : string[]) => Promise<number>;
export class Jormun
{
    private app : string;
    private alertDelegate : AlertDelegate;

    public constructor(app : string)
    {
        this.app = app;
    }

    public alert(message : string)
    {
        this.alertDelegate(message, []);
    }
    public setAlertDelegate(resolver : AlertDelegate)
    {
        this.alertDelegate = resolver;
    }
}