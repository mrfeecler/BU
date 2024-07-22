
using Crawl.Crawler;

class Program
{
    static async Task Main()
    { 
        Coins coins = new Coins();
        Fundraising fundraising = new Fundraising();

        string result = await coins.Execute();
        string result_fundraising = await fundraising.Execute();
    }
}
