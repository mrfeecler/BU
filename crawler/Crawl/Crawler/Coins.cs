using Crawl.Models;
using Crawl.Queue;
using HtmlAgilityPack;
using Newtonsoft.Json; 

namespace Crawl.Crawler
{
    internal class Coins
    { 
        public async Task<string> Execute()
        {
            string result = "Success";
            QueueService queue = new QueueService();
            string baseUrl = "https://cryptorank.io/all-coins-list?rows=100000";
            List<Coin> coins = new List<Coin>();
            List<string> coinIds = new List<string>();
            try
            {
                var httpClient = new HttpClient();
                var html = await httpClient.GetStringAsync(baseUrl);
                var htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(html);

                var trElements = htmlDocument.DocumentNode.SelectNodes("//div[@class='coins-table']//tbody//tr");

                if (trElements != null)
                {
                    foreach (var tr in trElements)
                    {
                        string coinId = "";
                        var tdElements = tr.SelectNodes(".//td");
                        if (tdElements != null)
                        {
                            string name = tdElements[2].SelectSingleNode(".//p")?.InnerText.Trim();
                            string price = tdElements[3].SelectSingleNode(".//p")?.InnerText.Trim();
                            string percentChange = tdElements[4].SelectSingleNode(".//span")?.InnerText.Trim();
                            string marketCap = tdElements[5].SelectSingleNode(".//p")?.InnerText.Trim();
                            string volume = tdElements[6].SelectSingleNode(".//p")?.InnerText.Trim();
                            string circulatingSupply = tdElements[7].SelectSingleNode(".//p")?.InnerText.Trim();
                            var hrefValue = tdElements[2].SelectSingleNode(".//a")?.GetAttributeValue("href", "");
                            coinId = hrefValue.Split("/").Last();
                            coins.Add(new Coin()
                            {
                                Id = coinId,
                                Name = name,
                                CirculatingSupply = circulatingSupply,
                                MarketCap = marketCap,
                                Volume = volume,
                                PercentChange = percentChange,
                                Price = price
                            });
                            coinIds.Add(coinId);
                        }
                    }
                }
                if (coinIds.Count > 0)
                {
                    string coinIdsString = string.Join(",", coinIds);
                    string getChartsUrl = $"https://api.cryptorank.io/v0/coins/charts?coinKeys={coinIdsString}&type=price_7d";
                    var httpClient2 = new HttpClient();
                    var res = await httpClient2.GetStringAsync(getChartsUrl);
                    Dictionary<string, string> keyValueDatas = JsonConvert.DeserializeObject<Dictionary<string, string>>(res);
                    foreach (var c in coins)
                    {
                        keyValueDatas.TryGetValue(c.Id, out string chartUrl);
                        c.Chart = chartUrl;
                    }
                    queue.PushCoinsToQueue(coins);
                }
 
            }
            catch (Exception ex)
            {
                result = "Error";
                Console.Out.WriteLine(ex);
                throw;
            }
            return result;
        }
    }
}
